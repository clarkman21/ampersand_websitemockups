/* Direction B · Proof site: shared header, footer, simulated live feed and charts. */
(function () {
  'use strict';

  // ---- Data used on every page. Source: AmperOps unless noted. Update before launch. ----
  var D = window.AMP_DATA = window.AMP_DATA || {};
  D.asOf = D.asOf || '22–28 Sep 2026';
  D.dailySwaps = D.dailySwaps || 24372;          // 170,606 swaps / 7 days
  D.kmPerSwap = D.kmPerSwap || 47.5;             // inferred: 950k km/day ÷ 20k swaps/day (ampersand.energy)
  D.stations = D.stations || 70;
  // Share of daily swaps in each hour, Kigali time (UTC+2). Assumed curve with morning and evening peaks.
  D.hourly = D.hourly || [0.4,0.2,0.2,0.3,0.8,2.4,5.0,6.6,6.4,5.8,5.4,5.3,5.6,5.5,5.4,5.5,6.0,6.8,7.0,5.9,4.3,3.0,1.8,0.8];

  var here = document.body.getAttribute('data-page') || 'home';
  var fmt = new Intl.NumberFormat('en-US');

  // ---- Header and footer ----
  var NAV = [
    ['network', 'network.html', 'Network'],
    ['batteries', 'batteries.html', 'Batteries'],
    ['amperops', 'amperops.html', 'AmperOps'],
    ['vehicles', 'vehicles.html', 'Vehicles'],
    ['investors', 'investors.html', 'Investors'],
    ['home', 'index.html#work', 'Work with us']
  ];
  function navItems() {
    return NAV.map(function (n) {
      var cur = n[0] === here && n[2] !== 'Work with us' ? ' aria-current="page"' : '';
      return '<li><a href="' + n[1] + '"' + cur + '>' + n[2] + '</a></li>';
    }).join('');
  }
  var head = document.getElementById('site-header');
  if (head) {
    head.innerHTML =
      '<div class="mock-bar"><span>Mockup · Direction B · Proof. The live numbers are simulated. Dashed underlines mark data to confirm.</span><a href="../index.html">Back to overview</a></div>' +
      '<header class="site"><div class="wrap nav"><a class="logo" href="index.html" aria-label="Ampersand home"><img src="../assets/brand/logo-horizontal-black.svg" alt="Ampersand"></a>' +
      '<ul>' + navItems() + '</ul><a class="btn btn-k" href="investors.html#request">Investor pack</a></div>' +
      '<nav class="subnav" aria-label="Sections"><ul>' + '<li><a href="index.html"' + (here === 'home' ? ' aria-current="page"' : '') + '>Home</a></li>' + navItems() + '</ul></nav></header>' +
      '<div class="live" aria-label="Network now, simulated"><div class="wrap">' +
      '<div class="tag"><b><span class="dot" aria-hidden="true"></span>Network now</b><span>Simulated feed · based on ' + D.asOf + '</span></div>' +
      '<div class="cell"><div class="num tick" data-live="swapsToday">0</div><div class="k">Swaps today</div></div>' +
      '<div class="cell"><div class="num tick" data-live="swapsHour">0</div><div class="k">Swaps this hour</div></div>' +
      '<div class="cell"><div class="num tick" data-live="kmToday">0</div><div class="k">km powered today</div></div>' +
      '<div class="cell"><div class="num" data-live="stations">' + D.stations + '</div><div class="k">Stations in service</div></div>' +
      '</div></div>';
  }
  var foot = document.getElementById('site-footer');
  if (foot) {
    foot.innerHTML =
      '<footer class="site"><div class="wrap"><div class="fgrid">' +
      '<div><img src="../assets/brand/logo-horizontal-black.svg" alt="Ampersand" style="width:250px"></div>' +
      '<div><div class="label">Rwanda</div><ul><li>KK 6 Av, Road to MAGERWA, opposite NAEB, Kigali</li><li>Hotline 1011</li></ul></div>' +
      '<div><div class="label">Kenya</div><ul><li>Old Mombasa Road, Gate 2, Warehouse 11 &amp; 12, Nairobi</li></ul></div>' +
      '<div><div class="label">Contact</div><ul><li>info@ampersand.solar</li><li>media@ampersand.solar</li><li>OEM@ampersand.solar</li><li><a href="https://ampersand-energy.breezy.hr/">Careers</a></li></ul></div>' +
      '</div><div class="big-tag">Keep on Moving.</div>' +
      '<p style="margin-top:20px;font-size:14px">© 2026 Ampersand. Mockup for internal review. Network data: AmperOps, ' + D.asOf + '.</p></div></footer>';
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
    if (live.kmToday) live.kmToday.textContent = fmt.format(Math.round(state.today * D.kmPerSwap / 100) * 100);
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

  // ---- Charts ----
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function niceMax(v) {
    var p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p;
    var step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
    return step * p;
  }
  function short(v) {
    if (v >= 1e6) return (v / 1e6).toFixed(v % 1e6 ? 1 : 0) + 'M';
    if (v >= 1e3) return (v / 1e3).toFixed(v % 1e3 ? 0 : 0) + 'k';
    return String(v);
  }
  function tipFor(box) {
    var t = document.createElement('div');
    t.className = 'tip'; t.hidden = true; box.appendChild(t);
    return t;
  }
  function tableToggle(box, head, rows) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'table-toggle'; b.textContent = 'Show as table';
    var wrap = document.createElement('div'); wrap.className = 'tbl-wrap'; wrap.hidden = true; wrap.style.borderTop = '0';
    wrap.innerHTML = '<table class="data"><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
      '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';
    b.addEventListener('click', function () { wrap.hidden = !wrap.hidden; b.textContent = wrap.hidden ? 'Show as table' : 'Hide table'; });
    box.appendChild(b); box.appendChild(wrap);
  }

  // Single-series area line. data: [{x:'2023-06', y:115000}], opts: {unit:'swaps per month'}
  window.ampLine = function (box, data, opts) {
    opts = opts || {};
    var W = Math.max(300, Math.round(box.clientWidth - 40)), H = Math.max(220, Math.round(W * 0.42)), m = { t: 16, r: 56, b: 30, l: 48 };
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': opts.aria || 'Line chart' });
    box.appendChild(svg);
    var max = niceMax(Math.max.apply(null, data.map(function (d) { return d.y; })));
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    // Place points by month when x is YYYY-MM, so uneven gaps stay honest.
    var tv = data.map(function (d, i) { var mm = /^(\d{4})-(\d{2})$/.exec(d.x); return mm ? (+mm[1]) * 12 + (+mm[2]) : i; });
    var t0 = tv[0], t1 = tv[tv.length - 1] === t0 ? t0 + 1 : tv[tv.length - 1];
    var x = function (i) { return m.l + (tv[i] - t0) / (t1 - t0) * iw; };
    var y = function (v) { return m.t + ih - v / max * ih; };
    var g = el('g', { 'class': 'grid' }, svg);
    for (var k = 0; k <= 4; k++) {
      var v = max * k / 4, yy = y(v);
      el('line', { x1: m.l, x2: W - m.r, y1: yy, y2: yy }, g);
      var t = el('text', { x: m.l - 8, y: yy + 4, 'text-anchor': 'end' }, svg); t.textContent = short(v);
    }
    var every = Math.ceil(data.length / 7), lastX = -1e9;
    data.forEach(function (d, i) {
      if ((i % every === 0 || i === data.length - 1) && x(i) - lastX > 70) {
        lastX = x(i);
        var t = el('text', { x: x(i), y: H - 8, 'text-anchor': i === data.length - 1 ? 'end' : 'middle' }, svg);
        t.textContent = d.label || d.x;
      }
    });
    var line = data.map(function (d, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(d.y).toFixed(1); }).join(' ');
    el('path', { d: line + ' L' + x(data.length - 1) + ' ' + y(0) + ' L' + x(0) + ' ' + y(0) + ' Z', fill: '#FCDC04', 'fill-opacity': '.45' }, svg);
    el('path', { d: line, fill: 'none', stroke: '#000000', 'stroke-width': 2, 'stroke-linejoin': 'round' }, svg);
    var last = data[data.length - 1];
    el('circle', { cx: x(data.length - 1), cy: y(last.y), r: 5, fill: '#000000', stroke: '#FFFFFF', 'stroke-width': 2 }, svg);
    var lt = el('text', { x: x(data.length - 1) + 8, y: y(last.y) + 4, 'class': 'val' }, svg); lt.textContent = short(last.y);
    var cross = el('line', { y1: m.t, y2: m.t + ih, stroke: '#5C5C5E', 'stroke-width': 1, 'stroke-dasharray': '3 3', visibility: 'hidden' }, svg);
    var dot = el('circle', { r: 5, fill: '#000000', stroke: '#FFFFFF', 'stroke-width': 2, visibility: 'hidden' }, svg);
    var tip = tipFor(box);
    var hit = el('rect', { x: m.l, y: m.t, width: iw, height: ih, fill: 'transparent' }, svg);
    function move(ev) {
      var r = svg.getBoundingClientRect(), px = (ev.clientX - r.left) * W / r.width;
      var i = 0, best = Infinity;
      for (var j = 0; j < data.length; j++) { var dd = Math.abs(x(j) - px); if (dd < best) { best = dd; i = j; } }
      var cx = x(i), cy = y(data[i].y);
      cross.setAttribute('x1', cx); cross.setAttribute('x2', cx); cross.setAttribute('visibility', 'visible');
      dot.setAttribute('cx', cx); dot.setAttribute('cy', cy); dot.setAttribute('visibility', 'visible');
      tip.hidden = false; tip.innerHTML = (data[i].label || data[i].x) + ' · <b>' + fmt.format(data[i].y) + '</b> ' + (opts.unit || '');
      tip.style.left = (cx / W * r.width + svg.offsetLeft) + 'px';
      tip.style.top = (cy / H * r.height + svg.offsetTop) + 'px';
    }
    hit.addEventListener('pointermove', move);
    hit.addEventListener('pointerleave', function () { tip.hidden = true; cross.setAttribute('visibility', 'hidden'); dot.setAttribute('visibility', 'hidden'); });
    tableToggle(box, ['Period', opts.unit || 'Value'], data.map(function (d) { return [d.label || d.x, fmt.format(d.y)]; }));
  };

  // Horizontal bars. rows: [{label, value, group:'rw'|'ke'}]
  window.ampBars = function (box, rows, opts) {
    opts = opts || {};
    var W = Math.max(300, Math.round(box.clientWidth - 40)), bh = 22, gap = 10, m = { t: 4, r: 64, b: 4, l: W < 420 ? 108 : 124 };
    var H = m.t + m.b + rows.length * (bh + gap) - gap;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': opts.aria || 'Bar chart' });
    box.appendChild(svg);
    var max = opts.max || Math.max.apply(null, rows.map(function (r) { return r.value; }));
    var iw = W - m.l - m.r, tip = tipFor(box);
    var color = { rw: '#008A6E', ke: '#E4531C', one: '#000000' };
    rows.forEach(function (r, i) {
      var yy = m.t + i * (bh + gap), w = Math.max(4, r.value / max * iw);
      var t = el('text', { x: m.l - 10, y: yy + bh / 2 + 4, 'text-anchor': 'end' }, svg); t.textContent = r.label;
      var rect = el('rect', { x: m.l, y: yy, width: w, height: bh, rx: 4, fill: color[r.group || 'one'] }, svg);
      el('rect', { x: m.l, y: yy, width: Math.min(4, w), height: bh, fill: color[r.group || 'one'] }, svg);
      var v = el('text', { x: m.l + w + 8, y: yy + bh / 2 + 4, 'class': 'val' }, svg); v.textContent = fmt.format(r.value);
      var hit = el('rect', { x: 0, y: yy - gap / 2, width: W, height: bh + gap, fill: 'transparent' }, svg);
      hit.addEventListener('pointermove', function (ev) {
        var b = svg.getBoundingClientRect();
        tip.hidden = false; tip.innerHTML = r.label + (r.city ? ', ' + r.city : '') + ' · <b>' + fmt.format(r.value) + '</b> ' + (opts.unit || '');
        tip.style.left = (ev.clientX - b.left + svg.offsetLeft) + 'px';
        tip.style.top = ((yy) / H * b.height + svg.offsetTop) + 'px';
        rect.setAttribute('fill-opacity', '.8');
      });
      hit.addEventListener('pointerleave', function () { tip.hidden = true; rect.setAttribute('fill-opacity', '1'); });
    });
    tableToggle(box, ['Item', opts.unit || 'Value'], rows.map(function (r) { return [r.label + (r.city ? ' (' + r.city + ')' : ''), fmt.format(r.value)]; }));
  };

  // Request form (investor page)
  var f = document.getElementById('request');
  if (f && f.tagName === 'FORM') {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('request-ok');
      if (msg) msg.hidden = false;
    });
  }
})();
