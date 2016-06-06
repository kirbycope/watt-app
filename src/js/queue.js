window.result; // Test step result
var q_i; // Queue Index
var command; // Command of the test step and the Queue Index
var target; // Target of the test step and the Queue Index
var value; // Value of the test step and the Queue Index
var continueOnFailure; // Continue on Failure option of the test step and the Queue Index
var execute; // Execute option of the test step and the Queue Index
var tas_i; // runTestAsStep Index

// Gets called after every command is executed
function completeTask() {
	if (command == "runTestAsStep") {
		// Handle result of test step from another test case
		if (window.result) {
			document.log.push("        Result: Pass");
			var varName = target.substring(0, target.indexOf('.html'));
			if ( (tas_i +1) < window[varName].children.length) {
				tas_i++;
				stepRunner();
			} else {
				passTestStep();
			}
		}
		else if (window.result == false) {
			failTestStep();
		}
		else {
			skipTestStep();
		}
	} else {
		// Handle the result of regular test steps
		if (window.result == true) {
			passTestStep();
		}
		else if (window.result == false) {
			failTestStep();
		}
		else {
			skipTestStep();
		}
	}
}

function failTestStep() {
	// write result to the log
	document.log.push("    Result: Fail");
	var testStepContainer = document.getElementById("test-steps-container").children[q_i];
	// Update status
	testStepContainer.children[0].children[3].children[0].style["background-color"] = "rgb(242, 222, 222)";
	document.getElementById("status-span").innerHTML = "Failed!";
	// Expand failed test step
	if (testStepContainer.children[0].children[1].getAttribute("class") == "test-step-expand") {
		testStepContainer.children[0].children[1].click();
	}
	// See if continue on failure was checked for this test step
	if (testStepContainer.children[1].children[3].children[1].checked) {
		// Increment the Queue Index
		q_i++;
		// Call the next task
		next_task();
	} else {
		// Stop the test and finalize the log
		appendLogLink(); // in log.js
	}
}

function passTestStep() {
	// write result to the log
	document.log.push("    Result: Pass");
	var testStepContainer = document.getElementById("test-steps-container").children[q_i];
	if (testStepContainer) {
		// mark test step as passed
		testStepContainer.children[0].children[3].children[0].style["background-color"] = "rgb(223, 240, 216)";
	}
	// Increment the Queue Index
	q_i++;
	// Call the next task
	next_task();
}

function skipTestStep() {
	// write result to the log
	document.log.push("Test Step: " + (q_i + 1) );
	document.log.push("    Result: Skipped");
	// Update status
	document.getElementById("test-steps-container").children[q_i].children[0].children[3].children[0].style["background-color"] = "";
	// Increment the Queue Index
	q_i++;
	// Call the next task
	next_task();
}

function finalizeTestLog() {
	// Log the end time
	var currentdate = new Date(); 
	var datetime = 
		currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":"
		+ currentdate.getSeconds();
	document.log.push("TEST COMPLETED @ " + datetime);
	// Update Status
	document.getElementById("status-span").innerHTML = "Complete.";
	// Stop the test and finalize the log
	appendLogLink(); // in log.js
}

function stopTest() {
	// Update Status
	document.getElementById("status-span").innerHTML = "Aborted!";
	document.getElementById("status-span").style.visibility = "visible";
	// Stop the test and finalize the log
	appendLogLink(); // in log.js
}

// Called at the end of startTest(in playback-controls.js), failTestStep(), passTestStep(), or skipTestStep()
function next_task() {
	// Stop the current run if requested
	if (window.stop == true) {
		stopTest();
	} else {
		// Get the current count of Test Steps (done each time in case a test is added during playback)
		var testStepCount = document.getElementById('test-steps-container').childElementCount;
		// Ensure there is a test step at the current index
		if (q_i < testStepCount) {
			// Get Test Step Data
			var currentStepContainer = document.getElementById('test-steps-container').children[q_i];
			description = currentStepContainer.children[0].children[3].children[0].value;
			command = currentStepContainer.children[1].children[0].value;
			target = currentStepContainer.children[1].children[1].value;
			value = currentStepContainer.children[1].children[2].value;
			continueOnFailure = currentStepContainer.children[1].children[3].children[1].checked;
			execute = currentStepContainer.children[0].children[2].checked;
			// if the test is to be executed, do so. else, skip it.
			if (execute) {
				// Change the background color of the current description
				currentStepContainer.children[0].children[3].children[0].style["background-color"] = "#DDDDDD";
				// Write test step to the log
				document.log.push("Test Step: " + (q_i + 1));
				document.log.push("    Command: " + command);
				document.log.push("    Target: " + target);
				document.log.push("    Value: " + value);
				// Check if target and/or value is actually a variable. if so use the value of the variable
				if (target.startsWith("${")) {
					var varName = target.substring(2, (target.length - 1));
					target = window.storage[varName];
				}
				if (value.startsWith("${")) {
					var varName = value.substring(2, (value.length - 1));
					value = window.storage[varName];
				}
				// Execute the command, passing in the Target and Value
				window[command](target, value); // commands in command-execution.js
			}
			else {
				// Set the result to null as the test did not run
				window.result = null;
				// Trigger the next task
				completeTask();
			}
		}
		else {
			finalizeTestLog();
		}
	}
}