from django.urls import path

from . import views

app_name = 'map_inspector'

urlpatterns = [
    path('', views.index, name='index'),
    path('polygon/', views.polygon, name='polygon')
]