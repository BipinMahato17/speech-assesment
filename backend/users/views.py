from django.shortcuts import render, redirect
from .models import CustomUser
from django.contrib.auth import authenticate, login
from django.contrib import messages


# Create your views here.
def users(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        rePassword = request.POST.get('rePassword')
        if password == rePassword:
                if not CustomUser.objects.filter(email=email).exists():
                     
                    # Create the user
                    user = CustomUser.objects.create_user(email=email, password=password)
                    messages.success(request, 'User created successfully!')
                    print(user)
                else:
                    messages.error(request, 'Email is already in use.')
        else:
            print('password didnt match')
            messages.error(request,'passwords do not match.')
    return render(request, 'users/register.html')

def UserLogin(request):
     if request.method == 'POST':
          email = request.POST.get('email')
          password = request.POST.get('password')
          user = authenticate(request, username=email, password=password)
          if user is not None:
               login(request,user)
               return redirect('index')
          else:
               print("Invalid Email or Password.")
     return render(request, 'users/login.html')

def index(request):
     return render(request,'users/index.html')