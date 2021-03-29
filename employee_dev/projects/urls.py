from rest_framework import routers
from projects.api import ProjectViewset

router = routers.DefaultRouter()
router.register('projects', ProjectViewset)

urlpatterns = router.urls