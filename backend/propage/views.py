from django.http import HttpResponse
from django.conf import settings

from .models import Propage, ProUser, Posts
from .serializers import PropageSerializer, ProUserSerializer, PostsSerializer
from .permissions import UpdateOwnProUser, CreateOwnPost, UpdateOwnPropage

from rest_framework import status, viewsets, filters, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication 
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from .forms import UserCreationForm

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id, "name": token.user.name})

class PostsViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    queryset = Posts.objects.all().order_by('-created_at')
    serializer_class = PostsSerializer
    permission_classes=(CreateOwnPost, )
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class PropageViewSet(viewsets.ModelViewSet):
    queryset = Propage.objects.all().order_by('-user')
    serializer_class = PropageSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (UpdateOwnPropage, )
    filter_backends = (filters.SearchFilter,)
    search_fields = ('user',)

class RegisterViewSet(viewsets.ModelViewSet):
    serializer_class = ProUserSerializer
    queryset = ProUser.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (UpdateOwnProUser, )
    filter_backends = (filters.SearchFilter,)
    search_fields = ('email','name',)

class LoginViewSet(viewsets.ViewSet):
    serializer_class= AuthTokenSerializer

    def create(self, request):
        return CustomObtainAuthToken().post(request)
