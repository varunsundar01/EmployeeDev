from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import EmployeeSerializer, RegisterSerializer, LoginSerializer

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