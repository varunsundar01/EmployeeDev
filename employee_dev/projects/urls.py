from rest_framework import routers
from projects.api import ProjectViewset, ProjectDashboardViewset, ProjectPostViewset

router = routers.DefaultRouter()
router.register('projects', ProjectViewset),
router.register('projectpost', ProjectPostViewset),
router.register('userprojects', ProjectDashboardViewset, basename='userproject')

urlpatterns = router.urls