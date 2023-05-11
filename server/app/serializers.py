from rest_framework import serializers
from .models import *


class EventSerializer(serializers.ModelSerializer):
    # liked_by = serializers.ReadOnlyField()
    class Meta:
        model = Event
        fields = '__all__'
        # exclude = ('liked_by',)


class EventDetailSerializer(serializers.ModelSerializer):
    liked_by = serializers.SerializerMethodField()

    def get_liked_by(self, event):
        mappings = LikesMapping.objects.filter(event=event)
        liked_users = mappings.values_list('user', flat=True)
        return liked_users
    
    class Meta:
        model = Event
        fields = ('id', 'event_name', 'date',
                  'time', 'description', 'location', 'image', 'created_by', 'liked_by')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',
                  'username', 'password')


class LikesMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikesMapping
        fields = ('id', 'user', 'event',
                  'is_liked')


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
