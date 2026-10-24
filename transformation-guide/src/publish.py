"""Publish the eBook as three folders for guide.bigtopa.com.

  /bigtopa/     public, locked to BigTopa (no switch), calculator: guide-bigtopa
  /greekhouse/  public, locked to GreekHouse (no switch), calculator: guide-greekhouse
  /guide/       Gabriel's demo: brand switch on, hidden from search engines,
                calculator preselects apps from the link: /guide/?apps=groupme,venmo&size=60

Run:  python3 publish.py <ebook_dir> <site_dir>
The ebook_dir is the built eBook (build.py output plus index.html, elements.html, assets/).
Word files, mockups and build scripts are never published.
"""
import os
import shutil
import sys

from bs4 import BeautifulSoup

DOMAIN = 'https://guide.bigtopa.com'
CALC = {'bigtopa': 'guide-bigtopa', 'greekhouse': 'guide-greekhouse'}
OTHER = {'bigtopa': 'gh', 'greekhouse': 'bt'}
PAGES = ['index.html', 'elements.html'] + [f'chapter-0{i}-{s}.html' for i, s in enumerate(
    ['culture', 'process', 'data', 'unification', 'fit', 'flow', 'feel', 'intelligence'], start=1)]

# /guide/: remember ?apps and ?size for the visit, so a prospect link works from any page
GUIDE_HEAD = ("try{var q=new URLSearchParams(location.search),a=q.get('apps'),s=q.get('size');"
              "if(a)sessionStorage.setItem('dta-apps',a);if(s)sessionStorage.setItem('dta-size',s)}catch(e){}")
# runs right after the calculator markup, before the embed script (deferred) mounts it
GUIDE_CALC = ("try{var A=sessionStorage.getItem('dta-apps'),Z=sessionStorage.getItem('dta-size');"
              "document.querySelectorAll('[data-bt-calculator]').forEach(function(el){"
              "if(A)el.setAttribute('data-apps',A);if(Z)el.setAttribute('data-size',Z)})}catch(e){}")


def set_calculators(soup):
    for el in soup.select('[data-bt-calculator]'):
        brand = 'greekhouse' if 'gh' in (el.get('class') or []) else 'bigtopa'
        el['data-site'] = CALC[brand]


def head_script(soup):
    """The inline script in <head> that picks the brand before first paint."""
    for s in soup.head.find_all('script'):
        if s.string and 'dta-brand' in s.string:
            return s
    return None


def publish_locked(soup, brand, page):
    html = soup.html
    html['data-brand'] = brand
    html['data-brand-lock'] = brand
    hs = head_script(soup)
    if hs:
        hs.decompose()
    for el in soup.select('.brand-switch'):
        el.decompose()
    # keep only this edition's wording, so search engines index one brand per page
    for el in soup.select('.' + OTHER[brand]):
        el.decompose()
    set_calculators(soup)
    link = soup.new_tag('link', rel='canonical', href=f'{DOMAIN}/{brand}/' + ('' if page == 'index.html' else page))
    soup.head.append(link)


def publish_guide(soup):
    soup.head.append(soup.new_tag('meta', attrs={'name': 'robots', 'content': 'noindex, nofollow'}))
    s = soup.new_tag('script')
    s.string = GUIDE_HEAD
    soup.head.append(s)
    set_calculators(soup)
    calcs = soup.select('[data-bt-calculator]')
    if calcs:
        frame = calcs[-1]
        t = soup.new_tag('script')
        t.string = GUIDE_CALC
        frame.insert_after(t)


def main():
    src, out = sys.argv[1], sys.argv[2]
    if os.path.exists(out):
        shutil.rmtree(out)
    os.makedirs(out)
    for edition in ('bigtopa', 'greekhouse', 'guide'):
        dest = os.path.join(out, edition)
        shutil.copytree(os.path.join(src, 'assets'), os.path.join(dest, 'assets'))
        for page in PAGES:
            soup = BeautifulSoup(open(os.path.join(src, page), encoding='utf-8').read(), 'html.parser')
            if edition == 'guide':
                publish_guide(soup)
            else:
                publish_locked(soup, edition, page)
            open(os.path.join(dest, page), 'w', encoding='utf-8').write(str(soup))
    # GreekHouse-only photos are not needed in the BigTopa edition
    for img in ('house-before.jpg', 'house-after.jpg'):
        p = os.path.join(out, 'bigtopa', 'assets', 'img', img)
        if os.path.exists(p):
            os.remove(p)
    open(os.path.join(out, '_redirects'), 'w').write('/  /bigtopa/  302\n')
    open(os.path.join(out, 'robots.txt'), 'w').write(
        f'User-agent: *\nDisallow: /guide/\n\nSitemap: {DOMAIN}/sitemap.xml\n')
    urls = ''.join(f'<url><loc>{DOMAIN}/{e}/{"" if p == "index.html" else p}</loc></url>'
                   for e in ('bigtopa', 'greekhouse') for p in PAGES)
    open(os.path.join(out, 'sitemap.xml'), 'w').write(
        '<?xml version="1.0" encoding="UTF-8"?>'
        f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>\n')
    print('published to', out)


if __name__ == '__main__':
    main()
