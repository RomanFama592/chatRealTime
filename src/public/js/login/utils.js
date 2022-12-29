function resolveResponse(response) {
  if (response.validate) {
    return window.location.href = "/";
  }

  if (response.error <= 0) {
    //error desconocido
    return showError("0");
  }

  if (response.error == 5) {
    //error respuesta invalida
    return showError("no estas mandando los datos necesarios");
  }

  if (response.error == 6) {
    //error alguno de los campos estan vacios(ver si hago que sepa cual exactamente)
    return showError("algunos de los campos se encuentran vacios");
  }

  if (response.error == 7) {
    //error el usuario o la contraseña son incorrectas
    return showError("el usuario o la contraseña son incorrectas");
  }
}

function showError(text) {
  messageError.innerHTML = text;
  messageError.removeAttribute("hidden");
  setTimeout(() => {
    messageError.setAttribute("hidden", "");
  }, 2000);
}
