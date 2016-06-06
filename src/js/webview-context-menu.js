// http://stackoverflow.com/a/33885930
(function(fn){var d=document;(d.readyState=='loading')?d.addEventListener('DOMContentLoaded',fn):fn();})(function(){

	/*
    // https://developer.chrome.com/apps/tags/webview#type-ContextMenus
	// Create the ContextMenu
	webview.contextMenus.create(
		// https://developer.chrome.com/apps/tags/webview#type-ContextMenuCreateProperties
		//object createProperties,
		{
			'type': 'normal' 				// (optional) type https://developer.chrome.com/apps/contextMenus#type-ItemType
			,'id': 'example01'				// (optional) id
			,'title': 'Test'				// (optional) title
											// (optional) checked
			,'contexts': ['all']			// (optional) contexts https://developer.chrome.com/apps/tags/webview#type-ContextType
			,'onclick': function(info){ 	// (optional) onclick
				console.log('Hello!');
			}
											// (optional) parentId
											// (optional) documentUrlPatterns
											// (optional) targetUrlPatterns
											// (optional) enabled
		},
		function () {						// (optional) function callback
			console.log('ContextMenu item added to the webview's context menu.');
		}
	);
	*/
	
	// Helper injected in webview-onload.js
	
	webview.contextMenus.create({
		 'id':  'contextMenuItem01'
		,'title': 'Wait for Element Present'
		,'contexts': ['all']
		,'onclick': function(info){
			var description = 'Wait for Element Present';
			var command = 'waitForElementPresent';
			var target = window.clickedElementTarget;
			createTestSteps(description, command, target); // in add-test-step.js
		}
	});
	
	webview.contextMenus.create({
		 'id':  'contextMenuItem02'
		,'title': 'Wait for Text'
		,'contexts': ['all']
		,'onclick': function(info){
			var description = 'Wait for Text';
			var command = 'waitForText';
			var target = window.clickedElementTarget;
			var value = window.clickedElementValue;
			
			createTestSteps(description, command, target, value); // in add-test-step.js
		}
	});
	
	webview.contextMenus.create({
		 'type': 'separator'
		,'id':  'contextMenuItem03'
	});
	
	webview.contextMenus.create({
		 'id':  'contextMenuItem04'
		,'title': 'Store Value'
		,'contexts': ['all']
		,'onclick': function(info){
			var description = 'Store Value';
			var command = 'store';
			var target = window.clickedElementValue;
			var value = 'variableName';
			
			createTestSteps(description, command, target, value); // in add-test-step.js
		}
	});
	
});


