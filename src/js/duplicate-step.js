function duplicateStep(e){
	// Continue on Failure
	var stepContinueOnFailure = e.previousSibling;
	// Value
	var stepValue = e.parentElement.previousSibling;
	// Target
	var stepTarget = stepValue.previousSibling;
	// Command
	var stepCommand = stepTarget.previousSibling;
	// Description
	var stepDescription = e.parentElement.parentElement.previousSibling.children[3].children[0];
	// Execute
	var stepExecute = e.parentElement.parentElement.previousSibling.children[2];
	// Add Test Step
	createTestSteps(stepDescription.value, stepCommand.value, stepTarget.value, stepValue.value, stepContinueOnFailure.checked.toString(), stepExecute.checked.toString())
}