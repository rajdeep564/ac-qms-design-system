# Glycine IP — Real Documents vs Prototype Gap Report

**Scope:** Discovery only. No prototype changes in this pass. Reference batch in prototype: `GCN/010526`. Reference batch in real COA: `GCN/010326` (noted where relevant).

**Prototype mapping:**

| Real document | Prototype screens |
|---|---|
| SPEC/FG00038/01 (R-02) | Product Master Editor.html, Create SPEC.html, Create SPEC - Review Step.html, Document Approval Review.html |
| MOA/FG00038/01 (R-02) | MOA Section Editor.html, Document Approval Review.html |
| AWS/GCN/01 | AWS Data Entry.html |
| Glycine_IP_010326 (COA) | COA Sign & Issue.html |

**Data layer:** `js/demo-data.js` — product `FG00132`, batch `GCN/010526`, documents `SPEC/FG00132/01`, `MOA/FG00132/01`, `AWS/FG00132/01`, `COA/GCN/010526`.

---

## 1. SPECIFICATION — Prototype: Product Master Editor + Create SPEC + Document Approval Review

### Fields PRESENT in real doc AND in prototype

| Real field | Prototype location |
|---|---|
| Name of Material / Product name | Product Master Editor `#pname` → "Glycine IP"; Document Approval Review id-grid "Product" |
| Specification No. (pattern) | `SPEC/FG00132/01` — Create SPEC rail, Review preview, Approval Review title block |
| Revision No. | Document Approval Review: "Revision 00"; Product Master: "Revision 03" (master, not batch SPEC) |
| Chemical Formula | Product Master Editor `#formula` → C₂H₅NO₂ |
| Molecular Weight | Product Master Editor `#mw` → 75.07 g/mol (real: 75.1 g/mole) |
| Reference / Pharmacopoeia | Product Master `#regref` IP; Approval Review pharmacopoeia "IP — BP — USP" |
| Product identity — shelf life | Create SPEC Review Step identity grid: "60 months" |
| Storage conditions | Create SPEC Review Step: "Store below 25 °C, protected from moisture" |
| Sampling plan | Create SPEC Review Step: "Level II — √n + 1 containers — IS 2500" |
| Retained sample quantity | `demo-data.js` seed: "2 × 200 g" (real: "30 gm") |
| Core test parameters (Description → Assay) | Test Parameter Editor, Create SPEC cards 01–10, Approval Review table rows 1–10 |
| Identification A / B sub-tests | Create SPEC sub-test block; Approval Review sub-rows under Identification |
| Chlorides pharmacopoeia variants | Create SPEC "Pharmacopoeia variants"; Approval Review USP variant sub-row |
| Optional: Sieve analysis, Bulk density | Create SPEC optional tests #12–13 (toggle off by default) |
| Optional: Elemental impurities | Create SPEC optional test #14 "Elemental impurities by AAS (ICH Q3D)" |
| Foreign matter | Create SPEC mandatory #11; Approval Review row 11; **absent from demo-data seed** |
| Customer tab concept | Approval Review Section 02; Create SPEC Step 3 |
| Workflow signatures (QC approve / QA sign) | Document Approval Review decision pane; Sign Modal |
| Batch linkage | Approval Review: GCN/010526, ARN 2026FG03 |

### Fields PRESENT in real doc but MISSING from prototype

