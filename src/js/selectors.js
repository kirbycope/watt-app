// Background on Selectors and Selenium, http://www.seleniumhq.org/docs/02_selenium_ide.jsp#locating-elements

/*
function jqSelectorBuilder(target) {
	var jqSelector;
	// Create jQuery selector based on "id=" attribute
	if (target.startsWith("id=")) {
		var id = target.substring(3, target.length);
		jqSelector = "$('#" + id + "')";
	}
	// Create jQuery selector based on "name=" attribute
	if (target.startsWith("name=")) {
		var targetName;
		var targetType;
		var targetValue;
		var indexOfType = target.indexOf("type=");
		var indexOfValue = target.indexOf("value=");
		// If the 'target' does not contain "type=" or "value="
		if ( (indexOfType = - 1) && (indexOfValue = - 1) ) {
			// Trim name="" off the beginning
			targetName = target.substring(5, target.length);
			// Build selector string
			jqSelector = "$(\"[name='" + targetName + "']\").first()";
		}
		// If the 'target' does contain "type=" but not "value="
		if ( (indexOfType > - 1) && (indexOfValue = - 1) ) {
			// Get the type
			targetType = target.substring(indexOfType, target.length);
			// Get the name
			targetName = targetType.substring(5, (indexOfType - 5));
			// Build selector string
			jqSelector = "$(\"[name='" + targetName + "'][type='" + targetType + "']\").first()";
		}
		// If the 'target' does not contain "type=" but does contatin "value="
		if ( (indexOfType = 1) && (indexOfValue > - 1) ) {
			// Get the value
			targetValue = target.substring(indexOfValue, target.length);
			// Get the name
			targetName = targetType.substring(5, (indexOfValue - 5));
			// Build selector string
			jqSelector = "$(\"[name='" + targetName + "'][value='" + targetValue + "']\").first()";
		}
		// If the 'target' does contain "type=" and "value="
		if ( (indexOfType > - 1) && (indexOfValue > - 1) ) {
			// see which comes first, the chicken or the egg?
			// get the index of the latter one and then trim
			// then get the former one
			if (indexOfType > indexOfValue) {
				// Get the type
				targetType = target.substring(indexOfType, target.length);
				// Get the value
				targetValue = target.substring(indexOfValue, target.length);
				// Get the name
				targetName = targetType.substring(5, (indexOfValue - 5));
				
			} else {
				// Get the value
				targetValue = target.substring(indexOfValue, target.length);
				// Get the type
				targetType = target.substring(indexOfType, target.length);
				// Get the name
				targetName = targetType.substring(5, (indexOfType - 5));
			}
			
			jqSelector = "$(\"[name='" + targetName + "'][type='" + targetType + "'][value='" + targetValue + "']\").first()";
		}
	}
	// Create jQuery selector based on Link Text Content
	if (target.startsWith("link=")) { 
		var targetLink = target.substring(5, target.length);
		jqSelector = "$(\"a:contains('" + targetLink + "')\")[0]";
	}
	// Create jQuery selector based on XPath
	if (target.startsWith("xpath=")) {
		var targetLink = target.substring(6, target.length);
		jqSelector = "$(\"" + target + "\")";
	}
	
	return jqSelector;
}
*/

function jsSelectorBuilder(target) {
	var jsSelector;
	// Create javascript selector based on "id=" attribute
	if (target.startsWith("id=")) {
		var id = target.substring(3, target.length);
		jsSelector = "document.getElementById('" + id + "')";
	}
	// Create javascript selector based on "name=" attribute
	if (target.startsWith("name=")) {
		var targetName;
		var targetType;
		var targetValue;
		var indexOfType = target.indexOf("type="); // returns -1 if not found
		var indexOfValue = target.indexOf("value="); // returns -1 if not found
		// If the 'target' does not contain "type=" or "value="
		if ( (indexOfType < 0) && (indexOfValue < 0) ) {
			// Trim name="" off the beginning
			targetName = target.substring(5, target.length);
			// Build selector string
			jsSelector = "document.querySelector('[name=" + targetName + "]')";
		}
		// If the 'target' does contain "type=" but not "value="
		if ( (indexOfType >= 0) && (indexOfValue < 0) ) {
			// Get the type
			targetType = target.substring(indexOfType + 5, target.length);
			// Get the name
			targetName = target.substring(5, (indexOfType - 1));
			// Build selector string
			jsSelector = "document.querySelector('[name=" + targetName + "][type="+ targetType + "]')";
		}
		// If the 'target' does not contain "type=" but does contatin "value="
		if ( (indexOfType < 0) && (indexOfValue >= 0) ) {
			// Get the value
			targetValue = target.substring(indexOfValue + 6, target.length);
			// Get the name
			targetName = target.substring(5, (indexOfValue - 1));
			// Build selector string
			jsSelector = "document.querySelector('[name=" + targetName + "][value=" + targetValue + "]')";
		}
		// If the 'target' does contain "type=" and "value="
		if ( (indexOfType >= 0) && (indexOfValue >= 0) ) {
			// see which comes first, the chicken or the egg?
			// get the index of the latter one and then trim
			// then get the former one
			if (indexOfType > indexOfValue) {
				// Get the value
				targetValue = target.substring((indexOfValue + 6), (indexOfType - 1));
				// Get the type
				targetType = target.substring((indexOfType + 5), target.length);
				// Get the name
				targetName = target.substring(5, (indexOfValue - 1));
			} else {
				// Get the type
				targetType = target.substring(indexOfType + 5, (indexOfValue - 1));
				// Get the value
				targetValue = target.substring((indexOfValue + 6), target.length);
				// Get the name
				targetName = target.substring(5, (indexOfType - 1));
			}
			jsSelector = "document.querySelector('[name=" + targetName + "][type="+ targetType + "][value=" + targetValue + "]')";
		}
	}
	// Create javascript selector based on Link Text Content
	if (target.startsWith("link=")) {
		var targetLink = target.substring(5, target.length);
		targetLink = targetLink.replace("'", "\\'"); // Replace single quote(s) with an escaped single quote
		jsSelector = "document.evaluate('//*[text()=\"" + targetLink + "\"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0)";
	}
	// Create javascript selector based on XPath
	if (target.startsWith("xpath=")) {
		var targetXpath = target.substring(6, target.length);
		jsSelector = "document.evaluate(\"" + targetXpath + "\", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0)";
	}
	// Create javascript selector based on CSS
	if (target.startsWith("css=")) {
		var targetCss = target.substring(4, target.length);
		jsSelector = "document.querySelector('" + targetCss + "')";
	}
	
	return jsSelector;
}