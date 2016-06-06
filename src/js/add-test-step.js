var addDescription;
var addCommand;
var addTarget;
var addValue;

var continueOnFailure;
var execute;

var draggedItem;
var draggedOverItemBackgroundColor;

function removeTestStep(self) {
	var parent = self.parentNode;
	var grandParent = parent.parentNode;
	grandParent.remove();
}

function createTestSteps(description, command, target, value, continueOnFailure, execute) {
	// Create a div to hold the test step
	var parentDiv = document.createElement("div");
	parentDiv.setAttribute("draggable", "true");
	
	//parentDiv.setAttribute("ondragstart", "drag(event)");
	//parentDiv.setAttribute("ondrop", "drop(event)");
	
	//parentDiv.setAttribute("class", "test-step-div ");
	// Create a div to hold the first row
	var testStepDivRow1 = document.createElement("div");
	// Create a div to hold the second row
	var testStepDivRow2 = document.createElement("div");
	testStepDivRow2.setAttribute('class', 'test-step-row-2');
	// Row 1: Description Field and Remove Step Button
		// Create a remove step button
		var removeButton = document.createElement("button");
		removeButton.setAttribute("class", "test-step-remove");
		removeButton.innerHTML = "X";
		removeButton.title = "Remove Test Step";
		removeButton.onclick = function() { removeTestStep(this); };
		testStepDivRow1.appendChild(removeButton);
		// Create expand/collapse button
		var expandButton = document.createElement("button");
		expandButton.setAttribute("class", "test-step-expand");
		expandButton.innerHTML = "+";
		expandButton.title = "Expand Test Step";
		expandButton.onclick = function() {
			if (this.getAttribute('class')== 'test-step-expand') {
				this.setAttribute('class','test-step-collapse');
				this.innerHTML = '-';
				expandButton.title = "Collapse Test Step";
				this.parentElement.parentElement.children[1].setAttribute('class','test-step-row-2-on');
				this.parentElement.parentElement.setAttribute("class", "test-step-div-on");
			} else {
				this.setAttribute('class','test-step-expand');
				this.innerHTML = '+';
				expandButton.title = "Expand Test Step";
				this.parentElement.parentElement.children[1].setAttribute('class','test-step-row-2');
				this.parentElement.parentElement.setAttribute("class", "");
			}
		};
		testStepDivRow1.appendChild(expandButton);
		
		// Create test step checkbox
		var executeStep = document.createElement("input");
		executeStep.type = "checkbox";
		executeStep.title = "Execute Step";
		executeStep.setAttribute("class", "test-step-execute");
		executeStep.checked = true;
		if (execute == 'false') { executeStep.checked = false; }
		testStepDivRow1.appendChild(executeStep);
		
		// Create the Description Field
		var newDescription = document.createElement("input");
		newDescription.setAttribute("class", "test-step-description");
		newDescription.setAttribute("placeholder", "Description");
		newDescription.value = description;
		var newSpan = document.createElement("span");
		newSpan.setAttribute("class", "test-step-description-wrapper");
		newSpan.appendChild(newDescription);
		testStepDivRow1.appendChild(newSpan);
		
	// Row 2: Command, Target, Value
		// Create the Command select list
		var newCommand = document.createElement("select");
		newCommand.setAttribute("class", "test-step-command");
		populateCommands(newCommand);
		newCommand.value = command;
		//newCommand.title = addHelperText(addCommand);
		/* THIS NO WORKY
		newCommand.onchange = function() {
			if (this.selectedIndex){
				updateSelectListHelperText(this); // in helper-text.js
			}
		}
		*/
		testStepDivRow2.appendChild(newCommand);
		// Create the Target field
		var newTarget = document.createElement("input");
		newTarget.setAttribute("class", "test-step-target");
		newTarget.setAttribute("placeholder", "Target");
		if (target) { newTarget.value = target; }
		testStepDivRow2.appendChild(newTarget);
		// Create the Value field
		var newValue = document.createElement("input");
		newValue.setAttribute("class", "test-step-value");
		newValue.setAttribute("placeholder", "Value");
		if (value) { newValue.value = value; };
		testStepDivRow2.appendChild(newValue);
		
		// Create the checkbox div
		var checkboxDiv = document.createElement("div");
		checkboxDiv.setAttribute("class", "test-step-continue-div");
			// Create label
			var checkboxLabel = document.createElement("label");
			checkboxLabel.setAttribute("class", "continue-label");
			checkboxLabel.textContent = "Continue on Failure: ";
			checkboxDiv.appendChild(checkboxLabel);
			// Create test step checkbox
			var continueCheckbox = document.createElement("input");
			continueCheckbox.type = "checkbox";
			continueCheckbox.title = "Continue on Failure";
			continueCheckbox.setAttribute("class", "continue-checkbox");
			if (continueOnFailure == 'true') { continueCheckbox.setAttribute("checked", "true"); }
			checkboxDiv.appendChild(continueCheckbox);
			// Create a 'duplicate test' option
			var duplicateTestLink = document.createElement("a");
			duplicateTestLink.innerHTML = "Duplicate Step";
			duplicateTestLink.title = "Duplicate Step";
			duplicateTestLink.href = "#";
			duplicateTestLink.setAttribute("class", "duplicate-step");
			duplicateTestLink.onclick = function(e) {
				e.preventDefault();
				duplicateStep(e.target);
			};
			checkboxDiv.appendChild(duplicateTestLink);
		testStepDivRow2.appendChild(checkboxDiv);
		
	// Add both rows to the parent div
	parentDiv.appendChild(testStepDivRow1);
	parentDiv.appendChild(testStepDivRow2);
	// Add the parent div to the Test Steps Container
	document.getElementById("test-steps-container").appendChild(parentDiv);
	
	clearFields(); // in clear-test-step.js
}

document.getElementById("test-step-builder-button-add").onclick = function() {
	// Clear previous error message(s)
	var messageSpan = document.getElementById("message-span");
	messageSpan.value = "";
	messageSpan.style.visibility = "hidden";
	
	// Get the input values
	var addedDescription = document.getElementById("test-step-builder-description").value;
	var addedCommand = document.getElementById("test-step-builder-command").value;
	var addedTarget = document.getElementById("test-step-builder-target").value;
	var addedValue = document.getElementById("test-step-builder-value").value;
	
	if (addedCommand){
		// Call the function that adds the test step to the Test Steps div
		createTestSteps(addedDescription, addedCommand, addedTarget, addedValue);
	}
	else {
		messageSpan.style.visibility = "visible";
		messageSpan.innerHTML = "Command not set.";
	}
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
	//console.log(draggedItem); // The item that was dragged
	//console.log(ev.target); // The item that was dragged
	ev.target.style["background-color"] = draggedOverItemBackgroundColor;
	try {
		document.getElementById("test-steps-container").insertBefore(draggedItem, ev.target.parentElement.parentElement.parentElement);
	}
	catch(e) {
		//
	}
}

document.getElementById("test-steps-container").ondrop = function() {
	drop(event);
}

document.getElementById("test-steps-container").ondragover = function() {
	allowDrop(event);
}

document.addEventListener('drag', function(e) {
	if (e.target.getAttribute('draggable')) {
		draggedItem = e.target;
	}
});

document.addEventListener('dragenter', function(e) {
	if (e.target.className == "test-step-description") {
		draggedOverItemBackgroundColor = e.target.style["background-color"];
		e.target.style["background-color"] = "#DDDDDD";
	}
	
});

document.addEventListener('dragleave', function(e) {
	if (e.target.className == "test-step-description") {
		e.target.style["background-color"] = draggedOverItemBackgroundColor;
	}
});