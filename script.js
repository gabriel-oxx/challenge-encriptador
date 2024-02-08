const input = document.querySelector("#input");
const result = document.querySelector("#result");
const encrypt = document.querySelector("#encrypt");
const decrypt = document.querySelector("#decrypt");

function encryptText() {
	const letters = ["a", "e", "i", "o", "u"];
	const correspondence = ["ai", "enter", "imes", "ober", "ufat"];

	const text = input.value;
	let newText = text;
	const regex = new RegExp(letters.join("|"), "g");

	newText = text.replace(regex, (param) => {
		const index = letters.indexOf(param);
		return correspondence[index];
	});
	input.value="";
	console.log(newText);
}

encrypt.addEventListener("click", encryptText);
