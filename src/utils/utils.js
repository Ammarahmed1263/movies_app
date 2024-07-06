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

export function convertToArabicNumerals(input) {
  const englishToArabic = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    ',': '٫'
  };

  return input.replace(/[0-9,]/g, (digit) => englishToArabic[digit]);
}