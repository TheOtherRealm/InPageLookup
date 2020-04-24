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
/* global browser, top, self */
(function () {
	var selObj = '';
	selObj = window.getSelection();
	var ctrlDown = false;
	var nOfLookups = 1;
	var activePage = '';
	var pages = [];
	$(document).keydown(function (e) {
		if (e.ctrlKey && e.shiftKey && e.which === 49) {
			getSelectedPedia('ctrl');
		}
		if (e.ctrlKey && e.shiftKey && e.which === 50) {
			getSelectedTionary('alt');
		}
		if (e.ctrlKey && e.shiftKey && e.which === 192) {
			console.log(e.which);
			closeWiki();
		}
	});
	var getSelectedPedia = function () {
		selObj = window.getSelection();
		var pageId = nOfLookups++;
		$('#wikiWrapper').append('<div class="wikiAddonDivRap" id="' + pageId + '" style="position: fixed;  top:' + (nOfLookups * 10) + 'px;left:' + (nOfLookups * 10) + 'px"">' +
			'<div class="btnForTheAddon btn-large IconBtnForTheAddon" type="button" style="padding: 5px;font-family: Arial, Helvetica, sans-serif; font-size: 30px;" id="moveIconBtn"> + </div>' +
			'<a href="#" id="closeWikiBtn"><div type="button" class="btnForTheAddon removeIconBtn btn-large IconBtnForTheAddon" style="padding: 5px; font-size: 25px;font-family: Arial, Helvetica, sans-serif;" id="removeIconBtn"> x </div></a>' +
			'<iframe id="wikiFrameContent" allow-top-navigation style="" src="https://en.wikipedia.org/wiki/Special:Search/' + selObj + '"></iframe>' +
			'</div>');
		pages.push($(pageId));
		$(function () {
			$(".wikiAddonDivRap").draggable();
			$(".wikiAddonDivRap").resizable();
			$('.removeIconBtn').click(function () {
				nOfLookups--;
				$('body .wikiAddonDivRap').last().remove();
				console.log($('body .wikiAddonDivRap').last());
			});
		});
	};
	var getSelectedTionary = function () {
		selObj = window.getSelection();
		var pageId = nOfLookups++;
		$('#wikiWrapper').append('<div class="wikiAddonDivRap" id="' + pageId + '" style="position: fixed;  top:' + nOfLookups * 10 + 'px;left:' + nOfLookups * 10 + 'px"">' +
			'<div class="btnForTheAddon btn-large IconBtnForTheAddon" type="button" style="padding: 5px;font-family: Arial, Helvetica, sans-serif; font-size: 30px;" id="moveIconBtn"> + </div>' +
			'<a href="#" id="closeWikiBtn"><div type="button" class="btnForTheAddon removeIconBtn btn-large IconBtnForTheAddon" style="padding: 5px; font-size: 25px;font-family: Arial, Helvetica, sans-serif;" id="removeIconBtn"> x </div></a>' +
			'<iframe id="wikiFrameContent" allow-top-navigation style="" src="https://en.wiktionary.org/wiki/Special:Search/' + selObj + '"></iframe>' +
			'</div>');
		pages.push($(pageId));
		$(function () {
			$(".wikiAddonDivRap").draggable();
			$(".wikiAddonDivRap").resizable();
			$('.removeIconBtn').click(function () {
				nOfLookups--;
				$('.wikiAddonDivRap').last().remove();
			});
		});
	};
	$('body').prepend('<div id="wikiWrapper"></div>');
	browser.runtime.onMessage.addListener(
		function (request, sender, sendResponse) {
			console.log(request, sender, sendResponse);
			if (request.wiki === "getSelectedPedia") {
				getSelectedPedia();
			}
			if (request.wiki === "getSelectedTionary") {
				getSelectedTionary();
			}
			if (request.wiki === "closeWiki") {
				closeWiki();
			}
		});
	//remove the iframe when the key combinations are pressed
	window.addEventListener("message", closeWiki, false);
	addEventListener('message',function(e){
		if(e.data==='closeWiki'){
			closeWiki();
		}
	});
	$('#closeWikiBtn').click(function(){
		$(this).parent.remove();
	});
	var closeWiki = function () {
		if ($('#wikiWrapper>*').length <= 0) {
			parent.postMessage('closeWiki','*');
		} else {
			$('#wikiWrapper>*').remove();
		}
	};
	frame 
})(jQuery);