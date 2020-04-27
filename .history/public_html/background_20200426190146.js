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
var wikiCount=1;
function onCreated() {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	} else {
		console.log("Item created successfully");
	}
}
function onRemoved() {
	console.log("Item removed successfully");
}
function onError(error) {
	console.log(`Error: ${error}`);
}
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
var openWiki = function (frameId, wiki) {
	browser.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
		browser.tabs.sendMessage(tabs[0].id, {wiki: wiki,frameId:frameId,tabId:tabs[0].id},{frameId:frameId});
	});
};/*
 The click event listener, where we perform the appropriate action given the
 ID of the menu item that was clicked.
 */
var wikipedia = browser.menus.onClicked.addListener((info, tab) => {
	console.log(info,tab);
	switch (info.menuItemId) {
		case "getSelectedPedia":
			openWiki(info.frameId, 'getSelectedPedia');
			break;
		case "getSelectedTionary":
			openWiki(info.frameId, 'getSelectedTionary');
			break;
	}
});
