const handleError = error => {
  let Err = null;
  switch (error.response.status) {
    case 401:
      Err = new Error('Invalid Authentication. Check your API key');
      break;
  }
  return Err;
};

export default handleError;
