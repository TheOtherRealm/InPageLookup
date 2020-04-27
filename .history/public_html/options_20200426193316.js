function saveOptions(e) {
	e.preventDefault();
	browser.storage.sync.set({
		wikipediaKeyCombo: document.querySelector("#wikipediaKeyCombo").value
		wikipediaKeyCombo: document.querySelector("#wikipediaKeyCombo").value
	});
}
function restoreOptions() {
	function setCurrentChoice(result) {
		document.querySelector("#wikipediaKeyCombo").value = result.color || "blue";
	}
	function onError(error) {
		console.log(`Error: ${error}`);
	}
	let getting = browser.storage.sync.get("wikipediaKeyCombo");
	getting.then(setCurrentChoice, onError);
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);