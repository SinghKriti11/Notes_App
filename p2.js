const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

const colors = [
    "#cdb4db",
    "#bde0fe",
    "#eecfed",
    "#d1c4e9",
    "#9edee7",
    "#ffe5ec",
    "#b8c0ff"
];

function showNotes(){
    const saved = localStorage.getItem("notes");
    if(saved){
        notesContainer.innerHTML = saved;
    }
}
function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}
function fixOldNotes(){
    const notes = document.querySelectorAll(".input-box");

    notes.forEach(note => {
       
        if(!note.querySelector(".note-text")){
            let text = document.createElement("div");
            text.className = "note-text";
            text.setAttribute("contenteditable","true");

            text.innerText = note.innerText;

            note.innerHTML = "";
            note.appendChild(text);
        }

        if(!note.querySelector("small")){
            let time = document.createElement("small");
            time.innerText = new Date().toLocaleString();
            note.appendChild(time);
        }
        if(!note.querySelector("img")){
            let img = document.createElement("img");
            img.src = "./delete.png";
            note.appendChild(img);
        }
    });
}

showNotes();
fixOldNotes();

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("div");
    let text = document.createElement("div");
    let img = document.createElement("img");
    let time = document.createElement("small");

    inputBox.className = "input-box";
    text.className = "note-text";
    text.setAttribute("contenteditable", "true");

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    inputBox.style.backgroundColor = randomColor;

    img.src = "./delete.png";

    time.innerText = new Date().toLocaleString();

    inputBox.appendChild(text);
    inputBox.appendChild(time);
    inputBox.appendChild(img);

    notesContainer.appendChild(inputBox);

    text.focus();

    updateStorage();
});


notesContainer.addEventListener("click", function(e){
    if(e.target.closest("img")){
        e.target.closest(".input-box").remove();
        updateStorage();
    }
});


let timeout;
notesContainer.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(updateStorage, 300);
});