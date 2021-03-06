var commands = [
	"clearAllCaches"
	,"click"
	,"clickAndWait"
	,"deleteAllVisibleCookies"
	,"goBack"
	,"goBackAndWait"
	,"goForward"
	,"goForwardAndWait"
	,"open"
	,"openAndWait"
	,"pause"
	,"refresh"
	,"refreshAndWait"
	,"runScript"
	,"runTestAsStep"
	,"select"
	,"store"
	,"submit"
	,"type"
	,"verifyChecked"
	,"verifyElementPresent"
	,"verifyLocation"
	,"verifyNotChecked"
	,"verifyText"
	,"verifyTitle"
	,"waitForElementPresent"
	,"waitForLocation"
	,"waitForText"
	,"waitForTitle"
];

 function populateCommands(selectList) {
	for(var i = 0; i < commands.length; i++) {
		var opt = document.createElement('option');
		opt.innerHTML = commands[i];
		opt.value = commands[i];
		opt.title = addHelperText(opt.value) || opt.value; // in helper-text.js
		selectList.appendChild(opt);
	}
 }

document.addEventListener('DOMContentLoaded', function() {
	var selectList = document.getElementById('test-step-builder-command');
	populateCommands(selectList);
	selectList.title = 'Command';
	selectList.onchange = function() {
		if (this.selectedIndex){
			updateSelectListHelperText(this); // in helper-text.js
		}
	}
 });