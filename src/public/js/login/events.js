//anadir comprobacion de campos basica

document.getElementById("login").addEventListener("click", async () => {
  const response = await fetch("/login", {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: inputUser.value,
      password: inputPassword.value,
    }),
  }).then((value) => value.json().then((value) => value));
  resolveResponse(response);
});

document.getElementById("hiddenPassword").addEventListener("click", () => {
  if (inputPassword.getAttribute("type") == "password") {
    inputPassword.setAttribute("type", "text");
  } else {
    inputPassword.setAttribute("type", "password");
  }
});
