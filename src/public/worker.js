console.log("worker funka")

function showNotification() {

  // Verificamos si el usuario ya ha dado permiso para mostrar notificaciones
  if (Notification.permission === "granted") {
    // Si ya tiene permiso, mostramos la notificación
    new Notification("Título de la notificación", {
      body: "Este es el cuerpo de la notificación",
    });
  }

  // Si el usuario no ha dado permiso para mostrar notificaciones, se lo pedimos
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // Si el usuario acepta, mostramos la notificación
      if (permission === "granted") {
        new Notification("Título de la notificación", {
          body: "Este es el cuerpo de la notificación",
        });
      }
    });
  }
}


self.addEventListener('push', event => {
    const data = event.data.json();
    showNotification()
  });