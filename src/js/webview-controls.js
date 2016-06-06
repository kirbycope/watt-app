// Note: 'Stop' is in webview-onload.js

function toggleMenu() {
	var visibility = document.getElementById("floating-menu").style["visibility"];
	if (visibility != "visible") {
		document.getElementById("floating-menu").style["visibility"] = "visible";
	} else {
		document.getElementById("floating-menu").style["visibility"] = "hidden";
	}
}

function webviewReload() {
	if (window.record) {
		// add test step
		createTestSteps("Refresh", "refreshAndWait"); // in add-test-step.js
	}
	
	webview.reload();
}

// Set click event for back button
document.getElementById("webview-back").onclick = function () {
	if(webview.canGoBack()) {
		if (window.record) {
			// add test step
			createTestSteps("Go back", "goBackAndWait"); // in add-test-step.js
		}
		
		webview.back();
	}
}

// Set click event for forward button
document.getElementById("webview-forward").onclick = function () {
	if (webview.canGoForward()) {
		if (window.record) {
			// add test step
			createTestSteps("Go forward", "goForwardAndWait"); // in add-test-step.js
		}
		
		webview.forward();
	}
}

// Set click event for refresh button
document.getElementById("webview-refresh").onclick = function () {
	webviewReload();
}

// Set the Enter key action on the URL field
document.getElementById("webview-url").onkeydown = function(event) {
	if (event.keyCode == 13) {
		if (window.record) {
			// add test step
			createTestSteps(
				  "Navigate to: " + getEndpoint() // getEndpoint in base-url.js
				, "openAndWait"
				, getEndpoint()
			); // in add-test-step.js
		}
		
		webview.src = (event.target.value);
	 }
};

// Set click event for menu button
document.getElementById("webview-menu").onclick = function () {
	toggleMenu();
}

// Set click event for verify location option
document.getElementById("verify-location").onclick = function () {
	// add test step
	createTestSteps(
		  "Verify Location: " + getEndpoint()
		, "waitForLocation"
		, getEndpoint()
	); // in add-test-step.js
	
	toggleMenu();
}

// Set click event for verify title option
document.getElementById("verify-title").onclick = function () {
	// Get the current page title
	webview.executeScript(
		{
			code: "document.title"
		},
		function (result) {
			// add test step
			createTestSteps(
				  "Verify Title: " + result[0]
				, "waitForTitle"
				, result[0]
			); // in add-test-step.js
			
			toggleMenu();
		}
	);
}

// Set click event for clear all caches option
document.getElementById("clear-all-caches").onclick = function () {
	// add test step
	createTestSteps("Clear All Caches (Not Supported in Selenium)", "clearAllCaches"); // in add-test-step.js
	
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
		}
	);
		
	toggleMenu();
}

// Set click event for clear all cookies option
document.getElementById("clear-all-cookies").onclick = function () {
	// add test step
	createTestSteps("Clear All Cookies", "deleteAllVisibleCookies"); // in add-test-step.js
	
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
		}
	);
	
	toggleMenu();
}

// Set click event for rezise mobile option
document.getElementById("resize-mobile").onclick = function () {
	chrome.app.window.current().outerBounds.width = 648; //320 http://www.mydevice.io/
	
	toggleMenu();
}

// Set click event for rezise mobile-wide option
document.getElementById("resize-mobile-wide").onclick = function () {
	chrome.app.window.current().outerBounds.width = 821; //480 http://www.mydevice.io/
	
	toggleMenu();
}

// Set click event for rezise tablet option
document.getElementById("resize-tablet").onclick = function () {
	chrome.app.window.current().outerBounds.width = 981; //640 http://www.mydevice.io/
	
	toggleMenu();
}

// Set click event for rezise desktop option
document.getElementById("resize-desktop").onclick = function () {
	chrome.app.window.current().outerBounds.width = 1301; //960 http://www.mydevice.io/
	
	toggleMenu();
}

// Set click event for rezise desktop-wide option
document.getElementById("resize-desktop-wide").onclick = function () {
	chrome.app.window.current().outerBounds.width = 1621; //1280 http://www.mydevice.io/
	
	toggleMenu();
}