var tutorialProgress;

function saveTutorialEnded(){
	// Save it using the Chrome extension storage API.
	chrome.storage.sync.set({'firstRun': false});
}

function displayTutorial(){
	var header = document.getElementById('tutorial-header');
	//clear header
	header.innerHTML = '';
	var body = document.getElementById('tutorial-body');
	// clear body: http://stackoverflow.com/a/3450726/5807291
	while(body.firstChild){ body.removeChild(body.firstChild); }
	// Setup a variable to hold the body content
	var bodyContent = new Array( );
	// Fill in data for the current step
	if (tutorialProgress == 0) {
		// Re-show the 'Close' button if the user hit 'Back' on step 1 
		var closeButton = document.getElementById('tutorial-button-close');
		if (closeButton) {
			// Make sure it is visible
			document.getElementById('tutorial-button-close').setAttribute('style', 'display: block;');
		}
		// Hide Back button if it exists
		var backButton = document.getElementById('tutorial-button-back');
		if (backButton) {
			document.getElementById('tutorial-button-back').setAttribute('style', 'display: none;');
		}
		header.innerHTML = "Welcome!";
		bodyContent.push("Since this is your first time running WATT, let's take a few mintues walk through some basics of the application.");
	}
	if (tutorialProgress == 1) {
		// Hide the Close button
		document.getElementById('tutorial-button-close').setAttribute('style', 'display: none;');
		// Show a Back button
		var backButton = document.getElementById('tutorial-button-back');
		if (backButton) {
			// Make sure it is visibile
			backButton.setAttribute('style', 'display: block;');
		}
		else {
			var backButton = document.createElement('button');
			backButton.setAttribute('id', 'tutorial-button-back');
			backButton.setAttribute('class', 'tutorial-button-back');
			backButton.innerHTML = 'Back';
			backButton.onclick = function () {
				// Increment the step count
				tutorialProgress--;
				// Show the previous tutorial step
				displayTutorial();
			}
			document.getElementById('tutorial-button-div').appendChild(backButton);
		}
		header.innerHTML = "The Toolbar";
		bodyContent.push("\uD83D\uDDCB - Create a new test case"); // 🗋 - http://www.fileformat.info/info/unicode/char/1f5cb/index.htm
		bodyContent.push("\uD83D\uDDC0 - Open an existing test case"); // 🗀 - http://www.fileformat.info/info/unicode/char/1f5c0/index.htm
		bodyContent.push("\uD83D\uDCE5 - Save the current test case"); // 📥 - http://www.fileformat.info/info/unicode/char/1f4e5/index.htm
		bodyContent.push("");
		bodyContent.push("\u2348 - Open the Browser Window"); // ⍈ - http://www.fileformat.info/info/unicode/char/2348/index.htm
	}
	if (tutorialProgress == 2) {
		header.innerHTML = "Test Step Controls";
		bodyContent.push("\u25BA - Execute the current test case*"); // ► - http://www.fileformat.info/info/unicode/char/25ba/index.htm
		bodyContent.push("\u25FC - Stop the current test execution"); // ◼ - http://www.fileformat.info/info/unicode/char/25fc/index.htm
		bodyContent.push("\u26AB - Record actions in Browser Window");// ⚫ - http://www.fileformat.info/info/unicode/char/26ab/index.htm
		bodyContent.push("\u274C - Clear test execution results"); // ❌ - http://www.fileformat.info/info/unicode/char/274c/index.htm
		bodyContent.push("");
		bodyContent.push("* A link to your results will appear to the left of the \u25BA button");
	}
	if (tutorialProgress == 3) {
		header.innerHTML = "Test Case Settings";
		bodyContent.push("\u2611 - Run all Test Steps"); // ☑ - http://www.fileformat.info/info/unicode/char/2611/index.htm
		bodyContent.push("[Base URL] - Set the domain of your site");
		bodyContent.push("\u229E - Expand all test steps"); // ⊞ - http://www.fileformat.info/info/unicode/char/229e/index.htm
		bodyContent.push("\u2327 Remove all test steps"); // ⌧ - http://www.fileformat.info/info/unicode/char/2327/index.htm
	}
	if (tutorialProgress == 4) {
		header.innerHTML = "Test Step Builder";
		bodyContent.push("[Description] - Displayed when your test step is 'collapsed'");
		bodyContent.push("[Command] - All supported actions that can be performed");
		bodyContent.push("[Target] - Often the 'selector' but varies by command");
		bodyContent.push("[Value] - Often the value to set or check on the given target");
	}
	if (tutorialProgress == 5) {
		header.innerHTML = "Tip";
		bodyContent.push("When the [Command] select list is opened, you can hover over each option to see details");
	}
	if (tutorialProgress == 6) {
		header.innerHTML = "Getting Started";
		bodyContent.push("1. Enter 'http://timothycope.com' for [Base URL]");
		bodyContent.push("2. Click \u2348 to open the Browser Window");
		bodyContent.push("3. Click \u26AB to start recording");
		bodyContent.push("4. Select the address bar and hit the ENTER/RETURN key");
	}
	if (tutorialProgress == 7) {
		header.innerHTML = "Getting Started, cont.";
		bodyContent.push("5. Click \u26AB to stop recording");
		bodyContent.push("6. Click \u2347 to close the Browser Window");
		bodyContent.push("");
		bodyContent.push("Congratulations! You have created your first test step.");
	}
	// Add the content to the DOM
	var para = document.createElement("p");
	para.innerHTML = bodyContent.join('<br>');
	body.appendChild(para);
	// Close the tutorial if we've gotten nothing to show
	if (body.innerHTML.length <= 7) {
		document.getElementById("tutorial-div").setAttribute('class', 'tutorial-hidden');
		saveTutorialEnded();
	}
}

// DEBUGGING - Uncomment to reset tutorial status
//chrome.storage.sync.remove('firstRun');

// Check if first run, if so then show the div
chrome.storage.sync.get('firstRun', function(items) {
	if (items.firstRun != false) {
		document.getElementById("tutorial-div").setAttribute('class', 'tutorial-shown');
		tutorialProgress = 0;
		displayTutorial();
	}
});

// Close button
document.getElementById("tutorial-button-close").onclick = function() {
	document.getElementById("tutorial-div").setAttribute('class', 'tutorial-hidden');
	saveTutorialEnded();
}

// Continue button
document.getElementById("tutorial-button-continue").onclick = function() {
	// Increment the step count
	tutorialProgress++;
	// Show the next tutorial step
	displayTutorial();
}