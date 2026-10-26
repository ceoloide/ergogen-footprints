# Visual footprint report

Open `index.html` in a browser. It works offline, with PNG images stored in `images/` and source/license links pointing into the parent survey directory. Keep the survey directory together when moving the report.

Each of the 210 KiCad candidates has a close-up and a board-location image. These are KiCad-generated 2D plots of actual source boards, not photos or assembled 3D models. Mint outlines mark the selected footprint bounding box. The front or back copper and silkscreen layers are shown with Edge.Cuts. Back views are deliberately not mirrored, retaining board coordinates for comparison. Scale bars use the plot's millimetre coordinates.

The original sources are unchanged. Altium entries are excluded at the user’s request. Copper pours are shown as stored, without refilling. Legacy-format interpretation and font substitution may affect appearance. Images retain the underlying source licenses; no common replacement license is asserted.

`render-metadata.json` records source paths, selected references, bounds, side, pad counts and source revisions. `validation.json` records image and browser checks. Scripts are provided under `scripts/`:

1. Extract the parent source archive into `/tmp/keyboard-footprint-survey/`, placing each repository's board files under `<owner__repo>/source/` (the archive itself omits the `source/` level).
2. Run `inspect_boards.py` with KiCad 9's Python runtime and `pcbnew` bindings.
3. Run `render_images.py` with Python, CairoSVG and Pillow, with `kicad-cli` 9 on PATH. Temporary plots go to `/tmp/footprint-visuals/`.
4. Run `build_report.py` to regenerate the HTML.

This report supports visual review and conversion planning; it does not validate electrical connectivity, component compatibility or fabrication readiness.
