export const formatDate = (date: string, withoutHours=false) => {
  const currentDate = new Date();
  
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate() - 1);

  const compareDate = new Date(date);

  if (
    compareDate.getDate() === yesterdayDate.getDate() &&
    compareDate.getMonth() === yesterdayDate.getMonth() &&
    compareDate.getFullYear() === yesterdayDate.getFullYear()
  ) {
    return "Yesterday";
  }

  const beforeYesterdayDate = new Date(currentDate);
  beforeYesterdayDate.setDate(currentDate.getDate() - 2);

  if (compareDate < beforeYesterdayDate) {
    const month = compareDate.getMonth() + 1;
    const day = compareDate.getDate();
    const year = compareDate.getFullYear();
    return `${month}/${day}/${year}`;
  }
  
  if(withoutHours) {
    return "Today"
  }

  return dateToTime(compareDate)
}

export const dateToTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export const compareDate = (string1: string, string2: string) => {
  const date1 = new Date(string1)
  const date2 = new Date(string2)
  if(date1.getDate() === date2.getDate() && 
    date1.getMonth() === date2.getMonth() && 
    date1.getFullYear() === date2.getFullYear()) {
    return true
  }
  return false
}
