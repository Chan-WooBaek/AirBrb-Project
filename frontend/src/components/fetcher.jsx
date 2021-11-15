const myFetch = (method, path, token, body) => {
  console.log('im fetchin');
  const requestOption = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  if (token !== null) {
    requestOption.headers = {
      Authorization: `Bearer ${token}`
    };
    if (body !== null) {
      requestOption.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };
    }
  }

  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5005/${path}`, requestOption)
      .then((response) => {
        if (response.status === 400 || response.status === 403) {
          response.json()
            .then((errorMsg) => {
              reject(errorMsg.error);
            })
        } else if (response.status === 200) {
          response.json()
            .then(data => {
              resolve(data);
            });
        }
      })
      .catch((err) => console.log(err));
  });
}

export default myFetch;
