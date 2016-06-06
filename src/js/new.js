function newTest() {
	// Clear  Base Url
	document.getElementById("base-url").value = "";
	// Remove any status message
	document.getElementById("status-span").innerHTML = "";
	document.getElementById("status-span").style.visibility = "hidden";
	// Clear any errors
	document.log = [];
	// Remove any test steps
	var testSteps = document.getElementById("test-steps-container");
	while (testSteps.firstChild) {
		testSteps.removeChild(testSteps.firstChild);
	}
	// clear out asked for files (test as step)
	var fsl = document.getElementById('file-select-list');
	// clear out children: http://stackoverflow.com/a/3450726/5807291
	while(fsl.firstChild){ fsl.removeChild(fsl.firstChild); }
	// in clear-test-step.js, clear the step builder fields
	clearFields();
}

// Set the click event for the 'New' button
document.getElementById("toolbar-new").onclick = function () {
	newTest();
}