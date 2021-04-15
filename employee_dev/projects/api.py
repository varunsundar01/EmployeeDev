from projects.models import Project
from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer, ProjectPostSerializer
from django.contrib.auth import get_user_model

Employee = get_user_model()

class ProjectViewset(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProjectSerializer

class ProjectPostViewset(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProjectPostSerializer

class ProjectDashboardViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return self.request.user.projects.all()
    
    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)