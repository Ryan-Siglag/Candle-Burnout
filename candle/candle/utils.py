import datetime
from questions.models import Entry

def entry_this_week(current_user):
    current_date = datetime.datetime.now()
    iso_year, iso_week, _ = current_date.isocalendar()
    recent_entry_set = Entry.objects.filter(user=current_user, date__iso_year=iso_year, date__week=iso_week)
    
    print(current_user)
    print(recent_entry_set)

    if recent_entry_set.exists():
        return recent_entry_set.last()
    return None