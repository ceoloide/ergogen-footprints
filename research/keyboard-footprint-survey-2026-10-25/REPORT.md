# Missing keyboard footprints — source survey

Researched 2026-10-25 against the ceoloide/ergogen-footprints checkout based on `9217fe6fda18e09b70784f53fece9e0cdea5573d`, including the local courtyard/comment fixes. No Ergogen footprint was added or converted by this survey.

**Result: 67 missing KiCad component/package families, represented by 209 exact footprint identifiers, plus one LED identifier requiring review.** These are grouped conversion opportunities, not 209 distinct components: many identifiers are aliases, reversible versions, or different library names for the same package. Mitosis adds nine missing Altium patterns, listed separately below.

**Files:** [Visual board gallery](visuals/index.html) · [Exact footprint list](EXACT-FOOTPRINTS.md) · [Existing coverage and exclusions](COVERAGE.md) · [Download/provenance manifest](manifest.json). Original mixed PCB/Altium downloads are retained locally and excluded from this branch; the KiCad extracts and attribution files are included.

## Scope and evidence

This is a purposive survey of popular open-hardware projects, not a claim to an exhaustive or statistically ranked list of all keyboards. Reddit recurrence and notable build discussions informed selection; GitHub stars provided a second, reproducible popularity signal. Firmware repositories, layout lists and case-only projects were not treated as PCB footprint evidence. Stars measure repository attention, not keyboard sales or active users.

25 keyboard projects were screened, plus two electronics repositories linked from the Charybdis BOM. The inventory inspects **34 KiCad boards from 24 repositories and two Mitosis Altium boards**. Where a project has many revisions, representative revisions were selected explicitly; this is not every historical release or every fork. Case/plate PCBs were excluded. Actual placed footprint objects establish usage; merely finding an unused `.kicad_mod` in a bundled library does not.

