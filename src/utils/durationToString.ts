export default function stringDuration(durationInSeconds: number): string {
  let hours = Math.floor(durationInSeconds / 60);
  let minutes = durationInSeconds % 60;

  if (!hours && !minutes) {
    return 'Unknown';
  }

  return (hours > 0  ? `${hours}h` : '') + ' ' + (minutes > 0 ? `${minutes}min` : '');
}