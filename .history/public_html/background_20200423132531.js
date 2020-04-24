/*
 Created		: Dec 2, 2017, 5:42:20 PM
 Author		: Aaron E-J <the at otherrealm.org>
 Copyright(C): 2020 Other Realm LLC
 This program is free software: you can redistribute it and/or modify
 it under the terms of the latest version of the GNU Affero General Public License as published by
 the Free Software Foundation, using at least version 3.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
 GNU Affero General Public License for more details: 
 <http://www.gnu.org/licenses/>.
 */
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
 */
function onRemoved() {
	console.log("Item removed successfully");
}
/*
 Called when there was an error.
 */
function onError(error) {
	console.log(`Error: ${error}`);
}
/*
 Create all the context menu items.
 */
browser.runtime.o
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
		// let cWin=browser.windows.getCurrent(getWindows);
		// console.log(cWin);
		browser.tabs.sendMessage(tabs[0].id, {wiki: wiki,cWin:cWin});
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