| Field | Severity | Reasoning |
|---|---|---|
| **Page No.** (e.g. "4 of 4") | MEDIUM | Every real controlled document has pagination; prototype has no page numbering on any document preview |
| **Effective Date** (calendar date) | HIGH | Real: fixed date per revision (e.g. 01/06/2023). Prototype: "On QA signature" only — no issued effective date on SPEC |
| **Review Date** | MEDIUM | Real SPEC header includes scheduled review date; not captured on any SPEC screen |
| **Supersedes in (R-XX) format** | HIGH | Real: `SPEC/FG00038/01 (R-01)`. Prototype Approval Review shows "— (first issue)" with no prior-revision reference format |
| **Product Name** (plain "Glycine" vs "Glycine IP") | LOW | Real identity block separates product name from material name; prototype uses single "Glycine IP" everywhere |
| **Technical Name** (2-aminoethanoic acid) | MEDIUM | Not on Product Master Editor Glycine view; not in `demo-data.js` seed. Create Product Master wizard has no field for it either |
| **Composition** (100 %) | MEDIUM | Missing from master and SPEC views |
| **Origin / Source** (Synthetic) | MEDIUM | Missing |
| **Method of Production** (Chemical synthesis) | MEDIUM | Missing |
| **Packing — Primary** | MEDIUM | On Create Product Master.html Step 2 only; **not on Glycine Product Master Editor** (tab 2 label exists, no fields rendered) |
| **Packing — Secondary** | MEDIUM | Same as above |
| **Shelf Life of Raw Materials** (5 years) | LOW | Distinct from finished-product shelf life; not modeled |
| **Special Handling Requirements** | LOW | Create Product Master has field; Glycine master editor does not show it |
| **Sampling Plan** (real: "100 %") | MEDIUM | Prototype uses composite/IS 2500 wording — different sampling philosophy |
| **Retained Sample Retention Period** (Expiry + 1 year) | LOW | Create Product Master has "Retention period"; not on Glycine editor or SPEC |
| **Revision History TABLE** | HIGH | Real: columns Spec No., Revision Made, Ref. CC No., Effective Date with 3 historical rows. Prototype: Product Master revision **dropdown** only; Tab 7 "Revision history" is a label with no table; no CC number field anywhere |
| **Printed signature block** (Prepared / Checked / Approved with SIGN \| DATE \| name) | HIGH | Real SPEC has 3-column printed block. Prototype uses workflow e-sign in side pane only — no document-body signature grid on SPEC |
| **Visual Inspection Parameters** (section heading) | MEDIUM | Real groups Description under this heading; prototype has flat "Test parameters" list |
| **Testing Parameters** (section heading) | MEDIUM | Real groups ~10 tests; prototype has no section header |
| **Additional Tests on customer request** (section) | MEDIUM | Real has dedicated section for Sieve/Bulk Density; prototype treats as optional toggles without section grouping |
| **Elemental impurities by AAS — 10 named elements** | HIGH | Real lists Lead, Arsenic, Mercury, Cadmium, Cobalt, Vanadium, Nickel, Lithium, Antimony, Copper as individual tests. Prototype: single optional "Elemental impurities by AAS" line item |
| **Microbiological parameters (9 items)** | HIGH | Real: Bacterial endotoxin, TAMC, TYMC, E.coli, Salmonella, etc. Prototype: **zero** microbiological tests anywhere in Glycine flow |
| **Other tests** (Ethylene oxide, OVI/Residual solvent) | HIGH | Not in prototype Glycine test set |
| **Family code FG00038** | HIGH | Real SPEC uses FG00038; prototype uses FG00132 throughout (see Question 8) |

### Fields PRESENT in prototype but NOT in real doc

| Field | Notes |
|---|---|
| **ARN** (2026FG03) | Prototype invention for batch traceability — useful for regulated trace, not on real SPEC header |
| **Review cycle: "Per batch"** | Prototype batch-SPEC concept; real master SPEC has calendar Review Date |
| **Customer tab / Meridian Pharma** | Create SPEC Review shows "Meridian Pharma Ltd."; Approval Review shows "In-house (captive)" — customer-tab concept is prototype Phase 2, not on real Glycine SPEC |
| **Type column** (Qualitative / Quant. — NMT) | Prototype table metadata; real SPEC shows limits inline without "Type" column |
| **Grade / category** ("Pharmaceutical · Excipient") | Product Master Editor only; not on real SPEC header |
| **Pharmacopoeia tag** (IP 2022 · Monograph 1.2.41) | Prototype master metadata; real uses simpler "Reference: IP" |
| **Outside-lab / Ext lab badges** | Prototype workflow feature (Heavy metals ext lab) — not explicit on real Glycine SPEC summary |
| **Declaration section** (Section 03) | Prototype legal boilerplate on batch SPEC — not a named section on real paper SPEC |
| **Document history timeline** (sidebar) | Prototype audit UX; real doc has revision history table instead |

### Data values that mismatch

