from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from questions.models import Entry
from candle.utils import entry_this_week

@login_required(login_url="/users/login")
def recent(request):
    recent_entry = entry_this_week(request.user)

    if recent_entry:
        return render(request, "recent.html", {'recent_entry': recent_entry})

    return redirect("/questions/inputs")

@login_required(login_url="/users/login")
def all(request):
    all_entries = Entry.objects.filter(user=request.user)

    if all_entries.exists():
        return render(request, "all.html", {'all_entries': all_entries})

    return redirect("/questions/inputs")