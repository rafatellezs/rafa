# Rafa Design System v0.1

**Visual language:** Cinematic Institutional Editorial  
**Status:** Working specification for prototype and stress test  
**Date:** 2026-08-02  
**Owner:** Rafael Téllez  

> **Order is the aesthetic. Geometry creates character. Information creates authority.**

---

## 1. Purpose

The Rafa Design System (RDS) is Rafa's suprainstitutional editorial system. It governs how information is structured, composed, visualized and communicated in artifacts created by Rafa and issued from him.

Its primary visual language is **Cinematic Institutional Editorial**:

> Institutional editorial rigor × cinematic geometry.

The result must feel authored, architectural and exact. It must not imitate a Wes Anderson film, use retro styling or depend on decorative eccentricity. The influence is structural: axis, framing, proportion, rhythm, repetition, frontal composition and deliberate symmetry.

### 1.1 Activation rule

Apply RDS automatically only when both conditions are true:

1. Rafa is creating or producing the artifact.
2. The artifact is issued from Rafa.

Do not apply it automatically when Rafa is only reviewing work created by someone else. Apply it to third-party work only when Rafa explicitly requests it.

### 1.2 System architecture

**Artifact = RDS core + institutional profile + medium adapter + artifact archetype.**

- **RDS core:** editorial philosophy, geometry, hierarchy, typography roles, color logic, data visualization and voice.
- **Institutional profile:** logo, accent palette, terminology, disclosures, regulatory requirements and permitted brand substitutions.
- **Medium adapter:** PPTX, PDF, DOCX, HTML, Notion, Obsidian, Notes, email, WhatsApp or Slack.
- **Artifact archetype:** Board deck, memo, report, proposal, one-pager, email, operational message or another recurring structure.

The institution may alter visible brand tokens. It may not rewrite the underlying editorial grammar.

---

## 2. Non-negotiable principles

1. **Order is the aesthetic.** Structure creates beauty before decoration.
2. **Geometry creates character.** Every page declares an axis, a focal point and a compositional family.
3. **Information creates authority.** Claims, evidence, units, periods and sources must be explicit.
4. **Clarity is the governing constraint.** Aesthetic decisions cannot compromise comprehension, integrity, accessibility, legal obligations or credibility.
5. **Familiarity is not clarity.** Corporate convention alone is not a reason to remove cinematic composition.
6. **Dense does not mean crowded.** Density is concentrated and organized around local fields of whitespace.
7. **Color signals.** It does not decorate.
8. **One page, one governing conclusion.** Supporting information may be complex; the point may not be ambiguous.
9. **A document is a sequence.** Page rhythm matters as much as individual layouts.
10. **The signature survives branding.** Removing logo and accent color must not remove the Rafa character.

---

## 3. Order of precedence

When rules conflict, use this order:

1. Truth, data integrity, legibility, accessibility and legal or regulatory obligations.
2. RDS structural invariants.
3. Necessary institutional requirements.
4. Technical capabilities of the medium.
5. Decorative or stylistic preference.

Institutional conservatism is not, by itself, a valid reason to abandon the RDS geometry.

---

## 4. Typography system

### 4.1 Canonical families

| Role | Typeface | Default weights | Purpose |
|---|---|---:|---|
| Editorial serif | **Source Serif 4** | 400, 600, 700 | Headlines, standfirsts, narrative, pull quotes, section titles |
| Technical sans | **IBM Plex Sans** | 400, 500, 600 | Data, labels, tables, charts, captions, navigation, short UI-like copy |
| Archival mono | **IBM Plex Mono** | 400, 500 | Document codes, revision marks, coordinates, file metadata |

Source Serif 4 is the dominant voice. IBM Plex Sans organizes evidence. IBM Plex Mono is an annotation, not a third voice.

### 4.2 Use rules

- Serif is default for conclusions, narrative and editorial authority.
- Sans is default for numbers, labels, tables, charts, sources and operational instructions.
- Mono is limited to strings such as `RDS-2026 / BOARD / 04`, `REV. 02`, dates, coordinates and compact exhibit IDs.
- Do not set paragraphs in mono.
- Do not use more than two families in the same text block.
- Use sentence case for headlines. Reserve all caps for labels of five words or fewer.
- Never simulate small caps with reduced uppercase. Use real small caps only when supported.
- Use tabular numerals in tables and aligned KPI panels.
- Use old-style numerals only in editorial narrative, never in financial evidence.
- Final publications must embed or package canonical fonts. Do not silently substitute fonts.

