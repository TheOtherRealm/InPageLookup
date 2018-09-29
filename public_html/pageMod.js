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
var nOfLookups = 1;
var activePage='';
$(document).keydown(function (e) {
	if (e.ctrlKey && e.shiftKey && e.which === 49) {
		getSelectedPedia('ctrl');
	}
	if (e.ctrlKey && e.shiftKey && e.which === 50) {
		getSelectedTionary('alt');
	}
	if (e.ctrlKey && e.shiftKey && e.which === 192) {
		closeWiki('shift');
	}
});
var getSelectedPedia = function (command) {
	selObj = window.getSelection();
	$('body').append('<div class="wikiAddonDivRap" id="wikiAddonDivRap' + nOfLookups++ + '" style="position: fixed;  top:' + (nOfLookups * 10) + 'px;left:' + (nOfLookups * 10) + 'px"">' +
		'<div class="btnForTheAddon btn-large IconBtnForTheAddon" type="button" style="padding: 5px;font-family: Arial, Helvetica, sans-serif; font-size: 30px;" id="moveIconBtn"> + </div>' +
		'<a href="javascript:" onclick="closeWiki()"><div type="button" class="btnForTheAddon removeIconBtn btn-large IconBtnForTheAddon" style="padding: 5px; font-size: 25px;font-family: Arial, Helvetica, sans-serif;" id="removeIconBtn"> x </div></a>' +
		'<iframe id="wikiFrameContent" style="" src="https://en.wikipedia.org/wiki/Special:Search/' + selObj + '"></iframe>' +
		'</div>');
	//console.log(nOfLookups,activePage);
	$(function () {
		$(".wikiAddonDivRap").draggable();
		$(".wikiAddonDivRap").resizable();
		$('.removeIconBtn').click(function () {
			nOfLookups--;
			$('body .wikiAddonDivRap').last().remove();
			console.log($('body .wikiAddonDivRap').last());
//			$(this).parent().parent().remove();
		});
	});
};
var getSelectedTionary = function (command) {
	//console.log(command);
	selObj = window.getSelection();
	$('body').append('<div class="wikiAddonDivRap" id="wikiAddonDivRap' + nOfLookups++ + '" style="position: fixed;  top:' + nOfLookups * 10 + 'px;left:' + nOfLookups * 10 + 'px"">' +
		'<div class="btnForTheAddon btn-large IconBtnForTheAddon" type="button" style="padding: 5px;font-family: Arial, Helvetica, sans-serif; font-size: 30px;" id="moveIconBtn"> + </div>' +
		'<a href="javascript:" onclick="closeWiki()"><div type="button" class="btnForTheAddon removeIconBtn btn-large IconBtnForTheAddon" style="padding: 5px; font-size: 25px;font-family: Arial, Helvetica, sans-serif;" id="removeIconBtn"> x </div></a>' +
		'<iframe id="wikiFrameContent" style="" src="https://en.wiktionary.org/wiki/Special:Search/' + selObj + '"></iframe>' +
		'</div>');
	//console.log(nOfLookups);
	$(function () {
		$(".wikiAddonDivRap").draggable();
		$(".wikiAddonDivRap").resizable();
		$('.removeIconBtn').click(function () {
			nOfLookups--;
			$('.wikiAddonDivRap').last().remove();
//			$(this).parent().parent().remove();
		});
	});
};
//remove the iframe when the key combinations are pressed
var removeSelected = function (command) {
	closeWiki();
};
var closeWiki=function () {
	//console.log($('.wikiAddonDivRap').last());
	$('body .wikiAddonDivRap').last().remove();
};