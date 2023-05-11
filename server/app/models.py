from django.db import models

# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    username = models.CharField(max_length=150)
    password = models.CharField(max_length=150)


class Event(models.Model):
    event_name = models.CharField(max_length=255)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    location = models.CharField(max_length=100)
    image = models.TextField(default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    # id = models.AutoField(primary_key=True, unique=True, auto_created=True)

class LikesMapping(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="liked_events")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="liked_by")
    is_liked = models.BooleanField(default=False)