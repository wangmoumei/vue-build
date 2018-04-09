function logInHTML() {
  if (arguments.length > 0) {
    let logs = document.getElementById("logs") || (function () {
      let ul = document.createElement("ul");
      ul.id = "logs";
      document.body.appendChild(ul);
      return ul;
    })()
    let li = document.createElement("li"), html = "";
    [...arguments].map(param => {
      if (html.length > 0) html += "<br>"
      html += typeof param == "object" ? JSON.stringify(param) : param;
    })
    li.innerHTML = html;
    logs.appendChild(li);
  }
}