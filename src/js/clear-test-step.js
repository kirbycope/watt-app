function clearFields(){
	// Clear previous error message(s)
	document.getElementById("message-span").style.visibility = "hidden";
	// Clear 'Description'
	document.getElementById("test-step-builder-description").value = '';
	// Clear 'Command'
	document.getElementById("test-step-builder-command").value = '';
	document.getElementById("test-step-builder-command").title = 'Command';
	// Clear 'Target'
	document.getElementById("test-step-builder-target").value = '';
	// Clear 'Value'
	document.getElementById("test-step-builder-value").value = '';
}

document.getElementById("test-step-builder-button-clear").onclick = function() {
	clearFields();
}