window.aborted;
window.loaded;
window.loading;
window.clickedElementTarget;
window.clickedElementValue;

function updateNavigationButtons() {
	if (webview.canGoBack()) {
		document.getElementById("webview-back").style["background-image"] = "";
	}
	else {
		document.getElementById("webview-back").style["background-image"] = "url('/img/arrow-left-02_gray.png')";
	}
	if (webview.canGoForward()) {
		document.getElementById("webview-forward").style["background-image"] = "";
	}
	else {
		document.getElementById("webview-forward").style["background-image"] = "url('/img/arrow-right-02_gray.png')";
	}
};

function updateReloadButton() {
	if (window.loading) {
		document.getElementById("webview-refresh").title =  "Stop";
		document.getElementById("webview-refresh").style["background-image"] =  "url('/img/close-01_white.png')";
		document.getElementById("webview-refresh").onclick = function () {
			webview.stop();
		};
	}
	else {
		document.getElementById("webview-refresh").title =  "Refresh";
		document.getElementById("webview-refresh").style["background-image"] = "";
		document.getElementById("webview-refresh").onclick = function () {
			webviewReload();
		}
	}
}

onload = function() {
	// https://developer.chrome.com/apps/tags/webview#event-loadabort
	var loadabort = function() {
		//console.log("[WebView] aborted."); // DEBUGGING
		window.aborted = true;
		window.loading = false;
		// Update UI
		updateReloadButton();
	}
	// https://developer.chrome.com/apps/tags/webview#event-loadstart
	var loadstart = function() {
		//console.log("[WebView] loading..."); // DEBUGGING
		window.loading = true;
		// Update UI
		updateReloadButton();
	}
	// https://developer.chrome.com/apps/tags/webview#event-loadstop
	var loadstop = function() {
		//console.log("[WebView] loaded."); // DEBUGGING
		window.loaded = true;
		window.loading = false;
		// Update UI
		document.getElementById("webview-url").value = webview.src;
		updateNavigationButtons();
		updateReloadButton();
		
		//  if the page loaded sucessfully...
		if (!window.aborted) {
			// ... inject the communication code
			webview.executeScript({
				file: "js/webview-communication.js"},
				function(result){
					//console.log("Injected communication code into the WebView"); // DEBUGGING
					// Initialize communications
					webview.contentWindow.postMessage('hello, webpage!', webview.src);
				}
			);
			// Inject a script to the webview to tell the app what element is clicked
			webview.executeScript({
				code: "(typeof getClickedElement == 'function')"},
				function(result){
					if (result[0] != true) {
						// ... inject script
						webview.executeScript({
							file: 'js/context-menu-helper.js'
						},
						function(){
							//console.log('injected context menu helper'); // DEBUGGING
						});
					}
				}
			);
		}
		
		// If record was clicked and still set to true...
		if (window.record) {
			// Check if record script already injected
			webview.executeScript({
				code: "(typeof clickRecorder == 'function')"},
				function(result){
					if (result[0] != true) {
						// ... inject record script
						injectRecordScript(); // in playback-controls.js
					}
				}
			);
		}
		
		// If a test step is waiting for the page to load
		if (window.waitingForPageLoad){
			if (window.aborted) {
				// write error message to the log
				document.log.push("    [Error] Page load was aborted.");
				window.result = false;
			} else {
				window.result = window.loaded; // should always be true, except in the case of catastrophic failure
			}
			window.waitingForPageLoad = false;
			// Trigger the next task
			completeTask();
		}
	}
	// Add event listeners to the webview
	webview.addEventListener("loadabort", loadabort);
	webview.addEventListener("loadstart", loadstart);
	webview.addEventListener("loadstop", loadstop);
}