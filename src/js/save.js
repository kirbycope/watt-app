function createHtmlString(writableFileEntry) {
	// Get data from app
	var fileName = writableFileEntry.name
	var title = fileName.substring(0, fileName.length-5); // 5 char in '.html'
	var baseUrl = document.getElementById("base-url").value;
	var testSteps = document.getElementById("test-steps-container").children;
	
	// Create an array to act as a StringBuilder of sorts, http://stackoverflow.com/a/2087611
	var html = [];
	html.push(
		'<?xml version="1.0" encoding="UTF-8"?>'
		,'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
		,'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">'
		,'<head profile="http://selenium-ide.openqa.org/profiles/test-case">'
		,'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
		,'<link rel="selenium.base" href="' + baseUrl + '" />'
		,'<title>' + title + '</title>'
		,'</head>'
		,'<body>'
		,'<table cellpadding="1" cellspacing="1" border="1">'
		,'<thead>'
		,'<tr><td rowspan="1" colspan="3">' + title + '</td></tr>'
		,'</thead><tbody>'
	);
	
	// Iterate through each Test Step
	for (var i = 0; i < testSteps.length; i++) {
		// Get step properties
		var stepDescription = testSteps[i].children[0].children[3].children[0].value
		var stepCommand = testSteps[i].children[1].children[0].value;
		var stepTarget = testSteps[i].children[1].children[1].value;
		var stepValue = testSteps[i].children[1].children[2].value;
		var stepContinueOnFailure = testSteps[i].children[1].children[3].children[1].checked;
		var stepExecute = testSteps[i].children[0].children[2].checked;
		
		// Add to HTML
		html.push(
			'<!-- ' + stepDescription + ' -->'
			,'<tr data-continueOnFailure="' + stepContinueOnFailure +'" data-execute="' + stepExecute + '">'
			,'	<td>' + stepCommand + '</td>'
			,'	<td>' + stepTarget + '</td>'
			,'	<td>' + stepValue + '</td>'
			,'</tr>'
		);
	}
	
	// Finish the HTML
	html.push(
		'</tbody></table>'
		,'</body>'
		,'</html>'
	);
	
	// Return the final HTML
	return html.join("\n");
}

function saveTest() {
	// Ask the user to select a file save location and then save
	chrome.fileSystem.chooseEntry(
		// Options
		{
			type: 'saveFile'
			,accepts: [{
				extensions: ['html']
			}]
		},
		// Callback
		function(writableFileEntry) {
			if (writableFileEntry) {
				// Create the HTML (string)
				var htmlString = createHtmlString(writableFileEntry);
				// Create Blob from the html string
				var blob = new Blob([htmlString], {type: 'text/html'});
				// Write file
				writableFileEntry.createWriter(
					function(writer) {
						// Write console when done
						//writer.onwriteend = function(e) { console.log("Save complete!"); };
						// Write to the file
						writer.write(blob);
					//}, errorHandler
					}
				);
			}
		}
	);
}

// Set the click event for the 'Save' button
document.getElementById("toolbar-save").onclick = function () {
	saveTest();
}