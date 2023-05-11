from django.urls import path, include
from .views import *

urlpatterns = [
    path('events/', EventView.as_view()),
    path('events/<int:event_id>/', EventView.as_view()),
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
    path('liked-events/<int:user_id>/', LikedEventsView.as_view()),
    path('like-event/', FavoriteView.as_view()),
]