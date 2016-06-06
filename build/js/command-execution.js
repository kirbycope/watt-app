window.storage={};window.waitingForPageLoad;var interval;var intervalCount;function waitFor(jsString){if((intervalCount<120)&&(window.stop!=true)){webview.executeScript({code:jsString},function(result){if(result){if(result[0]){clearInterval(interval);window.result=true;completeTask();}else{intervalCount++;}}else{intervalCount++;}});}else{clearInterval(interval);if(window.stop!=true){document.log.push("    [Error] Timeout.");}
window.result=false;completeTask();}}
function waitForPageLoad(){window.waitingForPageLoad=true;}
function verifyElementExists(selector,callback){var jsString=selector+"!= null";try{webview.executeScript({code:jsString},function(result){if(result){callback();}else{document.log.push("    [Error] Cannot find element.");window.result=false;completeTask();}})}catch(err){document.log.push("    [Error] "+err);completeTask();}}
function clearAllCaches(){webview.clearData({},{appcache:true,cache:true,fileSystems:true,indexedDB:true,localStorage:true,webSQL:true},function(){window.result=true;completeTask();});}
function click(target){var selector=jsSelectorBuilder(target);verifyElementExists(selector,function(){var jsString=selector+".click()";webview.executeScript({code:jsString},function(){document.log.push("    [Warning] In JS, .click() will return null.");window.result=true;completeTask();})});}
function clickAndWait(target){var selector=jsSelectorBuilder(target);verifyElementExists(selector,function(){var jsString=selector+".click()";webview.executeScript({code:jsString},function(){waitForPageLoad();})});}
function deleteAllVisibleCookies(){webview.clearData({},{cookies:true},function(){window.result=true;completeTask();});}
function goBack(){webview.back(function(){window.result=true;completeTask();});}
function goBackAndWait(){if(webview.canGoBack()){webview.back(function(){waitForPageLoad();});}else{document.log.push("    [Error] Cannot go back in browser history.");window.result=false;completeTask();}}
function goForward(){webview.forward(function(){window.result=true;completeTask();});}
function goForwardAndWait(){if(webview.canGoForward()){webview.forward(function(){waitForPageLoad();});}else{document.log.push("    [Error] Cannot go forward in browser history.");window.result=false;completeTask();}}
function open(target){webview.src=url;window.result=true;completeTask();}
function openAndWait(target){window.aborted=false;window.loaded=false;var url=getFullUrl(target);webview.src=url;waitForPageLoad();}
function pause(target){setTimeout(function(){window.result=true;completeTask();},target);}
function refresh(){webview.reload(function(){window.result=true;completeTask();});}
function refreshAndWait(){window.aborted=false;window.loaded=false;webview.reload();waitForPageLoad();}
function runScript(target){webview.executeScript({code:target},function(){window.result=true;completeTask();})}
function runTestAsStep(target){tas_i=0;stepRunner();}
function select(target,value){var selector=jsSelectorBuilder(target);verifyElementExists(selector,function(){var jsString=selectJsStringBuilder(selector,value);webview.executeScript({code:jsString},function(){window.result=true;completeTask();})});}
function store(target,value){if(target.startsWith('javascript')){cleanedTarget=target.substring(11,(target.length-1));webview.executeScript({code:cleanedTarget},function(result){window.storage[value]=result[0];window.result=true;completeTask();})}
else{window.storage[value]=target;window.result=true;completeTask();}}
function submit(target){var selector=jsSelectorBuilder(target);verifyElementExists(selector,function(){var jsString=selector+".submit()";webview.executeScript({code:jsString},function(){window.result=true;completeTask();})});}
function type(target,value){var selector=jsSelectorBuilder(target);verifyElementExists(selector,function(){var jsString=selector+".value = '"+value+"'";webview.executeScript({code:jsString},function(){window.result=true;completeTask();})});}
function verifyChecked(target){var selector=jsSelectorBuilder(target);verifyElementExists(selector,function(){var jsString=selector+".checked";console.log(jsString);webview.executeScript({code:jsString},function(result){window.result=result[0];completeTask();})});}
function verifyElementPresent(target){var selector=jsSelectorBuilder(target);verifyElementExists(selector,function(){window.result=true;completeTask();});}
function verifyLocation(target){var url=getFullUrl(target);var location=webview.src;if(location.toUpperCase()==url.toUpperCase()){window.result=true;}else{document.log.push("    [Error] URL found: "+location);window.result=false;}
completeTask();}
function verifyNotChecked(target){var selector=jsSelectorBuilder(target);verifyElementExists(selector,function(){var jsString=selector+".checked == false";console.log(jsString);webview.executeScript({code:jsString},function(result){window.result=result[0];completeTask();})});}
function verifyText(target,value){var selector=jsSelectorBuilder(target);verifyElementExists(selector,function(){var jsString=selector+".textContent == '"+value+"'";webview.executeScript({code:jsString},function(result){window.result=result[0];completeTask();})});}
function verifyTitle(target){webview.executeScript({code:"document.title"},function(result){if(result[0]==target){window.result=true;}else{document.log.push("    [Error] Title found: "+result[0]);window.result=false;}
completeTask();});}
function waitForElementPresent(target){intervalCount=0;var selector=jsSelectorBuilder(target);var jsString=selector+"!= null";interval=setInterval(function(){waitFor(jsString)},250);}
function waitForLocation(target){intervalCount=0;var url=getFullUrl(target);var jsString="window.location.href == '"+url+"'";interval=setInterval(function(){waitFor(jsString)},250);}
function waitForText(target,value){intervalCount=0;var selector=jsSelectorBuilder(target);var jsString=selector+".textContent == '"+value+"'";interval=setInterval(function(){waitFor(jsString)},250);}
function waitForTitle(target){intervalCount=0;var jsString="document.title == \""+target+"\"";interval=setInterval(function(){waitFor(jsString)},250);}