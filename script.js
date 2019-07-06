let list = [];

createdObject(elm => {
  console.log(elm, list);
  list.push(elm);
  drawList(list);
});

updateObject(elm => {
  console.log(list, elm);
  var index = list.findIndex(function(element) {
    return elm.id === element.id;
  });
  console.log(index);
  list.pop(list);
  list.splice(index, 0, elm);
  drawList(list);
});

deleteObject(elm => {
  console.log(elm, list);
  var index = list.findIndex(function(element) {
    return elm.id === element.id;
  });
  console.log(index);
  list.splice(index, 1);
  drawList(list);
});

const myvar = [
  null,
  undefined,
  function(omg) {
    return console.log("Esto es omg", omg);
  },
  {
    id: elm => console.log("Es un elm", elm)
  },
  " Es un texto para jugar"
];

const myvar2 = {
  uno: "Es uno",
  "dos y tres": "DosyTres"
};

function texto() {
  return "testo para";
}

console.log(myvar);