### 4.3 Sanctioned editorial alternatives

“Garamond” is not a single interchangeable font. EB Garamond, Microsoft Garamond, Adobe Garamond and Garamond Premier have different metrics, availability and licensing. Always name the exact family.

| Fidelity | Editorial | Technical | Metadata | Rule |
|---|---|---|---|---|
| F0 — Canonical | Source Serif 4 | IBM Plex Sans | IBM Plex Mono | Default for final RDS artifacts |
| F1 — Sanctioned alternate | EB Garamond | Manrope when required by an institutional profile | IBM Plex Mono | Use EB Garamond for long-form, correspondence, ceremonial or legal-adjacent work; not as a casual substitution |
| F2 — Platform equivalent | Microsoft Garamond, Aptos Serif or Notion Serif | Aptos, Arial, Notion Default | Aptos Mono, Consolas, Menlo or platform Mono | Use only when the application controls availability |
| F3 — Emergency | Georgia | Arial | Courier New | Structural fidelity only; final artifact is typographically degraded |

EB Garamond is the approved Garamond-family alternate because it can be packaged under the SIL Open Font License. It brings a more classical and literary tone than Source Serif 4. Use Source Serif 4 for data-heavy institutional publishing, screens and mixed editorial/technical documents; use EB Garamond when long-form reading and correspondence matter more than compact data integration.

Microsoft Garamond is a managed Office option, not a replacement binary for EB Garamond. Do not expect identical line breaks or pagination between them.

### 4.4 Fallbacks

| Canonical | Office fallback | System fallback |
|---|---|---|
| Source Serif 4 | Garamond or Georgia | Georgia |
| IBM Plex Sans | Aptos or Arial | Arial |
| IBM Plex Mono | Aptos Mono or Consolas | Courier New or Menlo |

Fallbacks are permitted for working drafts and low-control applications. A final PDF, deck or formal document using a fallback must be marked **typographically non-conformant** until corrected.

### 4.5 Type scale — 16:9 board-reading mode

| Token | Size / leading | Typeface | Typical use |
|---|---:|---|---|
| Display | 42 / 44 pt | Source Serif 4 Semibold | Cover title, single statement |
| Section | 30 / 32 pt | Source Serif 4 Semibold | Section divider |
| Headline | 24 / 27 pt | Source Serif 4 Semibold | Declarative page conclusion |
| Standfirst | 15 / 20 pt | Source Serif 4 Regular | Explanatory introduction |
| Body | 11.5 / 16 pt | Source Serif 4 Regular | Narrative |
| Technical body | 10.5 / 14 pt | IBM Plex Sans Regular | Operational or analytical text |
| Table | 9 / 11 pt | IBM Plex Sans Regular | Dense tables |
| Label | 8 / 10 pt | IBM Plex Sans Medium | Captions, units, navigation |
| Footnote | 7.5 / 9.5 pt | IBM Plex Sans Regular | Sources and disclosures |
| Metadata | 7 / 9 pt | IBM Plex Mono Regular | Codes, revision, coordinates |

For projection, raise Body to 15–16 pt, Technical body to 13–14 pt and Table to 11 pt. Never scale a board-reading page down and call it projection-ready.

### 4.6 Type scale — A4 and Letter

| Token | Size / leading | Typeface | Typical use |
|---|---:|---|---|
| Cover | 30 / 33 pt | Source Serif 4 Semibold | Document title |
| H1 | 21 / 25 pt | Source Serif 4 Semibold | Major section |
| H2 | 15 / 19 pt | Source Serif 4 Semibold | Subsection |
| H3 | 11 / 14 pt | IBM Plex Sans Semibold | Technical subhead |
| Body | 10.5 / 15 pt | Source Serif 4 Regular | Narrative |
| Technical body | 9.5 / 13 pt | IBM Plex Sans Regular | Analytical explanation |
| Table | 8.5 / 10.5 pt | IBM Plex Sans Regular | Tables |
| Caption | 8 / 10.5 pt | IBM Plex Sans Regular | Exhibits and photography |
| Footnote | 7.5 / 9.5 pt | IBM Plex Sans Regular | Sources and disclosures |
| Metadata | 7 / 9 pt | IBM Plex Mono Regular | Codes and folios |

Do not reduce body below 9.5 pt or table text below 8 pt to make content fit. Recompose, summarize or split the artifact.

### 4.7 RDS Font Kit

