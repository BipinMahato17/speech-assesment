from django.urls import path
from . import views

urlpatterns = [
    path('user/',views.getUser, name='UserLogin'),
    path('register/',views.users, name='UserLogin'),
    path('login/',views.UserLogin, name='UserLogin'),
    path('logout/',views.UserLogout, name='UserLogout'),
]
