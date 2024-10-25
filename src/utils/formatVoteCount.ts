import i18next from "i18next";

export default function formatVoteCount(votes: number): string {
  const conversion = Math.ceil(votes * 10) / 10;

  let result = (conversion + '').replace(".", ",");

  if (!result.includes(',')) {
    result += ',0';
  }

  return votes > 0 ? result : i18next.t('not_rated');
}