RDS must ship with a versioned, offline font package. Internet, Google Fonts and CDNs are not production dependencies.

Core package:

- Source Serif 4: Regular 400, Semibold 600, Bold 700, Italic 400.
- IBM Plex Sans: Regular 400, Medium 500, Semibold 600, Italic 400.
- IBM Plex Mono: Regular 400, Medium 500.
- EB Garamond sanctioned alternate: Regular 400, Semibold 600, Bold 700, Italic 400.

Package requirements:

- static TTF files for Office and local rendering;
- WOFF2 files for HTML;
- original licenses;
- version and checksum manifest;
- local `fonts.css`;
- Mac and Windows installation instructions;
- glyph, numeral and accent proof;
- no runtime download requirement.

Institutional fonts such as Manrope belong in their institutional profile package, not in the RDS core kit.

---

## 5. Grids and margins

### 5.1 16:9 presentation canvas

- Canvas: 13.333 × 7.5 in; production equivalent 1920 × 1080 px.
- Outer margins: 0.42 in left/right; 0.36 in top; 0.34 in bottom.
- Grid: 12 columns.
- Gutters: 0.16 in.
- Baseline increment: 4 pt; major rhythm every 8 pt.
- Header zone: 0.34 in.
- Footer zone: 0.28 in.
- Live content must remain within the outer margins, except intentional full-bleed photography or color fields.

Preferred spans: `12`, `8/4`, `6/6`, `4/4/4`, `3/6/3`, `2/8/2`. Avoid spans that cannot be explained by the content hierarchy.

### 5.2 A4 portrait

- Canvas: 210 × 297 mm.
- Margins: 14 mm left/right; 13 mm top; 15 mm bottom.
- Grid: 12 columns.
- Gutters: 3 mm.
- Baseline increment: 4 pt.
- Narrative measure: normally 6–8 columns; never run body copy across all 12 columns.
- Header and footer sit outside the primary narrative field but inside the page margins.

### 5.3 US Letter portrait

- Canvas: 8.5 × 11 in.
- Margins: 0.55 in left/right; 0.50 in top; 0.60 in bottom.
- Grid: 12 columns.
- Gutters: 0.12 in.
- Baseline increment: 4 pt.
- Narrative measure: normally 6–8 columns.

### 5.4 Alignment discipline

- Every object must align to a column, gutter edge, baseline or declared optical axis.
- Optical centering may deviate from mathematical centering by up to the minimum spacing unit when justified visually.
- Do not nudge objects into arbitrary positions to “make them fit.” Change the composition.
- A page has one primary axis. Secondary axes must support, not compete with it.

---

## 6. Spacing system

Base unit: **4 pt**.

| Token | Value | Use |
|---|---:|---|
| XS | 4 pt | Label-to-value, icon-to-label |
| S | 8 pt | Tight internal grouping |
| M | 12 pt | Paragraph and compact component spacing |
| L | 16 pt | Standard component separation |
| XL | 24 pt | Section separation |
| 2XL | 32 pt | Major block separation |
| 3XL | 48 pt | Compositional pause |
| 4XL | 64 pt | Hero spacing |
| 5XL | 96 pt | Cover and divider spacing |

Rules:

- Internal spacing is always smaller than spacing between groups.
- Use no more than four spacing tokens on a normal page.
- Whitespace must form a deliberate field, not leftover gaps.
- Every dense page must include at least one focal pause of `2XL` or greater in one direction.

---

## 7. Color system

### 7.1 Core neutrals

| Token | Hex | Use |
|---|---|---|
| Paper | `#F4F1EA` | Preferred warm editorial background |
| White | `#FFFFFF` | Tables, technical pages, print-critical surfaces |
| Ink | `#292A28` | Primary text; default instead of pure black |
| Charcoal | `#3C3D3A` | Secondary dark fields and strong rules |
| Graphite | `#6F716C` | Secondary text and inactive series |
| Rule | `#C7C7C0` | Hairlines, table rules, axes |
| Field | `#E8E5DE` | Subtle panels and grouped evidence |
| Mist | `#F8F7F3` | Alternating technical surface |

Pure black `#000000` is reserved for print registration, barcodes or technical necessity.

### 7.2 Institutional tokens

Each institutional profile defines:

- `Accent Primary`
- `Accent Deep`
- `Accent Soft`
- `Accent Contrast`
- approved logo variants
- any mandatory semantic colors

Accent colors may identify the institution and direct attention. They may not become a multi-color decorative palette.

