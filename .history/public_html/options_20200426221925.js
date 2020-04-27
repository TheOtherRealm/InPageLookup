function saveOptions() {
	e.preventDefault();
		updateShortcut("getSelectedPedia",document.querySelector("#wikipediaKeyCombo").value);
		updateShortcut("getSelectedTionary",document.querySelector("#wiktionaryKeyCombo").value);
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
function updateShortcut(commandName,commandValue) {
	browser.commands.update({
	  name: commandName,
	  shortcut: commandValue
	});
  }