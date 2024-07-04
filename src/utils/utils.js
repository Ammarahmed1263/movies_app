export function stringDuration(durationInSeconds) {
  let hours = Math.floor(durationInSeconds / 60);
  let minutes = durationInSeconds % 60;

  if (!hours && !minutes) {
    return 'Unknown';
  }

  return (hours > 0  ? `${hours}h` : '') + ' ' + (minutes > 0 ? `${minutes} min` : '');
}

export function toVote(votes) {
  let conversion = Math.ceil(votes * 10) / 10;
  let result = (conversion + '').replace(".", ",");

  return votes > 0 ? result : 'NR';
}

export function genderString(genderNumber) {
  const genders = ["Not set / not specified", "Female", "Male", "Non-binary"]

  return genders[genderNumber]
}