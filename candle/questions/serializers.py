from rest_framework import serializers
from .models import Question, QuestionEntry, Entry

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id", "text"]
        extra_kwargs = {"text": {"read_only": True}}

class QuestionEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionEntry
        fields = ['id', 'question', 'score']

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['date', 'cynicism_score', 'exhaustion_score', 'reduced_accomplishment_score', 'total_score']
