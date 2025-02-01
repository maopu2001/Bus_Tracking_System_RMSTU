export function timeDiff(date: string) {
  console.log(new Date(date));
  let remTime = Math.abs(Date.now() - new Date(date).getTime());
  const diffDays = Math.floor(remTime / (1000 * 60 * 60 * 24));
  remTime = Math.floor(remTime % (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(remTime / (1000 * 60 * 60));
  remTime = Math.floor(remTime % (1000 * 60 * 60));
  const diffMinutes = Math.floor(remTime / (1000 * 60));
  return `${diffDays > 0 ? diffDays + ' days' : ''} ${diffHours > 0 ? diffHours + ' hours' : ''} ${
    diffMinutes > 0 ? diffMinutes + ' minutes' : ''
  }`;
}
