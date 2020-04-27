function saveOptions(e) {
	console.log(e, document.querySelector("#wikipediaKeyCombo").value);
	browser.storage.sync.set({
		wikipediaKeyCombo: document.querySelector("#wikipediaKeyCombo").value,
		wiktionaryKeyCombo: document.querySelector("#wiktionaryKeyCombo").value
	});
	e.preventDefault();
}
function restoreOptions() {
	var storageItem = browser.storage.managed.get('colour');
	storageItem.then((res) => {

	});
	function setCurrentChoice(result) {
		updateShortcut("getSelectedPedia", document.querySelector("#wikipediaKeyCombo").value);
		updateShortcut("getSelectedTionary", document.querySelector("#wiktionaryKeyCombo").value);
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
function updateShortcut(commandName, commandValue) {
	browser.commands.update({
		name: commandName,
		shortcut: commandValue
	});
}