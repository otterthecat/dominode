exports.makePromise = function (url, data) {
	'use strict';

	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();
		request.open('POST', url);
		request.setRequestHeader('Content-Type', 'application/json');
		request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		request.onload = function() {
			// This is called even on 404 etc
			// so check the status
			if (request.status == 200) {
			// Resolve the promise with the response text
			resolve(request.response);
			}
			else {
			// Otherwise reject with the status text
			// which will hopefully be a meaningful error
			reject(request.response);
			}
		};

		// Handle network errors
		request.onerror = function() {
			reject(request.response);
		};

		request.send();
	});
};
