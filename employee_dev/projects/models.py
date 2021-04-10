from django.db import models
from django.utils.text import slugify
# from django.contrib.auth.models import User

class Project(models.Model):
    project_name = models.CharField(max_length=200, unique=True)
    project_slug = models.SlugField(default='')
    problem = models.TextField()
    solution = models.TextField()
    implementation = models.TextField()
    implementation_cost = models.FloatField()
    cost_savings = models.FloatField()
    time_to_complete = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    # engineer = models.ForeignKey(User, related_name = "projects", on_delete = models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        self.project_slug = slugify(self.project_name)
        super(Project, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.project_name
