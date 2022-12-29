function verifyLogin(dataUser) {
  const response = { validate: false, error: 0 };

  if (!dataUser.username || !dataUser.password) {
    response.validate = false;
    response.error = 5;
    return response;
  }

  if (dataUser.username === "" || dataUser.password === "") {
    response.validate = false;
    response.error = 6;
    return response;
  }

  response.validate = true;
  return response;
}

module.exports = verifyLogin;
