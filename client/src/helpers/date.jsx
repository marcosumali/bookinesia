function returnWhatDay(dayIndex) {
  switch (dayIndex) {
    case 0:
      return 'sunday'
    case 1:
      return 'monday'
    case 2:
      return 'tuesday'
    case 3:
      return 'wednesday'
    case 4:
      return 'thursday'
    case 5:
      return 'friday'
    case 6:
      return 'saturday'
    default:
      return 'Not found';
  }
}

function getStoreOpenStatus(currentDate, openingDate, closingDate) {
  if (currentDate > openingDate && currentDate < closingDate) {
    return 'open'
  } else {
    return 'close'
  }
}


module.exports = {
  returnWhatDay,
  getStoreOpenStatus
}