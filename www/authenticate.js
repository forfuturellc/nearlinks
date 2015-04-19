/**
* Grabbing the authorization code
*/
var hash = window.location.hash;
var mark = "access_token=";
var start = hash.indexOf(mark) + mark.length;
var end = hash.indexOf("&") || hash.length;
var token = hash.substring(start, end);


// storing the authorization code
chrome.storage.sync.set({ token: token }, function() {
  if (chrome.runtime.lastError) {
    return alert("failed:" + chrome.runtime.lastError);
  }
  alert("authenticated successfully");
});

