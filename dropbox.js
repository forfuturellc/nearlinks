var clientID = "pjhyzlvre6g87zk";
var oauthUrl = "https://www.dropbox.com/1/oauth2/authorize" +
  "?client_id=" + clientID +
  "&response_type=token" +
  "&redirect_uri=" + chrome.extension.getURL("www/authenticate.html");
var token;


/**
* Authenticates user to Dropbox
*
* Opens a new tab with the OAuth Url loading
*/
function authenticate() {
  chrome.tabs.create({
    url: oauthUrl
  });
}


/**
* Retrieve the access token from storage or memory
*
* @param <callback> -- {Function} callback(token)
*/
function getToken(callback) {
  if (token) {
    return callback(token);
  }
  chrome.storage.sync.get("token", function(obj) {
    token = obj.token;
    return callback(token);
  });
}


/**
* Retrieve the Bookmarks (default) datastore
*
* @param <callback> -- {Function} callback(err, handle)
*/
function getDatastore(callback) {
  getToken(function(token) {
    reqwest({
      url: "https://api.dropbox.com/1/datastores/get_or_create_datastore",
      type: "json",
      headers: {
        Authorization: "Bearer " + token
      },
      data: {
        "dsid": "default",
      },
    }).then(function(res) {
      var handle = res.handle;
      return callback(null, handle);
    }).fail(function(err) {
      return callback(err);
    });
  }); // getToken
}


/**
* Get a snapshot of the datastore
*
* @param <handle> -- {String} datastore handle
* @param <callback> -- {Function} callback(err, snapshot)
*/
function getDataSnapshot(handle, callback) {
  getToken(function(token) {
    reqwest({
      url: "https://api.dropbox.com/1/datastores/get_snapshot",
      type: "json",
      headers: {
        Authorization: "Bearer " + token
      },
      data: {
        handle: handle
      }
    }).then(function(res) {
      return callback(null, res.rows);
    });
  });
}


/**
* Adds a Bookmark
*
* @param <url> -- {String} datastore handle
* @param <url> -- {String} bookmark's url
*/
function addBookmark(storehandle, url) {
  getToken(function(token) {
    reqwest({
      url: "https://api.dropbox.com/1/datastores/put_delta",
      type: "json",
      headers: {
        Authorization: "Bearer " + token
      },
      data: {
        handle: storehandle,
        changes: []
      }
    });
  });
}

