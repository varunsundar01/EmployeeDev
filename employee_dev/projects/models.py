from django.db import models

class Project(models.Model):
    project_name = models.CharField(max_length=200)
    problem = models.TextField()
    solution = models.TextField()
    implementation = models.TextField()
    implementation_cost = models.FloatField()
    cost_savings = models.FloatField()
    time_to_complete = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.project_name
