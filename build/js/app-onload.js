var webview=document.getElementById("webview");chrome.app.window.current().outerBounds.width=320;addEventListener('message',function(e){if(e.source!=webview.contentWindow){return;}
else{if(window.record){if(e.data.command){var recordedDescription;if(e.data.command=="select"){recordedDescription=e.data.command+" '"+e.data.value+"' '"+e.data.target+"'";}
else{recordedDescription=e.data.command+" '"+e.data.target+"'";}
var recordedCommand=e.data.command;var recordedTarget=e.data.target;var recordedValue=e.data.value;createTestSteps(recordedDescription,recordedCommand,recordedTarget,recordedValue);}}
else{if(e.data.target){window.clickedElementTarget=e.data.target;window.clickedElementValue=e.data.value;}}}});