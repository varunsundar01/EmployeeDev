from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model

Employee = get_user_model()

class Project(models.Model):
    id=models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=200, unique=True)
    project_slug = models.SlugField(default='')
    problem = models.TextField()
    solution = models.TextField()
    implementation = models.TextField()
    implementation_cost = models.FloatField()
    cost_savings = models.FloatField()
    time_to_complete = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    employee = models.ForeignKey(Employee, related_name = "projects", on_delete = models.CASCADE)

    def save(self, *args, **kwargs):
        self.project_slug = slugify(self.project_name)
        super(Project, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.project_name
