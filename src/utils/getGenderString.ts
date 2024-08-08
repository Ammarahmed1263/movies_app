export default function getGenderString(genderNumber: number): string {
  const genders: string[] = ["Not set / not specified", "Female", "Male", "Non-binary"];
  return genders[genderNumber] || 'Unknown';
}
