//===Variables==//

// amount of cards counter
var crds = 1;

// study mode length
var mode = "sml";

//terms and defs
var trms = [
  // intentionally empty
];

var defs = [
  // intentionally empty
];

// global storage of current queston
var randIndx = 0;
var question = "This is a Placeholder.";
var answer = "This is a Placeholder.";

// global storage of current correct answer


// global storage of random term picked



//===Onclick Functions==//

// add card
function addcrd(t, d) {
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
  if (t !== undefined)
    document.getElementById('trmin' + crds).value = t;
  //====================//
  
  // add def input
  defin = document.createElement("input");

  defin.setAttribute('id', 'defin' + crds);
  defin.setAttribute('type', 'text');
  defin.setAttribute('placeholder', 'Definition');
  defin.setAttribute('autocomplete', 'off');
  document.getElementById('crd' + crds).appendChild(defin);
  if (d !== undefined)
    document.getElementById('defin' + crds).value = d;
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

// download study set
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
document.getElementById("export").addEventListener("click", function(){
    getTDs();
    // Generate download of hello.txt file with some content
    var text = trms + "\n" + defs;
    var filename = "studyset.retainAllIt";
    
    download(filename, text);
    trms.length = 0;
    defs.length = 0;
}, false);

// file upload
document.getElementById('file-upload')
  .addEventListener('change', getFile)

function getFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
	  placeFileContent(input.files[0])
  }
}

function placeFileContent(file) {
	readFileContent(file).then(content => {
    console.log(content);
    
    var index = content.indexOf("\n");
    var trmstr = content.substr(0, index);
    var defstr = content.substr(index + 1);
    var trmsarr = trmstr.split(",");
    var defsarr = defstr.split(",");

    console.log(trmsarr);
    console.log(defsarr);

    createCards(trmsarr, defsarr);
    
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

// add cards using given terms and defs
function createCards(tarr, darr)
{
  for (var i = 0; i < tarr.length; i++)
  {
    addcrd(tarr[i], darr[i]);    
  }
}

// start
function start() {
  getTDs();
  var rds = document.getElementsByName('switch');   
  for(var i = 0; i < rds.length; i++) {
    if (rds[i].checked)
      mode = rds[i].value;
  }
  console.log(mode);
  
  createQuizPage();
}

//<div class = "animated fadeInDown">
function createQuizPage() {
  // clear document
  document.body.innerHTML = "";
  
  // create card holder
  qCard = document.createElement("div");
  qCard.classList.add('qCard');
  qCard.classList.add('animated');
  qCard.classList.add('fadeInDown');
  qCard.setAttribute('id', 'qCrd');
  document.body.appendChild(qCard);

  randIndx =  parseInt(Math.random()*trms.length);
  question = trms[randIndx];
  answer = defs[randIndx];

  questionText = document.createElement("h1");
  questionText.setAttribute('class', 'spaceh1');
  questionText.innerHTML = question;  
  document.getElementById('qCrd').appendChild(questionText);

  //<input id = "ans" type="text" placeholder="Enter Answer Here" autocomplete="off">
  ansrBx = document.createElement("input");
  ansrBx.setAttribute('id', 'ans');
  ansrBx.setAttribute('type', 'text');
  ansrBx.setAttribute('class', 'ansr');
  ansrBx.setAttribute('placeholder', 'Enter Answer Here!');
  ansrBx.setAttribute('autocomplete', 'off');
  document.getElementById('qCrd').appendChild(ansrBx);

  //<button class = "add" type = "button" id="submitAns" onclick="submitAns()">Submit</button>
  ansrBttn = document.createElement("button");
  ansrBttn.setAttribute('class', 'submit');
  ansrBttn.setAttribute('type', 'button');
  ansrBttn.setAttribute('id', 'submitAns');
  ansrBttn.setAttribute('onclick', 'submitAns()');
  ansrBttn.innerHTML = "Submit";
  document.getElementById('qCrd').appendChild(ansrBttn);
}

function submitAns() {
  if (document.getElementById('ans') !== null)
  {
    var submittedAns = document.getElementById('ans').value;
    if (submittedAns === answer)
    {
      createQuizPage();
    }
    else
    {
      if (document.getElementById('wrong') !== null) {
        document.getElementById('wrong').remove();
      }
      wrong = document.createElement("p");
      wrong.setAttribute('id', 'wrong');
      wrong.innerHTML = "You're Wrong!  Try again!";  
      document.getElementById('qCrd').appendChild(wrong);
    }
  }
    
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