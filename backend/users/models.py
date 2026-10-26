from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    profile_image = CloudinaryField(
        'profile_image',
        folder='profiles',
        blank=True,
        null=True
    )
