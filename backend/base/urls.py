from django.contrib import admin
from django.urls import path,include
from .import views

urlpatterns = [
    path('',views.getRoutes, name ="routes"),
    path('kuruluslar/',views.getKuruluslar, name = "kuruluslar"),
    path('kuruluslar/<str:pk>',views.getKurulus, name = "kurulus"),
    path('user/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/', views.getUsers, name='users'),    
    path('user/register/', views.registerUser, name='register_users'),
    path('user/profile/', views.getUserProfile, name='user-profile'),
    path('user/profile/update/', views.updateUserProfile, name='user-update'),
    path('kuruluslar/delete/<str:pk>/', views.deleteKurulus, name='kurulus-delete'),
    path('user/delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('user/update/<str:pk>/', views.updateUser, name='user-update'),
    path('user/<str:pk>/', views.getUserById, name='user'),
    path('kuruluslar/create/', views.createKurulus, name='create-kurulus'),
    path('kuruluslar/update/<str:pk>/', views.updateKurulus, name='update-kurulus'),
    path('kuruluslar/upload/', views.uploadImage, name='upload-image'),




]
