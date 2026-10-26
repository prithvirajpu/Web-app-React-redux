from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator


User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Username already exists")]
    )
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Email already exists")]
    )
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
    
    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class LoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta :
        model= User
        fields = ['id','username','email','is_staff','is_active']

class UserProfileSerializer(serializers.ModelSerializer):
    profile_image=serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            'is_staff',
            'profile_image'
        ]
        read_only_fields = ["id", "email"]

class AdminUserListSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email','is_staff','is_active','date_joined']

class AdminUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'is_active',
        ]
        read_only_fields = ['username']

    def validate_email(self, value):
        user = self.instance
        if User.objects.exclude(id=user.id).filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
