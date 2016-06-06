/*
	:: Notes ::
	- All scripts are ran in a webview
	-- https://developer.chrome.com/apps/tags/webview
	- Scripts are executed using, <webview>.executeScript( InjectDetails details, function callback)
	-- https://developer.chrome.com/apps/tags/webview#method-executeScript
*/

window.storage = {}; // For the store() command
window.waitingForPageLoad;

/* HELPERS **************************************************************************/
var interval;
var intervalCount;
// Waits up to 30 seconds for the jsString to result in true
function waitFor(jsString) {
	// 120 * 250ms = 30,000ms -> 30 seconds
	if ((intervalCount < 120) && (window.stop != true)) {
		// execute script in webview
		webview.executeScript({
			code: jsString
		},
		function (result) {
			if (result) {
				if (result[0]){
					clearInterval(interval);
					// Handle result
					window.result = true;
					// Trigger the next task
					completeTask();
				} else {
					intervalCount++;
				}
			} else {
				intervalCount++;
			}
		});
	} else {
		clearInterval(interval);
		// write error message to the log
		if (window.stop != true) {
			document.log.push("    [Error] Timeout.");
		}
		// Fail the test, element not found
		window.result = false;
		// Trigger the next task
		completeTask();
	}
}

function waitForPageLoad() {
	window.waitingForPageLoad = true;
}

function verifyElementExists(selector, callback) {
	var jsString = selector + "!= null";
	//console.log(jsString); // DEBUGGING
	// execute script in webview
	try {
		webview.executeScript({
			code: jsString
		},
		function(result) {
			if (result) {
				//if (result[0]) {
					callback();
				//}
			} else {
				// write error message to the log
				document.log.push("    [Error] Cannot find element.");
				// Fail the test, element not found
				window.result = false;
				// Trigger the next task
				completeTask();
			}
		})
	} catch (err) {
		// write error message to the log
		document.log.push("    [Error] " + err);
		// Trigger the next task
		completeTask();
	}
}

/* COMMANDS **************************************************************************/
function clearAllCaches() {
	webview.clearData({
			// ClearDataOptions
		},
		{ 	// ClearDataTypeSet
			appcache: true,
			cache: true,
			//cookies:true,
			fileSystems: true,
			indexedDB: true,
			localStorage: true,
			webSQL: true
		},
		function() {
			// Set the result
			window.result = true;
			// Trigger the next task
			completeTask();
		}
	);
}

function click(target) {
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);
	// Verify element present
	verifyElementExists(selector, function() {
		var jsString = selector + ".click()";
		// execute script in webview
		webview.executeScript({
			code: jsString
		},
		function() {
			// write warning to the log
			document.log.push("    [Warning] In JS, .click() will return null.");
			// Handle result
			window.result = true;
			// Trigger the next task
			completeTask();
		})
	});
}

function clickAndWait(target) {
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);
	// Verify element present
	verifyElementExists(selector, function() {
		var jsString = selector + ".click()";
		// execute script in webview
		webview.executeScript({
			code: jsString
		},
		function() {
			waitForPageLoad();
		})
	});
}

function deleteAllVisibleCookies() {
	// <webview>.clearData( ClearDataOptions options, ClearDataTypeSet types, function callback)
	// https://developer.chrome.com/apps/tags/webview#method-clearData
	webview.clearData({
			// ClearDataOptions
		},
		{	// ClearDataTypeSet
			//appcache,
			//cache,
			cookies: true
			//fileSystems,
			//indexedDB,
			//localStorage,
			//webSQL
		},
		function(){
			// Set the result
			window.result = true;
			// Trigger the next task
			completeTask();
		}
	);
}

function goBack() {
	/*
	// write warning to the log
	document.log.push("    [Warning] goBack() is brittle, so using goBackAndWait() instead.");
	goBackAndWait();
	*/
	
	webview.back( function(){
		window.result = true;
		// Trigger the next task
		completeTask();
	});
}

