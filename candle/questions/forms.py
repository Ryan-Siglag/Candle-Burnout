from django import forms
from .models import QuestionEntry

class SingleQuestionForm(forms.ModelForm):
    class Meta:
        model = QuestionEntry
        fields = ("question", "score")
        widgets = {
            "question": forms.HiddenInput(),
            "score": forms.RadioSelect(),
        }