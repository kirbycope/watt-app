function toggleMenu(){var visibility=document.getElementById("floating-menu").style["visibility"];if(visibility!="visible"){document.getElementById("floating-menu").style["visibility"]="visible";}else{document.getElementById("floating-menu").style["visibility"]="hidden";}}
function webviewReload(){if(window.record){createTestSteps("Refresh","refreshAndWait");}
webview.reload();}
document.getElementById("webview-back").onclick=function(){if(webview.canGoBack()){if(window.record){createTestSteps("Go back","goBackAndWait");}
webview.back();}}
document.getElementById("webview-forward").onclick=function(){if(webview.canGoForward()){if(window.record){createTestSteps("Go forward","goForwardAndWait");}
webview.forward();}}
document.getElementById("webview-refresh").onclick=function(){webviewReload();}
document.getElementById("webview-url").onkeydown=function(event){if(event.keyCode==13){if(window.record){createTestSteps("Navigate to: "+getEndpoint(),"openAndWait",getEndpoint());}
webview.src=(event.target.value);}};document.getElementById("webview-menu").onclick=function(){toggleMenu();}
document.getElementById("verify-location").onclick=function(){createTestSteps("Verify Location: "+getEndpoint(),"waitForLocation",getEndpoint());toggleMenu();}
document.getElementById("verify-title").onclick=function(){webview.executeScript({code:"document.title"},function(result){createTestSteps("Verify Title: "+result[0],"waitForTitle",result[0]);toggleMenu();});}
document.getElementById("clear-all-caches").onclick=function(){createTestSteps("Clear All Caches (Not Supported in Selenium)","clearAllCaches");webview.clearData({},{appcache:true,cache:true,fileSystems:true,indexedDB:true,localStorage:true,webSQL:true});toggleMenu();}
document.getElementById("clear-all-cookies").onclick=function(){createTestSteps("Clear All Cookies","deleteAllVisibleCookies");webview.clearData({},{cookies:true});toggleMenu();}
document.getElementById("resize-mobile").onclick=function(){chrome.app.window.current().outerBounds.width=648;toggleMenu();}
document.getElementById("resize-mobile-wide").onclick=function(){chrome.app.window.current().outerBounds.width=821;toggleMenu();}
document.getElementById("resize-tablet").onclick=function(){chrome.app.window.current().outerBounds.width=981;toggleMenu();}
document.getElementById("resize-desktop").onclick=function(){chrome.app.window.current().outerBounds.width=1301;toggleMenu();}
document.getElementById("resize-desktop-wide").onclick=function(){chrome.app.window.current().outerBounds.width=1621;toggleMenu();}