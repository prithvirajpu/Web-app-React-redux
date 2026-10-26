from django.urls import path
from .views import register, login, UserProfileView, AdminUserViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('admin/users', AdminUserViewSet, basename='admin-users')

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls
