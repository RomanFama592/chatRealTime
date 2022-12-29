function blockLogin(rq, rs, next) {
  //si estas logueado no te da acceso
  if (rq.UserDB !== null) {
    let namePath = rq.path.replace("/", "");
    return rs.render("404", {
      title: namePath,
      error: `no puedes entrar a "${namePath}" sin desloguearte antes`,
      css: [],
      scriptsBefore: [],
      scriptsAfter: [],
    });
  }
  next();
}

function blockLogout(rq, rs, next) {
  //si no estas logueado no te da acceso
  if (rq.UserDB !== null) {
    return next();
  }
  let namePath = rq.path.replace("/", "");
  rs.render("404", {
    title: namePath,
    error: `no puedes entrar a "${namePath}" sin loguearte previamente`,
    css: [],
    scriptsBefore: [],
    scriptsAfter: [],
  });
}
module.exports = [blockLogin, blockLogout];
