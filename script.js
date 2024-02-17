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
let isDivVisible = true;
clear.setAttribute("disabled", true);

function checkValidity(t) {
  const regex = /^[a-z ]*$/;
  return t == "" ? false : regex.test(t);
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

function change(bool) {
  const div = document.querySelector(".img__top__secret");

  if (bool == true) {
    div.style.display = "none";
    paragraph.style.display = "block";
    isDivVisible = false;
    encrypt.setAttribute("disabled", true);
  } else {
    div.style.display = "block";
    paragraph.style.display = "none";
    isDivVisible = true;
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
    paragraph.innerText = newText;
    change(isDivVisible);
    clear.removeAttribute("disabled");
  } else {
    showError(input);
  }
}

function decryptText() {
  const regex = new RegExp(correspondence.join("|"), "g");
  text = input.value;

  if (checkValidity(text)) {
    input.value = "";
    newText = text.replace(regex, (param) => {
      const index = correspondence.indexOf(param);
      return letters[index];
    });
    paragraph.innerText = newText;
    change(isDivVisible);
    clear.removeAttribute("disabled");
  } else {
    showError(input);
  }
}

function showMessage(m) {
  const content = document.querySelector("#content");
  const p = document.createElement("p");
  p.innerText = m;
  p.setAttribute("role", "alert");
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
  let messageSuccess = "O texto foi copiado para área de transferência";
  let messageError = "Não há nada para copiar";
  navigator.clipboard.writeText(newText).then(() => {
    if (newText) showMessage(messageSuccess);
    else showMessage(messageError);
  });
}

function reset() {
  change(isDivVisible);
  text = undefined;
  newText = undefined;
  paragraph.innerText = "";
  encrypt.removeAttribute("disabled");
  clear.setAttribute("disabled", true);
}

encrypt.addEventListener("click", encryptText);
decrypt.addEventListener("click", decryptText);
copy.addEventListener("click", coppyText);
clear.addEventListener("click", reset);
