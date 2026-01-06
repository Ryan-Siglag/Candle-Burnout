from rest_framework import serializers
from .models import Question, QuestionEntry

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id", "text"]
        extra_kwargs = {"text": {"read_only": True}}

class QuestionEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionEntry
        fields = ['id', 'question', 'score']
        # read_only_fields = ['id']

# class ManyQuestionEntrySerializer(serializers.Serializer):
#     entries = QuestionEntrySerializer(many=True)
    
#     def create(self, validated_data):
#         entries_data = validated_data.get('entries', [])
#         created_entries = []
        
#         for entry_data in entries_data:
#             entry = QuestionEntry.objects.create(**entry_data)
#             created_entries.append(entry)
        
#         return {'entries': created_entries}