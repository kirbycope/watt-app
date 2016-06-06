function getBaseUrl() {
	var baseUrl = document.getElementById("base-url").value;
	
	if (baseUrl) {
		if (baseUrl.endsWith('/')) {
			//trim off the trailing "/"
			baseUrl = baseUrl.substring(0, baseUrl.length - 1);
		}
	}
	
	return baseUrl;
}

function getEndpoint() {
	var baseUrl = getBaseUrl();
	var url = document.getElementById("webview-url").value
	var returnValue = url;
	
	if (baseUrl) {
		if (url.startsWith(baseUrl)) {
			returnValue = url.substring(baseUrl.length);
		}
	}
	
	return returnValue;
}

function getFullUrl(endpoint) {
	var baseUrl = getBaseUrl();
	var returnValue = endpoint;
	
	if (baseUrl) {
		returnValue = baseUrl + endpoint;
	}
	
	return returnValue;
}