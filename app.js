console.log("app.js file working");
shownotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addText = document.getElementById("addText");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addText.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  addTitle.value = "";
  console.log(notes);
  shownotes();
});

function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach((element, index) => {
    html += `<div class="noteCard card mx-2 my-2" style="width: 18rem;">
       <div class="card-body">
         <h5 class="card-title">${element.title}</h5>
         <p class="card-text">${element.text}</p>
         <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">delete</button>
       </div>
   </div>`;
  });
  let notesELm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesELm.innerHTML = html;
  } else {
    notesELm.innerHTML = "Nothing to show anythings! Add notes to see here.";
  }
}

//function to delte note

function deleteNote(index) {
  console.log("deleting item on index", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  shownotes();
}

//Search functionality

search = document.getElementById("searchText");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText;
    if (cardText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
