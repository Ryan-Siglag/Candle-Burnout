def shift_range(number, old_low, old_high, new_low, new_high):
    return (((number - old_low) * (new_high - new_low)) / (old_high - old_low)) + new_low