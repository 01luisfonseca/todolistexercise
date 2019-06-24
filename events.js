function launchEvent(name, obj) {
  var event = new CustomEvent(name, {
    detail: obj
  });
  window.dispatchEvent(event);
}

function listenEvent(name, cb) {
  if (typeof cb === "function") {
    window.addEventListener(name, function (data) {
      cb(data.detail);
    });
  }
}