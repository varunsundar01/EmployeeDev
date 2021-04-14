from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

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
            validated_data['id'],
            validated_data['email'],
            validated_data['password'],
            validated_data['first_name'],
            validated_data['last_name'],
            validated_data['employee_number'],
            validated_data['department_name']
        )
        return employee

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        employee = authenticate(**data)
        if employee and employee.is_active:
            return employee
        raise serializers.ValidationError('Incorrect Credentials')