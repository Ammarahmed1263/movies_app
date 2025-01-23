const capitalizeInput = (input: string): string => {
  return input
    .split(' ')
    .map((word: string) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

export default capitalizeInput;