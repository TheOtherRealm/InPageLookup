/*
 Created		: Dec 2, 2017, 5:42:20 PM
 Author		: Aaron E-J <the at otherrealm.org>
 Copyright(C): 2017 Other Realm LLC
 This program is free software: you can redistribute it and/or modify
 it under the terms of the latest version of the GNU General Public License as published by
 the Free Software Foundation, using at least version 3.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details: <http://www.gnu.org/licenses/>.
 */
var selObj = '';
selObj = window.getSelection();
var ctrlDown = false;
$(document).keydown(function (e) {
	if (e.ctrlKey&&e.shiftKey&&e.which ===49) {
		getSelectedPedia('ctrl');
	}
	if (e.ctrlKey&&e.shiftKey&&e.which ===50) {
		getSelectedTionary('alt');
	}
	if (e.ctrlKey&&e.shiftKey&&e.which ===192) {
		removeSelected('shift');
	}
	
});
var getSelectedPedia = function (command) {
	console.log(command);
	selObj = window.getSelection();
	$('body').prepend('<div class="wikiAddonDivRap" id="wikiAddonDivRap" style="position: absolute;  top:' + $('#hiddenY').html() + 'px;left:' + $('#hiddenX').html() + 'px"">' +
		'<div class="btnForTheAddon btn-large IconBtnForTheAddon" type="button" style="padding: 5px;font-family: Arial, Helvetica, sans-serif; font-size: 30px;" id="moveIconBtn"> + </div>' +
		'<a href="javascript:" onclick="closeWiki()"><div type="button" class="btnForTheAddon btn-large IconBtnForTheAddon" style="padding: 5px; font-size: 25px;font-family: Arial, Helvetica, sans-serif;" id="removeIconBtn"> x </div></a>' +
		'<iframe id="wikiFrameContent" style="" src="https://en.wikipedia.org/wiki/Special:Search/' + selObj + '"></iframe>' +
		'</div>');
	$(function () {
		$("#wikiAddonDivRap").draggable();
		$("#wikiAddonDivRap").resizable();
		$('#removeIconBtn').click(function () {
			$(this).parent().parent().remove();
		});
	});
}
var getSelectedTionary = function (command) {
	console.log(command);
	selObj = window.getSelection();
	$('body').prepend('<div class="wikiAddonDivRap" id="wikiAddonDivRap" style="position: absolute;  top:' + $('#hiddenY').html() + 'px;left:' + $('#hiddenX').html() + 'px"">' +
		'<div class="btnForTheAddon btn-large IconBtnForTheAddon" type="button" style="padding: 5px;font-family: Arial, Helvetica, sans-serif; font-size: 30px;" id="moveIconBtn"> + </div>' +
		'<a href="javascript:" onclick="closeWiki()"><div type="button" class="btnForTheAddon btn-large IconBtnForTheAddon" style="padding: 5px; font-size: 25px;font-family: Arial, Helvetica, sans-serif;" id="removeIconBtn"> x </div></a>' +
		'<iframe id="wikiFrameContent" style="" src="https://en.wiktionary.org/wiki/Special:Search/' + selObj + '"></iframe>' +
		'</div>');
	$(function () {
		$('#wikiAddonDivRap').on('onload', 'ready', 'change', function () {
			var wikiZIndex = $(this).css('z-index');
			wikiZIndex++;
			$(this).css('z-index', wikiZIndex);
			console.log($(this).css('z-index'));
		});
		$("#wikiAddonDivRap").draggable();
		$("#wikiAddonDivRap").resizable();
		$('#removeIconBtn').click(function () {
			$(this).parent().parent().remove();
		});
	});
};
var removeSelected = function (command) {
	console.log(command);
	closeWiki();
};
//remove the iframe when the key combinations are pressed

function closeWiki() {
	$('#wikiAddonDivRap').remove();
}
console.log(selObj);
//This gets the cursor location and sends it to main.js
/* self.port.on('show', function() {
    var x = window.screenX;
    var y = window.screenY;
    self.port.emit("windowSize", x, y);
}); */