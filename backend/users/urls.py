from django.urls import path
from . import views

urlpatterns = [
    path('',views.users, name='users'),
    path('login/',views.UserLogin, name='UserLogin'),
    path('index/',views.index, name='index'),
]
