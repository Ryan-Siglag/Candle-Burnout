from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist

from questions.models import Entry
from questions.serializers import EntrySerializer
from candle.utils import entry_this_week

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def recent(request):
    '''
    Returns a single most recent entry object for a user (or 403 status)
    '''

    recent_entry = entry_this_week(request.user)
    if recent_entry:
        serializer = EntrySerializer(recent_entry)
        return Response(serializer.data)

    return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def all(request):
    '''
    Returns all entry objects for a user (or 403 status)
    '''

    all_entries = Entry.objects.filter(user=request.user)
    if all_entries:
        serializer = EntrySerializer(all_entries, many=True)
        return Response(serializer.data)

    return Response(status=status.HTTP_403_FORBIDDEN)