### 7.3 Functional colors

Use functional colors only when their meaning is explicit:

| Meaning | Default |
|---|---|
| Positive / confirmed | `#35654D` |
| Negative / breach | `#963B34` |
| Warning / pending | `#A36B24` |
| Informational | institutional Accent Primary |

Do not use red or green merely to diversify a chart.

### 7.4 Color limits

- Normal content page: neutrals + one institutional accent family + functional exception if required.
- Use one dominant accent event per page. An event is defined by one **Accent Owner**: the single metric, entity, decision, path or conclusion that owns every prominent accent application on that page.
- Multiple accented elements are allowed only when they all refer to the same Accent Owner and behave as one semantic system.
- In a KPI tableau, one accented module is conformant when it is the governing focus; all peer modules remain neutral.
- If color represents status such as breach, warning or confirmation, functional color overrides institutional accent. Brand color moves to metadata or disappears.
- Large color fields are allowed on covers and section dividers; on internal pages they should normally occupy less than one quarter of the surface.
- A full-color photograph is a color event and counts as the dominant accent.
- Do not use gradients, glow, drop shadows or translucent decorative overlays.

### 7.5 Warm-paper authorization

`Paper #F4F1EA + editorial serif + institutional accent` is a high-risk combination because it can collapse into a generic AI-generated editorial aesthetic when geometry is weak.

- Paper is not the default for every RDS surface. White is preferred for product UI, operational interfaces, technical tables and any page without a strong compositional reason for warmth.
- Paper may be used only when the page declares one of the six RDS compositional families and passes the axis/focus, color-off and generic-template tests.
- A warm page must include at least two structural signatures beyond typography and color: declared axis, hard grid, technical metadata, cinematic crop, modular repetition, architectural annotation or concentrated whitespace.
- Never rely on cream, serif and accent as the primary evidence that a page is “RDS.” If the identity disappears when those tokens are removed, recompose the page.
- Generic frontend calibration rules may be overridden by an accepted RDS specification only when these structural conditions are satisfied.

---

## 8. Compositional grammar

Every designed page must declare one of the following families.

### 8.1 Axial

A dominant vertical or horizontal axis organizes the page. Use for covers, section dividers, singular conclusions and hero metrics.

### 8.2 Bilateral

Two balanced masses sit across an axis. Use for comparisons, before/after, two-case analysis and paired evidence.

### 8.3 Modular tableau

Repeated modules create a frontal field. Use for KPI sets, portfolios, object collections and categorized evidence. Modules must share dimensions or a visible proportional relationship.

### 8.4 Technical plate

A central structure is surrounded by labels, coordinates, annotations or legends. Use for capital structures, processes, ownership, maps and systems.

### 8.5 Focal field

One object, number, image or statement dominates; secondary evidence occupies a controlled perimeter. Use for strategic conclusions and cinematic pauses.

### 8.6 Editorial archive

Dense text, excerpts, exhibits and metadata are composed like a publication or dossier. Use for memos, source collections, transaction histories and appendices.

No page may default to “title + bullets + chart + logo” without being recomposed into one of these families.

---

## 9. Symmetry and asymmetry

- Default to **macro symmetry**: major masses balance around the primary axis.
- Introduce **micro tension** through captions, folios, annotations or one deliberately offset secondary element.
- Asymmetry is permitted when it expresses sequence, causality, hierarchy or imbalance in the information.
- Accidental asymmetry is a defect.
- Do not center long paragraphs. Centering is for labels, short statements and formal axes.
- A symmetric composition must still have a clear reading order.
- Avoid mirrored duplication when the content is not truly equivalent.

---

## 10. Information hierarchy

Use this stack, omitting only levels that are unnecessary:

1. Document code / section coordinate.
2. Section label or Roman numeral.
3. Declarative headline.
4. Standfirst or bottom line.
5. Primary evidence.
6. Annotation or interpretation.
7. Exhibit caption, units and period.
8. Source and disclosure.
9. Folio.

### 10.1 Headline rules

- State the conclusion, not merely the topic.
- Prefer 6–14 words.
- Do not repeat the chart title in the headline.
- A question headline is allowed only when the page genuinely resolves it.
- If the evidence does not support the headline, change the headline.

### 10.2 Reading order

- The first three seconds should reveal axis, focal point and conclusion.
- The next twelve seconds should reveal evidence, implication and navigation.
- Supporting detail may reward close reading but may not hide the conclusion.

---

