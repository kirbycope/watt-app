function duplicateStep(e){var stepContinueOnFailure=e.previousSibling;var stepValue=e.parentElement.previousSibling;var stepTarget=stepValue.previousSibling;var stepCommand=stepTarget.previousSibling;var stepDescription=e.parentElement.parentElement.previousSibling.children[3].children[0];var stepExecute=e.parentElement.parentElement.previousSibling.children[2];createTestSteps(stepDescription.value,stepCommand.value,stepTarget.value,stepValue.value,stepContinueOnFailure.checked.toString(),stepExecute.checked.toString())}