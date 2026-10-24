"""Builds the eBook chapter pages from content.py.

Inline markup in content strings:
  **bold**  *italic*
  [[BigTopa words|GreekHouse words]]   brand-specific wording
  {{05}}                               cross-reference chip to chapter 05
Run:  python3 build.py <out_dir>
"""
import html
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from content import CHAPTERS, ELEMENTS  # noqa: E402

LAYER_POS = {  # (row, index-in-row, cells-in-row) for the locator
    '01': (2, 0, 3), '02': (2, 1, 3), '03': (2, 2, 3),
    '04': (1, 0, 4), '05': (1, 1, 4), '06': (1, 2, 4), '07': (1, 3, 4),
    '08': (0, 0, 1),
}
LAYER_NAME = {0: 'Learning layer', 1: 'Spaces layer', 2: 'Foundation layer'}
LAYER_WHERE = {0: 'the roof', 1: 'one of the four pillars', 2: 'the floor'}
HOUSE_PART = {0: 'Roof', 1: 'Pillars', 2: 'Floor'}

# Value calculator collection IDs (data-site on the embed), one per edition.
# PLACEHOLDER: these point at the existing site collections so the embed works today.
# When the architecture-specific collections exist, replace the values here and rebuild,
# or edit the data-site attribute directly in chapter-04-unification.html.
FM_ICONS = {
    'comms': '<path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H11l-4 3v-3H5A1.5 1.5 0 0 1 3.5 15V8A1.5 1.5 0 0 1 5 6.5z"/>',
    'people': '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 19.5c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>',
    'content': '<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M9.5 12h6M9.5 15.5h6"/>',
    'money': '<path d="M12 4v16M15.5 7.5c-.7-1-2-1.6-3.5-1.6-2 0-3.5 1-3.5 2.6 0 3.6 7 1.9 7 5.6 0 1.6-1.6 2.7-3.5 2.7-1.6 0-3-.6-3.8-1.8"/>',
}


def _key_item(icon, label):
    return (f'<span class="fm-key-item fm-chip-{icon}"><svg class="fm-key-chip" viewBox="-17 -17 34 34" aria-hidden="true">'
            '<circle r="15" class="fm-chip-bg"/><g class="fm-chip-icon" transform="translate(-9 -9) scale(.75)">'
            f'{FM_ICONS[icon]}</g></svg>{label}</span>')


FLOWMAP = (
    '<section class="flowmap-band" aria-label="How flow moves"><div class="wrap">'
    '<div class="flowmap" data-flowmap data-scene="family">'
    '<div class="fm-tabs" role="group" aria-label="Choose a view">'
    '<button type="button" data-fm-tab="family" aria-pressed="true">Organization Flow</button>'
    '<button type="button" data-fm-tab="chapter" aria-pressed="false">Chapter Flow</button></div>'
    '<div class="fm-stage">'
    '<ul class="fm-types" aria-label="Kinds of space">'
    '<li><i class="fm-sw fm-sw-hub"></i>Hub</li>'
    '<li class="fm-types-in"><i class="fm-sw fm-sw-space"></i>Space</li>'
    '<li class="fm-types-in"><i class="fm-sw fm-sw-room"></i>Room</li>'
    '<li class="fm-types-in"><i class="fm-sw fm-sw-meet"></i>Meetup</li></ul>'
    '<svg viewBox="0 0 900 520" role="img" aria-label="How flow moves"></svg>'
    '</div>'
    '<div class="fm-key" data-for="family">'
    '<div class="fm-key-group" data-dir="down"><span class="fm-key-title">Flow down</span>'
    + _key_item('content', 'Content') + _key_item('comms', 'Communications') + '</div>'
    '<div class="fm-key-group" data-dir="up"><span class="fm-key-title">Flow up</span>'
    + _key_item('people', 'People') + _key_item('money', 'Money') + '</div>'
    '</div>'
    '<div class="fm-key" data-for="chapter">'
    '<div class="fm-key-group" data-dir="up"><span class="fm-key-title">Flow up</span>'
    + _key_item('people', 'People') + _key_item('money', 'Money')
    + _key_item('content', 'Content') + _key_item('comms', 'Communications') + '</div>'
    '</div>'
    '</div></div></section>'
    '<script src="assets/flowmap.js" defer></script>')

