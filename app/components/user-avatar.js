import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  classNames: ['avatar-wrapper'],

  userInitials: computed('name', function () {
    let name = this.get('name');
    if (name) {
      let arr = name.split(' ');
      let initials = '';

      if (arr.length >= 2) {
        initials = arr[0].split('')[0] + arr[1].split('')[0];
      } else {
        initials = arr[0].split('')[0];
      }
      return initials;
    }
  }),

  avatarUrl: computed('url', 'size', function () {
    let url = this.get('url');
    let size = this.get('size');
    if (!size) {
      size = 32;
    }
    const sizeParam = `&s=${size}`;
    if (url.includes('?v=3')) {
      return `${url}${sizeParam}`;
    } else {
      return `${url}?v=3&s=${size}`;
    }
  }),

  highResAvatarUrl: computed('url', 'size', function () {
    let url = this.get('url');
    let size = this.get('size');
    if (!size) {
      size = 32;
    }
    size = size * 2; // high-dpi
    const sizeParam = `&s=${size}`;
    if (url.includes('?v=3')) {
      return `${url}${sizeParam}`;
    } else {
      return `${url}?v=3&s=${size}`;
    }
  }),

  showSubscriptionCheckmark: computed(
    'showSubscriptionStatus',
    'account.subscription.isSubscribed',
    'account.education',
    function () {
      let showStatus = this.get('showSubscriptionStatus');
      let isSubscribed = this.get('account.subscription.isSubscribed');
      let education = this.get('account.education');
      return showStatus && (isSubscribed || education);
    }
  ),

  subscriptionTooltipText: computed('account.education', function () {
    let education = this.get('account.education');
    return `This account has an ${education ? 'education' : 'active'} subscription`;
  })
});
