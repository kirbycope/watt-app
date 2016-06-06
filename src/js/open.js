function importFile(fileEntry) {
	// http://www.developer.com/lang/reading-and-writing-files-in-chrome-installed-applications.html
	fileEntry.file(
		function(file) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var htmlString = e.target.result;
				// http://stackoverflow.com/a/10585079
				var tempHtmlDoc = document.createElement('html');
				tempHtmlDoc.innerHTML = htmlString;
				
				// Get the Base URL
				var baseUrl = tempHtmlDoc.getElementsByTagName('link')[0].href;
				if (baseUrl.endsWith('/')) {
					baseUrl = baseUrl.substring(0, (baseUrl.length - 1))
				}
				if (baseUrl.startsWith('chrome-extension')) {
					baseUrl = "";
				}
				// Update the UI
				document.getElementById("base-url").value = baseUrl;
				
				// Get the <tbody>
				var testStepsBody = tempHtmlDoc.getElementsByTagName('tbody')[0];
				
				// Get/Set values
				for (var i = 0; i < testStepsBody.children.length; i++) {
					var openDescription = '';
					if (testStepsBody.children[i].previousSibling.previousSibling) {
						if (testStepsBody.children[i].previousSibling.previousSibling.nodeName != 'TR') {
							openDescription = testStepsBody.children[i].previousSibling.previousSibling.textContent.trim();
						}
					}
					var openCommand = '';
					openCommand = testStepsBody.children[i].children[0].innerHTML;
					var openTarget = '';
					if (testStepsBody.children[i].children[1]) {
						openTarget = testStepsBody.children[i].children[1].innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
					}
					var openValue = ''; 
					if (testStepsBody.children[i].children[2]) {
						openValue = testStepsBody.children[i].children[2].innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
					}
					
					// These next two will not exist in a Selenium IDE file, so check for them first
					var openContinueOnFailure = 'false';
					openContinueOnFailure = testStepsBody.children[i].getAttribute("data-continueOnFailure") || 'false';
					var openExecute = 'true';
					openExecute = testStepsBody.children[i].getAttribute("data-execute") || 'true';
					
					// Add each test step
					createTestSteps(openDescription, openCommand, openTarget, openValue, openContinueOnFailure, openExecute); // in add-test-step.js
				}
			};
			reader.readAsText(file);
		}
	);
}

function openTest() {
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
				// Clear any current data
				newTest(); // in new.js
				importFile(fileEntry);
			}
		}
	);
}

// Set the click event for the 'Open' button
document.getElementById("toolbar-open").onclick = function () {
	openTest();
}