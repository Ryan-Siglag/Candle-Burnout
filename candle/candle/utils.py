import datetime
from questions.models import Entry

def entry_this_week(current_user):
    '''
    Given a user, returns either the object containing an entry from the current week
    or None if no such object exists
    '''

    current_date = datetime.datetime.now()
    iso_year, iso_week, _ = current_date.isocalendar()
    recent_entry_set = Entry.objects.filter(user=current_user, date__iso_year=iso_year, date__week=iso_week)

    if recent_entry_set.exists():
        return recent_entry_set.last()
    return None