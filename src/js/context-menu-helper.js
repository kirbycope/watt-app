// http://stackoverflow.com/a/12222317
function getCssPath(el) {
	if (!(el instanceof Element)) 
		return;
	var path = [];
	while (el.nodeType === Node.ELEMENT_NODE) {
		var selector = el.nodeName.toLowerCase();
		if (el.id) {
			selector += '#' + el.id;
			path.unshift(selector);
			break;
		} else {
			var sib = el, nth = 1;
			while (sib = sib.previousElementSibling) {
				if (sib.nodeName.toLowerCase() == selector)
				   nth++;
			}
			if (nth != 1)
				selector += ":nth-of-type("+nth+")";
		}
		path.unshift(selector);
		el = el.parentNode;
	}
	return path.join(" > ");
}

// http://stackoverflow.com/a/5178132
function getXpath(el) { 
    var allNodes = document.getElementsByTagName('*'); 
    for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) 
    { 
        if (elm.hasAttribute('id')) { 
                var uniqueIdCount = 0; 
                for (var n=0;n < allNodes.length;n++) { 
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++; 
                    if (uniqueIdCount > 1) break; 
                }; 
                if ( uniqueIdCount == 1) { 
                    segs.unshift('id("' + elm.getAttribute('id') + '")'); 
                    return segs.join('/'); 
                } else { 
                    segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]'); 
                } 
        } else if (elm.hasAttribute('class')) { 
            segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]'); 
        } else { 
            for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
                if (sib.localName == elm.localName)  i++; }; 
                segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
        }; 
    }; 
    return segs.length ? '/' + segs.join('/') : null; 
};

function getClickedElementTarget(target){
	var locator = '';
	// Locating by Id, http://www.seleniumhq.org/docs/02_selenium_ide.jsp#locating-by-id
	if (!!target.getAttribute('id')) {
		locator = "id=" + target.getAttribute('id');
	}
	// Locating by Name, http://www.seleniumhq.org/docs/02_selenium_ide.jsp#locating-by-name
	else if (!!target.getAttribute('name')) {
		locator = "name=" + target.getAttribute('name');
		var type = target.getAttribute('type');
		if (type) {
			locator = locator + " type=" + type;
		}
		var value = target.getAttribute('value');
		if (value) {
			locator = locator + " value=" + value;
		}
	}
	// Locating Hyperlinks by Link Text, http://www.seleniumhq.org/docs/02_selenium_ide.jsp#locating-hyperlinks-by-link-text
	else if ( (target.tagName == "A") && (!!target.textContent) ) {
		locator = "link=" + target.textContent;
	}
	// Locating by CSS, http://www.seleniumhq.org/docs/02_selenium_ide.jsp#locating-by-css
	else {
		var cssPath = getCssPath(target);
		locator = "css=" + cssPath;
	}
	// Locating by XPath, http://www.seleniumhq.org/docs/02_selenium_ide.jsp#locating-by-xpath
	// Used as a last resort!
	if ((locator == "") || (locator == "css=")) {
		var xPath = getXpath(el)
		locator = "xpath=" + xPath;
	}
	return locator;
}

function getClickedElement(e){
	// If it was a right-click
    if(event.button == 2) { 
        // Get clicked html element
		// http://stackoverflow.com/a/9012576
		e = e || window.event;
	//////
		var target = e.target || e.srcElement;
		var locator = getClickedElementTarget(target);
		var content = target.textContent;
	//////
		// Build the message to send the Chrome App
		var message = {
			command: '',
			target: locator,
			value: content
		};
		// Communicate with Chrome app, handler is in app-onload.js
		document.messageSource.postMessage(message, document.messageOrigin);
    }
}

document.addEventListener('mousedown', getClickedElement, true);