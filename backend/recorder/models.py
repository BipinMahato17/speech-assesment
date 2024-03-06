from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

# Create your models here.
class recorder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    audio_file = models.FileField(upload_to='audio_files/')
    dateTime = models.DateTimeField(auto_now_add=True)
    transcribed_text = models.TextField()
    corrected_sentence = models.TextField()

    def __str__(self):
        return str(self.id)
    
class vocabulary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recording = models.ForeignKey(recorder, on_delete=models.CASCADE)
    wordlist = models.TextField()
    unique_wordlist = models.TextField()
    extracted_idioms = models.TextField() 
    a1_list = models.TextField()
    a2_list = models.TextField()
    b1_list = models.TextField()
    b2_list = models.TextField()
    c1_list = models.TextField()
    c2_list = models.TextField()

    def __str__(self):
        return str(self.id)
