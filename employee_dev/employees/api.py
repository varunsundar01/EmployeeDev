from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import EmployeeSerializer, RegisterSerializer, LoginSerializer, ResetPasswordSerializer, SetNewPasswordSerializer, SendAccountVerificationSerializer, ActivateEmployeeSerializer
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

Employee=get_user_model()
frontend_root='http://127.0.0.1:8080/'

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        employee = serializer.save()
            
        return Response({
            "employee": EmployeeSerializer(employee, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(employee)[1]
        })


class SendAccountVerificationAPI(generics.GenericAPIView):
    serializer_class=SendAccountVerificationSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        email=request.data['email']
        employee=Employee.objects.get(email=email)

        uidb64=urlsafe_base64_encode(smart_bytes(employee.id))
        token=default_token_generator.make_token(user=employee)
        link=frontend_root+'verify-account/?req_u='+uidb64+'&reset='+token

        html_content=render_to_string('account_verification.html', {'title': 'Verify Account', 'link': link, 'first_name':employee.first_name})
        text_content=strip_tags(html_content)

        email=EmailMultiAlternatives(subject='Activate your EmployeeDev Account', body=text_content,from_email=settings.EMAIL_HOST_USER,to=[employee.email])
        email.attach_alternative(html_content, "text/html")
        email.send()
        return Response({'success': 'Account Verification Email Sent'}, status=status.HTTP_200_OK)

class ActivateEmployeeAPI(generics.GenericAPIView):
    serializer_class=ActivateEmployeeSerializer

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': 'Account Verified successfully'}, status=status.HTTP_200_OK)

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        employee = serializer.validated_data
        return Response({
            "employee": EmployeeSerializer(employee, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(employee)[1]
        })

class EmployeeAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = EmployeeSerializer

    def get_object(self):
        return self.request.user

class RequestPasswordResetAPI(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data)

        email=request.data['email']

        if Employee.objects.filter(email=email).exists():
            employee=Employee.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(employee.id))
            token=default_token_generator.make_token(user=employee)
            absurl=frontend_root+'forgot-password-confirm?req_u='+uidb64+'&reset='+token

            html_content = render_to_string('forgot_password_email.html', {'title': 'Reset Password', 'link': absurl})
            text_content = strip_tags(html_content)

            email=EmailMultiAlternatives(subject="EmployeeDev Password Reset Request",body=text_content,from_email=settings.EMAIL_HOST_USER, to=[employee.email])
            email.attach_alternative(html_content, "text/html")
            email.send()

        return Response({'success': 'Link sent to reset password'}, status=status.HTTP_200_OK)

class PasswordTokenCheckAPI(generics.GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            employee_id=smart_str(urlsafe_base64_decode(uidb64))
            employee=Employee.objects.get(id=employee_id)
            
            if not default_token_generator.check_token(employee, token):
                return Response({'error':'This link has expired'}, status=status.HTTP_401_UNAUTHORIZED)

            return Response({'success':True, 'message':'Credentials Validated', 'uidb64':uidb64, 'token': token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError:
            return Response({'error':'This link has expired'}, status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordAPI(generics.GenericAPIView):
    serializer_class=SetNewPasswordSerializer

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success':True, 'message':'Password Reset Successfully'}, status=status.HTTP_200_OK)