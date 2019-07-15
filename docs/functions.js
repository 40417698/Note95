

function changeFace(face) {
  var faces = ["normal.png", "left.png", "right.png", "angry.png", "smile.png"]
  face.src = "images/face/" + faces[Math.floor(Math.random() * 3)]
}

function printSentence(element){
  var quotes = [
    "Highlight some text and press one of the 'text effect' buttons on the sidebar to apply formatting to your notes.",
    "Press the 'Centre' button to bring all your windows back into the screen incase you lose one.",
    "Press the 'Clear' button if you have too many windows cluttering up your screen.",
    "Press the 'Pin' button in the top right of a note to prevent it being cleared by the 'Clear' button.",
    "Click on a notes name to rename it.",
    "Click and Drag the bottom right corner of a note to resize it.",
    "Drag the blue part of a windows header to move it around the screen.",
    "Note 95 is in no way affiliated with the Microsoft Corperation."
  ]
  var sentence = quotes[Math.floor(Math.random() * quotes.length)]
  element.innerHTML=''
  for(var i = 0; i < sentence.length; i++){
    (function(index) {
      setTimeout(function() {
        element.innerHTML+=sentence[index];
      }, 100 * i);
    })(i);
  }
}

function help() {
  var newdiv = document.createElement("div");
  var basediv = document.getElementById("basehelp");
  newdiv.innerHTML = basediv.innerHTML;
  newdiv.style.display = "block";
  newdiv.classList.add("dragable")
  newdiv.classList.add("deleteable")
  newdiv.style.maxWidth = "300px"
  dragElement(newdiv)
  newdiv.style.top = Math.floor(Math.random() * 600) + "px"
  newdiv.style.left = Math.floor(Math.random() * 1250) + 160 + "px"
  document.body.appendChild(newdiv)
  setInterval(changeFace, 1000, newdiv.getElementsByClassName("faceimg")[0])
  printSentence(newdiv.getElementsByClassName("helptext")[0])
  setInterval(printSentence, 15000, newdiv.getElementsByClassName("helptext")[0])
}

function openNote() {
  var newdiv = document.createElement("div");
  var basediv = document.getElementById("basenote");
  newdiv.innerHTML = basediv.innerHTML;
  newdiv.style.display = "block";
  newdiv.classList.add("dragable")
  newdiv.classList.add("deleteable")
  dragElement(newdiv)
  newdiv.style.top = Math.floor(Math.random() * 600) + "px"
  newdiv.style.left = Math.floor(Math.random() * 1250) + 160 + "px"
  document.body.appendChild(newdiv)
}

function pinWindow(element) {
  element.classList.remove("deleteable")
}

function closeWindow(element) {
  document.body.removeChild(element.parentElement.parentElement.parentElement.parentElement)
}

function login() {
  var username = document.getElementById("loginbox").value
  if (username != "") {
    document.getElementById("loginbox").value = ""
    document.getElementById("usernamedisplay").innerHTML = username
    document.getElementById('loggedin').style.display="block";
    document.getElementById('loggedout').style.display="none";
  }
}

function logout() {
  document.getElementById('loggedin').style.display="none";
  document.getElementById('loggedout').style.display="block";
}

function minimiseToggle(element) {
  if (element.style.display == "none") {
    element.style.display = "block"
  } else {
    element.style.display = "none"
  }
}

function clearWindows() {
  while (document.body.getElementsByClassName("deleteable").length > 0) {
    document.body.removeChild(document.body.getElementsByClassName("deleteable")[0])
  }
}

function rename(element) {
  window.renamenote = element
  document.getElementById("blocker").style.display = "block"
  var newdiv = document.createElement("div");
  var basediv = document.getElementById("baserename");
  newdiv.innerHTML = basediv.innerHTML;
  newdiv.style.display = "block";
  newdiv.style.zIndex = "10"
  newdiv.classList.add("dragable")
  newdiv.classList.add("deletablerename")
  dragElement(newdiv)
  newdiv.style.top = Math.floor(Math.random() * 600) + "px"
  newdiv.style.left = Math.floor(Math.random() * 1250) + 160 + "px"
  document.body.appendChild(newdiv)
}

function renamed(newname) {
  if (newname != "") {
    window.renamenote.innerHTML = '<a href="#" style="text-decoration: none; color: #ffffff;"><u>'+newname.substring(0,1)+"</u>"+newname.substring(1)+'</a>'
    document.getElementById("blocker").style.display = "none"
    document.body.removeChild(document.getElementsByClassName("deletablerename")[0])
  } else {
    document.getElementsByClassName("deletablerename")[0].getElementsByClassName("renametext")[0].placeholder = "Required..."
  }
}

function cancelRename() {
  document.getElementById("blocker").style.display = "none";
  document.body.removeChild(document.getElementsByClassName('deletablerename')[0])
}

function centreWindows() {
  var windows = document.body.getElementsByClassName("dragable")
  for (var i = 0; i < windows.length; i++) {
    windows[i].style.top = Math.floor(Math.random() * 50) + 300 + "px"
    windows[i].style.left = Math.floor(Math.random() * 50) + 300 + "px"
  }
}

function dragElements(dragclass) {
  var elements = document.getElementsByClassName(dragclass)
  for (var i = 0; i < elements.length; i++) {
    dragElement(elements[i])
  }
}

function dragElement(element) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  element.querySelector(".dragableheader").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
