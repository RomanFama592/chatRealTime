function resolveResponse(response) {
  if (response.validate) {
    return window.location.href = "/";
  }
  if (response.error <= 0) {
    //error desconocido
    showError("0")
  }
  if (response.error == 1) {
    //error respuesta invalida
    showError("no estas mandando los datos necesarios")
  }
  if (response.error == 2) {
    //error alguno de los campos estan vacios(ver si hago que sepa cual exactamente)
    showError("algunos de los campos se encuentran vacios")
  }
  if (response.error == 3) {
    //error passwordConfirm no es identica a password
    showError("las contraseñas no coinciden")
  }
  if (response.error == 4) {
    //error user ya registrado
    showError("Usuario ya registrado")
  }
}

function showError(text) {
  messageError.setAttribute("hidden", "")
  messageError.innerHTML = text;
  messageError.removeAttribute("hidden");
  setTimeout(() => {
    messageError.setAttribute("hidden", "");
  }, 2000);
}
