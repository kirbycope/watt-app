function selectAll() {
	// Get the test steps container
	var testStepsContainer = document.getElementById('test-steps-container');
	
	if (testStepsContainer.children.length > 0) {
		for (var i = 0; i < testStepsContainer.children.length; i++) {
			// if 'i' is not checked, check it
			if (testStepsContainer.children[i].children[0].children[2].checked == false) {
				testStepsContainer.children[i].children[0].children[2].checked = true;
			}
		}
	}
}

function deselectAll() {
	// Get the test steps container
	var testStepsContainer = document.getElementById('test-steps-container');
	
	if (testStepsContainer.children.length > 0) {
		for (var i = 0; i < testStepsContainer.children.length; i++) {
			// if 'i' is not checked, check it
			if (testStepsContainer.children[i].children[0].children[2].checked == true) {
				testStepsContainer.children[i].children[0].children[2].checked = false;
			}
		}
	}
}

function collapseAll() {
	// Get the test steps container
	var testStepsContainer = document.getElementById('test-steps-container');
	
	if (testStepsContainer.children.length > 0) {
		for (var i = 0; i < testStepsContainer.children.length; i++) {
			// if 'i' is not expanded, expand it
			if (testStepsContainer.children[i].children[1].className == 'test-step-row-2-on') {
				testStepsContainer.children[i].children[0].children[1].click();
			}
		}
	}
}

function expandAll() {
	// Get the test steps container
	var testStepsContainer = document.getElementById('test-steps-container');
	
	if (testStepsContainer.children.length > 0) {
		for (var i = 0; i < testStepsContainer.children.length; i++) {
			// if 'i' is not expanded, expand it
			if (testStepsContainer.children[i].children[1].className != 'test-step-row-2-on') {
				testStepsContainer.children[i].children[0].children[1].click();
			}
		}
	}
}

function toggleExpandCollapse(el) {
	// Get the test steps container
	var testStepsContainer = document.getElementById('test-steps-container');
	
	if (testStepsContainer.children.length > 0) {
		if (el.id == 'expand-all') {
			el.id = 'collapse-all';
			el.title = 'Collapse All';
			el.textContent = '-';
			el.onclick = function() { toggleExpandCollapse(this); };
			expandAll();
		} else {
			el.id = 'expand-all';
			el.title = 'Expand All';
			el.textContent = '+';
			el.onclick = function() { toggleExpandCollapse(this); };
			collapseAll();
		}
	}
}

document.getElementById("select-deselect-all").onclick = function() {
	// By the time this is called the "checked" value will have changed already
	if (!this.checked) {
		this.title = "Select All Steps";
		deselectAll();
	} else {
		this.title = "Deselect All Steps";
		selectAll();
	}
}

document.getElementById("expand-all").onclick = function() {
	toggleExpandCollapse(this);
}

document.getElementById("remove-all").onclick = function() {
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
	// in clear-test-step.js, clear the step builder fields
	clearFields();
}