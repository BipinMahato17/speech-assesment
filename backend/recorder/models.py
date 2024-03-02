from django.db import models

# Create your models here.
class recorder(models.Model):
    name = models.CharField(max_length=255)
    audio_file = models.FileField(upload_to='audio_files/')
    dateTime = models.DateTimeField(auto_now_add=True)
    transcribed_text = models.TextField()

    def __str__(self):
        return self.name