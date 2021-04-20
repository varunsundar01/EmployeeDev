from django.urls import path, include
from .api import RegisterAPI, LoginAPI, EmployeeAPI, PasswordTokenCheckAPI, RequestPasswordResetAPI, SetNewPasswordAPI
from knox import views as knox_views

urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/register', RegisterAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/employee', EmployeeAPI.as_view()),
    path('auth/request-reset-password', RequestPasswordResetAPI.as_view(), name="request-reset-password"),
    path('auth/password-reset/<uidb64>/<token>', PasswordTokenCheckAPI.as_view(), name="password-reset-confirm"),
    path('auth/password-reset-complete', SetNewPasswordAPI.as_view(), name="password-reset-complete"),
    path('auth/logout', knox_views.LogoutView().as_view(), name="knox_logout"),
]