## 11. Lines, borders and geometric elements

- Standard hairline: 0.5 pt print / 1 px screen.
- Emphasis rule: 1.0 pt.
- Structural boundary: 1.5 pt maximum.
- Default line color: Rule; use Ink or Accent only for active structure.
- Corners: square by default. Radius of 2–4 pt only for functional UI-like components.
- Do not outline every component.
- Use brackets, coordinate marks, crosshairs and crop-like marks only when they organize or annotate content.
- Decorative frames, ornamental borders and repeated brand shapes are prohibited.
- Geometry must clarify relationship, boundary, sequence, scale or focus.

---

## 12. Tables

Tables should resemble a financial publication, not a spreadsheet export.

- No full cell grid.
- Horizontal rules only by default.
- Header: IBM Plex Sans Medium, sentence case or short caps; 0.5 pt lower rule.
- Top and final total rules: 1.0 pt.
- Vertical rules only when separating genuinely different column groups.
- First column left-aligned; numeric columns right-aligned with decimal alignment.
- Units and period belong in the exhibit caption or header, not repeated in every cell.
- Negatives use parentheses; zeros use an em dash when semantically appropriate.
- Use consistent precision within each measure.
- Highlight no more than one row or three isolated cells with Accent Soft.
- Zebra shading is permitted only for tables longer than 12 rows and only when grouping cannot solve scanning.
- Subtotals use weight and spacing before they use color.
- Sources sit directly below the table, aligned to its left edge.
- If table text must fall below 8 pt, redesign or split it.

---

## 13. Charts

The chart is evidence; the takeaway governs the page.

- Use neutrals plus one accent series.
- Use direct labels whenever feasible; avoid legends for four series or fewer.
- Maximum four visually competing series on one plot. Prefer small multiples beyond that.
- Gridlines: 0.35–0.5 pt in Rule.
- Axes and ticks appear only when needed for interpretation.
- Always show units and time period.
- Start quantitative axes at zero when truncation would distort meaning. If a non-zero baseline is analytically necessary, disclose it visibly.
- No 3D, gradients, shadows, pictograms or decorative markers.
- Avoid pie and donut charts; allow only for a simple whole with no more than three parts and when comparison precision is not important.
- Use line charts for time, bars for magnitude, dots for ranking or variance, waterfalls for bridges and small multiples for comparable patterns.
- Forecast, target and actual must have distinct line or fill semantics independent of color.
- Annotations should explain inflection, exception or decision relevance, not restate labels.
- Every chart includes source, cutoff date and transformation note when applicable.

---

## 14. Diagrams

Diagrams are a signature component and should feel like architectural or engineering plates.

- Use an orthogonal grid and connectors.
- Choose one reading direction per diagram.
- Node dimensions indicate type, not importance, unless explicitly defined.
- Use consistent node families and a visible legend.
- Number primary structures and use annotations for secondary detail.
- Connectors use 0.5–1.0 pt strokes; arrowheads are compact and consistent.
- Crossings are prohibited when rerouting or layering can prevent them.
- Ownership, flow, control and chronology require different line semantics.
- Accent identifies the focal path, entity or decision; the rest remains neutral.
- Avoid SmartArt, floating pills, unnecessary icons and decorative network webs.
- Complex diagrams may use an overview followed by numbered detail plates.

---

## 15. Photography and objects

- Default treatment: black and white or restrained low-saturation color.
- Prefer frontal composition, centered objects, architecture, infrastructure, vehicles, machinery and carefully staged people.
- Photography participates in the grid; it is never pasted into leftover space.
- Preferred crop ratios: 16:9, 3:2, 4:3 and 1:1. Avoid arbitrary ratios.
- Preserve architectural verticals and horizons.
- Use one clear focal subject per image.
- Avoid generic corporate stock, staged handshakes, abstract technology imagery and artificial “film” effects.
- Full color is reserved for covers, dividers, materially informative color or a deliberate cinematic event.
- Captions identify subject, place, date and relevance when known.
- An isolated object may be treated as an exhibit with number, scale and annotation.

---

## 16. Callouts

Use four types:

| Type | Purpose | Treatment |
|---|---|---|
| Bottom line | Governing conclusion | Serif, dominant, no box by default |
| Evidence | Critical fact or citation | Neutral field, sans label |
| Decision | Required choice or action | Accent rule or Accent Soft field |
| Risk | Downside, breach or uncertainty | Functional negative or warning color |

