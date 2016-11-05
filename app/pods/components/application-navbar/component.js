import Ember from 'ember';

export default Ember.Component.extend({
  actionCollection: 'selectCollection',
  action: 'logout',
  didInsertElement: function () {
    // var role = this.get('session.data.authenticated.role');
  },
  actions: {
    sendLogout: function() {
      this.sendAction('action');
    },

    selectCollection: function(item) {
      this.sendAction('actionCollection', item);
      this.set('collectionSelected', item);
    }
  }

});
