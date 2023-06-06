from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Kurulus(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    kurulus_adi = models.CharField(max_length=200, null=True, blank=True)
    kurulus_logo= models.ImageField(null=True, blank=True, default='/placeholder.png')
    kurulus_turu=models.CharField(max_length=200, null=True, blank=True)
    ulke=models.CharField(max_length=200, null=True, blank=True)
    web_site =models.TextField(null=True, blank=True)
    calisan_sayisi =models.IntegerField(null=True, blank=True, default=0)
    _id =models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        return self.kurulus_adi
    

class Takip(models.Model):
    takip = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)  
    kurulus_adi = models.CharField(max_length=200, null=True, blank=True)
    kurulus_logo= models.ImageField(null=True, blank=True, default='/placeholder.png')
    kurulus_turu=models.CharField(max_length=200, null=True, blank=True)
    ulke=models.CharField(max_length=200, null=True, blank=True)
    web_site =models.TextField(null=True, blank=True)
    calisan_sayisi =models.IntegerField(null=True, blank=True, default=0)
    _id =models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.kurulus_adi