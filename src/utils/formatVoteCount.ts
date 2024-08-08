export default function formatVoteCount(votes: number): string {
  const conversion = Math.ceil(votes * 10) / 10;
  const result = (conversion + '').replace(".", ",");

  return votes > 0 ? result : 'NR';
}
