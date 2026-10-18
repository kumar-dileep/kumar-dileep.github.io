

/*
  Shared website enhancements.
  GoatCounter account: kumar-kumar-cbt

  This script:
  1. Improves mobile table-of-contents navigation.
  2. Tracks visits on both HTML pages.
  3. Displays the page visitor count on Emotional.html.
  4. Keeps the analytics dashboard separate.
*/

(function () {
  'use strict';

  const GOATCOUNTER_SITE_CODE = 'kumar-kumar-cbt';

  // Mobile: reduce the initial length of the long contents list.
  // Without JavaScript, the full table of contents remains visible.
  const contents = document.getElementById('emotional-toc');

  if (
    contents &&
    window.matchMedia &&
    window.matchMedia('(max-width: 640px)').matches
  ) {
    // Keep TOC open if the URL targets the TOC itself.
    if (window.location.hash !== '#emotional-toc') {
      contents.open = false;
    }
  }

  // Stats are recorded on both HTML pages.
  // The public count is shown only on Emotional.html.
  // The dashboard stays on GoatCounter, not GitHub.

  const visitorCount = document.getElementById('visitor-count');

  if (!GOATCOUNTER_SITE_CODE) {
    if (visitorCount) {
      visitorCount.textContent = 'Not yet enabled';
    }
    return;
  }

  if (!/^[a-z0-9-]+$/i.test(GOATCOUNTER_SITE_CODE)) {
    if (visitorCount) {
      visitorCount.textContent = 'Setup needed';
    }
    return;
  }

  if (visitorCount) {
    visitorCount.textContent = 'Loading…';
  }

  const script = document.createElement('script');

  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';

  script.dataset.goatcounter =
    'https://' +
    GOATCOUNTER_SITE_CODE +
    '.goatcounter.com/count';

  script.onload = function () {
    if (!visitorCount) return;

    if (
      !window.goatcounter ||
      typeof window.goatcounter.visit_count !== 'function'
    ) {
      visitorCount.textContent = 'Unavailable';
      return;
    }

    visitorCount.textContent = '';

    window.goatcounter.visit_count({
      append: '#visitor-count',
      type: 'html',
      no_branding: true
    });
  };

  script.onerror = function () {
    if (visitorCount) {
      visitorCount.textContent = 'Unavailable';
    }
  };

  document.head.appendChild(script);

})();
