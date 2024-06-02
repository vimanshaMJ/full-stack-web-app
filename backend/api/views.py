from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

## make view for creating a new note
class NoteListCreate( generics.ListCreateAPIView ):     # ListCreateAPIView: list all notes or create new note
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # cannot call this rout unless you're authenticated and you pass a valid JWT token

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)
# in django, if we want to get the user that is actually authenticated and that is interacting with this rout, write self.request.user

    def perform_create(self, serializer):   #overriding the create method
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)


## make view for deleting a note
class NoteDelete( generics.DestroyAPIView ):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user) 
        


# Create your views here.
class CreateUserView( generics.CreateAPIView ):     # this generics view will atomatically create a new object for us 
    queryset = User.objects.all()  
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
