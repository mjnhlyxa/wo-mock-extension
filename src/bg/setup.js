let text = "said-veri111fy";
function changeText() {
    text = "asdadasda";
}
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlMatches:
                                "(localhost:300[0-9])|(register.[a-z]{0,}tyme*)"
                        }
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
    chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
            if (details.url.indexOf(text) != -1) {
                return {
                    redirectUrl:
                        "data:application/json; charset=utf-8," +
                        JSON.stringify({ a: 1, b: 2 })
                };
            }
            return { cancel: false };
        },
        { urls: ["<all_urls>"] },
        ["blocking"]
    );
    chrome.runtime.onMessage.addListener(function(
        request,
        sender,
        sendResponse
    ) {
        if (request.type == "setText") {
            text = request.value;
            sendResponse({ text: text });
        }
    });
});