Reddit evidence: [common-board discussion](<https://www.reddit.com/r/ErgoMechKeyboards/comments/198djii>), [recommendations](<https://www.reddit.com/r/ErgoMechKeyboards/comments/1daiugh>), [376-vote showcase mentioning Corne, Charybdis, TOTEM and Sweep; vote count as returned by search on research date](<https://www.reddit.com/r/ErgoMechKeyboards/comments/1pg6s7o/my_journey_and_showcase/>), [129-vote KLOR/TOTEM discussion](<https://www.reddit.com/r/ErgoMechKeyboards/comments/1rqya5z/saegewerk_redux/>), [223-vote Cheapino build post](<https://www.reddit.com/r/ErgoMechKeyboards/comments/1efxe08/cheapino/>), [122-vote Lumberjack appreciation post](<https://www.reddit.com/r/MechanicalKeyboards/comments/1shocvt/lumberjack_appreciation_post/>), [Discipline build discussion linking original project and discussing Mysterium](<https://www.reddit.com/r/MechanicalKeyboards/comments/gyh5iv>). See [popularity-sources.json](popularity-sources.json) for retrieval notes.

## Most useful additions to consider first

This order is an engineering judgment based on reuse across split/custom keyboards and features absent from the current library; it is not a popularity ranking.

| Missing family | Used by | Representative source / license |
| --- | --- | --- |
| Seeed XIAO BLE SMD cutout | TOTEM | [GEIGEIGEIST/TOTEM](<https://github.com/GEIGEIGEIST/TOTEM/blob/410e566dd47466c0b69279f0d4b3646998c663d4/PCB/totem_0-3/totem_0_3.kicad_pcb>); CERN-OHL-P-2.0 |
| Raspberry Pi Pico module | SofleKeyboard, piantor | [beekeeb/piantor](<https://github.com/beekeeb/piantor/blob/cd847afb4f9a86e8c1c8e36f243140644013afb2/pcb/left/keyboard_pcb.kicad_pcb>); GPL-3.0 |
| Waveshare RP2040-Zero module | cheapino, silakka54 | [Squalius-cephalus/silakka54](<https://github.com/Squalius-cephalus/silakka54/blob/75d168c5eaea4bdb635313a8fbcdd6d7009b212f/kicad/silakka54.kicad_pcb>); MIT |
| WeAct STM32 Black Pill module | cantor | [diepala/cantor](<https://github.com/diepala/cantor/blob/13f8bc03bb8a894c7c2871ae64845d5ef927c328/Cantor_MX/Cantor_MX.kicad_pcb>); GPL-3.0; MIT Keebio library; CC-BY-SA-4.0 keyswitch library |
| Teensy 2.0 module with reset | ErgoDox | [Ergodox-io/ErgoDox](<https://github.com/Ergodox-io/ErgoDox/blob/15dacd626e3c59efe92c2c48d5d85edbce308b1c/ErgoDOX%20pcb/ErgoDOX.kicad_pcb>); GPL-3.0 (official ergodox.io declaration) |
| MJ-4PP-9 TRRS jack | KLOR, Lily58, SofleKeyboard, TOTEM, cantor, chocofi, helix, keyball | [diepala/cantor](<https://github.com/diepala/cantor/blob/13f8bc03bb8a894c7c2871ae64845d5ef927c328/Cantor_MX/Cantor_MX.kicad_pcb>); GPL-3.0; MIT Keebio library; CC-BY-SA-4.0 keyswitch library |
| RJ45 Ninigi GE | cheapino | [tompi/cheapino](<https://github.com/tompi/cheapino/blob/e4bc9a9757a9d196e0dc6d3e3f453ae633bf1b60/pcb/cheapino.kicad_pcb>); CC-BY-4.0 |
| USB-C receptacles | Dilemma, Lily58, crkbd, discipline, ferris, lumberjack-keyboard, mysterium, splinktegrated | [Bastardkb/Dilemma](<https://github.com/Bastardkb/Dilemma/blob/88b0d866ecc8d3472ee05fb3ca267b2c764d39bc/3x5_3/dilemma.kicad_pcb>); CERN-OHL-S-2.0 |
| 12-pin 0.5mm FPC (Cirque touchpad) | Dilemma, charybdis-pmw-sensor, splinktegrated | [Bastardkb/Dilemma](<https://github.com/Bastardkb/Dilemma/blob/88b0d866ecc8d3472ee05fb3ca267b2c764d39bc/3x5_3/dilemma.kicad_pcb>); CERN-OHL-S-2.0 |
| PixArt PMW3360 sensor (DIP-16 W10.16mm) | charybdis-pmw-sensor | [Bastardkb/charybdis-pmw-sensor](<https://github.com/Bastardkb/charybdis-pmw-sensor/blob/98c16324fd8e41d10f2e2d6960f064130544eca1/sensor/sensor.kicad_pcb>); CC-BY-NC-SA-4.0 (README declaration) |
| Pimoroni DRV2605L haptic module | KLOR | [GEIGEIGEIST/KLOR](<https://github.com/GEIGEIGEIST/KLOR/blob/e2f9c2cde5200189e57c4f89eeff90686cc359fe/PCB/klor1_3/klor1_3.kicad_pcb>); GPL-3.0 |
| Mallory AST1109MLTRQ buzzer | KLOR | [GEIGEIGEIST/KLOR](<https://github.com/GEIGEIGEIST/KLOR/blob/e2f9c2cde5200189e57c4f89eeff90686cc359fe/PCB/klor1_3/klor1_3.kicad_pcb>); GPL-3.0 |
| MSK12C01 / MSK12C02 slide switch | KLOR, Sweep, TOTEM, chocofi, temper | [pashutk/chocofi](<https://github.com/pashutk/chocofi/blob/273676d11b06785fb5a1a94860a39fc36c38baba/pcb/chocofi.kicad_pcb>); CERN-OHL-P-2.0; CC-BY-SA-4.0 keyswitch library |
| Omron B3U-1000P top reset switch | ErgoDox, Sweep, ferris | [pierrechevalier83/ferris](<https://github.com/pierrechevalier83/ferris/blob/abc96ada2dafc403ef8a3b5031748954140980b5/0.2/bling/ferris.kicad_pcb>); Solderpad-2.1 hardware |
| SK6805-EC15 1.5mm addressable RGB LED | Dilemma | [Bastardkb/Dilemma](<https://github.com/Bastardkb/Dilemma/blob/88b0d866ecc8d3472ee05fb3ca267b2c764d39bc/3x5_3/dilemma.kicad_pcb>); CERN-OHL-S-2.0 |
| SK6812 MINI non-E 3535 LED | SofleKeyboard, helix | [josefadamcik/SofleKeyboard](<https://github.com/josefadamcik/SofleKeyboard/blob/fb294f7c58d0f91c379a9ef339159d4d056643e9/Sofle_RGB/PCB/SofleKeyboard.kicad_pcb>); MIT |
| WS2812B 5050 RGB LED | reviung | [gtips/reviung](<https://github.com/gtips/reviung/blob/110154f56a292466c993ccd726df4a8772b5e0cf/reviung41/pcb/ver1.4/reviung41.kicad_pcb>); MIT |
| Tenting puck mounting pattern | Dilemma, KLOR, SofleKeyboard, Sweep, cantor, ferris | [davidphilipbarr/Sweep](<https://github.com/davidphilipbarr/Sweep/blob/8ba72a256d627567660ecc0b6f51bb18fa8badb5/Sweep%20Bling%20LP/pcb/sweepbling-lp__pcb.kicad_pcb>); Solderpad-2.1 hardware |
| MX PCB stabilizers (2u) | ErgoDox | [Ergodox-io/ErgoDox](<https://github.com/Ergodox-io/ErgoDox/blob/15dacd626e3c59efe92c2c48d5d85edbce308b1c/ErgoDOX%20pcb/ErgoDOX.kicad_pcb>); GPL-3.0 (official ergodox.io declaration) |
| MX PCB stabilizers (6.25u / 7u) | discipline, mysterium | [coseyfannitutti/discipline](<https://github.com/coseyfannitutti/discipline/blob/f3b887110dab14ada007cea96483e4f3e65ca78c/discipline-pcb.kicad_pcb>); CC-BY-NC-4.0 + repository personal-use notice |

## Complete grouped list

Each row links to an exact-name entry in the appendix, which links to downloaded source and its upstream board. Categories such as resistors, headers and SOT packages can probably become parameterized generators; exact package sizes and variants remain in the appendix.

| Missing family | Exact identifiers | Used by | Example |
| --- | ---: | --- | --- |
| 0402 indicator LED | 1 | Dilemma, Lily58, splinktegrated | [F059](EXACT-FOOTPRINTS.md#f059) |
| 0603 ferrite bead / inductor | 1 | Dilemma, splinktegrated | [F044](EXACT-FOOTPRINTS.md#f044) |
| 12-pin 0.5mm FPC (Cirque touchpad) | 1 | Dilemma, charybdis-pmw-sensor, splinktegrated | [F179](EXACT-FOOTPRINTS.md#f179) |
| 3mm THT indicator LED | 2 | discipline, lumberjack-keyboard, mysterium | [F061](EXACT-FOOTPRINTS.md#f061) |
| 6x6mm four-pin THT pushbutton | 3 | discipline, lumberjack-keyboard, mysterium, redox-keyboard | [F010](EXACT-FOOTPRINTS.md#f010) |
| ATmega328 DIP-28 | 1 | lumberjack-keyboard | [F087](EXACT-FOOTPRINTS.md#f087) |
| ATmega32A DIP-40 | 1 | discipline, mysterium | [F146](EXACT-FOOTPRINTS.md#f146) |
| Additional diode packages / pitches | 5 | Dilemma, SofleKeyboard, crkbd, discipline, mysterium, splinktegrated | [F035](EXACT-FOOTPRINTS.md#f035) |
| Alps SKHLLCA010 reset switch | 1 | TOTEM | [F132](EXACT-FOOTPRINTS.md#f132) |
| Alps SKRTLAE010 side reset switch | 1 | KLOR | [F053](EXACT-FOOTPRINTS.md#f053) |
| Battery wire pads / custom battery connector | 4 | KLOR, TOTEM, chocofi, temper | [F055](EXACT-FOOTPRINTS.md#f055) |
| Breakaway tabs / mouse bites | 9 | Dilemma, Lily58, Sweep, TOTEM, crkbd, ferris, piantor, reviung | [F037](EXACT-FOOTPRINTS.md#f037) |
| C&K KXT3 reset switch | 1 | Dilemma | [F009](EXACT-FOOTPRINTS.md#f009) |
| Capacitors (SMD, disc and radial) | 10 | Dilemma, Lily58, charybdis-pmw-sensor, crkbd, discipline, ferris, lumberjack-keyboard, mysterium, splinktegrated | [F017](EXACT-FOOTPRINTS.md#f017) |
| Cirque touchpad wire pads | 1 | SofleKeyboard | [F118](EXACT-FOOTPRINTS.md#f118) |
| Crystals (2520, 3225, HC49) | 4 | Dilemma, Lily58, crkbd, discipline, lumberjack-keyboard, mysterium, splinktegrated | [F031](EXACT-FOOTPRINTS.md#f031) |
| ErgoDox five-pad 3.5mm TRRS jack | 1 | ErgoDox | [F006](EXACT-FOOTPRINTS.md#f006) |
| FM-B2020RGBA-HG 2020 RGB LED | 1 | ferris | [F205](EXACT-FOOTPRINTS.md#f205) |
| Four-pad SMD pushbutton | 1 | Dilemma, splinktegrated | [F066](EXACT-FOOTPRINTS.md#f066) |
| Fuses (0603, 1206 and radial THT) | 4 | Dilemma, Lily58, discipline, ferris, lumberjack-keyboard, mysterium, splinktegrated | [F040](EXACT-FOOTPRINTS.md#f040) |
| IS31FL3731 QFN-28 exposed-pad package | 1 | ferris | [F085](EXACT-FOOTPRINTS.md#f085) |
| JST SH 1.0mm four-pin horizontal connector | 1 | lumberjack-keyboard | [F025](EXACT-FOOTPRINTS.md#f025) |
| JST ZR S4B-ZR four-pin connector | 1 | lumberjack-keyboard | [F199](EXACT-FOOTPRINTS.md#f199) |
| LVC27 haptic actuator connection | 1 | KLOR | [F056](EXACT-FOOTPRINTS.md#f056) |
| MAC8 seven-contact trackball module connector | 1 | keyball | [F202](EXACT-FOOTPRINTS.md#f202) |
| MCP23017 SOIC-28W I/O expander | 1 | ferris | [F088](EXACT-FOOTPRINTS.md#f088) |
| MCP23018 DIP-28 I/O expander | 1 | ErgoDox | [F034](EXACT-FOOTPRINTS.md#f034) |
| MJ-4PP-9 TRRS jack | 9 | KLOR, Lily58, SofleKeyboard, TOTEM, cantor, chocofi, helix, keyball | [F015](EXACT-FOOTPRINTS.md#f015) |
| MSK12C01 / MSK12C02 slide switch | 5 | KLOR, Sweep, TOTEM, chocofi, temper | [F011](EXACT-FOOTPRINTS.md#f011) |
| MX PCB stabilizers (2u) | 1 | ErgoDox | [F109](EXACT-FOOTPRINTS.md#f109) |
| MX PCB stabilizers (6.25u / 7u) | 2 | discipline, mysterium | [F149](EXACT-FOOTPRINTS.md#f149) |
| MX through-hole indicator LED pads | 1 | ErgoDox | [F075](EXACT-FOOTPRINTS.md#f075) |
| Mallory AST1109MLTRQ buzzer | 1 | KLOR | [F048](EXACT-FOOTPRINTS.md#f048) |
| Mini USB receptacle | 1 | ErgoDox | [F134](EXACT-FOOTPRINTS.md#f134) |
| Molex Pico EZmate four-pin reinforced connector | 1 | lumberjack-keyboard | [F210](EXACT-FOOTPRINTS.md#f210) |
| Mounting hole with stitching vias | 3 | Dilemma, ferris, splinktegrated | [F064](EXACT-FOOTPRINTS.md#f064) |
| NPTH slotted mounting hole | 1 | lumberjack-keyboard | [F209](EXACT-FOOTPRINTS.md#f209) |
| Omron B3U-1000P top reset switch | 3 | ErgoDox, Sweep, ferris | [F008](EXACT-FOOTPRINTS.md#f008) |
| PJ-398A-5A / PJ-399B-6A TRS jack | 1 | crkbd | [F170](EXACT-FOOTPRINTS.md#f170) |
| PJ320D audio jack | 1 | silakka54 | [F024](EXACT-FOOTPRINTS.md#f024) |
| PJ320E audio jack | 2 | Dilemma, splinktegrated | [F157](EXACT-FOOTPRINTS.md#f157) |
| Pimoroni DRV2605L haptic module | 1 | KLOR | [F052](EXACT-FOOTPRINTS.md#f052) |
| Pimoroni five-pin module header | 1 | SofleKeyboard | [F122](EXACT-FOOTPRINTS.md#f122) |
| Pin headers / ISP connectors | 22 | Dilemma, ErgoDox, SofleKeyboard, charybdis-pmw-sensor, crkbd, discipline, helix, lumberjack-keyboard, mysterium, redox-keyboard, splinktegrated | [F005](EXACT-FOOTPRINTS.md#f005) |
| PixArt PMW3360 sensor (DIP-16 W10.16mm) | 1 | charybdis-pmw-sensor | [F196](EXACT-FOOTPRINTS.md#f196) |
| RGB LED strip connection pads | 3 | Lily58, SofleKeyboard, helix | [F070](EXACT-FOOTPRINTS.md#f070) |
| RJ45 Ninigi GE | 1 | cheapino | [F029](EXACT-FOOTPRINTS.md#f029) |
| RP2040 QFN-56 exposed-pad package | 2 | Dilemma, Lily58, crkbd, splinktegrated | [F003](EXACT-FOOTPRINTS.md#f003) |
| Raspberry Pi Pico module | 2 | SofleKeyboard, piantor | [F102](EXACT-FOOTPRINTS.md#f102) |
| Resistors (SMD and axial THT) | 17 | Dilemma, ErgoDox, Lily58, SofleKeyboard, charybdis-pmw-sensor, crkbd, discipline, ferris, helix, keyball, lumberjack-keyboard, mysterium, piantor, redox-keyboard, splinktegrated | [F058](EXACT-FOOTPRINTS.md#f058) |
| SK6805-EC15 1.5mm addressable RGB LED | 2 | Dilemma | [F002](EXACT-FOOTPRINTS.md#f002) |
| SK6812 MINI non-E 3535 LED | 3 | SofleKeyboard, helix | [F060](EXACT-FOOTPRINTS.md#f060) |
| SOT packages / level shifter / regulator / ESD | 10 | Dilemma, Lily58, SofleKeyboard, charybdis-pmw-sensor, crkbd, ferris, splinktegrated | [F092](EXACT-FOOTPRINTS.md#f092) |
| SPI flash SOIC-8 / WSON-8 packages | 3 | Dilemma, Lily58, crkbd, splinktegrated | [F089](EXACT-FOOTPRINTS.md#f089) |
| STM32 dual QFP/QFN-48 with breakout | 1 | ferris | [F140](EXACT-FOOTPRINTS.md#f140) |
| Seeed XIAO BLE SMD cutout | 1 | TOTEM | [F133](EXACT-FOOTPRINTS.md#f133) |
| Standalone solder jumpers | 17 | Dilemma, ErgoDox, KLOR, Lily58, SofleKeyboard, cheapino, chocofi, crkbd, helix, keyball, splinktegrated | [F043](EXACT-FOOTPRINTS.md#f043) |
| TPD4E05U06 USON-10 ESD array | 1 | crkbd | [F090](EXACT-FOOTPRINTS.md#f090) |
| TS-1088R-02026 reset switch | 1 | crkbd | [F171](EXACT-FOOTPRINTS.md#f171) |
| Teensy 2.0 module with reset | 1 | ErgoDox | [F038](EXACT-FOOTPRINTS.md#f038) |
| Tenting puck mounting pattern | 7 | Dilemma, KLOR, SofleKeyboard, Sweep, cantor, ferris | [F001](EXACT-FOOTPRINTS.md#f001) |
| Testpoints / single connection pads | 7 | Dilemma, Lily58, SofleKeyboard, Sweep, helix, keyball | [F068](EXACT-FOOTPRINTS.md#f068) |
| USB-C receptacles | 6 | Dilemma, Lily58, crkbd, discipline, ferris, lumberjack-keyboard, mysterium, splinktegrated | [F004](EXACT-FOOTPRINTS.md#f004) |
| WS2812B 5050 RGB LED | 2 | reviung | [F135](EXACT-FOOTPRINTS.md#f135) |
| Waveshare RP2040-Zero module | 2 | cheapino, silakka54 | [F110](EXACT-FOOTPRINTS.md#f110) |
| WeAct STM32 Black Pill module | 2 | cantor | [F014](EXACT-FOOTPRINTS.md#f014) |
| Wuerth 434133025816 reset switch | 1 | Lily58 | [F007](EXACT-FOOTPRINTS.md#f007) |

## Mitosis: additional Altium source

Mitosis publishes native Altium source under GPL-3.0. I inspected `Components6/Data` in both board files to confirm used pattern names and checked them against the `.PcbLib` streams. The native library, original boards and BOM were downloaded locally; Altium files and the mixed source archive are excluded from this branch at the user’s request. No KiCad conversion is claimed.

| Missing pattern | Component / package | Used in | Source form |
| --- | --- | --- | --- |
| `1206 quad res` | 1206 four-resistor array | receiver.PcbDoc | `.PcbLib` and board |
| `Core51822 (B)` | Waveshare Core51822 (B) radio module | mitosis.PcbDoc, receiver.PcbDoc | `.PcbLib` and board |
| `HDR1X4` | 1x4 pin header | receiver.PcbDoc | Board-embedded only |
| `HDR1X6` | 1x6 pin header | receiver.PcbDoc | Board-embedded only |
| `PLCC4-RGBLED` | Cree CLVBA-FKA PLCC-4 RGB LED | receiver.PcbDoc | `.PcbLib` and board |
| `RESC2012X06N` | 0805 resistor / diode pads | mitosis.PcbDoc | `.PcbLib` and board |
| `SOT-23` | SOT-23 MOSFET | mitosis.PcbDoc | `.PcbLib` and board |
| `SOT230P700X180-4N` | 1117 regulator SOT-223 land pattern | receiver.PcbDoc | `.PcbLib` and board |
| `TACTILE BUTTON` | PTS525-compatible SMD tactile button | receiver.PcbDoc | `.PcbLib` and board |

`BU2032SM`, `MINI HDMI` and `MINI B USB3.0` exist in the Altium library but are **not placed in the two inspected boards**, so they are not counted as used missing footprints. The cherry pattern is already represented by `switch_mx.js`. See [altium-inventory.json](altium-inventory.json).

## Existing coverage and interpretation

Comparison is by supported component/package family, not literal filename equality. Existing MX/Choc/Gateron switch support, SOD-123 and 7.62mm THT diodes, EC11/EC12 encoders, SSD1306 and nice!view displays, PJ320A jacks, JST PH batteries, two-pin Pico EZmate batteries, and ordinary mounting holes are treated as covered. Pro Micro header-pattern footprints are treated as mechanically covered by the existing nice!nano/SuperMini generators, **not as proof of identical MCU pin names, electrical behavior, body clearance or extra-pin support**.

Existing support similarly does not assert that every source variant has identical pad/drill dimensions. For example, the two-pin 6.5mm reset pattern is present, but the four-pin 6x6mm pushbutton is missing. MJ-4PP-9 and PJ320D/E are not assumed compatible with PJ320A. Generic four-pin debug headers are listed separately from the existing OLED generator.

Combined switch footprints (mixed MX/Choc/Alps or switch-plus-LED/encoder/diode arrangements) were excluded as requested. Their parent PCB source may still contain them because the original boards are archived intact. Artwork/logos and board-specific decorative/mechanical helpers were also omitted from the component backlog. All dispositions are in [COVERAGE.md](COVERAGE.md).

**One unresolved candidate:** `Sofle_Pico:SK6803_MINIE_v3.5.4` is preserved under review, rather than called a new component or silently equated with SK6812 MINI-E. Verify the part label, pad geometry and pinout before conversion.

## Source files and license handling

- **156 standalone `.kicad_mod` files** were downloaded from project libraries or the official KiCad GitHub mirror. These files are unmodified. A matching filename is a reference, not proof it matches every placed instance. The KiCad mirror is pinned at `7ebfa6b23cc292a56f751b7b5f4a0e12eeef69dd`; it is not claimed to be the newest KiCad library.
- **210 `.footprint.sexp` excerpts** preserve one exact placed footprint per missing/review identifier. These retain placement, board net IDs and original syntax; they are evidence/source material, **not normalized drop-in library footprints**. Full original boards are also archived for context. Use the original `.kicad_mod` where available, comparing it against the placed instance.
- Every candidate records upstream commit, path, source URL, observed board instances, license label, and SHA-256 hashes in [manifest.json](manifest.json). Original notices and available nested-library licenses are under `licenses/`; the source archive includes them as well.
- Download eligibility here means an explicit project/library license or an official hardware-license declaration was found. A repository being public was not sufficient. Upstream attribution and license differences are retained; the collection is not relicensed as MIT.
- Some sources have noncommercial terms (notably Discipline and the Charybdis sensor PCB); others use GPL, CERN-OHL or Solderpad. This is a source collection, not an assertion that every source can be merged into the existing library under one common license. The closest source notice takes precedence over a repository-summary label.
- GH60 was screened but its source was not downloaded: no explicit license was established in the inspected root/tree/README. Do not substitute a firmware license for PCB-source permission.

## Projects inspected

GitHub stars below are the research snapshot, not live counters. Charybdis dependencies are explicitly marked; their stars did not determine keyboard selection. Board paths and all commit hashes are in [repository-snapshot.json](repository-snapshot.json).

| Project | Stars | Inspected PCB / source selection | Declared license evidence |
| --- | ---: | --- | --- |
| [foostan/crkbd](<https://github.com/foostan/crkbd>) | 7,720 | pcbs/corne-cherry/hotswap/corne-cherry.kicad_pcb, pcbs/corne-chocolate/hotswap/corne-chocolate.kicad_pcb | [CC-BY-4.0 hardware; MIT bundled kbd library](<licenses/foostan__crkbd/>) |
| [josefadamcik/SofleKeyboard](<https://github.com/josefadamcik/SofleKeyboard>) | 2,555 | Sofle_v2/PCB/SofleKeyboard.kicad_pcb, Sofle_RGB/PCB/SofleKeyboard.kicad_pcb, Sofle_Pico/PCB/Sofle_Pico.kicad_pcb | [MIT](<licenses/josefadamcik__SofleKeyboard/>) |
| [kata0510/Lily58](<https://github.com/kata0510/Lily58>) | 2,309 | Pro/PCB/Lily58_Pro.kicad_pcb, Pro_V2/Pro_V2.kicad_pcb | [MIT](<licenses/kata0510__Lily58/>) |
| [davidphilipbarr/Sweep](<https://github.com/davidphilipbarr/Sweep>) | 2,123 | Sweep v2.2/sweepv2.kicad_pcb, Sweep Bling LP/pcb/sweepbling-lp__pcb.kicad_pcb | [Solderpad-2.1 hardware](<licenses/davidphilipbarr__Sweep/>) |
| [GEIGEIGEIST/TOTEM](<https://github.com/GEIGEIGEIST/TOTEM>) | 2,062 | PCB/totem_0-3/totem_0_3.kicad_pcb | [CERN-OHL-P-2.0](<licenses/GEIGEIGEIST__TOTEM/>) |
| [mattdibi/redox-keyboard](<https://github.com/mattdibi/redox-keyboard>) | 1,989 | redox/pcb/rev1.0/kicad_files/redox_rev1.kicad_pcb | [MIT](<licenses/mattdibi__redox-keyboard/>) |
| [Bastardkb/Charybdis](<https://github.com/Bastardkb/Charybdis>) | 1,869 | BOM links followed to sensor and Splinktegrated repositories | [CC-BY-NC-SA-4.0 (README declaration)](<licenses/Bastardkb__Charybdis/>) |
| [pierrechevalier83/ferris](<https://github.com/pierrechevalier83/ferris>) | 1,271 | 0.2/bling/ferris.kicad_pcb, 0.2/compact/ferris.kicad_pcb | [Solderpad-2.1 hardware](<licenses/pierrechevalier83__ferris/>) |
| [GEIGEIGEIST/KLOR](<https://github.com/GEIGEIGEIST/KLOR>) | 1,204 | PCB/klor1_3/klor1_3.kicad_pcb | [GPL-3.0](<licenses/GEIGEIGEIST__KLOR/>) |
| [tompi/cheapino](<https://github.com/tompi/cheapino>) | 1,189 | pcb/cheapino.kicad_pcb | [CC-BY-4.0](<licenses/tompi__cheapino/>) |
| [Yowkees/keyball](<https://github.com/Yowkees/keyball>) | 1,053 | Keyball39 right PCB, extracted from upstream KiCad ZIP | [GPL-3.0](<licenses/Yowkees__keyball/>) |
| [coseyfannitutti/discipline](<https://github.com/coseyfannitutti/discipline>) | 1,007 | discipline-pcb.kicad_pcb | [CC-BY-NC-4.0 + repository personal-use notice](<licenses/coseyfannitutti__discipline/>) |
| [MakotoKurauchi/helix](<https://github.com/MakotoKurauchi/helix>) | 1,006 | PCB/beta/helix.kicad_pcb | [MIT](<licenses/MakotoKurauchi__helix/>) |
| [komar007/gh60](<https://github.com/komar007/gh60>) | 873 | Tree/README only; license not established | [No explicit license established; source not downloaded](<licenses/komar007__gh60/>) |
| [beekeeb/piantor](<https://github.com/beekeeb/piantor>) | 867 | pcb/left/keyboard_pcb.kicad_pcb | [GPL-3.0](<licenses/beekeeb__piantor/>) |
| [pashutk/chocofi](<https://github.com/pashutk/chocofi>) | 784 | pcb/chocofi.kicad_pcb | [CERN-OHL-P-2.0; CC-BY-SA-4.0 keyswitch library](<licenses/pashutk__chocofi/>) |
| [diepala/cantor](<https://github.com/diepala/cantor>) | 756 | Cantor_Classic/keyboard_pcb.kicad_pcb, Cantor_MX/Cantor_MX.kicad_pcb | [GPL-3.0; MIT Keebio library; CC-BY-SA-4.0 keyswitch library](<licenses/diepala__cantor/>) |
| [Squalius-cephalus/silakka54](<https://github.com/Squalius-cephalus/silakka54>) | 630 | kicad/silakka54.kicad_pcb | [MIT](<licenses/Squalius-cephalus__silakka54/>) |
| [Bastardkb/Dilemma](<https://github.com/Bastardkb/Dilemma>) | 587 | 3x5_3/dilemma.kicad_pcb, 4x6_4/dilemma.kicad_pcb, 3x5_3_procyon/dilemma.kicad_pcb | [CERN-OHL-S-2.0](<licenses/Bastardkb__Dilemma/>) |
| [coseyfannitutti/mysterium](<https://github.com/coseyfannitutti/mysterium>) | 541 | mysterium-pcb.kicad_pcb | [GPL-3.0](<licenses/coseyfannitutti__mysterium/>) |
| [gtips/reviung](<https://github.com/gtips/reviung>) | 516 | reviung41/pcb/ver1.4/reviung41.kicad_pcb, reviung53/pcb/main-pcb/reviung53-ver1.0/reviung53.kicad_pcb | [MIT](<licenses/gtips__reviung/>) |
| [raeedcho/temper](<https://github.com/raeedcho/temper>) | 484 | pcb/temper.kicad_pcb | [CERN-OHL-P-2.0](<licenses/raeedcho__temper/>) |
| [peej/lumberjack-keyboard](<https://github.com/peej/lumberjack-keyboard>) | 403 | lumberjack.kicad_pcb | [MIT](<licenses/peej__lumberjack-keyboard/>) |
| [Ergodox-io/ErgoDox](<https://github.com/Ergodox-io/ErgoDox>) | 356 | ErgoDOX pcb/ErgoDOX.kicad_pcb | [GPL-3.0 (official ergodox.io declaration)](<licenses/Ergodox-io__ErgoDox/>) |
| [reversebias/mitosis-hardware](<https://github.com/reversebias/mitosis-hardware>) | 332 | mitosis.PcbDoc, receiver.PcbDoc, mitosis.PcbLib, BOM | [GPL-3.0](<licenses/reversebias__mitosis-hardware/>) |
| [Bastardkb/charybdis-pmw-sensor](<https://github.com/Bastardkb/charybdis-pmw-sensor>) | 187 | Charybdis dependency: sensor/sensor.kicad_pcb | [CC-BY-NC-SA-4.0 (README declaration)](<licenses/Bastardkb__charybdis-pmw-sensor/>) |
| [Bastardkb/splinktegrated](<https://github.com/Bastardkb/splinktegrated>) | 48 | Charybdis dependency: splinktegrated.kicad_pcb | [CERN-OHL-S-2.0 (README declaration)](<licenses/Bastardkb__splinktegrated/>) |

## Screened popular boards without an established downloadable PCB source in this pass

- [Kyria](https://github.com/splitkb/kyria): the official repository inspected describes case files. Its case license is not evidence for PCB footprints.
- [Iris](https://github.com/keebio): the repository search returned case projects, not a licensed Iris PCB source. No footprint attribution was inferred from photos or QMK definitions.
- Voyager, Moonlander and Glove80 recur in the linked Reddit recommendations, but no licensed PCB source was established for them in this pass. They are outside the extracted-footprint inventory.
- This survey emphasizes component-bearing PCB sources; handwired builds and case generators alone do not establish a KiCad footprint inventory.

## Validation and limits

Source snapshots are pinned. Downloaded standalone files and extracted blocks were checked for valid S-expression balance/root structure and hashes; extracted block counts were compared against the parser inventory. No generated Ergogen code, DRC, fabrication validation or electrical interchangeability testing was performed. Sources intentionally retain their original KiCad versions and any upstream errors. The library comparison and grouping were reviewed by component role, with unusual packages preserved rather than guessed away.
