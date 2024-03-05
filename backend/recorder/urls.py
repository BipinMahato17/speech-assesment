from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_recorder, name='recorder'),
    path('list-recorders/<int:id>', views.recorder_list, name='recorder_list'),
    path('delete-audio/', views.delete_audio_file, name='delete_audio'),
    path('vocabulary/<int:id>',views.get_vocab, name='get_vocab'),
    path('result/<str:email>',views.get_all_result, name='get_all_result')
]
