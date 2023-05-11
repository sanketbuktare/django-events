from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate


# Create your views here.

# API to get all events (both global and user-specific), to create new event and to delete an event
class EventView(APIView):
    def get(self, request):
        # Implement your custom logic here
        user_id = request.query_params.get('user_id')
        if (user_id):
            events = Event.objects.filter(created_by=user_id)
            serializer = EventDetailSerializer(events, many=True)
            return Response(serializer.data)
        events = Event.objects.all()
        serializer = EventDetailSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, event_id):
        try:
            print(event_id)
            event = Event.objects.get(id=event_id)
            event.delete()
            return Response({'message': 'Event deleted successfully'})
        except Event.DoesNotExist:
            return Response({'message': 'Event not found'}, status=404)

# Signup API


class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login API


class LoginView(APIView):
    def post(self, request):
        try:
            serializer = LoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = User.objects.get(password=password, username=username)
            res = vars(user)
            res_data = {'firstName': res['first_name'],
                        'lastName': res['last_name'],
                        'username': res['username'],
                        'id': res['id']}

            if user is not None:
                # Authentication successful
                # Perform additional actions if needed
                return Response(res_data)
            else:
                # Authentication failed
                return Response({'message': 'Invalid username or password'}, status=401)

        except LikesMapping.DoesNotExist:
            return Response({'message': 'LikesMapping not found'}, status=status.HTTP_404_NOT_FOUND)


# API to add mapping and delete mapping of user and event
class FavoriteView(APIView):
    # def get(self, request):
    #     events = LikesMapping.objects.filter()
    def post(self, request):
        serializer = LikesMappingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "Mapping successful"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            serializer = LikesMappingSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            event = serializer.validated_data['event']
            user = serializer.validated_data['user']

            like_mapping = LikesMapping.objects.filter(user=user, event=event)

            if like_mapping is not None:
                like_mapping.delete()
                return Response({'message': "Mapping deleted"})
            else:
                return Response({'message': 'Error'}, status=401)

        except LikesMapping.DoesNotExist:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API to get the liked events


class LikedEventsView(APIView):
    def get(self, request, user_id):
        liked_event_ids = LikesMapping.objects.filter(
            user=user_id).values_list('event', flat=True)
        liked_events = Event.objects.filter(id__in=liked_event_ids)
        serializer = EventDetailSerializer(liked_events, many=True)
        return Response(serializer.data)