- One dominant callout per page.
- A callout must add hierarchy, not repeat the headline.
- Prefer a side rule, field or spacing change over a fully boxed component.
- Icons are optional and never substitute for labels.

---

## 17. Covers

A cover establishes authority and cinematic geometry before content begins.

Required elements:

- institution or context;
- document title;
- date or period;
- confidentiality state when needed;
- document code / revision;
- logo when institutionally appropriate.

Rules:

- Use Axial or Focal Field composition.
- Maximum two primary text blocks.
- Use either one image, one geometric field or typography as the focal device—never all three in competition.
- Logo remains subordinate to title and composition.
- Deep institutional color, Paper, White or full-bleed photography are permitted cover grounds.
- Do not place a decorative subtitle merely to fill space.

---

## 18. Section dividers

- Use a Roman numeral, section title and one declarative line.
- Composition: Axial, Focal Field or a full-bleed photographic tableau.
- Reduce metadata and navigation to essentials.
- A divider creates a real pacing break; do not insert one before every minor topic.
- Dividers may use the strongest color event in the document after the cover.

---

## 19. Headers, footers and pagination

### Header

- Left: document or institution code.
- Center: optional section coordinate.
- Right: short document title or confidentiality label.
- Set in IBM Plex Mono or IBM Plex Sans at Metadata size.
- Omit on covers and intentional cinematic pauses.

### Footer

- Left: source model, cutoff date or document owner when relevant.
- Center: optional classification.
- Right: folio.
- Use a single hairline only when the page needs separation.

### Pagination

- Documents: Arabic folios; front matter may use lowercase Roman numerals when useful.
- Presentations: two-digit Arabic folios (`04`) or section-aware folios (`IV—04`).
- Page count is shown when the reader benefits from orientation (`04 / 18`).
- Folios align to the grid and never float near an arbitrary corner.

---

## 20. Sources and disclosures

- Every factual exhibit identifies source and cutoff date.
- Distinguish source data from Rafa's analysis.
- Use labels when relevant: `[Fact]`, `[Analysis]`, `[Inference]`, `[Opinion]`, `[Unverified]`.
- A source note begins with `Source:`; a methodological note begins with `Note:`.
- Hyperlinks must be descriptive in digital documents; do not display raw URLs in narrative.
- Disclosures must remain legible at normal viewing size.
- Never hide material caveats in a low-contrast footer.
- Version-sensitive data includes a retrieval or cutoff date.

---

## 21. Metadata and exhibit system

Canonical document code:

`RDS-[YEAR] / [INSTITUTION] / [TYPE] / [NN]`

Example:

`RDS-2026 / ARR1 / BOARD / 04`

Canonical hierarchy:

```text
IV. PORTFOLIO PERFORMANCE
Delinquency remains contained despite accelerated origination.

EXHIBIT 04.2 — Portfolio evolution, MXN millions
```

Rules:

- Sections use Roman numerals.
- Exhibits use section.page sequence or document-wide sequence, chosen once per artifact.
- Tables, charts, diagrams and photography may all be exhibits.
- Revisions use `v0.1`, `v0.2`, `v1.0`; never use `FINAL`.
- Confidentiality, owner and cutoff metadata appear consistently, not opportunistically.

---

## 22. High-density information

- Preserve one governing conclusion per page.
- Limit normal pages to three major visual masses.
- Use grouping, sequence and annotation before reducing typography.
- Maintain at least one focal pause of 32 pt or more.
- Break dense evidence into overview + detail plates when a single page cannot sustain hierarchy.
- Use progressive disclosure in digital media; do not hide required evidence in interactions that will not survive export.
- Use appendices for auditability, not for conclusions the main narrative avoids.
- If the page requires more than two reading paths, declare one primary path with numbering or accent.
- A dense page must still pass the three-second axis/focus test.
- Table text at 8 pt is an absolute export floor, not a target. Normal table text remains 8.5–9 pt.
- Once a table reaches 8 pt at 100% final output, its capacity is closed: do not add columns, reduce gutters or compress tracking.
- Resolve additional dimensions by splitting the exhibit, grouping columns, moving audit detail to a second plate, using landscape orientation or creating overview + detail pages.
- Density is measured after export in the final physical or screen dimensions, not only on the editing canvas.

---

## 23. Sequence and pacing

Design the document as an edited sequence:

