const input = document.querySelector("#input");
const paragraph = document.querySelector("#paragraph");
const encrypt = document.querySelector("#encrypt");
const decrypt = document.querySelector("#decrypt");
const clear = document.querySelector("#clear");
const coppy = document.querySelector("#coppy");
const letters = ["a", "e", "i", "o", "u"];
const correspondence = ["ai", "enter", "imes", "ober", "ufat"];
let text;
let newText;

function encryptText() {
  const regex = new RegExp(letters.join("|"), "g");
  text = input.value;
  input.value = "";
  newText = text.replace(regex, (param) => {
    const index = letters.indexOf(param);
    return correspondence[index];
  });
  paragraph.innerText = newText;
}

function decryptText() {
  const regex = new RegExp(correspondence.join("|"), "g");
  newText = newText.replace(regex, (param) => {
    const index = correspondence.indexOf(param);
    return letters[index];
  });
  paragraph.innerText = newText;
}

function showMessage() {
  const content = document.querySelector("#content");
  const p = document.createElement("p");
  p.innerText = "O texto foi copiado da área de transferência";
  p.classList.add("toast");
  p.classList.add("active");
  content.appendChild(p);
  setTimeout(() => {
    p.classList.remove("toast");
    p.classList.remove("active");
    content.removeChild(p);
  }, 5000*10);
}

function coppyText() {
  navigator.clipboard.writeText(newText).then(() => {
    if (newText) showMessage();
  });
}

function clearText() {
  paragraph.innerText = "";
}

encrypt.addEventListener("click", encryptText);
decrypt.addEventListener("click", decryptText);
coppy.addEventListener("click", coppyText);
clear.addEventListener("click", clearText);
