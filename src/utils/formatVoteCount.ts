import i18next from "i18next";

export default function formatVoteCount(votes: number, t: (key: string) => string): string {

  const conversion = Math.ceil(votes * 10) / 10;
  const result = (conversion + '').replace(".", ",");

  return votes > 0 ? result : i18next.t('not rated');
}