function goBackAndWait() {
	// boolean <webview>.canGoBack()
	// https://developer.chrome.com/apps/tags/webview#method-canGoBack
	if(webview.canGoBack()) {
		// <webview>.back(function callback)
		// https://developer.chrome.com/apps/tags/webview#method-back
		webview.back( function(){
			waitForPageLoad();
		});
	} else {
		// write error message to the log
		document.log.push("    [Error] Cannot go back in browser history.");
		window.result = false;
		// Trigger the next task
		completeTask();
	}
}

function goForward() {
	/*
	// write warning to the log
	document.log.push("    [Warning] goForward() is brittle, so using goForwardAndWait() instead.");
	goForwardAndWait();
	*/
	
	webview.forward( function(){
		window.result = true;
		// Trigger the next task
		completeTask();
	});
}

function goForwardAndWait() {
	// boolean <webview>.canGoForward()
	// https://developer.chrome.com/apps/tags/webview#method-canGoForward
	if(webview.canGoForward()) {
		// <webview>.forward(function callback)
		// https://developer.chrome.com/apps/tags/webview#method-forward
		webview.forward( function() {
			waitForPageLoad();
		});
	} else {
		// write error message to the log
		document.log.push("    [Error] Cannot go forward in browser history.");
		window.result = false;
		// Trigger the next task
		completeTask();
	}
}

function open(target) {
	/*
	// write warning to the log
	document.log.push("    [Warning] open() is brittle, so using openAndWait() instead.");
	openAndWait(target);
	*/
	webview.src = url;
	window.result = true;
	// Trigger the next task
	completeTask();
}

function openAndWait(target) {
	// Reset flags related to navigation
	window.aborted = false;
	window.loaded = false;
	// Change the WebView's URL, similar to 'window.location.href'
	var url = getFullUrl(target);
	// <webview>.src
	// https://developer.chrome.com/apps/tags/webview#src
	webview.src = url;
	waitForPageLoad();
}

function pause(target) {
	setTimeout(
		function(){
			window.result = true;
			// Trigger the next task
			completeTask();
		},
		target // time in milliseconds
	);
}

function refresh() {
	webview.reload( function(){
		window.result = true;
		// Trigger the next task
		completeTask();
	});
}

function refreshAndWait() {
	// Reset flags related to navigation
	window.aborted = false;
	window.loaded = false;
	// <webview>.reload()
	// https://developer.chrome.com/apps/tags/webview#method-reload
	webview.reload();
	waitForPageLoad();
}

function runScript(target) {
	// execute script in webview
	webview.executeScript({
		code: target
	},
	function() {
		// Handle result
		window.result = true;
		// Trigger the next task
		completeTask();
	})
}

function runTestAsStep(target) {
	// Set/Reset the runTestAsStep Index
	tas_i = 0;
	
	stepRunner(); // in test-as-step.js
}

function select(target, value) {
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);  // in 'selectors.js'
	// Verify element present
	verifyElementExists(selector, function() {
		// get js string
		var jsString = selectJsStringBuilder(selector, value); // in 'js-string-bulider.js'
		// execute script in webview
		webview.executeScript({
			code: jsString
		},
		function() {
			// Handle result
			window.result = true;
			// Trigger the next task
			completeTask();
		})
	});
}

function store(target, value) {
	if (target.startsWith('javascript')){
		// remove the javascript wrapper
		cleanedTarget = target.substring(11, (target.length - 1));
		// execute script in webview
		webview.executeScript({
			code: cleanedTarget
		},
		function(result) {
			window.storage[value] = result[0];
			// Set the result
			window.result = true;
			// Trigger the next task
			completeTask();
		})
	}
	else {
		window.storage[value] = target;
		// Set the result
		window.result = true;
		// Trigger the next task
		completeTask();
	}
}

