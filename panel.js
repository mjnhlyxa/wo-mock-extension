chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent(body => {
        if (request.request && request.request.url) {
            if (request.request.url.includes("siteverify")) {
                chrome.runtime.sendMessage({
                    response: {...body, test: 123}
                });
            }
        }
    });
});