| Field | Real value | Prototype shows |
|---|---|---|
| Family / master code | **FG00038** | **FG00132** |
| Specification No. | SPEC/**FG00038**/01 | SPEC/**FG00132**/01 |
| Revision | **02** (R-02) | **00** on batch SPEC; **03** on Product Master draft; **02** in timeline notes |
| Molecular weight | 75.1 g/mole | 75.07 g/mol |
| Shelf life | 5 years (raw materials); finished product expiry on COA Feb 2031 from Mar 2026 mfg | 60 months on Review Step; storage "below 25 °C" vs seed "below 30 °C" |
| Retained sample | 30 gm | 2 × 200 g |
| Sampling plan | 100 % | Composite sample / Level II √n+1 |
| Packing primary | 400 GSM LDPE polybag/liner | Not shown on Glycine master |
| Packing secondary | HDPE/PAPER/PAPER HDPE BAGS | Not shown |
| Supersedes | SPEC/FG00038/01 **(R-01)** | — (first issue) |
| Effective date | 01/06/2023 (R-02) | On QA signature |
| Test count (summary) | ~30+ line items across 5 groupings | **11** mandatory (+3 optional in wizard) |
| Short code | GCN (batch prefix in real COA) | GCN in master; **GLY** on Create SPEC Review Step (bug) |

### Structural differences

- Real SPEC is a **multi-page controlled document** with header grid, 5 test groupings, revision history table, and printed signature block. Prototype splits master authoring (Product Master Editor) from batch SPEC (Create SPEC wizard) and shows a **single flat test table** on approval.
- Real revision identity uses **(R-XX) suffix** in history and supersedes. Prototype uses **Revision NN** on documents and **R-NN** only on Product Master revision rail.
- Product Master Editor renders **only Tab 1 (Identity)**; tabs 2–7 are navigation labels without content for Glycine — storage/packing fields exist in Create Product Master wizard but are **not visible** on the live Glycine master screen.

---

## 2. METHOD OF ANALYSIS — Prototype: MOA Section Editor + Document Approval Review

### Fields PRESENT in real doc AND in prototype

| Real field | Prototype location |
|---|---|
| Name of Material | MOA Section Editor page title: "MOA Sections · Glycine IP" |
| MOA No. (pattern) | Per-section ref: `MOA/FG00132/10 · Revision 03`; batch doc `MOA/FG00132/01` in demo-data |
| Test methods by name | MOA Section Editor list 01–11 matching SPEC test names |
| Procedure text | MOA Section Editor blocks 1–12 (sample prep, reagents, instrument params, procedure steps, conclusion template) |
| Acceptance criteria linkage | Formula reference block pulls from Test Parameter; system suitability optional limits table |
| Identification A / B | MOA list item 03 "Identification (2 sub-tests)" with sub-procedures in detail |
| Outside-lab variant | Block 12 for external lab report path (Heavy metals marked Ext lab) |
| Workflow approval | Document Approval Review + Sign Modal for batch MOA document |

### Fields PRESENT in real doc but MISSING from prototype

| Field | Severity | Reasoning |
|---|---|---|
| **Ref. Specification No.** (header cross-ref) | HIGH | Real MOA header: "SPEC/FG00038/01". Prototype has per-section ref doc field, not document-level header cross-reference |
| **Chemical Formula / Molecular Weight** (MOA header) | MEDIUM | On real MOA header; MOA Section Editor is master-scoped, no header grid |
| **Effective Date / Review Date** | MEDIUM | Not on MOA editor or batch MOA preview |
| **Supersedes** (MOA/FG00038/01 (R-01)) | HIGH | Not captured |
| **Page No.** (21 of 23) | MEDIUM | Missing |
| **Numbered test methods 1.0–17.0** | MEDIUM | Real uses decimal monograph numbering (17 methods). Prototype uses **01–11** test sections |
| **Acceptance Criteria per method** (in MOA body) | MEDIUM | Real MOA pairs procedure + acceptance criteria per test. Prototype MOA stores procedure only in `demo-data.js`; acceptance lives in Test Parameter Editor |
| **Revision History TABLE** | HIGH | Same gap as SPEC — no CC No., no effective dates per revision |
| **Printed signature block** (3-column) | HIGH | Not on MOA Section Editor or MOA approval preview |
| **Full MOA read-only preview on approval** | HIGH | Document Approval Review replaces MOA body with one summary paragraph — procedures not shown |