CALC_SITE = {'bigtopa': 'bigtopa', 'greekhouse': 'kappa-jax'}  # GreekHouse edition uses the "Greek Demo" collection

GH_MARK = ('<svg class="gh" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#6B1E2E"/>'
           '<path d="M32 13 L55 29 L9 29 Z" fill="#D4AF6A"/><rect x="12" y="30.5" width="40" height="3.2" rx="1" fill="#D4AF6A"/>'
           '<rect x="15" y="35" width="4" height="14" rx="1" fill="#D4AF6A"/><rect x="24.5" y="35" width="4" height="14" rx="1" fill="#D4AF6A"/>'
           '<rect x="34" y="35" width="4" height="14" rx="1" fill="#D4AF6A"/><rect x="43.5" y="35" width="4" height="14" rx="1" fill="#D4AF6A"/>'
           '<rect x="11" y="50" width="42" height="3.6" rx="1" fill="#D4AF6A"/></svg>')


def chapter_file(num):
    return f"chapter-{num}-{ELEMENTS[num]['slug']}.html"


def md(text):
    """Inline markup -> HTML."""
    t = html.escape(text, quote=False)
    t = re.sub(r'\[\[(.*?)\|(.*?)\]\]',
               lambda m: (f'<span class="bt">{m.group(1)}</span>' if m.group(1) else '')
               + (f'<span class="gh">{m.group(2)}</span>' if m.group(2) else ''), t)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<em>\1</em>', t)
    t = re.sub(r'\{\{(\d\d)\}\}',
               lambda m: (f'<a class="xref" href="{chapter_file(m.group(1))}" data-keep-brand>'
                          f'<span class="n">{m.group(1)}</span>{ELEMENTS[m.group(1)]["title"]}</a>'), t)
    return t


def locator(num):
    row, idx, _ = LAYER_POS[num]
    rows = []
    for r, cells in ((0, 1), (1, 4), (2, 3)):
        items = ''.join('<i class="here"></i>' if (r == row and i == idx) else '<i></i>' for i in range(cells))
        rows.append(f'<span class="loc-row loc-row-{r}">{items}</span>')
    label = f'Location in the house: {LAYER_WHERE[row]}, in the {LAYER_NAME[row]}'
    return f'<span class="locator" role="img" aria-label="{label}">{"".join(rows)}</span>'


def status(s):
    return {'now': '<span class="status status-now">Available</span>',
            'next': '<span class="status status-next">Coming</span>'}[s]


