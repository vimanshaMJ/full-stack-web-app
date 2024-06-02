from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# inside the models we defind the python version of our models which specify the type of fields, 
# then django automatically map and add the corresponding tables rows in our database

class Note( models.Model ):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    # author is specifying who made this note:

    def __str__(self):
        return self.title
       