import datetime
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from questions.models import Entry
from candle.utils import dates_in_same_week

@login_required(login_url="/users/login")
def recent(request):
    current_date = datetime.datetime.now()
    iso_year, iso_week, _ = current_date.isocalendar()
    recent_entry_set = Entry.objects.filter(user=request.user, date__iso_year=iso_year, date__week=iso_week)

    if recent_entry_set.exists():
        recent_entry = recent_entry_set.last()
        return render(request, "recent.html", {'recent_entry': recent_entry})

    return redirect("/questions/inputs")