def block(b):
    kind = b[0]
    if kind == 'p':
        return f'<p>{md(b[1])}</p>'
    if kind == 'h3':
        return f'<h3>{md(b[1])}</h3>'
    if kind == 'callout':
        return f'<div class="callout"><p>{md(b[1])}</p></div>'
    if kind == 'seealso':
        return f'<p class="see-also"><strong>{md(b[1])}</strong>{md(b[2])}</p>'
    if kind == 'table':
        _, headers, rows = b[:3]
        head = ''.join(f'<th scope="col">{md(h)}</th>' for h in headers)
        body = ''.join('<tr>' + ''.join(f'<td>{md(c)}</td>' for c in row) + '</tr>' for row in rows)
        wide = ' class="wide"' if len(headers) > 2 else ''
        return (f'<div class="table-wrap"><table{wide}><thead><tr>{head}</tr></thead>'
                f'<tbody>{body}</tbody></table></div>')
    if kind == 'cards':
        items = ''.join(f'<li><strong>{md(t)}</strong>{md(d)}</li>' for t, d in b[1])
        return f'<ul class="test-list">{items}</ul>'
    if kind == 'moments':
        items = ''.join(f'<li><span class="when">{md(w)}</span><strong>{md(t)}</strong>{md(d)}</li>' for w, t, d in b[1])
        return f'<ol class="moments">{items}</ol>'
    if kind == 'cues':
        items = ''.join(f'<div class="cue"><span class="cue-icon" aria-hidden="true">{icon}</span>'
                        f'<span><strong>{md(t)}</strong>{md(d)}</span></div>' for icon, t, d in b[1])
        return f'<div class="cues">{items}</div>'
    if kind == 'features':
        items = ''.join(f'<li><strong>{md(f[0])}</strong><span>{md(f[1])}</span></li>' for f in b[1])
        return f'<ul class="feature-list">{items}</ul>'
    if kind == 'ask':
        items = ''.join(f'<li>{md(q)}</li>' for q in b[1])
        return f'<ol class="ask">{items}</ol>'
    if kind == 'signal':
        _, big, strong, rest = b
        return (f'<div class="signal"><span class="big" aria-hidden="true">{html.escape(big)}</span>'
                f'<p><strong>{md(strong)}</strong> {md(rest)}</p></div>')
    if kind == 'scale':
        _, title, paras, items = b
        ps = ''.join(f'<p>{md(p)}</p>' for p in paras)
        cells = ''.join(f'<div class="{"just" if just else ""}"><strong>{md(t)}</strong><p>{md(d)}</p></div>'
                        for t, d, just in items)
        return (f'<div class="featured-conn"><div><h3>{md(title)}</h3>{ps}</div>'
                f'<div class="fit-scale" aria-label="The fit scale">{cells}</div></div>')
    if kind == 'calculator':
        _, intro = b
        return (f'</div><div class="wrap calc-wrap"><div class="calc-intro"><h3>How many apps are you juggling?</h3>'
                f'<p>{md(intro)}</p></div>'
                '<div class="calc-frame">'
                '<!-- CALCULATOR COLLECTION IDS: placeholders; swap for the architecture collections -->'
                f'<div class="bt" data-bt-calculator data-site="{CALC_SITE["bigtopa"]}"></div>'
                f'<div class="gh" data-bt-calculator data-site="{CALC_SITE["greekhouse"]}"></div>'
                '<noscript><p>Open the <a href="https://bt-value-calculator.netlify.app/">value calculator</a>.</p></noscript>'
                '</div>'
                '<p class="calc-fallback">Calculator not loading? '
                '<a href="https://bt-value-calculator.netlify.app/" target="_blank" rel="noopener">Open it in a new tab</a>.</p>'
                '</div><div class="prose">')
    raise ValueError(kind)


def section(sec, tint):
    cls = 'section section-tint' if tint else 'section'
    sid = sec['id']
    body = ''.join(block(b) for b in sec['blocks'])
    return (f'<section class="{cls}" aria-labelledby="{sid}"><div class="prose">'
            f'<p class="label">{md(sec["label"])}</p><h2 id="{sid}">{md(sec["title"])}</h2>'
            f'{body}</div></section>')


