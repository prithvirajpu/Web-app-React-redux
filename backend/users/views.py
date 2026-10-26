from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status,filters
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.filters import SearchFilter

from.serializers import RegisterSerializer,LoginSerializer,UserSerializer,UserProfileSerializer,AdminUserListSerializer,AdminUserUpdateSerializer

User=get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer=RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user=serializer.save()
        refresh=RefreshToken.for_user(user)

        return Response({
            'success':True,
            'user':UserSerializer(user).data,
            'access_token':str(refresh.access_token),
            'refresh':str(refresh)
        },status=status.HTTP_201_CREATED)
    return Response({
        'success':False,
        'errors':serializer.errors
    },status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    user = User.objects.filter(email=email).first()

    if not user:
        return Response(
            {"message": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    if not user.is_active:
        return Response(
            {"message": "User account is blocked"},
            status=status.HTTP_403_FORBIDDEN
        )
    if not user.check_password(password):
        return Response(
            {"message": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    refresh = RefreshToken.for_user(user)

    return Response({
        "success": True,
        "user": UserSerializer(user).data,
        "access_token": str(refresh.access_token),
        "refresh": str(refresh),
        "is_admin": user.is_staff,
    })

class UserProfileView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return self.request.user

class AdminUserViewSet(ModelViewSet):
    serializer_class=AdminUserListSerializer
    permission_classes=[IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']

    def get_queryset(self):
        return User.objects.filter(
            is_staff=False,
            is_superuser=False
        ).order_by('-date_joined')
    def get_serializer_class(self):
        if self.action in ['retrieve', 'update', 'partial_update']:
            return AdminUserUpdateSerializer
        return AdminUserListSerializer