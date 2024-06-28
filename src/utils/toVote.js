function toVote(votes) {
  let conversion = Math.ceil(votes * 10) / 10;
  let result = (conversion + '').replace(".", ",");

  return votes > 0 ? result : 'NR';
}

export default toVote;