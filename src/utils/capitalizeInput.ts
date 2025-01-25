const capitalizeInput = (input: string): string => {
  if (input.length === 0) 
    return '';

  return input
    .split(' ')
    .map((word: string) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

export default capitalizeInput;