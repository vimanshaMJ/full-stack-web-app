from django.contrib.auth.models import User
from rest_framework import serializers

# ORM - Object Relational Mapping
# ORM: maps python objects to the corresponding code that need to be executed to make a change in the database

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User    # model that we want to serialize as the User model
        fields = ["id", "username", "password"]     # fields that we want to serialize
        extra_kwargs = { "password": { "write_only": True } }   # noone can read the pw

    # implemet a method that call when want to create a new version of the user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
