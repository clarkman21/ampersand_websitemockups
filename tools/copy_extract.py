"""Give every text element on the Proof pages a copy key, and write content/copy.md.

Usage: python3 tools/copy_extract.py

Run it again after you add new text to a page: elements that already have a key keep it,
new elements get one, and copy.md is rewritten from the current pages (so first apply any
copy edits with `node tools/copy.mjs apply`).

A "copy element" is an element that holds text, and only inline markup (span, a, b, br ...).
Each one gets data-copy="page.section.role-n". The key is stable once it is in the HTML.
"""
import html
import os
import re
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ["index", "network", "batteries", "technology", "vehicles", "investors", "contact"]
PAGE_NAMES = {"index": "Home", "network": "Network", "batteries": "Batteries", "technology": "Technology",
              "vehicles": "Vehicles", "investors": "Investors", "contact": "Work with us"}
INLINE = {"span", "a", "b", "strong", "em", "i", "br", "small", "sup", "sub"}
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
SKIP_CLASSES = {"sr", "axis", "live"}  # screen-reader-only text, chart axes, live feed (set by script)


class Node:
    def __init__(self, tag, attrs, start, start_end, parent):
        self.tag, self.attrs, self.start, self.start_end, self.parent = tag, dict(attrs), start, start_end, parent
        self.end_start = self.end = None
        self.children, self.text = [], ""

    def classes(self):
        return (self.attrs.get("class") or "").split()


class Tree(HTMLParser):
    def __init__(self, src):
        super().__init__(convert_charrefs=False)
        self.src = src
        self.lines = [0]
        for m in re.finditer("\n", src):
            self.lines.append(m.end())
        self.root = Node("#root", [], 0, 0, None)
        self.cur = self.root
        self.feed(src)

    def off(self):
        line, col = self.getpos()
        return self.lines[line - 1] + col

    def handle_starttag(self, tag, attrs):
        start = self.off()
        n = Node(tag, attrs, start, start + len(self.get_starttag_text()), self.cur)
        self.cur.children.append(n)
        if tag in VOID:
            n.end_start = n.end = n.start_end
        else:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        start = self.off()
        n = Node(tag, attrs, start, start + len(self.get_starttag_text()), self.cur)
        n.end_start = n.end = n.start_end
        self.cur.children.append(n)

    def handle_endtag(self, tag):
        node = self.cur
        while node is not self.root and node.tag != tag:
            node = node.parent
        if node is self.root:
            return
        start = self.off()
        node.end_start = start
        node.end = self.src.index(">", start) + 1
        self.cur = node.parent

    def handle_data(self, data):
        self.cur.text += data

    def handle_entityref(self, name):
        self.cur.text += "&" + name + ";"

    def handle_charref(self, name):
        self.cur.text += "&#" + name + ";"


def all_text(n):
    return n.text + "".join(all_text(c) for c in n.children)


def only_inline(n):
    return all(c.tag in INLINE and only_inline(c) for c in n.children)


def is_group(n):
    """Text-free wrapper of styled parts, for example <li><span class="d">..</span><span class="what">..</span></li>.
    Each part gets its own key, so editors do not see the markup."""
    if n.text.strip() or not n.children:
        return False
    return not all(c.tag == "span" and c.classes() == ["hl"] for c in n.children)


def skipped(n):
    while n is not None:
        if SKIP_CLASSES & set(n.classes()) or n.tag in ("script", "style", "head", "svg", "noscript"):
            return True
        n = n.parent
    return False


def section_of(n):
    while n is not None and n.tag != "#root":
        if n.attrs.get("id") and n.tag in ("section", "div", "header", "footer", "figure", "form"):
            if n.tag == "form":
                pass
            else:
                return n.attrs["id"]
        cls = n.classes()
        if n.tag == "section" and "hero" in cls:
            return "hero"
        if "band" in cls:
            return "band"
        n = n.parent
    return "page"


ROLE_BY_CLASS = [("kicker", "kicker"), ("lede", "lede"), ("src", "note"), ("btn", "button"), ("tag", "tag"),
                 ("flag", "flag"), ("ph", "badge"), ("what", "what"), ("gives", "gives"), ("metric", "metric"),
                 ("note", "note"), ("n", "number"), ("k", "label"), ("giant", "giant"), ("kom", "tagline"),
                 ("langs", "languages"), ("d", "big"), ("q", "bar"), ("s", "bar")]


