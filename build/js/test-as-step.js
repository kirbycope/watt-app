function loadFile(fileEntry){var fileName=fileEntry.name;fileEntry.file(function(file){var reader=new FileReader();reader.onload=function(e){var htmlString=e.target.result;var tempHtmlDoc=document.createElement('html');tempHtmlDoc.innerHTML=htmlString;var testStepsBody=tempHtmlDoc.getElementsByTagName('tbody')[0];fileName=fileName.substring(0,fileName.indexOf('.html'));window[fileName]=testStepsBody;};reader.readAsText(file);});}
var fileList;function addFileRequest(fileName){fileList=document.getElementById("file-select-list");var alreadyRequested=false;if(fileList.children.length>0){for(var i=0;i<fileList.children.length;i++){var currentFileName=fileList.children[i].children[0].value;if(currentFileName==fileName){alreadyRequested=true;}}}
if((fileList.children.length=0)||(alreadyRequested==false)){var parentDiv=document.createElement("div");parentDiv.setAttribute("class","test-file-container");var fileInput=document.createElement("input");fileInput.setAttribute("class","test-file-input");fileInput.value=fileName;fileInput.setAttribute("disabled","true");parentDiv.appendChild(fileInput);var filespan=document.createElement("span");filespan.setAttribute("class","test-file-span");filespan.innerHTML="✓";parentDiv.appendChild(filespan);var fileButton=document.createElement("button");fileButton.setAttribute("class","test-file-button");fileButton.innerHTML="\uD83D\uDD0D";fileButton.onclick=function(){var callingButton=this;chrome.fileSystem.chooseEntry({type:'openFile',accepts:[{extensions:['html']}]},function(fileEntry){if(chrome.runtime.lastError){}
if(fileEntry){var requestedFileName=callingButton.previousElementSibling.previousElementSibling.value;var selectedFileName=fileEntry.name;if(selectedFileName.indexOf(requestedFileName)>-1){callingButton.setAttribute("disabled","true");callingButton.previousElementSibling.setAttribute("class","test-file-span-on");callingButton.previousElementSibling.innerHTML="\u2713";callingButton.previousElementSibling.setAttribute("title","File loaded.");loadFile(fileEntry);}else{callingButton.previousElementSibling.setAttribute("class","test-file-span-error");callingButton.previousElementSibling.innerHTML="\u2717";callingButton.previousElementSibling.setAttribute("title","File name mismatch!");}}});}
parentDiv.appendChild(fileButton);document.getElementById("file-select-list").appendChild(parentDiv);}}
function checkForPendingRequests(){var pendingRequest=false;if(fileList.children.length>0){for(var i=0;i<fileList.children.length;i++){var currentTitle=fileList.children[i].children[1].title;if(currentTitle!="File loaded."){pendingRequest=true;}}}
return pendingRequest;}
function checkForTestAsStep(){var exists=false;var testSteps=document.getElementById("test-steps-container").children;for(var i=0;i<testSteps.length;i++){var currentCommand=testSteps[i].children[1].children[0].value;if(currentCommand=="runTestAsStep"){exists=true;var fileName=testSteps[i].children[1].children[1].value;addFileRequest(fileName);}}
return exists;}
function stepRunner(){if(stop==true){stopTest();}else{var varName=target.substring(0,target.indexOf('.html'));if(tas_i<window[varName].children.length){var stepDescription=window[varName].children[tas_i].previousSibling.previousSibling;var stepCommand=window[varName].children[tas_i].children[0].innerHTML;var stepTarget=window[varName].children[tas_i].children[1].innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');var stepValue=window[varName].children[tas_i].children[2].innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');document.log.push("    "+target+" - Test Step: "+(tas_i+1));document.log.push("        Command: "+stepCommand);document.log.push("        Target: "+stepTarget);document.log.push("        Value: "+stepValue);window[stepCommand](stepTarget,stepValue);}else{command="";window.result=true;completeTask();}}}
document.getElementById("file-select-close").onclick=function(){document.getElementById("file-select-modal").style["display"]="none";var pendingRequest=checkForPendingRequests();if(!pendingRequest){startTest();}}