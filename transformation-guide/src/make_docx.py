"""Builds one Word document of the whole eBook from the finished HTML pages.

Brand wording is shown inline as  [BigTopa: … | GreekHouse: …]  so both editions
can be reviewed in one pass. Run:  python3 make_docx.py <ebook_dir> <out.docx>
"""
import os
import subprocess
import sys

from bs4 import BeautifulSoup, NavigableString

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from content import CHAPTERS, ELEMENTS  # noqa: E402

ORDER = ['index.html', 'elements.html'] + [
    f"chapter-{n}-{ELEMENTS[n]['slug']}.html" for n in sorted(ELEMENTS)]
PAGE_TITLES = {'index.html': 'Home', 'elements.html': 'About the Elements'}


def text_of(el):
    return ' '.join(el.get_text(' ', strip=True).split())


def brand_markers(soup):
    """Pair each .bt with a following .gh sibling into one bracketed marker."""
    def has(el, c):
        return getattr(el, 'get', None) and c in (el.get('class') or [])

    for bt in list(soup.select('.bt')):
        if bt.parent is None:
            continue
        sib = bt.next_sibling
        while isinstance(sib, NavigableString) and not sib.strip():
            sib = sib.next_sibling
        gh = sib if has(sib, 'gh') else None
        bt_text, gh_text = text_of(bt), (text_of(gh) if gh else None)
        if bt.name in ('img', 'svg') or (gh is not None and gh.name in ('img', 'svg')):
            bt.decompose()
            if gh is not None:
                gh.decompose()
            continue
        if gh is not None:
            marker = f'[BigTopa: {bt_text} | GreekHouse: {gh_text}]' if bt_text != gh_text else bt_text
            gh.decompose()
        else:
            marker = f' [BigTopa only: {bt_text}]'
        bt.replace_with(NavigableString(marker))
    for gh in list(soup.select('.gh')):
        if gh.parent is None:
            continue
        if gh.name in ('img', 'svg'):
            gh.decompose()
            continue
        if gh.select('img'):  # GreekHouse-only photos
            gh.replace_with(BeautifulSoup('<p>[GreekHouse only: before/after photos of the chapter house]</p>', 'html.parser'))
            continue
        gh.replace_with(NavigableString(f' [GreekHouse only: {text_of(gh)}]'))


def simplify(soup, page):
    # cross-reference chips and pills: '05' + 'Fit' -> '05 Fit'
    for x in soup.select('.xref, .pill'):
        n = x.select_one('.n')
        if n:
            num = n.get_text(strip=True); n.decompose()
            x.insert(0, NavigableString(num + ' '))
    for el in soup.select('script, svg, img, .locator, .status, .roof-sides, .brand-switch, .hero-actions'):
        el.decompose()
    # web-only navigation: chapter nav sections and link-only lines
    for nav in soup.select('nav.chapter-nav'):
        sec = nav.find_parent('section')
        (sec or nav).decompose()
    for p in soup.select('p'):
        kids = [c for c in p.contents if not (isinstance(c, NavigableString) and not c.strip())]
        if len(kids) == 1 and getattr(kids[0], 'name', None) == 'a':
            p.decompose()
    for el in soup.find_all(id=True):
        del el['id']

    # flow animation -> placeholder
    for el in soup.select('.flowmap-band'):
        el.replace_with(BeautifulSoup(
            '<p><strong>[Interactive: flow animation]</strong> Two views, Organization Flow and Chapter Flow, with colored icons for people, money, content and communications, '
            'a flow legend for each view and a key to the kinds of space (hub, space, room, meetup). '
            'Organization Flow: (1) Flow down: content and communications from national reach each region, then every chapter. '
            '(2) Flow up: members and money from every chapter are counted at the region and national. '
            'Chapter Flow: Flow up: people, money, content and communications flow up from rooms to spaces to the hub; '
            'meetups appear, what they produce flows up to the hub, and they end. (Web only.)</p>', 'html.parser'))

    # value calculator -> placeholder
    for el in soup.select('.calc-wrap'):
        el.replace_with(BeautifulSoup(
            '<p><strong>[Interactive: value calculator]</strong> "How many apps are you juggling?" '
            'Readers select the apps they use today and see what one home could replace. '
            '(Web only; embedded from bt-value-calculator.netlify.app.)</p>', 'html.parser'))

    # home: the house -> an ordered list
    for house in soup.select('nav.house'):
        items = []
        for n in ['08', '04', '05', '06', '07', '01', '02', '03']:
            e = ELEMENTS[n]
            items.append(f'<li><strong>{n} {e["title"]}</strong> ({e["eyebrow"]}): {e["question"]}</li>')
        house.replace_with(BeautifulSoup(
            '<p>The house, from roof to floor:</p><ul>' + ''.join(items) + '</ul>', 'html.parser'))

    # contents list on the About page
    for layer in soup.select('.toc-layer'):
        name = layer.select_one('.toc-layer-name')
        lis = []
        for it in layer.select('.toc-item'):
            num = it.select_one('.toc-num').get_text(strip=True)
            title = it.select_one('.toc-title')
            small = title.select_one('small')
            eyebrow = small.get_text(strip=True) if small else ''
            if small:
                small.decompose()
            q = it.select_one('.toc-q').get_text(' ', strip=True)
            lis.append(f'<li><strong>{num} {title.get_text(strip=True)}</strong> ({eyebrow}): {q}</li>')
        layer_name = name.contents[0].strip() if name.contents else ''
        sub = name.select_one('small').get_text(strip=True) if name.select_one('small') else ''
        layer.replace_with(BeautifulSoup(f'<h3>{layer_name}</h3><p>{sub}</p><ul>{"".join(lis)}</ul>', 'html.parser'))

    # connection cards / pills
    for pair in soup.select('.pair'):
        names = [text_of(p) for p in pair.select('.pill')]
        pair.replace_with(BeautifulSoup(f'<strong>{" ↔ ".join(names)}: </strong>', 'html.parser'))
    for card in soup.select('.conn'):
        card.name = 'p'

    # fit scale
    for sc in soup.select('.fit-scale'):
        lis = ''.join(f'<li><strong>{text_of(d.find("strong"))}:</strong> {text_of(d.find("p"))}</li>'
                      for d in sc.find_all('div', recursive=False))
        sc.replace_with(BeautifulSoup(f'<ul>{lis}</ul>', 'html.parser'))

    # signal box
    for sig in soup.select('.signal'):
        big = sig.select_one('.big')
        if big:
            big.decompose()
        for ip in sig.find_all('p'):
            ip.unwrap()
        sig.name = 'p'
        sig.insert(0, BeautifulSoup('<strong>Signal: </strong>', 'html.parser'))

    # list items that start with a bold title: add a separator
    for li in soup.select('li'):
        first = next((c for c in li.contents if not (isinstance(c, NavigableString) and not c.strip())), None)
        if getattr(first, 'name', None) == 'span' and 'when' in (first.get('class') or []):
            first.replace_with(NavigableString(first.get_text(strip=True) + ' · '))
            first = next((c for c in li.contents if getattr(c, 'name', None) == 'strong'), None)
        if getattr(first, 'name', None) == 'strong':
            nxt = first.next_sibling
            if nxt is not None and not (isinstance(nxt, NavigableString) and nxt.startswith((' ', ':'))):
                first.insert_after(NavigableString(': '))
    for st in soup.select('.see-also > strong:first-child, .cue strong'):
        st.insert_after(NavigableString(': '))

    # chapter number line
    for cn in soup.select('.chapter-num'):
        cn.name = 'p'
        cn.string = text_of(cn)

    # links -> plain text (relative links mean nothing in Word)
    for a in soup.select('a'):
        a.unwrap()


