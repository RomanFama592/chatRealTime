function verifyRegister(dataUser) {
  const response = { validate: false, error: 0 };

  if (!dataUser.username || !dataUser.password || !dataUser.passwordConfirm) {
    response.validate = false;
    response.error = 1;
    return response;
  }

  if (
    dataUser.username === "" ||
    dataUser.password === "" ||
    dataUser.passwordConfirm === ""
  ) {
    response.validate = false;
    response.error = 2;
    return response;
  }

  response.validate = true;
  return response;
}

module.exports = verifyRegister;
