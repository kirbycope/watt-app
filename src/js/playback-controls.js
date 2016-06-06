window.record; // recording flag
window.stop; // stop button flag

function clearTestResults() {
	// Clear the log
	document.log = [];
	// Get the test steps
	var testSteps = document.getElementById("test-steps-container").children;
	// Iterate through each Test Step
	for (var i = 0; i < testSteps.length; i++) {
		// clear each style
		document.getElementById("test-steps-container").children[i].children[0].children[3].children[0].style["background-color"] = "";
	}
}

function startTest() {
	// Turn off recording if needed
	if (window.record) { document.getElementById("record-button").click(); }
	// Reset stop flag
	window.stop = false;
	// Clear any previous test execution results
	clearTestResults();
	// Set/Reset the Queue Index
	q_i = 0; // declared as a global in queue.js
	// Update status
	document.getElementById("status-span").innerHTML = "Running...";
	document.getElementById("status-span").style.visibility = "visible";
	// Log the start time
	var currentdate = new Date(); 
	var datetime = 
		currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":"
		+ currentdate.getSeconds();
	document.log.push("TEST STARTED @ " + datetime);
	// Call the queue
	next_task(); // in queue.js
}

// Set the click event for the 'Play' button
document.getElementById("play-button").onclick = function() {
	if (document.getElementById("test-steps-container").children.length > 0) {

		// Check if runTestAsStep is used and show the modal as needed
		var testAsStep = checkForTestAsStep();
		if (testAsStep) {
			var pendingRequests = checkForPendingRequests();
			if (pendingRequests) {
				document.getElementById("file-select-modal").style.display = "block";
			} else {
				startTest();
			}
		}
		else {
			startTest();
		}
	}
}

// Set the click event for the 'Stop' button
document.getElementById("stop-button").onclick = function() {
	if (q_i > 0) {
		// Set stop flag
		window.stop = true;
		document.log.push("    [Error] Test execution stopped.");
	}
}

// Set the click event for the 'Clear' button
document.getElementById("clear-results-button").onclick = function() {
	document.getElementById("status-span").style.visibility = "hidden";
	clearTestResults();
}

function injectRecordScript() {
	// http://stackoverflow.com/a/6735955
	// inject css into webview, then inject the js via callback
	webview.insertCSS({
		code:    ".mouseOn{"
				+"background-color: #bcd5eb !important;"
				+"outline: 2px solid #5166bb !important;"
	},
	function() {
		webview.executeScript({
			file: 'js/record.js'
		},
			function(){
				//console.log('injected record css and js'); // DEBUGGING
			}
		)
	});
}

// Set the click event for the 'Record' button
document.getElementById("record-button").onclick = function() {
	// If recording, stop
	if (window.record) {
		window.record = false;
		webview.executeScript({
					// If there was a previous element, clear the highlighter from it
			code:	  "if (prevElement!= null) {prevElement.classList.remove('mouseOn');}"
					// turn off listener(s)
					+ "document.removeEventListener('mousemove', elementHighlighter, true);"
					+ "document.removeEventListener('click', clickRecorder, false);"
		},
		function(){
			document.getElementById("record-button").title = "Start Recording";
			document.getElementById("record-button").setAttribute('class', 'recording-off');
		});
	}
	else {
		window.record = true;
		document.getElementById("record-button").title = "Stop Recording";
		document.getElementById("record-button").setAttribute('class', 'recording-on');
		// Check if record script already injected
		webview.executeScript({
			code: "(typeof clickRecorder == 'function')"},
			function(result){
				if (result[0] != true) {
					// ... inject record script
					injectRecordScript();
				} else {
					// ... turn on the record script
					webview.executeScript({
						code:	  "document.addEventListener('mousemove', elementHighlighter, true);"
								+ "document.addEventListener('click', clickRecorder, false);"
					});
				}
			}
		);
	}
}