1. **Opening:** establish subject, institution and emotional register.
2. **Orientation:** explain context, map or thesis.
3. **Accumulation:** build evidence through repeated structures.
4. **Pause:** use a divider, singular metric, photograph or short statement.
5. **Resolution:** state decision, implication or recommendation.
6. **Audit trail:** provide detail, methodology and sources.

Do not repeat the same compositional family more than three consecutive times unless repetition is itself informative. A pacing break must carry meaning.

---

## 24. Medium adaptation

### 24.1 Fidelity levels

| Level | Meaning |
|---|---|
| F0 — Exact | Canonical or sanctioned fonts, full geometry, color, metadata and embedding |
| F1 — Controlled substitute | Approved font substitution; geometry and hierarchy remain complete |
| F2 — Platform equivalent | Application-native typography mapped to RDS roles |
| F3 — Structural only | No font control; identity is carried by sequence, hierarchy, spacing and syntax |

### 24.2 Application adapter matrix

Use the highest fidelity available in this order:

| Application | Expected level | Editorial order | Technical / metadata order | Required adaptation |
|---|---:|---|---|---|
| PDF | F0 | Source Serif 4 → EB Garamond | IBM Plex Sans / Mono | Embed or subset fonts; verify after export |
| HTML | F0 | Source Serif 4 → EB Garamond | IBM Plex Sans / Mono | Self-host WOFF2 with local `@font-face`; no CDN dependency |
| Word / PowerPoint desktop | F0–F1 | Source Serif 4 → EB Garamond → Microsoft Garamond → Georgia | IBM Plex Sans → Aptos → Arial; IBM Plex Mono → Aptos Mono / Consolas | Install from Font Kit; embed all characters when editable; verify on a clean offline machine |
| Google Docs / Slides | F0–F2 | Source Serif 4 if present in More fonts → EB Garamond → Georgia | IBM Plex Sans / Mono if present → Arial / Courier New | Use only fonts exposed by the Google font picker; export PDF for locked fidelity |
| Obsidian | F0–F2 | Source Serif 4 → EB Garamond → theme serif | IBM Plex Sans / Mono → theme defaults | Use packaged CSS and local font files when portability permits; Markdown semantics remain source of truth |
| Notion | F2 | Serif for memos and narrative; Default for technical pages | Default for evidence; Mono only for archive-style pages or code | Select one page-wide style; recreate roles through headings, callouts, databases and inline code rather than font mixing |
| Apple Notes | F2–F3 | Native title/heading/body styles | Native monostyled only for codes | Use heading levels, checklists, tables and spacing; do not simulate page geometry |
| Email | F2–F3 | Georgia → email-client serif | Arial → client sans; Courier New for codes | Use web-safe fonts and simple HTML; attach an RDS PDF when exact typography matters |
| Slack Canvas | F2–F3 | Native headings | Native text, code and callouts | Use sections, lists, callouts and one highlighted decision; no custom family requirement |
| Slack message | F3 | Native | Native / code | Bottom line first, short blocks, bold labels, bullets and explicit owner/date |
| WhatsApp | F3 | Native | Native / monospace only for literal codes | One governing point, short paragraphs, restrained bold, deliberate line breaks and one CTA |

### 24.3 Knowledge-media invariants

Notion, Obsidian and Notes preserve:

- conclusion-first hierarchy;
- headings and section coordinates;
- metadata and status;
- callout semantics;
- sources and links;
- modular grouping;
- rhythm through spacing and dividers.

Do not force unavailable fonts, custom CSS or complex columns when portability would suffer.

### 24.4 Messaging-media invariants

Email, WhatsApp and Slack translate geometry into textual structure:

- bottom line first;
- short, parallel blocks;
- one request or decision per section;
- deliberate line breaks;
- bullets only when they improve scanning;
- explicit owner, action and timing;
- no decorative emoji in institutional communication.

Typography in F2–F3 media is judged by role fidelity, not family fidelity. Do not paste Unicode “fancy text,” screenshots of ordinary text or pseudo-small-caps to imitate unavailable typography.

---

## 25. Institutional profiles

An institutional profile may define:

- logo and clear space;
- accent colors;
- mandated type substitutions;
- terminology and voice constraints;
- legal, regulatory and confidentiality requirements;
- preferred photographic subjects;
- file naming and distribution rules.

It may not override:

- conclusion-first hierarchy;
- compositional geometry;
- grid discipline;
- evidence and source standards;
- table, chart and diagram logic;
- the prohibition on decorative clutter.

When a mandated corporate typeface replaces a canonical font, preserve the role mapping: editorial type remains editorial; technical type remains technical; metadata remains restrained.

