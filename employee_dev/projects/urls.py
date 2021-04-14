from rest_framework import routers
from projects.api import ProjectViewset, ProjectDashboardViewset

router = routers.DefaultRouter()
router.register('projects', ProjectViewset)
router.register('userprojects', ProjectDashboardViewset, basename='userproject')

urlpatterns = router.urls