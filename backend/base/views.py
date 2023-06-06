from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, schema
from base.models import Kurulus
from base.serializer import UserSerializer,UserSerializerWithToken,KurulusSerializer
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated ,IsAdminUser
from rest_framework.decorators import permission_classes
from django.contrib.auth.hashers import make_password
from base.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

   def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v


 
      

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')

@api_view(['GET'])
def getKuruluslar(request):
    kuruluslar = Kurulus.objects.all()
    serializers=KurulusSerializer(kuruluslar, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def getKurulus(request, pk):
    kurulus = Kurulus.objects.get(_id=pk)
    serializers=KurulusSerializer(kurulus, many=False)
    return Response(serializers.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)



@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user= User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password =make_password(data['password']),
            
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except:
        message ={'detail' : 'Username  veya Email Kullanılıyor'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password =make_password(data['password'])
    
    user.save()
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteKurulus(request, pk):
    kurulus = Kurulus.objects.get(_id=pk)
    kurulus.delete()
    return Response('Kurulus silindi..!')

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('user deleted')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer=UserSerializer(users, many=True)
    return Response(serializer.data)





@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createKurulus(request):
    user = request.user

    kurulus = Kurulus.objects.create(
        user=user,
        kurulus_adi='Sample Name',
        kurulus_turu='Sample Category',
        ulke='',
        web_site='',
        calisan_sayisi=0
    )

    serializer = KurulusSerializer(kurulus, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateKurulus(request, pk):
    data = request.data
    kurulus = Kurulus.objects.get(_id=pk)

    kurulus.kurulus_adi = data['kurulus_adi']
    kurulus.kurulus_turu = data['kurulus_turu']
    kurulus.ulke = data['ulke']
    kurulus.web_site = data['web_site']
    kurulus.calisan_sayisi = data['calisan_sayisi']



    kurulus.save()

    serializer = KurulusSerializer(kurulus, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    kurulus_id = data['kurulus_id']
    kurulus = Kurulus.objects.get(_id = kurulus_id)

    kurulus.image = request.FILES.get('image')
    kurulus.save()

    return Response('Resim Yüklendi')