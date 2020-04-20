/* global browser */
/*
 Called when the item has been created, or when creation failed due to an error.
 We'll just log success/failure here.
 */
function onCreated() {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	} else {
		console.log("Item created successfully");
	}
}
/*
 Called when the item has been removed.
 We'll just log success here.
 */
function onRemoved() {
	console.log("Item removed successfully");
}
/*
 Called when there was an error.
 We'll just log the error here.
 */
function onError(error) {
	console.log(`Error: ${error}`);
}
/*
 Create all the context menu items.
 */
browser.menus.create({
	id: "getSelectedPedia",
	title: "Search Wikipedia",
	contexts: ["all"]
}, onCreated);
browser.menus.create({
	id: "getSelectedTionary",
	title: "Search Wiktionary",
	contexts: ["all"]
}, onCreated);
var openWiki = function (tabId, wiki) {
	browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
		browser.tabs.sendMessage(tabs[0].id, {wiki: wiki});
	});
};/*
 The click event listener, where we perform the appropriate action given the
 ID of the menu item that was clicked.
 */
var wikipedia = browser.menus.onClicked.addListener((info, tab) => {
	switch (info.menuItemId) {
		case "getSelectedPedia":
			openWiki(tab.id, 'getSelectedPedia');
			break;
		case "getSelectedTionary":
			openWiki(tab.id, 'getSelectedTionary');
			break;
	}
});
