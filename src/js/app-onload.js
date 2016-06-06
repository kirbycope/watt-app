// Just a few things we want to do when the app first loads...

// Save the webview to a global variable
var webview = document.getElementById("webview");

// Set the window width
chrome.app.window.current().outerBounds.width = 320;

// Add a listener to the App for webview messages
addEventListener('message', function(e) {
	//console.log(e.data); // DEBUGGING
	if (e.source != webview.contentWindow) {
		return;
	}
	else {
		if (window.record) {
			if (e.data.command) {
				var recordedDescription;
				if (e.data.command == "select") {
					recordedDescription = e.data.command + " '" + e.data.value + "' '" + e.data.target + "'";
				}
				else {
					recordedDescription = e.data.command + " '" + e.data.target + "'";
				}
				var recordedCommand = e.data.command;
				var recordedTarget = e.data.target;
				var recordedValue = e.data.value;
				
				createTestSteps(recordedDescription, recordedCommand, recordedTarget, recordedValue); // in add-test-step.js
			}
		}
		else {
			if (e.data.target){
				window.clickedElementTarget = e.data.target;
				window.clickedElementValue = e.data.value;
			}
		}
	}
});