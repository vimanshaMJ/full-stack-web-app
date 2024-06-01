from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView( generics.CreateAPIView ):     # this generics view will atomatically create a new object for us 
    queryset = User.objects.all()  
    serializer_class = User
    permission_classes = [AllowAny]