def role_of(n):
    if n.tag in ("h1", "h2", "h3"):
        return n.tag
    cls = n.classes()
    for c, r in ROLE_BY_CLASS:
        if c in cls:
            return r
    return {"h1": "h1", "h2": "h2", "h3": "h3", "p": "text", "li": "item", "td": "cell", "th": "cell",
            "blockquote": "quote", "figcaption": "caption", "option": "option", "a": "link", "button": "button",
            "label": "label", "span": "text", "div": "text", "small": "text", "cite": "cite"}.get(n.tag, n.tag)


def to_md(inner):
    """Inner HTML of a copy element -> the Markdown form used in copy.md."""
    s = inner.strip()
    s = re.sub(r"\s*\n\s*", " ", s)
    s = re.sub(r'<span class="hl">(.*?)</span>', r"**\1**", s)
    s = re.sub(r'<span class="u">\s*(.*?)</span>', r" _\1_", s)
    s = re.sub(r'<a href="([^"]+)">([^<]*)</a>', r"[\2](\1)", s)
    s = re.sub(r"\s{2,}", " ", s).strip()
    s = s.replace("&amp;", "&")  # copy.mjs escapes a bare & again
    if "<" not in s:  # plain text: decode entities so editors see real characters
        s = html.unescape(s)
    return s


def extract(page):
    path = os.path.join(ROOT, "proof", page + ".html")
    src = open(path).read()
    tree = Tree(src)
    leaves = []

    def walk(n):
        for c in n.children:
            if skipped(c):
                continue
            if c.tag not in ("#root",) and all_text(c).strip() and only_inline(c) and not is_group(c) and c.tag not in INLINE - {"span", "a", "b", "small"}:
                # a span or link is its own element only when its parent is not already a copy element
                leaves.append(c)
                continue
            walk(c)
    body = next((c for c in tree.root.children if c.tag == "html"), tree.root)
    walk(body)

    counters, inserts, entries = {}, [], []
    for n in leaves:
        if n.tag == "title":
            continue
        key = n.attrs.get("data-copy")
        if not key:
            base = f"{page if page != 'index' else 'home'}.{section_of(n)}.{role_of(n)}"
            counters[base] = counters.get(base, 0) + 1
            key = f"{base}-{counters[base]}"
            while f'data-copy="{key}"' in src:
                counters[base] += 1
                key = f"{base}-{counters[base]}"
            close = n.start_end - (2 if src[n.start_end - 2] == "/" else 1)
            inserts.append((close, f' data-copy="{key}"'))
        entries.append((key, section_of(n), to_md(src[n.start_end:n.end_start])))

    for pos, text in sorted(inserts, reverse=True):
        src = src[:pos] + text + src[pos:]
    open(path, "w").write(src)
    title = re.search(r"<title>(.*?)</title>", src, re.S).group(1)
    return title, entries


def shared_entries():
    """Header and footer copy lives in proof/assets/proof.js as T('shared.x', 'default')."""
    js = open(os.path.join(ROOT, "proof", "assets", "proof.js")).read()
    out = []
    for m in re.finditer(r"T\('(shared\.[a-z0-9.-]+)',\s*'((?:[^'\\]|\\.)*)'\)", js):
        out.append((m.group(1), m.group(1).split(".")[1], to_md(m.group(2).replace("\\'", "'"))))
    return out


HEADER = """# Ampersand website copy

Edit the text under each `### key` line. Do not change the keys: they link the text to the page.

- `**text**` shows the text in Surge Yellow (in headlines and buttons).
- `_text_` makes a small unit after a big number, for example `6 _min_` or `15.5 _kg_`.
- `[text](link)` makes a link.
- Plain inline HTML also works for special cases.
- To publish: commit this file. The site build writes the copy into the pages
  (`node tools/copy.mjs apply`). Changes to layout, images or new sections still need the code.

"""


def main():
    out = [HEADER]
    shared = shared_entries()
    if shared:
        out.append("## Shared · header and footer (every page)\n")
        for key, _, text in shared:
            out.append(f"### {key}\n{text}\n")
    for page in PAGES:
        title, entries = extract(page)
        slug = "home" if page == "index" else page
        out.append(f"\n## {PAGE_NAMES[page]} page · proof/{page}.html\n")
        out.append(f"### {slug}.title\n{html.unescape(title)}\n")
        last = None
        for key, sec, text in entries:
            if sec != last:
                out.append(f"\n<!-- {PAGE_NAMES[page]} · {sec} -->\n")
                last = sec
            out.append(f"### {key}\n{text}\n")
    os.makedirs(os.path.join(ROOT, "content"), exist_ok=True)
    open(os.path.join(ROOT, "content", "copy.md"), "w").write("\n".join(out))
    print("wrote content/copy.md")


if __name__ == "__main__":
    main()
