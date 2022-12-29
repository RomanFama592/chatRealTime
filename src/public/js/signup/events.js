//anadir comprobacion de campos basica

document.getElementById("signup").addEventListener("click", async () => {
  if (inputPassword.value != inputPasswordConfirm.value) {
    return resolveResponse({ validate: false, error: 3 });
  }

  const response = await fetch("/signup", {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: inputUser.value,
      password: inputPassword.value,
      passwordConfirm: inputPasswordConfirm.value,
    }),
  }).then((value) => value.json().then((value) => value));

  return resolveResponse(response);
});

document.getElementById("hiddenPassword").addEventListener("click", () => {
  if (inputPassword.getAttribute("type") == "password") {
    inputPassword.setAttribute("type", "text");
    inputPasswordConfirm.setAttribute("type", "text");
  } else {
    inputPassword.setAttribute("type", "password");
    inputPasswordConfirm.setAttribute("type", "password");
  }
});
