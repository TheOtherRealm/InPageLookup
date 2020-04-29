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
/**
 * Update the UI: set the value of the shortcut textbox.
 */
async function updateUI() {
	let commands = await browser.commands.getAll();
	for (command of commands) {
		if (command.name === commandName) {
			document.querySelector('#shortcut').value = command.shortcut;
		}
	}
}
/**
 * Update the shortcut based on the value in the textbox.
 */
async function updateShortcut() {
	await browser.commands.update({
		name: commandName,
		shortcut: document.querySelector('#shortcut').value
	});
}
/**
 * Reset the shortcut and update the textbox.
 */
async function resetShortcut() {
	await browser.commands.reset(commandName);
	updateUI();
}
/**
 * Update the UI when the page loads.
 */
document.addEventListener('DOMContentLoaded', updateUI);
/**
 * Handle update and reset button clicks
 */
document.querySelector('#update').addEventListener('click', updateShortcut)
document.querySelector('#reset').addEventListener('click', resetShortcut)