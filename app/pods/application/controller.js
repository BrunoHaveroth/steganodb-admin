import Ember from 'ember';

export default Ember.Controller.extend({
  showModal: true,

  actions: {
    selectCollection: function(collection) {
      this.get('steganoDB')
      .find(collection, null)
      .then((response)=> {
        this.set('collectionData', response);
      }).catch(function(err) {
        alert(err.message);
      })
    }
  }
});
