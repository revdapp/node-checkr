const handleError = error => {
  let Err = null;
  switch (error.response.status) {
    case 401:
      Err = new Error('Invalid Authentication. Check your API key');
      break;
  }
  throw Err;
};

export default handleError;
