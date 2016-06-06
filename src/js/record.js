// Code to be injected into the current page of the WebView when recording

// Element Highlighter
prevElement = null;
function elementHighlighter (e) {
	// Get the current element
	var elem = e.target || e.srcElement;
	// If there was a previous element, clear the highlighter from it
	if (prevElement!= null) {prevElement.classList.remove('mouseOn');}
	// Set the mouseover event for the new element
	elem.classList.add('mouseOn');
	// Set the current element to the previous element, so that it can be cleared when a new element is highlighted
	prevElement = elem;
};

// Click Event
function clickRecorder (e) {
	// Get clicked html element
	// http://stackoverflow.com/a/9012576
    e = e || window.event;
    var target = e.target || e.srcElement;
	// http://www.seleniumhq.org/docs/02_selenium_ide.jsp#locating-elements
	var action = "";
	var locator = "";
	var pattern = "";
	locator = getClickedElementTarget(target);
	// Handle <select> lists
	if (target.tagName == "SELECT") {
		action = "select";
		pattern = "index=" + target.options.selectedIndex;
	}
	else {
		action = "click";
	}
	// Build the message to send the Chrome App
	var message = {
		command: action,
		target: locator,
		value: pattern
	};
	// Communicate with Chrome app, handler is in app-onload.js
	document.messageSource.postMessage(message, document.messageOrigin);
};

// Add event listener(s)
document.addEventListener('mousemove', elementHighlighter, true);
document.addEventListener('click', clickRecorder, false);