function submit(target) {
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);
	// Verify element present
	verifyElementExists(selector, function() {
		// get js string
		var jsString = selector + ".submit()";
		// execute script in webview
		webview.executeScript({
			code: jsString
		},
		function() {
			// Handle result
			window.result = true;
			// Trigger the next task
			completeTask();
		})
	});
}

function type(target, value) {
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);
	// Verify element present
	verifyElementExists(selector, function() {
		var jsString = selector + ".value = '" + value + "'";
		// execute script in webview
		webview.executeScript({
			code: jsString
		},
		function() {
			// Handle result
			window.result = true;
			// Trigger the next task
			completeTask();
		})
	});
}

function verifyChecked(target) {
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);
	// Verify element present
	verifyElementExists(selector, function() {
		var jsString = selector + ".checked";
		console.log(jsString);
		// execute script in webview
		webview.executeScript({
			code: jsString
		},
		function(result) {
			// Handle result
			window.result = result[0];
			// Trigger the next task
			completeTask();
		})
	});
}

function verifyElementPresent(target) {
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);
	// Verify element present
	verifyElementExists(selector, function() {
		// Handle result
		window.result = true; // We only get here if the callback is called and thats only called it the element was found.
		// Trigger the next task
		completeTask();
	});
}

function verifyLocation(target) {
	// Get the full expected url
	var url = getFullUrl(target);
	// Get the location
	var location = webview.src;
	// Make case-insensitive check
	if (location.toUpperCase() == url.toUpperCase()) {
		window.result = true;
	} else {
		// write error message to the log
		document.log.push("    [Error] URL found: " + location);
		window.result = false;
	}
	// Trigger the next task
	completeTask();
}

function verifyNotChecked(target) {
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);
	// Verify element present
	verifyElementExists(selector, function() {
		var jsString = selector + ".checked == false";
		console.log(jsString);
		// execute script in webview
		webview.executeScript({
			code: jsString
		},
		function(result) {
			// Handle result
			window.result = result[0];
			// Trigger the next task
			completeTask();
		})
	});
}

function verifyText(target, value) {
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);
	// Verify element present
	verifyElementExists(selector, function() {
		var jsString = selector + ".textContent == '" + value + "'";
		// execute script in webview
		webview.executeScript({
			code: jsString
		},
		function(result) {
			// Handle result
			window.result = result[0];
			// Trigger the next task
			completeTask();
		})
	});
}

function verifyTitle(target) {
	// Get the document title
	webview.executeScript({
		code: "document.title"
		},
		function(result){
			// Set the result
			if (result[0] == target) {
				window.result = true;
			} else {
				// write error message to the log
				document.log.push("    [Error] Title found: " + result[0]);
				window.result = false;
			}
			// Trigger the next task
			completeTask();
		}
	);
}

function waitForElementPresent(target) {
	// Set/Reset interval counter
	intervalCount = 0;
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);
	// Create the JS string
	var jsString = selector + "!= null";
	// Wait for the element to be found
	interval = setInterval( function() { waitFor(jsString) }, 250);
}

function waitForLocation(target) {
	// Set/Reset interval counter
	intervalCount = 0;
	// Get the full url
	var url = getFullUrl(target);
	// Create the JS string
	var jsString = "window.location.href == '" + url + "'";
	// Wait for the urls to match
	interval = setInterval( function() { waitFor(jsString) }, 250);
}

function waitForText(target, value) {
	// Set/Reset interval counter
	intervalCount = 0;
	// Create the JS Selector
	var selector = jsSelectorBuilder(target);
	// Create the JS string
	var jsString = selector + ".textContent == '" + value + "'";
	// Wait for the text to match
	interval = setInterval( function() { waitFor(jsString) }, 250);
}

function waitForTitle(target) {
	// Set/Reset interval counter
	intervalCount = 0;
	// Create the JS string
	var jsString = "document.title == \"" + target + "\"";
	// Wait for the titles to match
	interval = setInterval( function() { waitFor(jsString) }, 250);
}