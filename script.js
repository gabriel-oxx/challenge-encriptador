const input = document.querySelector("#input");
const result = document.querySelector("#result");
const encrypt = document.querySelector("#encrypt");
const decrypt = document.querySelector("#decrypt");
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
  result.innerText = newText;
}

function decryptText() {
  const regex = new RegExp(correspondence.join("|"), "g");
  newText = newText.replace(regex, (param) => {
    const index = correspondence.indexOf(param);
    return letters[index];
  });
  result.innerText = newText;
}

encrypt.addEventListener("click", encryptText);
decrypt.addEventListener("click", decryptText);
