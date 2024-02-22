from django.shortcuts import render, redirect
from .models import CustomUser
from django.contrib.auth import authenticate, login
from django.contrib import messages

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserSerializer


# Create your views here.
@api_view(['POST'])
def users(request):
    if request.method == 'POST':
        first_name = request.POST.get('firstName')
        last_name = request.POST.get('lastName')
        email = request.POST.get('email')
        password = request.POST.get('password')
        rePassword = request.POST.get('rePassword')
        if password == rePassword:
                if not CustomUser.objects.filter(email=email).exists():
                     
                    # Create the user
                    user = CustomUser.objects.create_user(email=email, password=password, first_name=first_name, last_name=last_name)
                    serializer = UserRegisterSerializer(user)
                    messages.success(request, 'User created successfully!')
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

                    print(user)
                else:
                    messages.error(request, 'Email is already in use.')
        else:
            print('password didnt match')
            messages.error(request,'passwords do not match.')
 

@api_view(['POST'])
def UserLogin(request):
     if request.method == 'POST':
          email = request.POST.get('email')
          password = request.POST.get('password')
          user = authenticate(request, username=email, password=password)
          if user is not None:
               login(request,user)
               
          else:
               print("Invalid Email or Password.")
     

@api_view(['GET'])
def getUser(request):
        email = request.GET.get('email')
        if email:
            user = CustomUser.objects.filter(email=email).first()
            if user:
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Email parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)
