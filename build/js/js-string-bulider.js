function selectJsStringBuilder(selector,value){var jsString;if(value.startsWith('id=')){value=value.substring(3,value.length);jsString="var dd = "+selector+";"
+"for (var i = 0; i < dd.options.length; i++) {"
+" if (dd.options[i].id === '"+value+"') {"
+"  dd.selectedIndex = i;"
+"  break;"
+" }"
+"}";}
if(value.startsWith('index=')){value=value.substring(6,value.length);jsString=selector+".selectedIndex = '"+value+"'";}
if(value.startsWith('label=')){value=value.substring(6,value.length);jsString="var dd = "+selector+";"
+"for (var i = 0; i < dd.options.length; i++) {"
+" if (dd.options[i].text === '"+value+"') {"
+"  dd.selectedIndex = i;"
+"  break;"
+" }"
+"}";}
if(value.startsWith('value=')){value=value.substring(6,value.length);jsString=selector+".value  = '"+value+"'";}
return jsString;}