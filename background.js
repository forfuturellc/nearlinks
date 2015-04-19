// check if we saved the api token in storage
chrome.storage.sync.get("token", function(obj) {
  if (! obj.token) {
    return authenticate();
  }
  getDatastore();
});


// when the extension is first installed
chrome.runtime.onInstalled.addListener(function(details) {

});


// when tab url changes
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
  chrome.pageAction.show(id);
});

