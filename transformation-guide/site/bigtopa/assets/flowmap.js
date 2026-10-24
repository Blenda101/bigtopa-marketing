// Flow map: two scales of natural flow, drawn as an animated SVG.
// Three narrated steps, one direction at a time, one color, no legend:
//   1) down: national -> regions -> chapters   2) up: chapters -> regions -> national
//   3) inside a chapter: room -> space -> hub, one room at a time
// The path being travelled lights up while a dot moves along it.
// Labels follow the page brand (html[data-brand]). Respects reduced motion.
(function () {
  var root = document.querySelector('[data-flowmap]');
  if (!root) return;

  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STEP_MS = 10000;    // time on each step
  var TRAVEL_MS = 4200;   // time for one dot to cross its whole path

  var LABELS = {
    bigtopa: {
      national: 'National', region: 'Region', chapter: 'Chapter',
      spaces: [['Programs', ['Teens', 'Tweens']], ['Members', ['New', 'Veterans', 'Committee']],
               ['Foundation', ['Board']], ['Events', ['Gala team']]],
      family: 'Organization Flow', inside: 'Chapter Flow',
      rise: [[0, 0, 'content'], [1, 0, 'people'], [2, 0, 'money'], [1, 2, 'comms']]   // [space, room] pairs that rise, in order
    },
    greekhouse: {
      national: 'National HQ', region: 'Region', chapter: 'Chapter',
      spaces: [['Programs', ['Mentoring', 'Youth']], ['Lounge', ["Spr '26", 'Mids', 'Elders']],
               ['Foundation', ['Board']], ['Events', ["Founders' Day"]]],
      family: 'Organization Flow', inside: 'Chapter Flow',
      rise: [[0, 0, 'content'], [1, 0, 'people'], [2, 0, 'money'], [1, 2, 'comms']]
    }
  };

  function steps(L, brand) {
    var gh = brand === 'greekhouse';
    var room = L.spaces[L.rise[0][0]][1][L.rise[0][1]], space = L.spaces[L.rise[0][0]][0];
    // dir drives the legend highlight; desc is for screen readers only
    var nat = gh ? 'National HQ' : 'National';
    return [
      { id: 'down', scene: 'family', dir: 'down',
        desc: 'Flow down: an announcement and a post from ' + nat + ' reach each region, then every chapter.' },
      { id: 'up', scene: 'family', dir: 'up',
        desc: 'Flow up: new members and money raised by chapters are counted at the region and at ' + nat + '.' },
      { id: 'rise', scene: 'chapter', dir: 'up',
        desc: 'Flow up: people, money, posts and messages flow up from rooms to spaces to the hub. Meetups appear, what they produce flows up to the hub, and they end.' }
    ];
  }

  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function text(parent, x, y, s, cls) {
    var t = el('text', { x: x, y: y, 'class': cls || 'fm-label', 'text-anchor': 'middle' }, parent);
    t.textContent = s;
    return t;
  }
  function pathD(pts) {
    return pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0] + ' ' + p[1]; }).join(' ');
  }
  function hub(parent, p, r, label, cls, inside) {
    el('circle', { cx: p[0], cy: p[1], r: r, 'class': cls }, parent);
    if (!label) return;
    if (inside) text(parent, p[0], p[1] + 6, label, 'fm-label fm-label-in');
    else text(parent, p[0], p[1] + r + 20, label, 'fm-label fm-label-out');
  }

  var svg = root.querySelector('svg');
  var tabs = root.querySelectorAll('[data-fm-tab]');
  var STEPS = [];
  var flows = [], dots = [];
  var step = 0, stepStart = 0, lockScene = null, timer = null;

  function addFlow(parent, stepId, d, offset, icon, travel) {
    var path = el('path', { d: d, 'class': 'fm-track' }, parent);
    flows.push({ step: stepId, path: path, len: path.getTotalLength(), offset: offset, layer: parent, icon: icon,
                 travel: travel || TRAVEL_MS, fired: false });
  }

  // Small icon chips that travel the paths: what is moving, without a legend.
  // Drawn in a 24x24 box centred on the chip (simple strokes, Lucide-style).
  var ICONS = {
    comms: '<path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H11l-4 3v-3H5A1.5 1.5 0 0 1 3.5 15V8A1.5 1.5 0 0 1 5 6.5z"/>',
    people: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 19.5c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>',
    content: '<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M9.5 12h6M9.5 15.5h6"/>',
    money: '<path d="M12 4v16M15.5 7.5c-.7-1-2-1.6-3.5-1.6-2 0-3.5 1-3.5 2.6 0 3.6 7 1.9 7 5.6 0 1.6-1.6 2.7-3.5 2.7-1.6 0-3-.6-3.8-1.8"/>'
  };
  function chip(layer, icon) {
    var g = el('g', { 'class': 'fm-chip fm-chip-' + icon }, layer);
    var inner = el('g', { 'class': 'fm-chip-inner' }, g);
    el('circle', { r: 15, 'class': 'fm-chip-bg' }, inner);
    var i = el('g', { 'class': 'fm-chip-icon', transform: 'translate(-9 -9) scale(.75)' }, inner);
    i.innerHTML = ICONS[icon] || '';
    return g;
  }

  // ------------------------------------------------------------ build
  function build() {
    var brand = document.documentElement.getAttribute('data-brand') === 'greekhouse' ? 'greekhouse' : 'bigtopa';
    var L = LABELS[brand];
    STEPS = steps(L, brand);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    flows = []; dots = [];
    tabs[0].textContent = L.family;
    tabs[1].textContent = L.inside;

    // ---------- across the organization
    var gF = el('g', { 'class': 'fm-scene fm-family' }, svg);
    var N = [450, 80], R = [[250, 220], [650, 220]];
    var CH = [[[130, 370], [250, 370], [370, 370]], [[530, 370], [650, 370], [770, 370]]];
    var lines = el('g', { 'class': 'fm-lines' }, gF);
    R.forEach(function (r, i) {
      el('path', { d: pathD([N, r]), 'class': 'fm-edge' }, lines);
      CH[i].forEach(function (c) { el('path', { d: pathD([r, c]), 'class': 'fm-edge' }, lines); });
    });
    var tracks = el('g', {}, gF);
    hub(gF, N, 42, L.national, 'fm-hub');
    R.forEach(function (r, i) {
      hub(gF, r, 32, '', 'fm-hub');
      var t = text(gF, r[0] + (i ? 44 : -44), r[1] + 5, L.region, 'fm-label fm-label-out');
      t.setAttribute('text-anchor', i ? 'start' : 'end');
    });
    CH.forEach(function (row) { row.forEach(function (c) { hub(gF, c, 22, L.chapter, 'fm-hub fm-hub-sm'); }); });
    // down: national sends an announcement (left) and a post (right); each reaches its region, then every chapter
    R.forEach(function (r, i) {
      var icon = i ? 'content' : 'comms';
      addFlow(tracks, 'down', pathD([N, r]), 300, icon, 2000);
      CH[i].forEach(function (c) { addFlow(tracks, 'down', pathD([r, c]), 2400, icon, 2200); });
    });
    // up: every chapter sends members and money up, staggered so it reads as a steady stream
    var order = [[0, 0, 'people'], [1, 1, 'money'], [0, 2, 'money'], [1, 0, 'people'], [0, 1, 'people'], [1, 2, 'money']];
    order.forEach(function (o, k) {
      addFlow(tracks, 'up', pathD([CH[o[0]][o[1]], R[o[0]], N]), 300 + k * 900, o[2]);
    });

    // ---------- inside a chapter
    var gC = el('g', { 'class': 'fm-scene fm-chapter' }, svg);
    var H = [450, 255];
    var SP = [[235, 150], [665, 150], [235, 370], [665, 370]];
    var ROOM_POS = [
      [[90, 70], [80, 190]], [[800, 60], [835, 160], [790, 250]],
      [[80, 420], [150, 480]], [[820, 440], [700, 480]]
    ];
    var ROOMS = ROOM_POS.map(function (pos, i) { return pos.slice(0, L.spaces[i][1].length); });
    var cl = el('g', { 'class': 'fm-lines' }, gC);
    SP.forEach(function (s, i) {
      el('path', { d: pathD([s, H]), 'class': 'fm-edge' }, cl);
      ROOMS[i].forEach(function (r) { el('path', { d: pathD([r, s]), 'class': 'fm-edge' }, cl); });
    });
    var ctracks = el('g', {}, gC);
    hub(gC, H, 46, 'Hub', 'fm-hub fm-hub-main', true);
    SP.forEach(function (s, i) {
      hub(gC, s, 34, L.spaces[i][0], 'fm-space');
      ROOMS[i].forEach(function (r, k) {
        el('circle', { cx: r[0], cy: r[1], r: 15, 'class': 'fm-room' }, gC);
        text(gC, r[0], r[1] + 33, L.spaces[i][1][k] || '', 'fm-label fm-label-sm');
      });
    });
    L.rise.forEach(function (p, k) {
      addFlow(ctracks, 'rise', pathD([ROOMS[p[0]][p[1]], SP[p[0]], H]), 300 + k * 1900, p[2], 3600);
    });
    // meetups: temporary, placed in open space, tied by a dotted line to where they were created.
    // They appear, what they produce flows home, then they disappear.
    // each meetup: [position, the route home to the hub, what it sends]
    var MEET = [[[450, 128], [H], 'content'], [[555, 78], [SP[1], H], 'comms'], [[872, 345], [ROOMS[3][0], SP[3], H], 'money']];
    var gm = el('g', { 'class': 'fm-meetups' }, gC);
    MEET.forEach(function (m, i) {
      var g = el('g', { 'class': 'fm-meetup', style: 'animation-delay:' + (0.4 + i * 0.9) + 's' }, gm);
      el('path', { d: pathD([m[0], m[1][0]]), 'class': 'fm-meet-link' }, g);
      el('circle', { cx: m[0][0], cy: m[0][1], r: 11, 'class': 'fm-meet' }, g);
      addFlow(ctracks, 'rise', pathD([m[0]].concat(m[1])), 2800 + i * 900, m[2], 3200 + (m[1].length - 1) * 700);
      flows[flows.length - 1].noTrail = true;
    });

    var topF = el('g', { 'class': 'fm-top' }, gF), topC = el('g', { 'class': 'fm-top' }, gC);
    flows.forEach(function (f) { f.top = f.layer.parentNode === gF ? topF : topC; });
    go(step, true);
  }

  // ------------------------------------------------------------ animate
  function frame(now) {
    var t = now - stepStart;
    var cur = STEPS[step] && STEPS[step].id;
    flows.forEach(function (f) {
      if (f.step === cur && !f.fired && t >= f.offset) {
        f.fired = true;
        var c = chip(f.top || f.layer, f.icon);
        if (!f.noTrail) f.path.classList.add('fm-track-on');
        dots.push({ c: c, f: f, born: now });
      }
    });
    dots = dots.filter(function (d) {
      var u = (now - d.born) / d.f.travel;
      if (u >= 1 || d.f.step !== cur) {
        d.c.remove();
        if (d.f.step !== cur) d.f.path.classList.remove('fm-track-on');
        return false;
      }
      var e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      var pt = d.f.path.getPointAtLength(e * d.f.len);
      d.c.setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ')');
      return true;
    });
    requestAnimationFrame(frame);
  }

  // ------------------------------------------------------------ steps
  function go(i, keepClock) {
    step = i;
    var s = STEPS[i];
    if (!keepClock) stepStart = performance.now();
    flows.forEach(function (f) {
      f.fired = false;
      f.path.classList.remove('fm-track-on');
      if (reduce && f.step === s.id) f.path.classList.add('fm-track-on');   // still frame: show the path
    });
    root.setAttribute('data-scene', s.scene);
    root.setAttribute('data-step', s.id);
    var ms = svg.querySelectorAll('.fm-meetup');
    for (var m = 0; m < ms.length; m++) {
      ms[m].classList.remove('play');
      void ms[m].getBoundingClientRect();   // reflow so the animation starts over
      if (s.id === 'rise') ms[m].classList.add('play');
    }
    for (var k = 0; k < tabs.length; k++) {
      tabs[k].setAttribute('aria-pressed', String(tabs[k].getAttribute('data-fm-tab') === s.scene));
    }
    root.setAttribute('data-dir', s.dir);
    svg.setAttribute('aria-label', s.desc);
  }

  function next() {
    var i = step;
    do { i = (i + 1) % STEPS.length; } while (lockScene && STEPS[i].scene !== lockScene);
    go(i);
  }

  for (var k = 0; k < tabs.length; k++) {
    tabs[k].addEventListener('click', function (e) {
      lockScene = e.currentTarget.getAttribute('data-fm-tab');   // reader chose a view: loop within it
      for (var i = 0; i < STEPS.length; i++) { if (STEPS[i].scene === lockScene) { go(i); break; } }
      if (!reduce) { clearInterval(timer); timer = setInterval(next, STEP_MS); }
    });
  }

  stepStart = performance.now();
  build();
  if (!reduce) {
    requestAnimationFrame(frame);
    timer = setInterval(next, STEP_MS);
  }
  new MutationObserver(build).observe(document.documentElement, { attributes: true, attributeFilter: ['data-brand'] });
})();
