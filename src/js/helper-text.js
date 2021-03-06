var reference = [
	{
		description: 'Clears appcache, cache, fileSystems, indexedDB, localStorage, and webSQL.',
		command: 'clearAllCaches',
		target: 'none',
		value: 'none'
	},
	{
		description: 'Checks for the target element and clicks on it if found.',
		command: 'click',
		target: 'element',
		value: 'none'
	},
	{
		description: 'Checks for the target element and clicks on it if found. Then waits for a new page to load (no timeout).',
		command: 'clickAndWait',
		target: 'element',
		value: 'none'
	},
	{
		description: 'Removes all cookies from the browser.',
		command: 'deleteAllVisibleCookies',
		target: 'none',
		value: 'none'
	},
	{
		description: 'The same as clicking the browser\'s back button.',
		command: 'goBack',
		target: 'none',
		value: 'none'
	},
	{
		description: 'The same as clicking the browser\'s back button. Then waits for a new page to load (no timeout).',
		command: 'goBackAndWait',
		target: 'none',
		value: 'none'
	},
	{
		description: 'The same as clicking the browser\'s forward button.',
		command: 'goForward',
		target: 'none',
		value: 'none'
	},
	{
		description: 'The same as clicking the browser\'s forward button. Then waits for a new page to load (no timeout).',
		command: 'goForwardAndWait',
		target: 'none',
		value: 'none'
	},
	{
		description: 'Navigate to the target URL.',
		command: 'open',
		target: 'URL',
		value: 'none'
	},
	{
		description: 'Navigate to the target URL. Then waits for a new page to load (no timeout).',
		command: 'openAndWait',
		target: 'URL',
		value: 'none'
	},
	{
		description: 'Delay test execution for the target time.',
		command: 'pause',
		target: 'time in miliseconds',
		value: 'none'
	},
	{
		description: 'The same as clicking the browser\'s reload button.',
		command: 'refresh',
		target: 'none',
		value: 'none'
	},
	{
		description: 'The same as clicking the browser\'s reload button. Then waits for a new page to load (no timeout).',
		command: 'refreshAndWait',
		target: 'none',
		value: 'none'
	},
	{
		description: 'Executes the JavaScript command on the current page.',
		command: 'runScript',
		target: 'JavaScript command',
		value: 'none'
	},
	{
		description: 'Runs the provided file as a test step.',
		command: 'runTestAsStep',
		target: 'filename (Example: test-001_login.html)',
		value: 'none'
	},
	{
		description: 'Selects the provided value from the target select list.',
		command: 'select',
		target: 'element',
		value: 'option to select'
	},
	{
		description: 'Stores the given target to the given value.',
		command: 'store',
		target: 'expression',
		value: 'variable name'
	},
	{
		description: 'Submit the target form.',
		command: 'submit',
		target: 'element',
		value: 'option to select'
	},
	{
		description: 'Sets the text value of the given target.',
		command: 'type',
		target: 'element',
		value: 'text'
	},
	{
		description: 'Checks if the target element is checked.',
		command: 'verifyChecked',
		target: 'element',
		value: 'none'
	},
	{
		description: 'Checks if the target element is present on the current page.',
		command: 'verifyElementPresent',
		target: 'element',
		value: 'none'
	},
	{
		description: 'Checks if the current page\'s URL matches the provided target.',
		command: 'verifyLocation',
		target: 'URL',
		value: 'none'
	},
	{
		description: 'Checks if the target element is not checked.',
		command: 'verifyNotChecked',
		target: 'element',
		value: 'none'
	},
	{
		description: 'Checks if the target element is present on the current page. Then checks if its text matches the provided value.',
		command: 'verifyText',
		target: 'element',
		value: 'text'
	},
	{
		description: 'Checks if the current page\'s title matches the provided target.',
		command: 'verifyTitle',
		target: 'text',
		value: 'none'
	},
	{
		description: 'Checks (every 250 ms) if the target element is present on the current page. Times out after 30 seconds.',
		command: 'waitForElementPresent',
		target: 'element',
		value: 'none'
	},
	{
		description: 'Checks (every 250 ms) if the current page\'s URL matches the provided target. Times out after 30 seconds.',
		command: 'waitForLocation',
		target: 'URL',
		value: 'none'
	},
	{
		description: 'Checks (every 250 ms) if the target element\'s text matches the provided value.',
		command: 'waitForText',
		target: 'element',
		value: 'text'
	},
	{
		description: 'Checks (every 250 ms) if the target page\'s title matches the provided target.',
		command: 'waitForTitle',
		target: 'text',
		value: 'none'
	}
];

function addHelperText(command) {
	for(var i = 0; i < commands.length; i++) {
		if (reference[i]) {
			if(reference[i].command == command) {
				var titleString = "Description: " + window["reference"][i].description
								+ "\n" + "Command: " + window["reference"][i].command
								+ "\n" + "Target: " + window["reference"][i].target
								+ "\n" + "Value: " + window["reference"][i].value;
				return titleString;
			}
		}
	}
}

// TODO: have an onchage event for the select list to update it's title="" attribute
function updateSelectListHelperText(selectList) {
	selectList.title = addHelperText(selectList.value);
}