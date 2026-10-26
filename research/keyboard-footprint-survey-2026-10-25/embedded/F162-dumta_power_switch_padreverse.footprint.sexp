(footprint "dumta:power_switch_padreverse" (layer "F.Cu")
    (tstamp 2aa90569-98c1-4b8d-8f18-4ed24304d1c6)
    (at 186.352 99.154 90)
    (property "Sheetfile" "dumta.kicad_sch")
    (property "Sheetname" "")
    (property "ki_description" "Switch, single pole double throw")
    (property "ki_keywords" "switch single-pole double-throw spdt ON-ON")
    (path "/cb989044-3a1e-4993-ba2a-b11c7cd790d2")
    (fp_text reference "PWR_SW1" (at 0 0.5 90) (layer "F.SilkS") hide
        (effects (font (size 1 1) (thickness 0.15)))
      (tstamp 45ea3dac-de04-4ec9-a94d-56194f6d1ba3)
    )
    (fp_text value "SW_SPDT" (at -0.191 -0.5 90) (layer "F.Fab")
        (effects (font (size 1 1) (thickness 0.15)))
      (tstamp 8d675880-ceb9-4c2a-9b6a-2a930ee06d00)
    )
    (fp_text user "SW01" (at 0 0.5 90) (layer "B.SilkS") hide
        (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
      (tstamp dd294a15-d7f7-4760-8955-805431cf7bd1)
    )
    (fp_text user "SW_SPDT" (at 0 -0.5 90) (layer "B.Fab")
        (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
      (tstamp 35169a78-23e2-4f67-8f7b-3f94bfa52080)
    )
    (fp_poly
      (pts
        (xy -3.2 -0.75)
        (xy -3.2 -1.45)
        (xy -4.1 -1.45)
        (xy -4.1 -0.75)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "B.Mask") (tstamp 26f5d1f0-8e99-4937-a245-e8ff09e08d1f))
    (fp_poly
      (pts
        (xy -3.2 1.45)
        (xy -3.2 0.75)
        (xy -4.1 0.75)
        (xy -4.1 1.45)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "B.Mask") (tstamp 3a72015c-8e42-4a27-8048-bef9d5baf026))
    (fp_poly
      (pts
        (xy -1.95 -1.05)
        (xy -1.95 -2.45)
        (xy -2.55 -2.45)
        (xy -2.55 -1.05)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "B.Mask") (tstamp d3bc2100-7760-4c48-be9b-abfaaf363441))
    (fp_poly
      (pts
        (xy -0.45 -1.05)
        (xy -0.45 -2.45)
        (xy -1.05 -2.45)
        (xy -1.05 -1.05)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "B.Mask") (tstamp d35b32b7-8548-447d-9d84-f61de719bcb9))
    (fp_poly
      (pts
        (xy 2.55 -1.05)
        (xy 2.55 -2.45)
        (xy 1.95 -2.45)
        (xy 1.95 -1.05)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "B.Mask") (tstamp 2c9a85f1-aef9-49d1-8a12-eb3373c67c89))
    (fp_poly
      (pts
        (xy 4.1 -0.75)
        (xy 4.1 -1.45)
        (xy 3.2 -1.45)
        (xy 3.2 -0.75)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "B.Mask") (tstamp 2cc36e22-6288-47f0-bed2-e274b3354a9c))
    (fp_poly
      (pts
        (xy 4.1 1.45)
        (xy 4.1 0.75)
        (xy 3.2 0.75)
        (xy 3.2 1.45)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "B.Mask") (tstamp 85bb7c9f-5d63-4de1-b8f4-453e8572d7b8))
    (fp_poly
      (pts
        (xy -4.1 -0.75)
        (xy -4.1 -1.45)
        (xy -3.2 -1.45)
        (xy -3.2 -0.75)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "F.Mask") (tstamp 69119f2c-1346-43e5-b248-7c7eae5914f2))
    (fp_poly
      (pts
        (xy -4.1 1.45)
        (xy -4.1 0.75)
        (xy -3.2 0.75)
        (xy -3.2 1.45)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "F.Mask") (tstamp 3e953798-1c6f-4fda-91ea-074204ece199))
    (fp_poly
      (pts
        (xy -2.55 -1.05)
        (xy -2.55 -2.45)
        (xy -1.95 -2.45)
        (xy -1.95 -1.05)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "F.Mask") (tstamp a7740acd-e98c-44ee-83c9-31c5c24d5bfe))
    (fp_poly
      (pts
        (xy 0.45 -1.05)
        (xy 0.45 -2.45)
        (xy 1.05 -2.45)
        (xy 1.05 -1.05)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "F.Mask") (tstamp 8f4531c2-01aa-42eb-b612-1ea8e907fd05))
    (fp_poly
      (pts
        (xy 1.95 -1.05)
        (xy 1.95 -2.45)
        (xy 2.55 -2.45)
        (xy 2.55 -1.05)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "F.Mask") (tstamp 02e75697-164d-4065-8096-edf66e05a626))
    (fp_poly
      (pts
        (xy 3.2 -0.75)
        (xy 3.2 -1.45)
        (xy 4.1 -1.45)
        (xy 4.1 -0.75)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "F.Mask") (tstamp 0949f4ab-d65a-4080-ba1d-d21df7c6b5e7))
    (fp_poly
      (pts
        (xy 3.2 1.45)
        (xy 3.2 0.75)
        (xy 4.1 0.75)
        (xy 4.1 1.45)
      )

      (stroke (width 0.1) (type solid)) (fill solid) (layer "F.Mask") (tstamp 2c8ada02-4b1d-4c8a-8ea7-59c3f2bea767))
    (fp_line (start -1.5 1.5) (end 1.5 1.5)
      (stroke (width 0.12) (type solid)) (layer "B.Fab") (tstamp b19ed7bc-e3c1-468a-878c-131eae38fb84))
    (fp_line (start -1.5 3) (end -1.5 1.5)
      (stroke (width 0.12) (type solid)) (layer "B.Fab") (tstamp dc465560-fc24-4126-8e91-c15894522ddf))
    (fp_line (start 1.5 1.5) (end 1.5 3)
      (stroke (width 0.12) (type solid)) (layer "B.Fab") (tstamp ce4c4256-7fe6-4659-a1ae-e5a4290660e4))
    (fp_line (start 1.5 3) (end -1.5 3)
      (stroke (width 0.12) (type solid)) (layer "B.Fab") (tstamp 796c646b-4e98-44e7-bdca-6b967b1e72ea))
    (fp_line (start -1.5 1.5) (end -1.5 3)
      (stroke (width 0.12) (type solid)) (layer "F.Fab") (tstamp 73b0ae35-29cc-47fe-8385-6c8424164249))
    (fp_line (start -1.5 3) (end 1.5 3)
      (stroke (width 0.12) (type solid)) (layer "F.Fab") (tstamp 182dd901-2d9d-4106-b4f4-6680ee59d249))
    (fp_line (start 1.5 1.5) (end -1.5 1.5)
      (stroke (width 0.12) (type solid)) (layer "F.Fab") (tstamp b1a08d76-4498-418f-a770-13d0bb86dda7))
    (fp_line (start 1.5 3) (end 1.5 1.5)
      (stroke (width 0.12) (type solid)) (layer "F.Fab") (tstamp a0fddda4-2266-4e3d-8206-0dd0641dfa21))
    (pad "" smd rect (at -3.65 -1.1 90) (size 1 0.8) (layers "F.Cu") (tstamp 7b842a38-535b-4dec-bd61-3a159f1438d4))
    (pad "" smd rect (at -3.65 -1.1 270) (size 1 0.8) (layers "B.Cu") (tstamp 666f923f-b000-4f5a-b0b2-264db257b65c))
    (pad "" smd rect (at -3.65 1.1 90) (size 1 0.8) (layers "F.Cu") (tstamp 6333f5d0-779f-467a-871c-12cf8a2a2344))
    (pad "" smd rect (at -3.65 1.1 270) (size 1 0.8) (layers "B.Cu") (tstamp 1cf0cf68-bf95-4418-9ff7-df2be50557b5))
    (pad "" np_thru_hole circle (at -1.5 0 270) (size 0.9 0.9) (drill 0.9) (layers "*.Cu" "*.Mask") (tstamp 44e1d0c1-19fe-4c6f-a030-f799671287ab))
    (pad "" np_thru_hole circle (at 1.5 0 270) (size 0.9 0.9) (drill 0.9) (layers "*.Cu" "*.Mask") (tstamp a6c4dd03-d25d-4538-bce0-58f3121e90fd))
    (pad "" smd rect (at 3.65 -1.1 90) (size 1 0.8) (layers "F.Cu") (tstamp bc7edfd8-2f2c-4e4c-a65d-432453e535db))
    (pad "" smd rect (at 3.65 -1.1 270) (size 1 0.8) (layers "B.Cu") (tstamp 888c01b1-bdf8-4566-b070-e955e86d33e2))
    (pad "" smd rect (at 3.65 1.1 90) (size 1 0.8) (layers "F.Cu") (tstamp 073e2438-860f-459e-b37a-4e598fca565c))
    (pad "" smd rect (at 3.65 1.1 270) (size 1 0.8) (layers "B.Cu") (tstamp 837da8b6-bffb-4605-b430-54b79bc566c7))
    (pad "1" smd rect (at -2.25 -1.75 90) (size 0.7 1.5) (layers "F.Cu")
      (net 34 "unconnected-(PWR_SW1-A-Pad1)") (pinfunction "A") (pintype "passive") (tstamp 4e503dd8-9762-4a08-bb8c-06d2d3e65c38))
    (pad "1" smd rect (at -2.25 -1.75 270) (size 0.7 1.5) (layers "B.Cu")
      (net 34 "unconnected-(PWR_SW1-A-Pad1)") (pinfunction "A") (pintype "passive") (tstamp 626ad844-2806-4f57-9f20-e53f543873dd))
    (pad "2" smd rect (at -0.75 -1.75 270) (size 0.7 1.5) (layers "B.Cu")
      (net 12 "Net-(BT1-+)") (pinfunction "B") (pintype "passive") (tstamp fb65dfdf-29ec-4ac1-be30-e8ed1a9dfa3c))
    (pad "2" smd rect (at 0.75 -1.75 90) (size 0.7 1.5) (layers "F.Cu")
      (net 12 "Net-(BT1-+)") (pinfunction "B") (pintype "passive") (tstamp 7a3d7093-924d-455f-b127-ff55ca47d3a8))
    (pad "3" smd rect (at 2.25 -1.75 90) (size 0.7 1.5) (layers "F.Cu")
      (net 35 "vbat") (pinfunction "C") (pintype "passive") (tstamp a5b9ff17-0b71-41f2-8575-55794afd8b40))
    (pad "3" smd rect (at 2.25 -1.75 270) (size 0.7 1.5) (layers "B.Cu")
      (net 35 "vbat") (pinfunction "C") (pintype "passive") (tstamp 5ef5cef2-553d-403c-bbeb-c547d0914410))
    (model "/home/cyril/workshop/git_keyboards/3d_files/SSSS811101.STEP"
      (offset (xyz 0 0 0))
      (scale (xyz 1 1 1))
      (rotate (xyz -90 0 0))
    )
  )