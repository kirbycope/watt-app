function getCssPath(el){if(!(el instanceof Element))
return;var path=[];while(el.nodeType===Node.ELEMENT_NODE){var selector=el.nodeName.toLowerCase();if(el.id){selector+='#'+el.id;path.unshift(selector);break;}else{var sib=el,nth=1;while(sib=sib.previousElementSibling){if(sib.nodeName.toLowerCase()==selector)
nth++;}
if(nth!=1)
selector+=":nth-of-type("+nth+")";}
path.unshift(selector);el=el.parentNode;}
return path.join(" > ");}
function getXpath(el){var allNodes=document.getElementsByTagName('*');for(var segs=[];elm&&elm.nodeType==1;elm=elm.parentNode)
{if(elm.hasAttribute('id')){var uniqueIdCount=0;for(var n=0;n<allNodes.length;n++){if(allNodes[n].hasAttribute('id')&&allNodes[n].id==elm.id)uniqueIdCount++;if(uniqueIdCount>1)break;};if(uniqueIdCount==1){segs.unshift('id("'+elm.getAttribute('id')+'")');return segs.join('/');}else{segs.unshift(elm.localName.toLowerCase()+'[@id="'+elm.getAttribute('id')+'"]');}}else if(elm.hasAttribute('class')){segs.unshift(elm.localName.toLowerCase()+'[@class="'+elm.getAttribute('class')+'"]');}else{for(i=1,sib=elm.previousSibling;sib;sib=sib.previousSibling){if(sib.localName==elm.localName)i++;};segs.unshift(elm.localName.toLowerCase()+'['+i+']');};};return segs.length?'/'+segs.join('/'):null;};function getClickedElementTarget(target){var locator='';if(!!target.getAttribute('id')){locator="id="+target.getAttribute('id');}
else if(!!target.getAttribute('name')){locator="name="+target.getAttribute('name');var type=target.getAttribute('type');if(type){locator=locator+" type="+type;}
var value=target.getAttribute('value');if(value){locator=locator+" value="+value;}}
else if((target.tagName=="A")&&(!!target.textContent)){locator="link="+target.textContent;}
else{var cssPath=getCssPath(target);locator="css="+cssPath;}
if((locator=="")||(locator=="css=")){var xPath=getXpath(el)
locator="xpath="+xPath;}
return locator;}
function getClickedElement(e){if(event.button==2){e=e||window.event;var target=e.target||e.srcElement;var locator=getClickedElementTarget(target);var content=target.textContent;var message={command:'',target:locator,value:content};document.messageSource.postMessage(message,document.messageOrigin);}}
document.addEventListener('mousedown',getClickedElement,true);