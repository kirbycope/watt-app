window.result;var q_i;var command;var target;var value;var continueOnFailure;var execute;var tas_i;function completeTask(){if(command=="runTestAsStep"){if(window.result){document.log.push("        Result: Pass");var varName=target.substring(0,target.indexOf('.html'));if((tas_i+1)<window[varName].children.length){tas_i++;stepRunner();}else{passTestStep();}}
else if(window.result==false){failTestStep();}
else{skipTestStep();}}else{if(window.result==true){passTestStep();}
else if(window.result==false){failTestStep();}
else{skipTestStep();}}}
function failTestStep(){document.log.push("    Result: Fail");var testStepContainer=document.getElementById("test-steps-container").children[q_i];testStepContainer.children[0].children[3].children[0].style["background-color"]="rgb(242, 222, 222)";document.getElementById("status-span").innerHTML="Failed!";if(testStepContainer.children[0].children[1].getAttribute("class")=="test-step-expand"){testStepContainer.children[0].children[1].click();}
if(testStepContainer.children[1].children[3].children[1].checked){q_i++;next_task();}else{appendLogLink();}}
function passTestStep(){document.log.push("    Result: Pass");var testStepContainer=document.getElementById("test-steps-container").children[q_i];if(testStepContainer){testStepContainer.children[0].children[3].children[0].style["background-color"]="rgb(223, 240, 216)";}
q_i++;next_task();}
function skipTestStep(){document.log.push("Test Step: "+(q_i+1));document.log.push("    Result: Skipped");document.getElementById("test-steps-container").children[q_i].children[0].children[3].children[0].style["background-color"]="";q_i++;next_task();}
function finalizeTestLog(){var currentdate=new Date();var datetime=currentdate.getHours()+":"
+currentdate.getMinutes()+":"
+currentdate.getSeconds();document.log.push("TEST COMPLETED @ "+datetime);document.getElementById("status-span").innerHTML="Complete.";appendLogLink();}
function stopTest(){document.getElementById("status-span").innerHTML="Aborted!";document.getElementById("status-span").style.visibility="visible";appendLogLink();}
function next_task(){if(window.stop==true){stopTest();}else{var testStepCount=document.getElementById('test-steps-container').childElementCount;if(q_i<testStepCount){var currentStepContainer=document.getElementById('test-steps-container').children[q_i];description=currentStepContainer.children[0].children[3].children[0].value;command=currentStepContainer.children[1].children[0].value;target=currentStepContainer.children[1].children[1].value;value=currentStepContainer.children[1].children[2].value;continueOnFailure=currentStepContainer.children[1].children[3].children[1].checked;execute=currentStepContainer.children[0].children[2].checked;if(execute){currentStepContainer.children[0].children[3].children[0].style["background-color"]="#DDDDDD";document.log.push("Test Step: "+(q_i+1));document.log.push("    Command: "+command);document.log.push("    Target: "+target);document.log.push("    Value: "+value);if(target.startsWith("${")){var varName=target.substring(2,(target.length-1));target=window.storage[varName];}
if(value.startsWith("${")){var varName=value.substring(2,(value.length-1));value=window.storage[varName];}
window[command](target,value);}
else{window.result=null;completeTask();}}
else{finalizeTestLog();}}}