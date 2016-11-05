import Ember from 'ember';

export default Ember.Component.extend({
  addData: function() {
    $('#json-viwer').jsonViewer(this.get('collectionData'));
  }.observes('collectionData')
});
