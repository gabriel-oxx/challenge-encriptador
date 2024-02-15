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

function checkValidity(t) {
  const regex = /^[a-z]*$/;
  return regex.test(t);
}

function showError(input) {
  const label = document.querySelector("label[for='input']");
  const originalLabel = label.textContent;
  label.textContent = "Opa! Você precisa digitar um texto válido!";
  input.style.color = "red";
  input.style.border = "1px solid red";

  setTimeout(() => {
    label.textContent = originalLabel;
    input.style.color = "";
    input.style.border = "";
  }, 3000);
}

function change(t) {
  const div = document.querySelector(".img__top__secret");

  if (!t) {
    div.style.display = "block";
    paragraph.style.display = "none";
  } else {
    div.style.display = "none";
    paragraph.style.display = "block";
    encrypt.setAttribute("disabled", true);
  }
}

function encryptText() {
  const regex = new RegExp(letters.join("|"), "g");
  text = input.value;

  if (checkValidity(text)) {
    input.value = "";
    newText = text.replace(regex, (param) => {
      const index = letters.indexOf(param);
      return correspondence[index];
    });
    change(newText);
    paragraph.innerText = newText;
  } else {
    showError(input);
  }
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
  }, 3000);
}

function coppyText() {
  navigator.clipboard.writeText(newText).then(() => {
    if (newText) showMessage();
  });
}

function clearText() {
  change(newText);
  text = undefined;
  newText = undefined;
  paragraph.innerText = "";
  encrypt.removeAttribute("disabled");
}

encrypt.addEventListener("click", encryptText);
decrypt.addEventListener("click", decryptText);
copy.addEventListener("click", coppyText);
clear.addEventListener("click", clearText);
