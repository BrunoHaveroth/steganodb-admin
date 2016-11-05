import Ember from 'ember';

export default Ember.Component.extend({
  getCollections: function(dbPath, dbName) {
    var fs = require('fs-promise');
    return fs.walk(dbPath + 'SteganoDB/' + dbName + '/collections')
      .then(function(collections) {
        collections = _.map(collections, 'path');
        _.remove(collections, function(item) {
          return (item.indexOf('.') == -1) ? false : true;
        });

        collections = _.map(collections, function(item) {
          var name = _.last(item.split('/'));
          return name === 'collections' ? null : name;
        });
        return _.compact(collections);
      });
  },

  actions: {
    openDbPath: function() {
      var dialog = require('electron').remote.dialog;
      var dir = dialog.showOpenDialog({properties: ['openDirectory']});
      this.set('dbPath', _.first(dir) + '/');
      // dialog.showErrorBox('Error', JSON.stringify(teste));
    },

    connect: function() {
      var dialog = require('electron').remote.dialog;

      var dbPath = this.get('dbPath'),
        dbKey = this.get('dbKey'),
        dbName = this.get('dbName');

      // dialog.showErrorBox('Error', JSON.stringify(dbPath));
      // dialog.showErrorBox('Error', JSON.stringify(dbKey));

      this.getCollections(dbPath, dbName)
      .then((collections)=> {
        this.set('collections', collections);
        dialog.showErrorBox('Error', JSON.stringify(collections));

        var SteganoDB = require('steganodb-js');
        var steganoDB = new SteganoDB(
          dbKey,
          dbName,
          dbPath
        );

        this.set('steganoDB', steganoDB);
        this.set('configs', {
          dbKey  : dbKey,
          dbName : dbName,
          dbPath : dbPath
        });

        this.set('showModal', false);
      });
    }
  }
});
