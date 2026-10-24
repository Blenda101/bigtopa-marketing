// Brand switch for the eBook: BigTopa (default) or GreekHouse.
// The brand comes from ?brand=… or the reader's last choice, and is carried
// on every internal link so a shared link opens in the right edition.
(function () {
  var KEY = 'dta-brand';
  var NAMES = { bigtopa: 'BigTopa', greekhouse: 'GreekHouse' };

  function valid(b) {
    return b === 'bigtopa' || b === 'greekhouse';
  }

  // Public editions are locked to one brand: no switch, no ?brand, nothing remembered.
  var LOCK = document.documentElement.getAttribute('data-brand-lock');
  if (valid(LOCK)) {
    document.documentElement.setAttribute('data-brand', LOCK);
    var lt = document.documentElement.getAttribute('data-title');
    if (lt) document.title = NAMES[LOCK] + ' · ' + lt;
    return;
  }

  function current() {
    var q = new URLSearchParams(window.location.search).get('brand');
    if (valid(q)) return q;
    try {
      var saved = window.localStorage.getItem(KEY);
      if (valid(saved)) return saved;
    } catch (e) {}
    return 'bigtopa';
  }

  function apply(brand) {
    document.documentElement.setAttribute('data-brand', brand);
    try {
      window.localStorage.setItem(KEY, brand);
    } catch (e) {}

    var buttons = document.querySelectorAll('[data-brand-btn]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-brand-btn') === brand));
    }

    var links = document.querySelectorAll('a[data-keep-brand]');
    for (var j = 0; j < links.length; j++) {
      var href = links[j].getAttribute('data-href') || links[j].getAttribute('href');
      links[j].setAttribute('data-href', href);
      var parts = href.split('#');
      links[j].setAttribute('href', parts[0] + '?brand=' + brand + (parts[1] ? '#' + parts[1] : ''));
    }

    var t = document.documentElement.getAttribute('data-title');
    if (t) document.title = NAMES[brand] + ' · ' + t;

    try {
      var url = new URL(window.location.href);
      url.searchParams.set('brand', brand);
      window.history.replaceState(null, '', url.toString());
    } catch (e) {}
  }

  apply(current());

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-brand-btn]') : null;
    if (btn) apply(btn.getAttribute('data-brand-btn'));
  });
})();
