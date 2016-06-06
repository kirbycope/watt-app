document.log = [];
document.finalLog;

function appendLogLink() {
	// Finalize the log
	document.finalLog = document.log.join("\n");
	// Get the current Status message
	var currentStatus = document.getElementById("status-span").innerHTML;
	// Build log link
	var logLink = "<a id='log-link' href='#'> [Log] </a>";
	// Set new status
	document.getElementById("status-span").innerHTML = currentStatus + logLink;
	// Set on click
	document.getElementById("log-link").onclick = function(){
	openLogWindow();
	}
}

function openLogWindow() {
	// Get the main window's screen position
	var mainLeft = chrome.app.window.getAll()[0].outerBounds.left;
	var mainTop = chrome.app.window.getAll()[0].outerBounds.top
	var height = 480;
	var width = 320;
	
	// Create a new window and open the log html file
	chrome.app.window.create(
		"log.html",
		{
			'innerBounds': {
				minWidth: width,
				minHeight: height,
			},
			'outerBounds': {
				width: width,
				height: height,
				left: mainLeft + width + 10,
				top: mainTop
			}
		},
		function (createdWindow) {
			var timeoutID;
			function inject() {
				// Update the UI
				createdWindow.contentWindow.document.getElementById("log-header").innerHTML = "Results";
				createdWindow.contentWindow.document.getElementById("log-content").innerHTML = document.finalLog;
				createdWindow.contentWindow.clearTimeout(timeoutID);
			}
			function delayedinject() {
				timeoutID = createdWindow.contentWindow.setTimeout(inject, 250);
			}
			delayedinject();
		}
	);
}

//function