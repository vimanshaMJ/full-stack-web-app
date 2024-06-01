from django.contrib.auth.models import User
from rest_framework import serializers

# ORM - Object Relational Mapping
# ORM: maps python objects to the corresponding code that need to be executed to make a change in the database

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User    # model that we want to serialize as the User model
        fields = ["id", "username", "password"]     # fields that we want to serialize
