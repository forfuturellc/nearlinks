/**
* Get the current URL.
*
* @param {Function} callback(tabId, tabUrl)
*/
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    callback(tab.id, tab.url);
  });

}

