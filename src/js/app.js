/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
	// Center window on screen.
	var screenHeight = screen.availHeight;
	var screenWidth = screen.availWidth;
	var height = 480;
	var width = 320;

	chrome.app.window.create('index.html', {
		id: "qAspireID",
		innerBounds: {
			minWidth: width,
			minHeight: height
		},
		outerBounds: {
			width: width,
			height: height,
			left: Math.round((screenWidth-width)/2),
			top: Math.round((screenHeight-height)/2)
		}
	});
});