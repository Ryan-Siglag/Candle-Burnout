import datetime

def dates_in_same_week(date1, date2):
  # Ensure the inputs are date objects, if they are datetime objects
  if isinstance(date1, datetime):
    date1 = date1.date()
  if isinstance(date2, datetime):
    date2 = date2.date()

  # Get the ISO year and week number for both dates
  iso_year1, iso_week1, _ = date1.isocalendar()
  iso_year2, iso_week2, _ = date2.isocalendar()

  # Compare the year and week number
  return iso_year1 == iso_year2 and iso_week1 == iso_week2