window.record;window.stop;function clearTestResults(){document.log=[];var testSteps=document.getElementById("test-steps-container").children;for(var i=0;i<testSteps.length;i++){document.getElementById("test-steps-container").children[i].children[0].children[3].children[0].style["background-color"]="";}}
function startTest(){if(window.record){document.getElementById("record-button").click();}
window.stop=false;clearTestResults();q_i=0;document.getElementById("status-span").innerHTML="Running...";document.getElementById("status-span").style.visibility="visible";var currentdate=new Date();var datetime=currentdate.getHours()+":"
+currentdate.getMinutes()+":"
+currentdate.getSeconds();document.log.push("TEST STARTED @ "+datetime);next_task();}
document.getElementById("play-button").onclick=function(){if(document.getElementById("test-steps-container").children.length>0){var testAsStep=checkForTestAsStep();if(testAsStep){var pendingRequests=checkForPendingRequests();if(pendingRequests){document.getElementById("file-select-modal").style.display="block";}else{startTest();}}
else{startTest();}}}
document.getElementById("stop-button").onclick=function(){if(q_i>0){window.stop=true;document.log.push("    [Error] Test execution stopped.");}}
document.getElementById("clear-results-button").onclick=function(){document.getElementById("status-span").style.visibility="hidden";clearTestResults();}
function injectRecordScript(){webview.insertCSS({code:".mouseOn{"
+"background-color: #bcd5eb !important;"
+"outline: 2px solid #5166bb !important;"},function(){webview.executeScript({file:'js/record.js'},function(){})});}
document.getElementById("record-button").onclick=function(){if(window.record){window.record=false;webview.executeScript({code:"if (prevElement!= null) {prevElement.classList.remove('mouseOn');}"
+"document.removeEventListener('mousemove', elementHighlighter, true);"
+"document.removeEventListener('click', clickRecorder, false);"},function(){document.getElementById("record-button").title="Start Recording";document.getElementById("record-button").setAttribute('class','recording-off');});}
else{window.record=true;document.getElementById("record-button").title="Stop Recording";document.getElementById("record-button").setAttribute('class','recording-on');webview.executeScript({code:"(typeof clickRecorder == 'function')"},function(result){if(result[0]!=true){injectRecordScript();}else{webview.executeScript({code:"document.addEventListener('mousemove', elementHighlighter, true);"
+"document.addEventListener('click', clickRecorder, false);"});}});}}