var ks = [];
window.addEventListener("keydown",
	function (e) {
		ks.push([e.key, true]);
		// console.log(e.key, keys);
		document.getElementById('results').innerHTML += e.key+ks[e.key];
	},
	false);
window.addEventListener('keyup',
	function (e) {
			ks[e.key] = false;
			document.getElementById('results').innerHTML="";
	},
	false);
// document.querySelector('#something').innerHTML = "Keys currently pressed: "
document.getElementById('see').addEventListener('click',
	function (e) {
		console.log([...ks]);
		document.querySelector('#results').innerHTML += [...ks.keys()];
	});
function getNumberArray(arr) {
	let newArr = new Array();
	let keyNames = Object.getOwnPropertyNames(arr)
	arr.forEach(ks)
	return newArr;
}