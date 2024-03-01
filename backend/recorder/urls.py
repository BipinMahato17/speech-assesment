from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_recorder, name='recorder'),
    path('list-recorders/', views.recorder_list, name='recorder_list'),
    path('delete-audio/', views.delete_audio_file, name='delete_audio'),
]
