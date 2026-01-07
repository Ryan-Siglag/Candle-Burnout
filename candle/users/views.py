from django.shortcuts import render, redirect
from .forms import CustomAuthenticationForm, CustomUserCreationForm
from django.contrib.auth import login as auth_login, logout as auth_logout

def register(request):

    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            auth_login(request, form.save())
            return redirect("/questions/inputs")
    else:
        form = CustomUserCreationForm()

    return render(request, "register.html", {"form": form})

def login(request):
    if request.method == "POST":
        form = CustomAuthenticationForm(data=request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            if "next" in request.POST:
                return redirect(request.POST.get("next"))
            return redirect("/questions/inputs")
    else:
        form = CustomAuthenticationForm()
    return render(request, "login.html", {"form": form})

def logout(request):
    if request.method == "POST":
        auth_logout(request)
        return redirect("/users/login")