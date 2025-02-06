const handlePromiseResult = <T>(
  result: PromiseSettledResult<T>,
  onSuccess: (value: T) => void,
  errorMessage: string,
) => {
  if (result.status === 'fulfilled') {
    onSuccess(result.value);
  } else {
    console.log('error occured in promise: ', errorMessage);
  }
};

export default handlePromiseResult;
