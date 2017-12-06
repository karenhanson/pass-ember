import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import Bootstrap4Theme from 'ember-models-table/themes/bootstrap4';

export default Controller.extend({

  store: service('store'),

  /* For providing access to a newly created submission object */
  newSubmissionObject: null,

  actions: {

    newSubmission() {
      this.set('newSubmissionObject', this.get('store').createRecord('submission'));
    },

    saveAndLinkGrant() {
      var submission = this.get('newSubmissionObject');
      var grant = this.model;

      return submission.save().then(() => {
        submission.get('grants').pushObject(grant);
        submission.save();

        grant.get('submissions').pushObject(submission);
        grant.save();

        return submission;
      });
    }
  },

  columns: [
    { propertyName: 'title', title: 'Article' },
    { propertyName: '', title: 'Award Number (Funder)' },
    { propertyName: 'author', title: 'Corr. Author' },
    { propertyName: 'repo', title: 'Repo' },
    { propertyName: 'updatedDate', title: 'Last Update Date' },
    { propertyName: 'submittedDate', title: 'Submitted Date' },
    { propertyName: 'status', title: 'Status' },
    { propertyName: 'creator.username', title: 'OAP Repo Id' }
  ],

  themeInstance: Bootstrap4Theme.create()
});