---

## 26. Prohibited patterns

- Wes Anderson cosplay.
- Pastels used merely as a reference cue.
- Quirky or nostalgic typography.
- Artificial vintage texture, film grain or distressed paper.
- Decorative symmetry without information hierarchy.
- Generic corporate stock photography.
- Consulting-template sameness.
- Title + bullets + chart + logo as an unexamined default.
- SmartArt.
- 3D charts, shadows, glow and decorative gradients.
- Repeated boxes and rounded cards without functional need.
- Multiple accent colors competing on one page.
- Centered paragraphs.
- Tiny type used to avoid editing.
- Decorative metadata that does not help navigation or traceability.
- Cream + serif + accent used without a declared RDS composition and hard geometry.
- Decorative accent stripes, title underlines or single-sided colored borders that do not encode structure or meaning.

---

## 27. QA tests

Every prototype and final artifact must pass:

1. **Logo-off test:** remove the logo; the composition must still feel authored by Rafa.
2. **Color-off test:** convert to grayscale; hierarchy and focus must survive.
3. **Blur test:** blur or zoom out; axis, focal point and major masses must remain evident.
4. **Sequence test:** page order must create rhythm and progression.
5. **Cosplay test:** remove pastel, ornament and nostalgic cues; the cinematic character must remain.
6. **Institutional test:** the artifact must remain credible before a board, investor or serious counterparty.
7. **Generic-template test:** if it could be mistaken for a consulting template, recompose it.
8. **Evidence test:** conclusions, units, periods and sources reconcile.
9. **Density test:** no text falls below minimum sizes; local whitespace remains intentional.
10. **Medium test:** exported or forwarded content must preserve hierarchy and meaning.
11. **Warm-serif dependency test:** replace Paper with White and suppress accent; if geometry and authorship disappear, recompose.
12. **Accent-owner test:** every prominent accent must resolve to one semantic owner; competing owners fail.
13. **Density-capacity test:** any table at the 8 pt floor is closed to additional columns or compression.

A failed test makes the artifact **RDS non-conformant** until corrected or explicitly excepted.

---

## 28. Prototype decisions to validate

The following are decisions in v0.1 but remain subject to visual stress testing:

1. Source Serif 4 + IBM Plex Sans + IBM Plex Mono as the canonical type system.
2. `#F4F1EA` Paper as the preferred warm ground.
3. Narrow 12-column grids with concentrated whitespace.
4. Macro symmetry with controlled micro tension.
5. Full-color photography as a rare cinematic event.
6. Metadata density and exhibit codes across different media.
7. Maximum visual intensity permitted within conservative institutional profiles.

Validation requires six representative pages:

- Cover.
- Executive Summary.
- KPI / Financial Performance.
- Chart-led analysis.
- Dense financial table.
- Corporate or funding structure diagram.

Do not promote this specification to v1.0 until the stress test demonstrates clarity, cinematic character, institutional credibility and cross-page rhythm.

---

## 29. Source notes

- [Source Serif 4](https://github.com/adobe-fonts/source-serif) is an open-source family with static and variable formats and multiple optical sizes.
- [IBM Plex](https://github.com/IBM/plex) provides Sans, Mono and other families in desktop/web formats under the SIL Open Font License.
- [EB Garamond](https://github.com/octaviopardo/EBGaramond12) is the sanctioned classical serif alternate and is licensed under the SIL Open Font License.
- [Microsoft Office font embedding](https://support.microsoft.com/es-ES/Office/fonts/benefits-of-embedding-custom-fonts) documents embedding in current desktop Word and PowerPoint versions and recommends embedding all characters for editable files.
- [Google Docs font controls](https://support.google.com/docs/answer/1663349) expose fonts through the application font list and More fonts dialog.
- [Notion page typography](https://www.notion.com/help/customize-and-style-your-content) provides page-wide Default, Serif and Mono styles.
- [Slack message formatting](https://slack.com/help/articles/202288908-Format-your-messages-in-Slack) provides emphasis, lists, quotes and code rather than document-level typography.
- [CSS `@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face) supports local and packaged font resources; WOFF2 is the preferred web format.

---

## 30. Version path

`Design philosophy → RDS v0.1 → Archetypes → Prototype → Corrections → RDS v1.0 → Source of truth → Skill → Templates and adapters`

This document defines how the system should look and behave. A future skill will define how an agent reasons and makes design decisions to produce conformant artifacts.
