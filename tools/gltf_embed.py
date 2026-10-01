"""Embed the .bin buffers of a .gltf file as data URIs and write one JSON file.

Usage: python3 tools/gltf_embed.py model.gltf proof/assets/models/model.gltf.json

Some static hosts do not serve .glb or .bin files but do serve .json.
three.js GLTFLoader reads the result like any other glTF file.
"""
import base64
import json
import os
import sys

src, out = sys.argv[1], sys.argv[2]
doc = json.load(open(src))
for buf in doc.get("buffers", []):
    uri = buf.get("uri")
    if uri and not uri.startswith("data:"):
        data = open(os.path.join(os.path.dirname(src), uri), "rb").read()
        buf["uri"] = "data:application/octet-stream;base64," + base64.b64encode(data).decode()
json.dump(doc, open(out, "w"), separators=(",", ":"))
print(out, os.path.getsize(out), "bytes")
