function selectJsStringBuilder(selector, value) {
	var jsString;
	// value: id=""
	if (value.startsWith('id=')) {
		value = value.substring(3, value.length);
		jsString = 
			 "var dd = " + selector + ";"
			+"for (var i = 0; i < dd.options.length; i++) {"
			+"	if (dd.options[i].id === '" + value + "') {"
			+"		dd.selectedIndex = i;"
			+"		break;"
			+"	}"
			+"}";
	}
	// value: index=""
	if (value.startsWith('index=')) {
		value = value.substring(6, value.length);
		jsString = selector + ".selectedIndex = '" + value + "'";
	}
	// value: label=""
	if (value.startsWith('label=')) {
		value = value.substring(6, value.length);
		// http://stackoverflow.com/a/3989404 | 'JavaScript: set dropdown selected item based on option text'
		jsString = 
			 "var dd = " + selector + ";"
			+"for (var i = 0; i < dd.options.length; i++) {"
			+"	if (dd.options[i].text === '" + value + "') {"
			+"		dd.selectedIndex = i;"
			+"		break;"
			+"	}"
			+"}";
	}
	// value: value=""
	if (value.startsWith('value=')) {
		value = value.substring(6, value.length);
		jsString = selector + ".value  = '" + value + "'";
	}
	
	return jsString;
}