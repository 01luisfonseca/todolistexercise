(function (w, d) {
  // Events
  d.getElementById("createForm").addEventListener("submit", createTask);

})(window, document)

function createTask(ev) {
  ev.preventDefault();
  const inputValue = document.forms["createForm"]["task"].value
  if (inputValue) {
    launchEvent("createdTask", {
      id: Date.now(),
      task: inputValue
    });
  }
}

function createdObject (callback) {
  if (typeof callback === "function") {
    listenEvent("createdTask", function(ev){ callback(ev); });
  }
};

function updateObject (callback) {
  if (typeof callback === "function") {
    listenEvent("editTask", function(ev){ callback(ev); });
  }
};

function deleteObject (callback) {
  if (typeof callback === "function") {
    listenEvent("deleteTask", function(ev){ callback(ev); });
  }
};

function drawList(arr) {
  if (Array.isArray(arr)) {
    const tableBody = document.querySelector("#listTask tbody")
    tableBody.innerHTML = "";
    let text = ''
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      text += '<tr>'
      text += '<td id="info_' + element.id + '">'
      text += '<span>' + element.task + '</span>'
      text += '\
      <div class="field">\
        <div class="control">\
          <input style="display: none;" class="input is-small" type="text" placeholder="Describa la actividad" name="task" value="' + element.task + '">\
        </div>\
      </div>'
      text += '<div class="field is-grouped">'
      text += '<p class="control">'
      text += '<button class="button is-info is-small ok" style="display: none;">Actualiza</button>'
      text += '</p>'
      text += '<p class="control">'
      text += '<button class="button is-warning is-outlined is-small close" style="display: none;">Volver</button>'
      text += '</p>'
      text += '</div>'
      text += '</td>'
      text += '<td>'
      text += '<div class="field is-grouped">'
      text += '<p class="control">'
      text += '<button id="taske_' + element.id + '" class="button is-info is-small editbutton">Editar</button>'
      text += '</p>'
      text += '<p class="control">'
      text += '<button id="taskd_' + element.id + '" class="button is-danger is-small deletebutton">Eliminar</button>'
      text += '</p>'
      text += '</div>'
      text += '</td>'
      text += '</tr>'
    }
    tableBody.insertAdjacentHTML('afterbegin', text)
    addListeners()
  }

  function addListeners () {
    const elements = document.querySelectorAll("#listTask .editbutton")
    for (const elm of elements) {
      elm.removeEventListener("click", () => {})
      elm.addEventListener("click", ev => {
        const id = ev.target.id.substring(6)
        const ok = document.querySelector("#info_" + id + " .ok")
        const close = document.querySelector("#info_" + id + " .close")
        listChanger(id, true)
        hideButtons(id, true)

        ok.removeEventListener("click", () => {})
        ok.addEventListener("click", (evOk) => {
          ok.removeEventListener("click", () => {})
          close.removeEventListener("click", () => {})
          const input = document.querySelector("#info_" + id + " input")
          listChanger(id, false)
          hideButtons(id, false)
          launchEvent("editTask", {
            id: Number(id),
            task: input.value
          });
        })

        close.removeEventListener("click", () => {})
        close.addEventListener("click", (evOk) => {
          ok.removeEventListener("click", () => {})
          close.removeEventListener("click", () => {})
          listChanger(id, false)
          hideButtons(id, false)
        })
      })
    }

    const elementsdel = document.querySelectorAll("#listTask .deletebutton")
    for (const elm of elementsdel) {
      elm.removeEventListener("click", () => {})
      elm.addEventListener("click", ev => {
        launchEvent("deleteTask", {
          id: Number(ev.target.id.substring(6))
        });
      })
    }
  }
}

function listChanger (id, state) {
  const input = document.querySelector("#info_" + id + " input")
  const span = document.querySelector("#info_" + id + " span")
  if (state) {
    input.style.display = 'inline-flex'
    span.style.display = 'none'
  } else {
    input.style.display = 'none'
    span.style.display = 'inline'
  }
}

function hideButtons (id, state) {
  const edit = document.getElementById("taske_" + id)
  const remove = document.getElementById("taskd_" + id)
  const ok = document.querySelector("#info_" + id + " .ok")
  const close = document.querySelector("#info_" + id + " .close")
  if (state) {
    edit.style.display = 'none'
    remove.style.display = 'none'
    ok.style.display = 'inline-flex'
    close.style.display = 'inline-flex'
  } else {
    edit.style.display = 'inline-flex'
    remove.style.display = 'inline-flex'
    ok.style.display = 'none'
    close.style.display = 'none'
  }
}