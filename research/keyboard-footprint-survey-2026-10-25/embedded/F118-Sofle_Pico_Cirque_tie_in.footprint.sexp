(footprint "Sofle_Pico:Cirque tie in" (layer "F.Cu")
    (tstamp 1ec11524-a98b-47d8-8fa2-939b018bd9cb)
    (at 83.6 82.28 90)
    (property "Sheetfile" "Sofle_Pico.kicad_sch")
    (property "Sheetname" "")
    (property "ki_description" "Generic connector, single row, 01x04, script generated (kicad-library-utils/schlib/autogen/connector/)")
    (property "ki_keywords" "connector")
    (path "/6a4f492a-784f-4021-b04c-e06834d3b9fe")
    (attr through_hole)
    (fp_text reference "J7" (at -0.02 0.03 90 unlocked) (layer "F.SilkS") hide
        (effects (font (size 1 1) (thickness 0.15)))
      (tstamp ab2bac6a-a0c0-4895-925e-8bb20d908eb9)
    )
    (fp_text value "Conn_01x04" (at 0 -3.67 90 unlocked) (layer "F.Fab")
        (effects (font (size 1 1) (thickness 0.15)))
      (tstamp 871684a2-6763-4f54-bde5-3a490959968b)
    )
    (fp_text user "SCL" (at 2.672221 -0.99 90 unlocked) (layer "B.SilkS")
        (effects (font (size 0.7 0.7) (thickness 0.15) bold) (justify left bottom mirror))
      (tstamp 719ad7cb-e053-4393-b076-71f18d35acf1)
    )
    (fp_text user "VCC" (at 0.137777 -0.99 90 unlocked) (layer "B.SilkS")
        (effects (font (size 0.7 0.7) (thickness 0.15) bold) (justify left bottom mirror))
      (tstamp 8c486e47-bd6f-4544-9a4d-6fec0b1e72b6)
    )
    (fp_text user "GND" (at -2.53 -0.99 90 unlocked) (layer "B.SilkS")
        (effects (font (size 0.7 0.7) (thickness 0.15) bold) (justify left bottom mirror))
      (tstamp efd2ff3c-8b16-4d5b-bf49-1c287bf426fb)
    )
    (fp_text user "SDA" (at 5.14 -0.99 90 unlocked) (layer "B.SilkS")
        (effects (font (size 0.7 0.7) (thickness 0.15) bold) (justify left bottom mirror))
      (tstamp f0719a6a-b89f-4fd9-9340-68574c782897)
    )
    (fp_text user "GND" (at -4.802221 -0.99 90 unlocked) (layer "F.SilkS")
        (effects (font (size 0.7 0.7) (thickness 0.15) bold) (justify left bottom))
      (tstamp 4e9205dc-6fd0-48c6-b7c6-11478db521a5)
    )
    (fp_text user "SDA" (at 2.867779 -0.99 90 unlocked) (layer "F.SilkS")
        (effects (font (size 0.7 0.7) (thickness 0.15) bold) (justify left bottom))
      (tstamp 5b6facc1-de79-4046-8623-81d52dfac807)
    )
    (fp_text user "SCL" (at 0.4 -0.99 90 unlocked) (layer "F.SilkS")
        (effects (font (size 0.7 0.7) (thickness 0.15) bold) (justify left bottom))
      (tstamp d3c7c37e-cc4f-4594-96ce-1dacce2b7020)
    )
    (fp_text user "VCC" (at -2.134444 -0.99 90 unlocked) (layer "F.SilkS")
        (effects (font (size 0.7 0.7) (thickness 0.15) bold) (justify left bottom))
      (tstamp d3d7d411-488b-48d4-beb9-320346999ea5)
    )
    (fp_rect (start -5.08 1.27) (end 5.08 -1.27)
      (stroke (width 0.12) (type default)) (fill none) (layer "Dwgs.User") (tstamp f5ab41ae-e1d3-4a12-90ca-30f11dc17ac7))
    (pad "1" thru_hole circle (at 3.85 -0.03 90) (size 1.397 1.397) (drill 0.8128) (layers "*.Cu" "*.Mask")
      (net 40 "SDA") (pinfunction "Pin_1") (pintype "passive") (tstamp 4df8c60f-dd63-4857-a989-d2fb96b3dcec))
    (pad "2" thru_hole circle (at 1.31 -0.03 90) (size 1.397 1.397) (drill 0.8128) (layers "*.Cu" "*.Mask")
      (net 42 "SCL") (pinfunction "Pin_2") (pintype "passive") (tstamp 9ece1484-379f-476a-845a-976e9c7259bd))
    (pad "3" thru_hole circle (at -1.23 -0.03 90) (size 1.397 1.397) (drill 0.8128) (layers "*.Cu" "*.Mask")
      (net 33 "VCC") (pinfunction "Pin_3") (pintype "passive") (tstamp 385c28b8-8008-4d3a-9a72-e8a8fbd2db1d))
    (pad "4" thru_hole rect (at -3.77 -0.03 90) (size 1.397 1.397) (drill 0.8128) (layers "*.Cu" "*.Mask")
      (net 34 "GND") (pinfunction "Pin_4") (pintype "passive") (tstamp 1c5a65fd-d6c3-4251-b8b5-c15cc0ad5ef2))
    (group "" (id 545bca15-c9db-409f-ad98-d5578a20b55e)
      (members
        7bd2df98-9ab1-47b3-8fc7-38a1dec69349
        84bee3f4-c6d5-4e5d-8cf4-ac77a3518b44
      )
    )
    (group "" (id 7bd2df98-9ab1-47b3-8fc7-38a1dec69349)
      (members
        1c5a65fd-d6c3-4251-b8b5-c15cc0ad5ef2
        385c28b8-8008-4d3a-9a72-e8a8fbd2db1d
        4df8c60f-dd63-4857-a989-d2fb96b3dcec
        9ece1484-379f-476a-845a-976e9c7259bd
        f5ab41ae-e1d3-4a12-90ca-30f11dc17ac7
      )
    )
    (group "" (id 8d4917d0-c00f-4e93-b93f-c67f57c230b9)
      (members
        719ad7cb-e053-4393-b076-71f18d35acf1
        8c486e47-bd6f-4544-9a4d-6fec0b1e72b6
        efd2ff3c-8b16-4d5b-bf49-1c287bf426fb
        f0719a6a-b89f-4fd9-9340-68574c782897
      )
    )
    (group "" (id 84bee3f4-c6d5-4e5d-8cf4-ac77a3518b44)
      (members
        4e9205dc-6fd0-48c6-b7c6-11478db521a5
        5b6facc1-de79-4046-8623-81d52dfac807
        d3c7c37e-cc4f-4594-96ce-1dacce2b7020
        d3d7d411-488b-48d4-beb9-320346999ea5
      )
    )
  )