### Fields PRESENT in prototype but NOT in real doc

| Field | Notes |
|---|---|
| **12 internal editor blocks** (sample/standard/blank prep, sequence table, system suitability) | Prototype authoring richness beyond typical paper MOA section structure — genuinely useful for LIMS, not on paper |
| **Instrument parameters table** | Structured capture in editor; real MOA has procedure prose |
| **Conclusion template chips** (Complies / Does not comply) | Prototype AWS linkage feature |
| **Pick from Reagent Master** | Prototype master-data integration |
| **MOA/FG00132/10** per-section ref | Prototype uses test-index doc suffix; real MOA is single document MOA/FG00038/01 |

### Data values that mismatch

| Field | Real | Prototype |
|---|---|---|
| MOA No. | MOA/**FG00038**/01 | MOA/**FG00132**/01 |
| Revision | 02 | 03 (master editor) / not on batch MOA preview |
| Method count | **17** numbered methods | **11** sections (+ 12 editor blocks) |
| Test #11 | Real method 17.0 area | Prototype #11 = Foreign matter (empty); Assay is #10 |

### Structural differences

- Real MOA is a **23-page standalone controlled document** with header, 17 numbered methods, revision table, signatures. Prototype MOA is a **Product Master tab** (authoring tool) plus a **stub approval summary** for the batch MOA document.
- `demo-data.js` `moaSections[]` stores **plain-text procedure strings only** — MOA Section Editor HTML is static, not data-driven.

---

## 3. AWS / ANALYTICAL WORKSHEET — Prototype: AWS Data Entry

### Fields PRESENT in real doc AND in prototype

| Real field | Prototype location |
|---|---|
| Product name | AWS head: "Glycine IP" |
| Batch No. | GCN/010526 |
| Test sections with observations | 11 section cards (01–11) with result + Satisfactory/Not satisfactory |
| Per-test: Instrument Used | Expanded sections (e.g. Sulphated ash, LOD, Assay): instrument dropdown + calibration meta |
| Per-test: Reagents Used | Reagent multi-select + lot/expiry |
| Per-test: Procedure | Read-only from MOA source tag |
| Per-test: Observation | Input fields in expanded sections |
| Per-test: Calculation | Auto-calc block (Assay) |
| Per-test: Acceptance criteria | Displayed read-only from SPEC |
| Per-test: Conclusion | Satisfactory / Not satisfactory pills |
| Per-test: Remarks / attachments | Assay section |
| Top-level document submit | "Submit AWS" → Sign Modal (password + geo) |
| QC approval workflow | Document Approval Review for AWS (stub) |

### Fields PRESENT in real doc but MISSING from prototype

| Field | Severity | Reasoning |
|---|---|---|
| **Protocol ID AWS/GCN/01** | HIGH | Real uses product/batch-based protocol ID. Prototype uses **AWS/FG00132/01** (family-code pattern) |
| **Page No.** | MEDIUM | Missing |
| **Name of Product dual pharmacopoeia** ("Glycine IP/BP/USP") | HIGH | Real AWS header shows multi-pharma product name; prototype shows "Glycine IP" only |
| **Supersedes** (e.g. "New") | MEDIUM | Not on AWS screen |
| **Revision No. / Effective Date / Review Date** | MEDIUM | Not on AWS header |
| **Secondary header (per-batch)** | HIGH | Real captures: Mfg/Exp dates, TRS No., A.R. No., Batch Size/Quantity Sampled, Received/Testing dates, Ref SPEC/MOA No., **Completion Date** — prototype AWS head has only doc no., status, batch, customer, assignee |
| **Issuance Stamp by QA** | **CRITICAL** | **Not present anywhere on AWS Data Entry.** No field, gate, stamp, or workflow step labeled issuance |
| **Test Summary TABLE** (Sr \| Tests \| Results \| Limits) | HIGH | Real has overview table before detailed sections. Prototype uses per-section cards only — no consolidated summary table |
| **Top-level signatures at top of doc** (Analyzed / Checked / Approved) | HIGH | Real AWS has signature row at document top. Prototype: submit bar at bottom only |
| **Per-test Analyzed By / Checked By sign-offs** | **CRITICAL** | **Not present.** Real requires analyst + checker signature at **every** test section. Prototype has no per-section signature rows |
| **Dual BP/USP variant entry** (separate procedures per pharmacopoeia) | HIGH | Real pH, Chlorides, LOD, Assay have BP and USP variants in same form. Prototype: Chlorides shows single result; USP variant appears on COA/SPEC only, not as separate AWS entry path |
| **Revision History TABLE** | MEDIUM | Missing on AWS |
| **Bottom signature block** (QC Chemist / QC Manager / QA Manager) | HIGH | Real has named 3-column block at end. Prototype: document-level e-sign via Sign Modal only |
| **22 detailed test sections** | HIGH | Real AWS has 22 sections. Prototype has **11** (Identification split into 03+04; no Foreign matter section; no microbiological, elemental, ethylene oxide, OVI sections) |