def page(num):
    ch = CHAPTERS[num]
    el = ELEMENTS[num]
    nums = sorted(ELEMENTS)
    i = nums.index(num)
    if i == 0:
        prev = '<a href="elements.html" data-keep-brand><small>← Before you start</small>About the elements</a>'
    else:
        p = nums[i - 1]
        prev = f'<a href="{chapter_file(p)}" data-keep-brand><small>← Previous</small>{p} {ELEMENTS[p]["title"]}</a>'
    if i == len(nums) - 1:
        nxt = '<a class="next" href="elements.html#start" data-keep-brand><small>You\'ve read all eight →</small>Where to start</a>'
    else:
        n = nums[i + 1]
        nxt = f'<a class="next" href="{chapter_file(n)}" data-keep-brand><small>Next →</small>{n} {ELEMENTS[n]["title"]}</a>'

    sections = ''.join(section(s, k % 2 == 1) for k, s in enumerate(ch['sections']))
    tint_next = len(ch['sections']) % 2 == 1

    conn = ''.join(
        f'<article class="conn"><div class="pair"><a class="pill" href="{chapter_file(c)}" data-keep-brand>'
        f'<span class="n">{c}</span>{ELEMENTS[c]["title"]}</a></div><p>{md(t)}</p></article>'
        for c, t in ch['connected'])
    connected = (f'<section class="section{" section-tint" if tint_next else ""}" aria-labelledby="connected">'
                 f'<div class="wrap"><p class="label">Connected elements</p>'
                 f'<h2 id="connected" style="margin-bottom: 8px;">{md(el["title"])} doesn\'t stand alone.</h2>'
                 f'<div class="conn-grid">{conn}</div>'
                 f'<p style="margin-top: 20px;"><a href="elements.html#connections" data-keep-brand>See how all eight elements connect →</a></p>'
                 f'</div></section>')
    tint_next = not tint_next

    sources = ''
    if ch.get('sources'):
        items = ''.join(f'<li>{md(s)}</li>' for s in ch['sources'])
        sources = (f'<section class="section{" section-tint" if tint_next else ""}" aria-labelledby="sources">'
                   f'<div class="prose"><h2 id="sources" style="font-size: 26px; margin-bottom: 16px;">Sources</h2>'
                   f'<ol class="sources">{items}</ol></div></section>')
        tint_next = not tint_next

    nav = (f'<section class="section{" section-tint" if tint_next else ""}" aria-label="Chapter navigation">'
           f'<div class="wrap"><nav class="chapter-nav" aria-label="Previous and next chapters">{prev}{nxt}</nav>'
           f'<p style="margin-top: 20px;"><a href="elements.html#contents" data-keep-brand>Back to all eight elements</a></p>'
           f'</div></section>')

    row = LAYER_POS[num][0]
    visual = FLOWMAP if ch.get('hero_visual') == 'flowmap' else ''
    calc_script = ('<script src="https://bt-value-calculator.netlify.app/embed.js" defer></script>'
                   if any(b[0] == 'calculator' for s in ch['sections'] for b in s['blocks']) else '')
    title = f'{num} {el["title"]}: {el["eyebrow"]}'
    return f'''<!doctype html>
<html lang="en" data-brand="bigtopa" data-title="{html.escape(title)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BigTopa · {html.escape(title)}</title>
  <meta name="description" content="Chapter {num} of the Digital Transformation Architecture: {html.escape(el['title'])}. {html.escape(el['question'])}">
  <script>try{{var b=new URLSearchParams(location.search).get('brand')||localStorage.getItem('dta-brand');if(b==='greekhouse'||b==='bigtopa')document.documentElement.setAttribute('data-brand',b)}}catch(e){{}}</script>
  <link rel="stylesheet" href="assets/ebook.css">
</head>
<body>

<header class="topbar">
  <div class="wrap topbar-inner">
    <a class="brand" href="index.html" data-keep-brand>
      <span class="brand-mark" aria-hidden="true">
        <img class="bt" src="assets/img/bigtopa-mark.svg" alt="">
        {GH_MARK}
      </span>
      <span><span class="bt">BigTopa</span><span class="gh">GreekHouse</span><small>Digital Transformation Architecture</small></span>
    </a>
    <div class="brand-switch" role="group" aria-label="Edition">
      <button type="button" data-brand-btn="bigtopa" aria-pressed="true">BigTopa</button>
      <button type="button" data-brand-btn="greekhouse" aria-pressed="false">GreekHouse</button>
    </div>
    <a class="nav-link" href="elements.html#contents" data-keep-brand>Contents</a>
  </div>
</header>

<main class="chapter-body">

  <section class="hero chapter-hero" aria-labelledby="title">
    <div class="wrap hero-inner">
      <p class="chapter-num">
        {locator(num)}
        Chapter {num} · {HOUSE_PART[row]} · {html.escape(el['eyebrow'])}
      </p>
      <h1 id="title">{html.escape(el['title'])}</h1>
      <p class="hero-sub" style="font-size: 22px;">{md(ch['hero'])}</p>
      <p class="hero-question">{md(el['question'])}</p>
    </div>
  </section>

  {visual}
  {sections}
  {connected}
  {sources}
  {nav}

</main>

<footer class="footer">
  <div class="wrap footer-inner">
    <span><strong><span class="bt">BigTopa</span><span class="gh">GreekHouse.io</span></strong> · Digital Transformation Architecture</span>
    <span>Sample edition · October 2026</span>
  </div>
</footer>

<script src="assets/brand.js"></script>
{calc_script}
</body>
</html>
'''


if __name__ == '__main__':
    out = sys.argv[1]
    for num in sorted(CHAPTERS):
        path = os.path.join(out, chapter_file(num))
        with open(path, 'w', encoding='utf-8') as f:
            f.write(page(num))
        print('wrote', path)
