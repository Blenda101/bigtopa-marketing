# Transformation Guide (guide.bigtopa.com)

The Digital Transformation Architecture guide: 8 elements, BigTopa and GreekHouse editions.

| Path | Audience | Brand | Calculator collection |
|---|---|---|---|
| `/bigtopa/` | Public | Locked to BigTopa | `guide-bigtopa` |
| `/greekhouse/` | Public | Locked to GreekHouse | `guide-greekhouse` |
| `/guide/` | Demos (hidden from search) | Brand switch | same collections, apps preselected from the link |
| `/` | | redirects to `/bigtopa/` | |

## Demo links

`https://guide.bigtopa.com/guide/?brand=greekhouse&apps=groupme,venmo,cash-app,eventbrite&size=60`

- `apps`: app names in lowercase with dashes (`Google Drive` -> `google-drive`, `Cash App` -> `cash-app`)
- `size`: people in the organization
- The choices are kept for the visit, so the link can point at any page; chapter 04 shows them in the calculator.

## Editing

1. Chapter text lives in `src/content.py`. Home and About pages are `src/ebook/index.html` and `src/ebook/elements.html`.
2. Rebuild:
   ```
   python3 src/build.py src/ebook        # chapter pages
   python3 src/publish.py src/ebook site # the three editions
   ```
   (needs `pip install beautifulsoup4`)
3. Commit and push. Netlify publishes `site/`.

The Word review copy is generated with `python3 src/make_docx.py src/ebook <out.docx>` and is not committed.