def page_html(path, name):
    soup = BeautifulSoup(open(path, encoding='utf-8').read(), 'html.parser')
    main = soup.find('main')
    brand_markers(main)
    simplify(main, name)
    # page heading: chapters keep their h1; home/about get their own
    for h1 in main.select('h1'):
        h1.name = 'h2'
    if name in PAGE_TITLES:
        title = PAGE_TITLES[name]
    else:
        num = name.split('-')[1]
        e = ELEMENTS[num]
        title = f'Chapter {num}: {e["title"]} ({e["eyebrow"]})'
    for h2 in main.select('h2'):
        if h2 is not main.select('h2')[0]:
            h2.name = 'h3'
    for h3 in main.select('h3'):
        pass
    return f'<h1>{title}</h1>' + ''.join(str(c) for c in main.contents)


def review_checklist():
    return ('<h1>Before you edit</h1>'
            '<p><strong>How to review:</strong> turn on Track Changes, edit freely and add comments. '
            'Send this file back and the changes will be applied to the web version.</p>'
            '<p><strong>Two editions in one document.</strong> Wherever the BigTopa and GreekHouse editions differ, '
            'both versions appear in brackets: [BigTopa: … | GreekHouse: …]. Edit either side. '
            '[BigTopa only: …] and [GreekHouse only: …] mark text that appears in one edition.</p>'
            '<p><strong>Not in this document:</strong> layout, colors, icons, the flow animation and the interactive value calculator. '
            'Those live in the web version.</p>'
            '<h2>Claims to confirm before publishing</h2><ul>'
            '<li>07 Feel: private one-on-one features are turned off between adults and minors in spaces with members under 18.</li>'
            '<li>07 Feel: huddles are never recorded unless everyone agrees.</li>'
            '<li>04 Unification and Home: "no platform cut on member revenue."</li>'
            '<li>06 Flow: chapters can submit posts to the national blog; regions can invite all their chapters to a meetup; chapters collaborate by invitation and acceptance.</li>'
            '<li>03 Data: no bulk exports of member contact details; contact details hidden by default.</li>'
            '<li>08 Intelligence: nothing the assistant drafts is sent without a person approving it.</li>'
            '</ul>')


def main():
    src, out = sys.argv[1], sys.argv[2]
    parts = [review_checklist()]
    for name in ORDER:
        parts.append(page_html(os.path.join(src, name), name))
    body = ''.join(parts)
    html_doc = ('<!doctype html><html><head><meta charset="utf-8">'
                '<title>Digital Transformation Architecture: Review Draft</title></head><body>'
                '<p><strong>Digital Transformation Architecture</strong></p>'
                '<p>Complete review draft, BigTopa and GreekHouse editions · October 2026</p>'
                f'{body}</body></html>')
    tmp = out + '.html'
    open(tmp, 'w', encoding='utf-8').write(html_doc)
    subprocess.run(['pandoc', tmp, '-f', 'html', '-t', 'docx', '-o', out, '--toc', '--toc-depth=1',
                    '--metadata', 'title=Digital Transformation Architecture: Review Draft'], check=True)
    os.remove(tmp)
    print('wrote', out)


if __name__ == '__main__':
    main()
