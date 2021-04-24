from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

Employee = get_user_model()

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'email', 'employee_number', 'first_name', 'last_name', 'department_name')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'email', 'password', 'employee_number', 'first_name', 'last_name', 'department_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        employee = Employee.objects.create_user(
            validated_data['email'],
            validated_data['password'],
            validated_data['first_name'],
            validated_data['last_name'],
            validated_data['employee_number'],
            validated_data['department_name']
        )
        return employee

class SendAccountVerificationSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()

    class Meta:
        fields=['email']

class ActivateEmployeeSerializer(serializers.ModelSerializer):
    uidb64=serializers.CharField(write_only=True)
    token=serializers.CharField(write_only=True)

    class Meta:
        model=Employee
        fields=['uidb64', 'token']

    def validate(self, attrs):
        try:
            uidb64=attrs.get('uidb64')
            token=attrs.get('token')

            employee_id=force_str(urlsafe_base64_decode(uidb64))
            employee=Employee.objects.get(id=employee_id)

            if not default_token_generator.check_token(employee, token):
                raise AuthenticationFailed('Account verification link is invalid', 401)

            employee.is_verified=True
            employee.save()
            return employee
        except:
            raise AuthenticationFailed('Account Verification link is invalid', 401)

        return super().validate(attrs)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        employee = authenticate(**data)
        if employee and employee.is_active:
            if employee.is_verified:
                return employee
            else:
                raise serializers.ValidationError({'verification-error':'Verify your account before signing in. A verification email was sent to you after registration'})
        raise serializers.ValidationError('Incorrect Credentials')

class ResetPasswordSerializer(serializers.Serializer):
    email=serializers.EmailField()

    class Meta:
        fields=['email']

class SetNewPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(write_only=True)
    token=serializers.CharField(write_only=True)
    uidb64=serializers.CharField(write_only=True)

    class Meta:
        fields=['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password=attrs.get('password')
            token=attrs.get('token')
            uidb64=attrs.get('uidb64')

            employee_id=force_str(urlsafe_base64_decode(uidb64))
            employee=Employee.objects.get(id=employee_id)

            if not default_token_generator.check_token(employee, token):
                raise AuthenticationFailed('The password reset link is invalid', 401)

            employee.set_password(password)
            employee.save()
            return employee
        except:
            raise AuthenticationFailed('The password reset link is invalid', 401)

        return super().validate(attrs)