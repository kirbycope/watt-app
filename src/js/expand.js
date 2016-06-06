// Use this to pin down the right values, http://howbigismybrowser.com/
window.collapsedWidth = 320;
window.expandedWidth = 1321;

document.getElementById("toolbar-expand").onclick = function () {
	
	var title = document.getElementById("toolbar-expand").getAttribute("title");
	if (title == "Expand Browser Window") {
		document.getElementById("test-step-section").setAttribute("class", "test-step-section");
		document.getElementById("toolbar-expand").setAttribute("class", "toolbar-expand-collapse");
		document.getElementById("toolbar-expand").setAttribute("title", "Collapse Browser Window");
		document.getElementById("webview-section").setAttribute("class", "webview-section-on");
		
		window.collapsedWidth = chrome.app.window.current().outerBounds.width;
		chrome.app.window.current().outerBounds.width = window.expandedWidth;
		
	}
	else {
		document.getElementById("test-step-section").setAttribute("class", "test-step-section-expand");
		document.getElementById("toolbar-expand").setAttribute("class", "toolbar-expand-default");
		document.getElementById("toolbar-expand").setAttribute("title", "Expand Browser Window");
		document.getElementById("webview-section").setAttribute("class", "webview-section");
		
		window.expandedWidth = chrome.app.window.current().outerBounds.width;
		chrome.app.window.current().outerBounds.width = window.collapsedWidth;
	}
}