### Fields PRESENT in prototype but NOT in real doc

| Field | Notes |
|---|---|
| **Progress bar** (8 of 11 complete) | Prototype UX — not on paper |
| **Split pane** (MOA/SPEC reference on right) | Prototype navigation aid |
| **OOS acknowledgement / audit trail** for expired instrument | Prototype compliance UX for demo |
| **Assigned QC exec** | Prototype task routing — not on real AWS header |
| **AWS/FG00132/01** numbering | Uses family code; real uses **AWS/GCN/01** batch-protocol pattern |

### Data values that mismatch

| Field | Real | Prototype |
|---|---|---|
| Protocol / doc ID | **AWS/GCN/01** | **AWS/FG00132/01** |
| Product name | Glycine IP/**BP/USP** | Glycine IP |
| Batch | GCN/**010326** (real COA) | GCN/**010526** |
| Ref SPEC/MOA | SPEC/FG00038/01 (IP) MOA/FG00038/01 (IP) | Links to FG00132 docs |
| Section count | **22** | **11** |
| A.R. No. | On real AWS header | On COA/Batch Detail only, not AWS |

### Structural differences

- Real AWS is a **hybrid**: summary table + top signatures + 22 expandable test sections each with instrument/reagent/procedure/observation/calculation/**dual signatures** + bottom signatures + revision history. Prototype is a **digital worksheet** with rich per-section data entry but **single end-to-end submit signature** and no QA issuance gate.
- `populateAwsDataEntry()` in demo-data.js hydrates **header metadata only** — no persisted AWS results model.

---

## 4. BATCH SUMMARY / COA — Prototype: COA Sign & Issue

### Fields PRESENT in real doc AND in prototype

| Real field | Prototype location |
|---|---|
| Product name | COA Section 01: Glycine IP |
| Batch No. | GCN/010526 |
| Date of Manufacture | May 2026 |
| Date of Expiration | April 2031 (real: February 2031) |
| Batch Size | 3 000 kg (real: 3000.00 Kgs) |
| Results table concept | Section 02 table |
| Sr. No. column | Present |
| IP Monograph Analysis column | Present (column header matches) |
| Specification column | Present |
| Observation column | Present |
| Identification A / B sub-rows | Subrows under Identification |
| Remark / compliance statement | Section 03: "Complies with the IP specification" |
| Signature block (3 roles) | Section 04: Prepared by / Checked by / Approved by |
| Date of issue | Implied on sign (real: 27/03/2026) |

### Fields PRESENT in real doc but MISSING from prototype

| Field | Severity | Reasoning |
|---|---|---|
| **Storage Condition** (footer) | HIGH | Real: "Preserve in well-closed container at room temperature". Prototype compliance section has no storage footer — storage exists on product master but not printed on COA |
| **Date of issue** (explicit header field) | MEDIUM | Real shows issue date prominently; prototype shows draft watermark until signed |
| **Conclusion column** | LOW | Prototype adds 5th column "Conclusion" (Satisfactory pills); real table has 4 columns only |
| **Printed signature labels** (Officer-QC / H.O.D-QC / H.O.D-QA) | LOW | Real uses role titles; prototype uses Executive-Manager designations (acceptable variant) |
| **10 numbered summary tests** (real count) | MEDIUM | Real COA summary has 10 rows. Prototype has **11** (+ Foreign matter, + USP Chlorides subrow) |

### Fields PRESENT in prototype but NOT in real doc

| Field | Notes |
|---|---|
| **Conclusion column** (5th) | Prototype addition — useful for pass/fail at a glance |
| **A.R. number** | On COA identity grid; not on real COA header provided |
| **Customer** | Prototype field; not in real COA header list |
| **Pharmacopoeia: IP — BP — USP** | Triple display on COA; real COA is IP-focused ("IP Monograph Analysis", "Complies with IP specification") |
| **Chlorides USP variant subrow** | Dual-pharma on COA; real summary table lists 10 tests without separate USP row |
| **Geo-tagged signature metadata** | Prototype e-sign compliance feature |
| **Draft watermark** | Prototype pre-issue state |
| **Cross-links panel** | Prototype navigation to source docs |

### Data values that mismatch

| Field | Real | Prototype |
|---|---|---|
| Batch No. | GCN/**010326** | GCN/**010526** |
| Date of issue | **27/03/2026** | Not shown (pending sign) |
| Date of expiration | **February 2031** | April 2031 |
| Batch size | 3000.00 Kgs | 3 000 kg |
| Test count | **10** numbered | **11** (+ subrows) |
| Storage footer | Preserve in well-closed container at room temperature | **Missing** |
| Compliance remark | Complies with the IP specification | Matches (but also says "All 11 test parameters") |

### Structural differences

- Real COA is a **clean 4-column summary** (10 tests) + remark + storage + signatures. Prototype COA is a **richer 5-column table** with Satisfactory pills, static HTML not driven by AWS results, and no storage footer.
- `populateCoaDetail()` updates title/breadcrumb/product/batch/**first signature only** — results table and compliance text are **static mock**.

---

## 5. Eight Explicit Questions — Direct Answers

### Q1: Does the prototype include "Issuance Stamp by QA" as a gate on AWS Data Entry?

**No.** There is no field, checkbox, stamp, status gate, or workflow step labeled "Issuance Stamp by QA" on AWS Data Entry.html or anywhere in `demo-data.js`. QA involvement appears only downstream: AWS submit → QC approval → QA signature queue → COA auto-generation (dashboard copy). A real issuance gate would need a dedicated header field in the AWS secondary header block, likely between "Reference Specification/MOA No." and analyst start of testing, with read-only state until QA stamps.

### Q2: Does AWS Data Entry capture per-test "Analyzed By / Checked By" sign-offs?

**No.** AWS Data Entry captures per-test observations, instruments, reagents, calculations, and conclusions — but **no per-section "Analyzed By: ___ Checked By: ___" signature rows**. Signing is **document-level only**: "Submit AWS" opens Sign Modal for one bound e-signature. Real paper AWS requires dual sign-off at **every** test section plus top and bottom blocks.

### Q3: How does the prototype handle the (R-XX) revision suffix?

| Location | Format shown |
|---|---|
| Product Master Editor revision dropdown | **R-03, R-02, R-01, R-00** |
| Product Master page titles | **Revision 03** (zero-padded, no parentheses) |
| Create Product Master wizard | **Revision 00 (R-00)** — only place pairing both formats |
| Batch documents (SPEC/MOA/AWS/COA) | **Revision 00** — no (R-XX) |
| Document Approval Review "Supersedes" | **— (first issue)** — no (R-01) reference |
| Timeline / audit notes | "FG00132 · Revision 02" — stripped format |
| Real client documents | **SPEC/FG00038/01 (R-02)** in headers and supersedes lines |

**(R-XX) is shown on Product Master revision rail only. It is hidden/stripped on all batch document previews and supersedes fields.** This contradicts real client documents and the prior QA-09 strip decision.

### Q4: Does the prototype's Glycine IP product master have the 22-section detailed test structure?

**No.** Glycine has **11** test parameters in `demo-data.js` and **11** AWS sections in the UI (with Identification split into 2 AWS sections = 11 cards). Real AWS has **22** detailed test sections including microbiological, elemental, ethylene oxide, OVI, and additional tests. The prototype summary layer (SPEC/COA) shows **10–11** tests, not 22.

### Q5: Does any prototype screen handle dual pharmacopoeia (one document covering IP+BP+USP)?

**Partially, not as a unified document model.**

- Document Approval Review.html: Pharmacopoeia field "IP — BP — USP"; Chlorides USP variant sub-row
- COA Sign & Issue.html: Pharmacopoeia "IP — BP — USP"; Chlorides USP subrow
- Test Parameter Editor.html: Pharmacopoeia variant tags on Chlorides/Assay
- Batch seed: `pharmacopoeia: 'IP'` (single primary)
- AWS: no dual-pharma product name, no per-test BP/USP procedure selection
- Real AWS: product name "Glycine IP/BP/USP" and separate BP/USP procedure blocks per test

**Prototype assumes one primary pharmacopoeia per batch with optional variant rows — not one worksheet covering all three pharmacopoeias simultaneously.**

### Q6: Does the prototype distinguish the 5 SPEC test groupings?

**No.** Prototype uses a **flat numbered list** (Create SPEC, Approval Review, Test Parameter Editor). It does **not** distinguish:

1. Visual Inspection Parameters
2. Testing Parameters
3. Additional Tests (customer request)
4. Elemental Impurities by AAS
5. Microbiological Parameters

Elemental appears as optional test #14 (inactive). Microbiological and "Other" (ethylene oxide, OVI) are **absent**. Optional tests 12–13 exist without "Additional Tests" section heading.

### Q7: Does the prototype's COA template match the real Batch Summary structure?

**Mostly yes on column headers; gaps on row count, footer, and extra column.**

| Aspect | Real | Prototype |
|---|---|---|
| Columns | Sr / IP Monograph Analysis / Specification / Observation | Same **plus Conclusion** (5th) |
| Identification subrows | A (IR) and B (chemical) | Matches |
| Row count | 10 | 11 (+ USP Chlorides subrow) |
| Remark | "Complies with the IP specification" | Matches |
| Storage condition footer | Present | **Missing** |
| Signatures | Prepared / Checked / Approved | Matches (different role labels) |

### Q8: Real Glycine SPEC family code FG00038 vs prototype FG00132 — which is correct?

**Both appear to be real at different points — they are not the same document generation.**

- **Real client paper (this audit):** FG**00038**, SPEC/FG00038/01 (R-02), MOA/FG00038/01, AWS/GCN/01, batch GCN/010326
- **Prototype (QA-09 demo):** FG**00132**, SPEC/FG00132/01, batch GCN/010526

FG00038 survives only as a **stale design reference** in Document Timeline.html `@dsCard` subtitle — all runtime UI and `demo-data.js` use FG00132. The prototype intentionally diverged for demo/walkthrough (QA-09). For client fidelity, FG00038 is the correct family code for the provided paper set; FG00132 is the prototype's canonical demo product and should not be assumed to be the same physical specification without client confirmation.

---

## 6. Cross-Document Gap Summary (Triage Aid)

| Gap theme | Affected docs | Severity |
|---|---|---|
| FG00038 vs FG00132 identity | SPEC, MOA, AWS, COA | HIGH |
| (R-XX) stripped on batch docs / supersedes | SPEC, MOA, AWS | HIGH |
| Revision history table + CC numbers | SPEC, MOA, AWS | HIGH |
| Printed document signature blocks | SPEC, MOA, AWS, COA | HIGH |
| Product identity block incomplete | SPEC (master) | MEDIUM |
| 5 test groupings + microbiological + elemental detail | SPEC | HIGH |
| AWS issuance stamp by QA | AWS | CRITICAL |
| AWS per-test dual signatures | AWS | CRITICAL |
| AWS 22 vs 11 sections | AWS, COA | HIGH |
| Dual pharmacopoeia worksheet model | AWS, COA | HIGH |
| COA storage footer | COA | HIGH |
| Page numbers on all documents | All | MEDIUM |
| Static mock data vs persisted results | COA, AWS, Approval Review | HIGH |

---

*End of discovery report. No fixes proposed. Triage at your discretion.*
