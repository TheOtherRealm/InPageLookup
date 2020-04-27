function saveOptions(e) {
	e.preventDefault();
	browser.storage.sync.set({
		wikipediaKeyCombo: document.querySelector("#wikipediaKeyCombo").value,
		wiktionaryKeyCombo: document.querySelector("#wiktionaryKeyCombo").value
	});
}
function restoreOptions() {
	function setCurrentChoice(result) {
		updateShortcut("getSelectedTionary",document.querySelector("#wikipediaKeyCombo").value);
		updateShortcut("getSelectedTionary",document.querySelector("#wiktionaryKeyCombo").value);
	}
	function onError(error) {
		console.log(`Error: ${error}`);
	}
	let getpedia = browser.storage.sync.get("wikipediaKeyCombo");
	getpedia.then(setCurrentChoice, onError);
	let getionar = browser.storage.sync.get("wiktionaryKeyCombo");
	getionar.then(setCurrentChoice, onError);
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
function updateShortcut(commandName,commandValue) {
	browser.commands.update({
	  name: commandName,
	  shortcut: commandValue
	});
  }