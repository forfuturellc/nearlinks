#
# Installs dependencies
#
# The MIT License (MIT)
# Copyright (c) 2015 GochoMugo <mugo@forfuture.co.ke>
#


# require utilities
source script/utils.sh


# script variables
LOG_TITLE="deps"
SDK_VERSION="1.2.0"


log "cleaning up installed assets" 0
mkdir -p assets/
rm -rf assets/*


log "installing deps using npm" 0
# angular
npm install angular@latest
mkdir -p assets/angular
cp node_modules/angular/angular.min.js assets/angular
# reqwest
npm install reqwest@latest
mkdir -p assets/reqwest
cp node_modules/reqwest/reqwest.min.js assets/reqwest


log "installing dropstore-ng from Github" 0
wget -q https://raw.githubusercontent.com/AnalogJ/dropstore-ng/master/dropstore-ng.js
mkdir -p assets/dropstore-ng
mv -f dropstore-ng.js assets/dropstore-ng


log "installing Dropbox JS SDK v$SDK_VERSION" 0
DIRNAME="dropbox-js-datastore-sdk-$SDK_VERSION"
wget -q https://www.dropbox.com/developers/downloads/sdks/datastore/js/$DIRNAME.zip
mkdir -p tmp/ assets/dropbox/
unzip -qq $DIRNAME.zip -d tmp/dropbox
cp tmp/dropbox/$DIRNAME/lib/dropbox-datastores-$SDK_VERSION.js assets/dropbox/datastores.js


log "cleaning up" 0
rm -rf node_modules/ tmp/ *.zip

