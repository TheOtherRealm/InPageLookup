const commandNames = ["getSelectedPedia", "getSelectedTionary"];
/**
 * Update the UI: set the value of the shortcut textbox.
 */
async function updateUI(commandNames) {
	let commands = await browser.commands.getAll();
	commandNames.forEach(commandName => {
		for (command of commands) {
			if (command.name === commandName) {
				console.log(commandName);
				document.querySelector('#' + commandName).value = command.shortcut;
			}
		}
	});
}
/**
 * Update the shortcut based on the value in the textbox.
 */
async function updateShortcut(commandName) {
	await browser.commands.update({
		name: commandName,
		shortcut: document.querySelector('#' + commandName).value
	});
}
/**
 * Reset the shortcut and update the textbox.
 */
async function resetShortcut() {
	await browser.commands.reset(commandName);
	updateUI(commandNames);
}
/**
 * Update the UI when the page loads.
 */
document.addEventListener('DOMContentLoaded', updateUI(commandNames));
/**
 * Handle update and reset button clicks
 */
document.querySelector('#update').addEventListener('click', updateShortcut)
document.querySelector('#reset').addEventListener('click', resetShortcut)