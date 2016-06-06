function newTest(){document.getElementById("base-url").value="";document.getElementById("status-span").innerHTML="";document.getElementById("status-span").style.visibility="hidden";document.log=[];var testSteps=document.getElementById("test-steps-container");while(testSteps.firstChild){testSteps.removeChild(testSteps.firstChild);}
var fsl=document.getElementById('file-select-list');while(fsl.firstChild){fsl.removeChild(fsl.firstChild);}
clearFields();}
document.getElementById("toolbar-new").onclick=function(){newTest();}