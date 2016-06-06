// Code to be injected into the current page of the WebView when recording

// http://stackoverflow.com/a/30453032
document.messageSource;
document.messageOrigin;
addEventListener('message', function(e) {
    if (!document.messageSource) {

        /*
         * Once we have a document.messageSource, we should not allow anybody to change
         * document.messageSource again
         */

        if (e.data == "hello, webpage!") {
            /*
             * If possible, you should validate the `e.origin` value here. It could 
             * possibly come from somewhere else. However, this is quite safe as it 
             * stands, since there only is a very narrow time window where the app 
             * is open willing to accept the "hello, webpage!" message.
             *
             * Another way of validating, is by having the app wait for the 
             * "hello, host!" message. If that response is not received within a second
             * the app host could simply reload the app.
             */
			
            document.messageSource = e.source;
            document.messageOrigin = e.origin;
			//console.log(e.data); // DEBUGGING
			//console.log(document.messageSource); // DEBUGGING
			//console.log(document.messageOrigin); // DEBUGGING
            document.messageSource.postMessage("hello, host!", document.messageOrigin);
        }
    } else {
        // Handle messages however you like. This will simply respond to every message:
        //document.messageSource.postMessage('Your message: ' + e.data, document.messageOrigin);
    }
});

//console.log('Injected'); // DEBUGGING