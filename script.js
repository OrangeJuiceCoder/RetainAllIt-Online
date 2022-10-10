//===Variables==//

// amount of cards counter
var crds = 1;

//terms and defs
var trms = [
  // intentionally empty
];

var defs = [
  // intentionally empty
];


//===Onclick Functions==//

// add card
function addcrd() {
  crds++;

  // add card holder div
  crdhldr = document.createElement("div");
  crdhldr.classList.add('card');
  crdhldr.setAttribute('id', 'crd' + crds);
  document.getElementById("cards").appendChild(crdhldr);
  //====================//

  // add term input
  trmin = document.createElement("input");

  trmin.setAttribute('id', 'trmin' + crds);
  trmin.setAttribute('type', 'text');
  trmin.setAttribute('placeholder', 'Term');
  trmin.setAttribute('autocomplete', 'off');
  
  document.getElementById('crd' + crds).appendChild(trmin);
  //====================//
  
  // add def input
  defin = document.createElement("input");

  defin.setAttribute('id', 'defin' + crds);
  defin.setAttribute('type', 'text');
  defin.setAttribute('placeholder', 'Definition');
  defin.setAttribute('autocomplete', 'off');
  
  document.getElementById('crd' + crds).appendChild(defin);
  //====================//
  
  // add delete button
  dBtn = document.createElement("button");
  dBtn.setAttribute('type', 'button');
  dBtn.classList.add('remove');
  dBtn.setAttribute('id', crds);
  dBtn.setAttribute('onclick', 'remvCrd(this.id)')
  dBtn.innerHTML = "Delete Card";
  document.getElementById('crd' + crds).appendChild(dBtn);
  //====================//
}

// remove card
function remvCrd(x) {
  const crd = document.getElementById('crd' + x);
  crd.remove();
}

//===Multiple use functions==//

// get all terms and defs from cards 
function getTDs() {
  for(var i = 1; i <= crds; i++)
  {
    if (document.getElementById('trmin' + i) !== null 
        && document.getElementById('defin' + i) !== null) {
      trms.push(document.getElementById('trmin' + i).value);
      defs.push(document.getElementById('defin' + i).value);
    }
  }
  console.log(trms);
  console.log(defs);
}