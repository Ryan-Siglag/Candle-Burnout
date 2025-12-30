from django.contrib.auth.forms import AdminUserCreationForm, AuthenticationForm
from .models import CustomUser

class CustomUserCreationForm(AdminUserCreationForm):
    class Meta:
            model = CustomUser
            fields = ("username", "email")

class CustomAuthenticationForm(AuthenticationForm):
      class Meta:
            model = CustomUser