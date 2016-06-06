// this should hadle the 'testAsStep' command
// ask a user to point to the file being referenced. only do it once. so if i have the reference, dont ask again
// once a file refreence is loaded, run that test as it's own process (do not load steps into the test steps pane)
// still log the pass fail though

function loadFile(fileEntry) {
	var fileName = fileEntry.name;
	fileEntry.file(
		function(file) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var htmlString = e.target.result;
				// http://stackoverflow.com/a/10585079
				var tempHtmlDoc = document.createElement('html');
				tempHtmlDoc.innerHTML = htmlString;
				// Get the <tbody>
				var testStepsBody = tempHtmlDoc.getElementsByTagName('tbody')[0];
				fileName = fileName.substring(0, fileName.indexOf('.html'));
				// Save the file's data as a global variable
				// http://stackoverflow.com/a/13291615
				window[fileName] = testStepsBody;
			};
			reader.readAsText(file);
		}
	);
}

var fileList;
function addFileRequest(fileName) {
	// Check if the file was already requested
	fileList = document.getElementById("file-select-list");
	var alreadyRequested = false;
	if (fileList.children.length > 0) { // ensure there are file requests to parse
		for (var i = 0; i < fileList.children.length; i++) {
			var currentFileName = fileList.children[i].children[0].value; // get the current index's fileName
			if (currentFileName == fileName) {
				alreadyRequested = true;
			}
		}
	}
	// If there were no previous requests OR we know it hasn't already been requested...
	if ( (fileList.children.length = 0) || (alreadyRequested == false) ) {
		var parentDiv = document.createElement("div");
		parentDiv.setAttribute("class", "test-file-container");
		
		var fileInput = document.createElement("input");
		fileInput.setAttribute("class", "test-file-input");
		fileInput.value = fileName;
		fileInput.setAttribute("disabled", "true");
		parentDiv.appendChild(fileInput);
		
		var filespan = document.createElement("span");
		filespan.setAttribute("class", "test-file-span");
		filespan.innerHTML = "✓";
		parentDiv.appendChild(filespan);
		
		var fileButton = document.createElement("button");
		fileButton.setAttribute("class", "test-file-button");
		fileButton.innerHTML = "\uD83D\uDD0D"; // ?? - http://www.fileformat.info/info/unicode/char/1f50d/index.htm
		fileButton.onclick = function () {
			var callingButton = this;
			// Ask the user to select a file and then load it
			chrome.fileSystem.chooseEntry(
				// Options
				{
					type: 'openFile'
					,accepts: [{
						extensions: ['html']
					}]
				},
				// Callback
				function(fileEntry) {
					if(chrome.runtime.lastError) {
						// User likely canceled. This check if here so that the Chrome API doesn't throw errors
						// http://stackoverflow.com/a/28432087
					}
					if (fileEntry) {
						var requestedFileName = callingButton.previousElementSibling.previousElementSibling.value;
						var selectedFileName = fileEntry.name;
						if (selectedFileName.indexOf(requestedFileName) > -1) {
							callingButton.setAttribute("disabled", "true");
							callingButton.previousElementSibling.setAttribute("class", "test-file-span-on");
							callingButton.previousElementSibling.innerHTML = "\u2713"; // ? - http://www.fileformat.info/info/unicode/char/2713/index.htm
							callingButton.previousElementSibling.setAttribute("title", "File loaded.");
							loadFile(fileEntry);
						} else {
							callingButton.previousElementSibling.setAttribute("class", "test-file-span-error");
							callingButton.previousElementSibling.innerHTML = "\u2717"; // ? - http://www.fileformat.info/info/unicode/char/2717/index.htm
							callingButton.previousElementSibling.setAttribute("title", "File name mismatch!");
						}
					}
				}
			);
		}
		parentDiv.appendChild(fileButton);
		
		document.getElementById("file-select-list").appendChild(parentDiv);
	}
}

function checkForPendingRequests() {
	var pendingRequest = false;
	if (fileList.children.length > 0) { // ensure there are some to parse
		for (var i = 0; i < fileList.children.length; i++) {
			var currentTitle = fileList.children[i].children[1].title;
			if (currentTitle != "File loaded.") {
				pendingRequest = true;
			}
		}
	}
	return pendingRequest;
}

function checkForTestAsStep() {
	var exists = false;
	var testSteps = document.getElementById("test-steps-container").children;
	for (var i = 0; i < testSteps.length; i++) {
		//get current command value
		var currentCommand = testSteps[i].children[1].children[0].value;
		if (currentCommand == "runTestAsStep") {
			exists = true;
			var fileName = testSteps[i].children[1].children[1].value;
			addFileRequest(fileName);
		}
	}
	return exists;
}

function stepRunner() { // simlar to next_task() in 'queue.js'
	// Stop the current run if requested
	if (stop == true) {
		stopTest();
	} else {
		//console.log( tas_i ); // DEBUGGING
		var varName = target.substring(0, target.indexOf('.html'));
		if ( tas_i < window[varName].children.length) {
			var stepDescription = window[varName].children[tas_i].previousSibling.previousSibling;
			var stepCommand = window[varName].children[tas_i].children[0].innerHTML;
			var stepTarget = window[varName].children[tas_i].children[1].innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
			var stepValue = window[varName].children[tas_i].children[2].innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
			
			// DEBUGGING
			//console.log(varName);
			//console.log(stepDescription);
			//console.log(stepCommand);
			//console.log(stepTarget);
			//console.log(stepValue);
			
			// Write test step to the log
			document.log.push("    " + target + " - Test Step: " + (tas_i + 1));
			document.log.push("        Command: " + stepCommand);
			document.log.push("        Target: " + stepTarget);
			document.log.push("        Value: " + stepValue);
			
			// Execute the command, passing in the Target and Value
			window[stepCommand](stepTarget, stepValue); // commands in command-execution.js
		} else {
			// clear 'commmand' (global variable so that the next step will run)
			command = "";
			// Handle result TODO: 
			window.result = true;
			// Trigger the next task
			completeTask();
		}
	}
}

document.getElementById("file-select-close").onclick = function() {
	// Hide the modal
	document.getElementById("file-select-modal").style["display"] = "none";
	// Run test if no more file requests are pendingRequest
	var pendingRequest = checkForPendingRequests();
	if (!pendingRequest) {
		startTest();
	}
}