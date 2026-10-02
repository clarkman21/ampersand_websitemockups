/* Proof site: shared header, footer and simulated live feed. */
(function () {
  'use strict';

  // ---- Data used on every page. Source: AmperOps unless noted. Update before launch. ----
  var D = window.AMP_DATA = window.AMP_DATA || {};
  D.asOf = D.asOf || '22–28 Sep 2026';
  D.dailySwaps = D.dailySwaps || 24000;
  D.stations = D.stations || 70;
  // Share of daily swaps in each hour, Kigali time (UTC+2). Assumed curve with morning and evening peaks.
  D.hourly = D.hourly || [0.4,0.2,0.2,0.3,0.8,2.4,5.0,6.6,6.4,5.8,5.4,5.3,5.6,5.5,5.4,5.5,6.0,6.8,7.0,5.9,4.3,3.0,1.8,0.8];

  var here = document.body.getAttribute('data-page') || 'home';
  var fmt = new Intl.NumberFormat('en-US');

  // ---- Header and footer ----
  // The text comes from content/copy.md (Shared section) through assets/copy.js. The second value is the fallback.
  var COPY = window.AMP_COPY || {};
  function T(k, d) { return COPY[k] != null ? COPY[k] : d; }
  var NAV = [
    ['network', 'network.html', T('shared.nav-network', 'Network')],
    ['batteries', 'batteries.html', T('shared.nav-batteries', 'Batteries')],
    ['technology', 'technology.html', T('shared.nav-technology', 'Technology')],
    ['vehicles', 'vehicles.html', T('shared.nav-vehicles', 'Vehicles')],
    ['investors', 'investors.html', T('shared.nav-investors', 'Investors')],
    ['contact', 'contact.html', T('shared.nav-contact', 'Work with us')]
  ];
  function navItems(withContact) {
    // the desktop bar shows "Work with us" as the yellow button, so it leaves the link out
    return NAV.filter(function (n) { return withContact || n[0] !== 'contact'; }).map(function (n) {
      var cur = n[0] === here ? ' aria-current="page"' : '';
      return '<li><a href="' + n[1] + '"' + cur + '>' + n[2] + '</a></li>';
    }).join('');
  }
  var head = document.getElementById('site-header');
  if (head) {
    head.innerHTML =
      '<div class="mock-bar"><span>' + T('shared.mockbar', 'Mockup · Proof site, station-signage design. The "Network now" numbers are simulated.') + '</span><a href="../index.html">' + T('shared.mockbar-back', 'Back to overview') + '</a></div>' +
      '<header class="site"><div class="wrap nav"><a class="logo" href="index.html" aria-label="Ampersand home"><img src="../assets/brand/logo-horizontal-yellow.svg" alt="Ampersand"></a>' +
      '<ul>' + navItems(false) + '</ul><a class="btn sm" href="contact.html">' + T('shared.header-button', 'Work with us') + '</a></div>' +
      '<nav class="subnav" aria-label="Sections"><ul><li><a href="index.html"' + (here === 'home' ? ' aria-current="page"' : '') + '>' + T('shared.nav-home', 'Home') + '</a></li>' + navItems(true) + '</ul></nav></header>' +
      '<div class="live" aria-label="Network now, simulated"><div class="wrap">' +
      '<div class="lbl"><b><span class="dot" aria-hidden="true"></span>' + T('shared.live-title', 'Network now') + '</b><span>' + T('shared.live-note', 'Simulated feed · based on {asOf}').replace('{asOf}', D.asOf) + '</span></div>' +
      '<div class="cell"><div class="n tick" data-live="swapsToday">0</div><div class="k">' + T('shared.live-today', 'Swaps today') + '</div></div>' +
      '<div class="cell"><div class="n tick" data-live="swapsHour">0</div><div class="k">' + T('shared.live-hour', 'Swaps this hour') + '</div></div>' +
      '<div class="cell"><div class="n">' + T('shared.live-charged-number', '96%') + '</div><div class="k">' + T('shared.live-charged', 'Batteries out fully charged') + '</div></div>' +
      '<div class="cell"><div class="n" data-live="stations">' + D.stations + '</div><div class="k">' + T('shared.live-stations', 'Stations in service') + '</div></div>' +
      '</div></div>';
  }
  var PATHS = [
    [T('shared.path-investors-kicker', 'Investors'), T('shared.path-investors', 'Already profitable'), 'investors.html'],
    [T('shared.path-fleets-kicker', 'Fleets'), T('shared.path-fleets', 'Electrify a fleet'), 'vehicles.html#fleets'],
    [T('shared.path-oems-kicker', 'OEMs'), T('shared.path-oems', 'Power your bike'), 'vehicles.html#oem'],
    [T('shared.path-sites-kicker', 'Sites'), T('shared.path-sites', 'Host a station'), 'network.html#host']
  ];
  var foot = document.getElementById('site-footer');
  if (foot) {
    foot.innerHTML =
      '<footer class="site" id="work"><div class="wrap">' +
      '<h2 class="sr">Work with us</h2><div class="paths">' + PATHS.map(function (p) {
        return '<a href="' + p[2] + '"><span class="kicker">' + p[0] + '</span><span class="d">' + p[1] + '&nbsp;→</span></a>';
      }).join('') + '</div>' +
      '<p class="kom d">' + T('shared.footer-tagline', 'Keep on Moving.') + '</p>' +
      '<div class="langs d"><span lang="rw">' + T('shared.footer-kinyarwanda', 'Komeza Ugende') + '</span><span class="sep" aria-hidden="true">/</span><span lang="sw">' + T('shared.footer-swahili', 'Zidi Kusonga') + '</span></div>' +
      '<div class="fbase"><img class="logo" src="../assets/brand/logo-horizontal-yellow.svg" alt="Ampersand">' +
      '<div class="addr">' +
      '<div><b>' + T('shared.footer-kigali-title', 'Kigali') + '</b>' + T('shared.footer-kigali', 'KK 6 Av, Road to MAGERWA<br>Hotline 1011') + '</div>' +
      '<div><b>' + T('shared.footer-nairobi-title', 'Nairobi') + '</b>' + T('shared.footer-nairobi', 'Old Mombasa Road, Gate 2<br>Warehouse 11 &amp; 12') + '</div>' +
      '<div><b>' + T('shared.footer-contact-title', 'Contact') + '</b>' + T('shared.footer-contact', 'info@ampersand.solar<br>OEM@ampersand.solar') + '</div>' +
      '<div><b>' + T('shared.footer-people-title', 'People') + '</b>' + T('shared.footer-people', 'media@ampersand.solar<br><a href="https://ampersand-energy.breezy.hr/">Careers</a>') + '</div>' +
      '</div></div>' +
      '<p class="legal">' + T('shared.footer-legal', '© 2026 Ampersand. Mockup for internal review. 3D models are approximate.') + '</p></div></footer>';
  }

  // ---- Simulated live feed ----
  function kigaliNow() {
    var d = new Date();
    var utcMin = d.getUTCHours() * 60 + d.getUTCMinutes() + d.getUTCSeconds() / 60;
    var m = (utcMin + 120) % 1440;
    return { h: Math.floor(m / 60), f: (m % 60) / 60 };
  }
  var sum = D.hourly.reduce(function (a, b) { return a + b; }, 0);
  function expected() {
    var t = kigaliNow(), done = 0;
    for (var i = 0; i < t.h; i++) done += D.hourly[i];
    var thisHour = D.hourly[t.h] * t.f;
    return { today: D.dailySwaps * (done + thisHour) / sum, hour: D.dailySwaps * thisHour / sum, rate: D.dailySwaps * D.hourly[t.h] / sum / 3600 };
  }
  var live = {};
  document.querySelectorAll('[data-live]').forEach(function (el) { live[el.getAttribute('data-live')] = el; });
  var state = expected();
  function paint(bump) {
    if (live.swapsToday) live.swapsToday.textContent = fmt.format(Math.round(state.today));
    if (live.swapsHour) live.swapsHour.textContent = fmt.format(Math.round(state.hour));
    if (bump) Object.keys(live).forEach(function (k) {
      if (k === 'stations') return;
      live[k].classList.add('bump');
      setTimeout(function () { live[k].classList.remove('bump'); }, 250);
    });
  }
  paint(false);
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setInterval(function () {
    var e = expected(), secs = 3;
    state.today = Math.max(state.today + e.rate * secs * (0.6 + Math.random() * 0.8), e.today * 0.995);
    state.hour = Math.max(0, e.hour + (state.today - e.today));
    paint(!reduce);
  }, 3000);

  // Request form (investor page)
  var f = document.getElementById('request-form');
  // preselect the request type from the link, for example contact.html?type=oem
  var sel = document.getElementById('r-type'), want = (location.search.match(/[?&]type=([a-z]+)/) || [])[1];
  if (sel && want) Array.prototype.forEach.call(sel.options, function (o) { if (o.value === want) sel.value = want; });
  if (f && f.tagName === 'FORM') {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('request-ok');
      if (msg) msg.hidden = false;
    });
  }
})();
