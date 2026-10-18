/*
  Shared website enhancements.
  SETUP: Replace the placeholder below with the GoatCounter site code YOU registered.
  Example: if dashboard is https://my-cbt-site.goatcounter.com/, use "my-cbt-site".
  Do not paste any admin password or access token into publicly hosted files.
*/
(function () {
  'use strict';

  const GOATCOUNTER_SITE_CODE = 'kumar-dileep-cbt';  // Enter your site code here.

  // Mobile: reduce the initial length of the long contents list.
  // Without JavaScript, the full table of contents remains visible.
  const contents = document.getElementById('emotional-toc');
  if (contents && window.matchMedia && window.matchMedia('(max-width: 640px)').matches) {
    // Keep TOC open if the URL targets the TOC itself.
    if (window.location.hash !== '#emotional-toc') contents.open = false;
  }

  // Stats are recorded on both HTML pages but the public count is shown only
  // on Emotional.html. The dashboard itself stays on GoatCounter, not GitHub.
  const visitorCount = document.getElementById('visitor-count');
  if (!GOATCOUNTER_SITE_CODE) {
    if (visitorCount) visitorCount.textContent = 'Not yet enabled';
    return;
  }
  if (!/^[a-z0-9-]+$/i.test(GOATCOUNTER_SITE_CODE)) {
    if (visitorCount) visitorCount.textContent = 'Setup needed';
    return;
  }

  if (visitorCount) visitorCount.textContent = 'Loading…';
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = 'https://' + GOATCOUNTER_SITE_CODE + '.goatcounter.com/count';
  script.onload = function () {
    if (!visitorCount) return;
    if (!window.goatcounter || typeof window.goatcounter.visit_count !== 'function') {
      visitorCount.textContent = 'Unavailable';
      return;
    }
    visitorCount.textContent = '';
    window.goatcounter.visit_count({
      append: '#visitor-count',
      type: 'html',
      no_branding: true,
      // Include only this page's visits, not the combined site total.
    });
  };
  script.onerror = function () {
    if (visitorCount) visitorCount.textContent = 'Unavailable';
  };
  document.head.appendChild(script);
})();
