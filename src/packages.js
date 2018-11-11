const DDPClient = require("ddp");
const fs = require('fs');

let ddpclient;

let packages = [];
let syncToken = {};

const saveJSONToFile = () => {
  var json = JSON.stringify(packages, null, 2);
  console.log('*** Writing To File ****');
  fs.writeFile('data.json', json, 'utf8', (err, res) => {
    console.log('*** Done saving ****');
  });
}

const callPackageServer = () => {
  console.log('calling packaing server');
  ddpclient.call("syncNewPackageData", [syncToken, {}], (err, res) => {
    console.log("callback");
    if (err) {
      console.log(error);
    } else {
      // console.log(JSON.stringify(res, null, 2));
      // if meteor asked to reset the previous data
      // empty the packages array  
      if (res.resetData) {
        packages = [];
      }
      // update synctoken with the token
      // meteor sends back
      if (res && res.syncToken) {
        syncToken = res.syncToken;
      }

      // save pacakges to array
      if (
        res &&
        res.collections &&
        res.collections.packages &&
        res.collections.packages.length > 0
      ) {
        // console.log('received packages length ', res.collections.packages.length);
        let newPackages = res.collections.packages;
        // picking required fields
        newPackages = newPackages.map(function (rec) {
          const obj = {};
          [ '_id', 'homepage', 'name'].forEach(function (key) {
            obj[key] = rec[key];
          });
          return obj;
        });

        // pushing packages to existing packages arrya
        packages.push(...newPackages);

        // removig duplicate packages, incase any
        packages = packages.filter((v, i, a) => a.indexOf(v) === i);
        console.log(`PACKAGES: ${packages.length}`);
      }
      
      // if packages are not uptodate, call method again with new synctoken
      if (res && !res.upToDate) {
        callPackageServer();
      } else {
        console.log('*** Packages are updated ***');
        console.log(`TOTAL PACKAGES: ${packages.length}`);
        saveJSONToFile()
      }
    }
  });
};

const SyncPackages = () => {
  // establishing a connection with meteor packages server websocket
  ddpclient = new DDPClient({
    url: "wss://packages.meteor.com/websocket"
  });

  ddpclient.connect(function(error, wasReconnec) {
    if (error) {
      console.log(error);
      console.log("DDP connection error!");
      return;
    }
    setTimeout(function() {
      // calling package server for list
      callPackageServer();
    }, 100);
  });
};

const getPackages = () => {
  return packages;
};

module.exports = { SyncPackages, getPackages };
