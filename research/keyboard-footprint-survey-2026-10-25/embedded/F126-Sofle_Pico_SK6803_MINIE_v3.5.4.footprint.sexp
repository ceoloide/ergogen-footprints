(footprint "Sofle_Pico:SK6803_MINIE_v3.5.4" (layer "B.Cu")
    (tstamp 13f9dbb1-45fd-4b3d-b4b1-1f942ec4e4fe)
    (at 139.585006 42.63 180)
    (property "Sheetfile" "Sofle_Pico.kicad_sch")
    (property "Sheetname" "")
    (path "/a03149c3-5405-4098-b64a-0061a61abf03")
    (attr through_hole)
    (fp_text reference "LED11" (at 0 2.26) (layer "F.SilkS")
        (effects (font (size 1 1) (thickness 0.15)))
      (tstamp 7c5142fa-ee70-406f-be56-92133f73af88)
    )
    (fp_text value "SK6803 MINI-E" (at 0.01 3.85) (layer "B.Fab") hide
        (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
      (tstamp b3b69569-5684-40c0-abe2-c6567c10ce46)
    )
    (fp_text user "${REFERENCE}" (at 0 2.27) (layer "B.SilkS")
        (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
      (tstamp f54b6e33-0a3e-45b2-8d72-4681e229273b)
    )
    (fp_line (start -3.510006 -1.3) (end -3.510006 -0.2)
      (stroke (width 0.25) (type solid)) (layer "B.SilkS") (tstamp f6f53543-2c1e-4955-a66f-90ee554d41da))
    (fp_line (start -1.740006 -1.3) (end -3.510006 -1.3)
      (stroke (width 0.25) (type solid)) (layer "B.SilkS") (tstamp 6c136294-4d9b-4e68-ae6d-1eeb2a206e34))
    (fp_line (start -1.740006 -0.2) (end -3.510006 -0.2)
      (stroke (width 0.25) (type solid)) (layer "B.SilkS") (tstamp 4eb84557-1f97-47ba-9116-30274f44466d))
    (fp_circle (center -4.090006 -0.75) (end -4.340006 -0.75)
      (stroke (width 0.25) (type default)) (fill none) (layer "B.SilkS") (tstamp 81904974-a114-4041-a4e5-cef5951c6fd2))
    (fp_circle (center -3.260006 -1.072) (end -3.360006 -1.072)
      (stroke (width 0) (type solid)) (fill solid) (layer "B.SilkS") (tstamp 7856c91d-1e8b-40ba-8892-da37179ae107))
    (fp_line (start -3.510006 1.3) (end -3.510006 0.2)
      (stroke (width 0.25) (type solid)) (layer "F.SilkS") (tstamp 572c2825-d8a8-4a91-b405-26c932570f7c))
    (fp_line (start -1.740006 0.2) (end -3.510006 0.2)
      (stroke (width 0.25) (type solid)) (layer "F.SilkS") (tstamp d6a0e5ed-1095-42ce-a26c-3505eddfa766))
    (fp_line (start -1.740006 1.3) (end -3.510006 1.3)
      (stroke (width 0.25) (type solid)) (layer "F.SilkS") (tstamp 4425cb0e-e15b-466b-a89a-3bb8e6b1b30b))
    (fp_circle (center -4.090006 0.75) (end -4.340006 0.75)
      (stroke (width 0.25) (type default)) (fill none) (layer "F.SilkS") (tstamp 8e17280e-b4b6-41da-8ac9-9963e06fbce4))
    (fp_circle (center -3.260006 1.072) (end -3.360006 1.072)
      (stroke (width 0) (type solid)) (fill solid) (layer "F.SilkS") (tstamp bc7a3fb8-1e54-4c59-9da7-a0bd9561a2cd))
    (fp_line (start 0.029988 0.3) (end 0.029988 -0.3)
      (stroke (width 0.1) (type solid)) (layer "Dwgs.User") (tstamp 7fe3bfcf-e21c-42e6-ab96-2fb24e39bff3))
    (fp_line (start 0.329988 0) (end -0.270012 0)
      (stroke (width 0.1) (type solid)) (layer "Dwgs.User") (tstamp 52ac9641-cbc9-416c-b6d1-b88711c78d22))
    (fp_rect (start 1.729988 1.5) (end -1.670012 -1.5)
      (stroke (width 0.12) (type default)) (fill none) (layer "Edge.Cuts") (tstamp 55c87e00-1e80-49fb-9f68-735c8c77e750))
    (fp_circle (center 0.029988 0) (end 0.029988 -1.5)
      (stroke (width 0.1) (type solid)) (fill none) (layer "B.Fab") (tstamp 97646aa2-e8d3-41af-ba3c-12f31411bf97))
    (pad "1" smd custom (at 2.540006 -0.75 180) (size 0.82 0.82) (layers "F.Cu")
      (net 33 "VCC") (pinfunction "VDD") (pintype "power_in") (thermal_bridge_angle 45)
      (options (clearance outline) (anchor circle))
      (primitives
        (gr_poly
          (pts
            (xy 0.85 0.287)
            (xy 0.840637 0.33407)
            (xy 0.813974 0.373974)
            (xy 0.77407 0.400637)
            (xy 0.727 0.41)
            (xy -0.85 0.41)
            (xy -0.85 -0.41)
            (xy 0.727 -0.41)
            (xy 0.77407 -0.400637)
            (xy 0.813974 -0.373974)
            (xy 0.840637 -0.33407)
            (xy 0.85 -0.287)
          )
          (width 0) (fill yes))
        (gr_arc (start 0.64 -0.16) (mid 1.283467 0.106532) (end 1.55 0.749999) (width 0.5))
        (gr_arc (start 0.770001 0.294265) (mid 0.902748 0.140006) (end 1.101823 0.182277) (width 0.15))
      ) (tstamp 11e8d386-8ae5-48c7-9d74-e61d2a38d9a9))
    (pad "1" smd roundrect (at 2.540006 -0.75 180) (size 1.7 0.82) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.15)
      (chamfer_ratio 0) (chamfer top_left bottom_left)
      (net 33 "VCC") (pinfunction "VDD") (pintype "power_in") (thermal_bridge_angle 45) (tstamp 93d65aaa-1fdf-4da4-bb9d-5cd3c2298af8))
    (pad "1" smd custom (at 2.540006 0.75) (size 0.82 0.82) (layers "B.Cu")
      (net 33 "VCC") (pinfunction "VDD") (pintype "power_in") (thermal_bridge_angle 45)
      (options (clearance outline) (anchor circle))
      (primitives
        (gr_poly
          (pts
            (xy 0.85 0.41)
            (xy -0.727 0.41)
            (xy -0.77407 0.400637)
            (xy -0.813974 0.373974)
            (xy -0.840637 0.33407)
            (xy -0.85 0.287)
            (xy -0.85 -0.287)
            (xy -0.840637 -0.33407)
            (xy -0.813974 -0.373974)
            (xy -0.77407 -0.400637)
            (xy -0.727 -0.41)
            (xy 0.85 -0.41)
          )
          (width 0) (fill yes))
        (gr_arc (start -1.088917 0.176284) (mid -0.899992 0.139997) (end -0.778482 0.289144) (width 0.15))
        (gr_arc (start -1.55 0.750001) (mid -1.283467 0.106534) (end -0.64 -0.159999) (width 0.5))
      ) (tstamp bf281a55-c571-4065-bc61-97327a311cae))
    (pad "1" smd roundrect (at 2.540006 0.75) (size 1.7 0.82) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.15)
      (chamfer_ratio 0) (chamfer top_right bottom_right)
      (net 33 "VCC") (pinfunction "VDD") (pintype "power_in") (thermal_bridge_angle 45) (tstamp a6b7b664-9929-4a44-93b8-4de87848c2cd))
    (pad "1" thru_hole circle (at 4.090006 -0.000001 180) (size 0.6 0.6) (drill 0.3) (layers "*.Cu")
      (net 33 "VCC") (pinfunction "VDD") (pintype "power_in") (tstamp 3b730c67-5218-4665-94ed-7985cce11b1c))
    (pad "2" thru_hole circle (at 2.540006 -1.75 180) (size 0.6 0.6) (drill 0.3) (layers "*.Cu")
      (net 72 "Net-(LED11-DOUT)") (pinfunction "DOUT") (pintype "output") (tstamp d6801709-2299-4974-9e1c-99e8ea06b90d))
    (pad "2" smd custom (at 2.540006 -0.75) (size 0.82 0.82) (layers "B.Cu")
      (net 72 "Net-(LED11-DOUT)") (pinfunction "DOUT") (pintype "output") (thermal_bridge_angle 45)
      (options (clearance outline) (anchor circle))
      (primitives
        (gr_poly
          (pts
            (xy 0.85 0.41)
            (xy -0.727 0.41)
            (xy -0.77407 0.400637)
            (xy -0.813974 0.373974)
            (xy -0.840637 0.33407)
            (xy -0.85 0.287)
            (xy -0.85 -0.287)
            (xy -0.840637 -0.33407)
            (xy -0.813974 -0.373974)
            (xy -0.77407 -0.400637)
            (xy -0.727 -0.41)
            (xy 0.85 -0.41)
          )
          (width 0) (fill yes))
        (gr_line (start -1.639999 0.160001) (end 0.140006 0.160001) (width 0.5))
        (gr_arc (start -1.639999 0.160001) (mid -2.283467 -0.106531) (end -2.550001 -0.749999) (width 0.5))
        (gr_arc (start -0.775 -0.285915) (mid -0.854078 -0.094999) (end -1.044994 -0.01592) (width 0.15))
        (gr_line (start 0 1) (end 0 -0.01) (width 0.6))
        (gr_arc (start -0.755097 0.122208) (mid -0.216563 0.42195) (end -0.002735 1) (width 0.6))
        (gr_arc (start -0.002734 0.999999) (mid 0.175235 0.544467) (end 0.529437 0.207237) (width 0.6))
      ) (tstamp 2ee3d004-c0e1-4f31-8f2f-dcdd3d2e9bf7))
    (pad "2" smd roundrect (at 2.540006 -0.75) (size 1.7 0.82) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.15)
      (chamfer_ratio 0) (chamfer top_right bottom_right)
      (net 72 "Net-(LED11-DOUT)") (pinfunction "DOUT") (pintype "output") (thermal_bridge_angle 45) (tstamp 1a18e369-fbaf-4137-8fe2-a6bf3cba4669))
    (pad "2" smd custom (at 2.540006 0.75 180) (size 0.82 0.82) (layers "F.Cu")
      (net 72 "Net-(LED11-DOUT)") (pinfunction "DOUT") (pintype "output") (thermal_bridge_angle 45)
      (options (clearance outline) (anchor circle))
      (primitives
        (gr_poly
          (pts
            (xy 0.85 0.287)
            (xy 0.840637 0.33407)
            (xy 0.813974 0.373974)
            (xy 0.77407 0.400637)
            (xy 0.727 0.41)
            (xy -0.85 0.41)
            (xy -0.85 -0.41)
            (xy 0.727 -0.41)
            (xy 0.77407 -0.400637)
            (xy 0.813974 -0.373974)
            (xy 0.840637 -0.33407)
            (xy 0.85 -0.287)
          )
          (width 0) (fill yes))
        (gr_arc (start -0.535033 0.208807) (mid -0.178867 0.544455) (end -0.000001 1) (width 0.6))
        (gr_arc (start 0.000003 1) (mid 0.205229 0.42079) (end 0.729342 0.1) (width 0.6))
        (gr_arc (start 1.045909 -0.015915) (mid 0.85499 -0.094994) (end 0.775915 -0.285915) (width 0.15))
        (gr_line (start 0 1) (end 0 -0.01) (width 0.6))
        (gr_line (start 1.642733 0.159999) (end 0.352733 0.159999) (width 0.5))
        (gr_arc (start 2.552729 -0.750001) (mid 2.286198 -0.106535) (end 1.642733 0.159999) (width 0.5))
      ) (tstamp bea2859d-185a-40c0-80b6-7291c586f69a))
    (pad "2" smd roundrect (at 2.540006 0.75 180) (size 1.7 0.82) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.15)
      (chamfer_ratio 0) (chamfer top_left bottom_left)
      (net 72 "Net-(LED11-DOUT)") (pinfunction "DOUT") (pintype "output") (thermal_bridge_angle 45) (tstamp 44723416-51bc-44ca-adbc-49a65d2b5d1f))
    (pad "2" thru_hole circle (at 2.540006 1.75 180) (size 0.6 0.6) (drill 0.3) (layers "*.Cu")
      (net 72 "Net-(LED11-DOUT)") (pinfunction "DOUT") (pintype "output") (tstamp a3fbe60f-1182-4a70-9d49-359785dafa9f))
    (pad "2" thru_hole circle (at 5.090006 -0.000001 180) (size 0.6 0.6) (drill 0.3) (layers "*.Cu")
      (net 72 "Net-(LED11-DOUT)") (pinfunction "DOUT") (pintype "output") (tstamp a06198b9-2886-4541-97fc-279a85231abe))
    (pad "3" thru_hole circle (at -4.119994 0 180) (size 0.6 0.6) (drill 0.3) (layers "*.Cu")
      (net 34 "GND") (pinfunction "GND") (pintype "power_in") (tstamp 683fbe9f-f452-4c49-82f5-b32df16dbaad))
    (pad "3" smd custom (at -2.559994 -0.75) (size 0.82 0.82) (layers "B.Cu")
      (net 34 "GND") (pinfunction "GND") (pintype "power_in") (thermal_bridge_angle 45)
      (options (clearance outline) (anchor circle))
      (primitives
        (gr_rect (start -0.85 -0.41) (end 0 0.41) (width 0) (fill yes))
        (gr_line (start 0.65 0.16) (end 0.120006 0.16) (width 0.5))
        (gr_arc (start 1.56 -0.75) (mid 1.293466 -0.106534) (end 0.65 0.16) (width 0.5))
        (gr_arc (start 1.121785 -0.183385) (mid 0.909926 -0.133187) (end 0.770007 -0.3) (width 0.15))
      ) (tstamp e1d5ea30-293a-4062-8ccf-ff5c93f286cb))
    (pad "3" smd roundrect (at -2.559994 -0.75) (size 1.7 0.82) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.15)
      (chamfer_ratio 0.5) (chamfer bottom_right)
      (net 34 "GND") (pinfunction "GND") (pintype "power_in") (thermal_bridge_angle 45) (tstamp 38614203-f472-4b93-a2b5-af62c508ab8a))
    (pad "3" smd custom (at -2.559994 0.75 180) (size 0.82 0.82) (layers "F.Cu")
      (net 34 "GND") (pinfunction "GND") (pintype "power_in") (thermal_bridge_angle 45)
      (options (clearance outline) (anchor circle))
      (primitives
        (gr_rect (start 0 -0.41) (end 0.85 0.41) (width 0) (fill yes))
        (gr_line (start -0.65 0.16) (end -0.15 0.16) (width 0.5))
        (gr_arc (start -0.65 0.16) (mid -1.29347 -0.10653) (end -1.56 -0.75) (width 0.5))
        (gr_arc (start -0.770007 -0.310654) (mid -0.893184 -0.135381) (end -1.105632 -0.162936) (width 0.15))
      ) (tstamp f314b36c-1e09-470a-a759-3ef4c27eba37))
    (pad "3" smd roundrect (at -2.559994 0.75 180) (size 1.7 0.82) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.15)
      (chamfer_ratio 0.5) (chamfer bottom_left)
      (net 34 "GND") (pinfunction "GND") (pintype "power_in") (thermal_bridge_angle 45) (tstamp 506b70af-7604-41d5-891b-efcee3776c84))
    (pad "4" thru_hole circle (at -5.119994 0 180) (size 0.6 0.6) (drill 0.3) (layers "*.Cu")
      (net 71 "Net-(LED10-DOUT)") (pinfunction "DIN") (pintype "input") (tstamp 286bf183-fbe4-47e3-8988-bde9db411330))
    (pad "4" thru_hole circle (at -2.559994 -1.75 180) (size 0.6 0.6) (drill 0.3) (layers "*.Cu")
      (net 71 "Net-(LED10-DOUT)") (pinfunction "DIN") (pintype "input") (tstamp b5cd0b38-f6df-41e0-ad01-2838bb155da1))
    (pad "4" smd custom (at -2.559994 -0.75 180) (size 0.82 0.82) (layers "F.Cu")
      (net 71 "Net-(LED10-DOUT)") (pinfunction "DIN") (pintype "input") (thermal_bridge_angle 45)
      (options (clearance outline) (anchor circle))
      (primitives
        (gr_arc (start 0.535034 -0.208808) (mid 0.178866 -0.544455) (end -0.000005 -0.999999) (width 0.6))
        (gr_arc (start 0 -1) (mid -0.205227 -0.42079) (end -0.729342 -0.1) (width 0.6))
        (gr_poly
          (pts
            (xy 0.85 0.41)
            (xy -0.727 0.41)
            (xy -0.77407 0.400637)
            (xy -0.813974 0.373974)
            (xy -0.840637 0.33407)
            (xy -0.85 0.287)
            (xy -0.85 -0.287)
            (xy -0.840637 -0.33407)
            (xy -0.813974 -0.373974)
            (xy -0.77407 -0.400637)
            (xy -0.727 -0.41)
            (xy 0.85 -0.41)
          )
          (width 0) (fill yes))
        (gr_arc (start -1.045921 0.015921) (mid -0.854998 0.094994) (end -0.775921 0.285915) (width 0.15))
        (gr_line (start -1.65 -0.16) (end -0.36 -0.16) (width 0.5))
        (gr_arc (start -2.56 0.75) (mid -2.293466 0.106534) (end -1.65 -0.16) (width 0.5))
        (gr_line (start 0 0) (end 0 -1) (width 0.6))
      ) (tstamp 4be78302-4d4b-4d36-837a-1ad4b9166882))
    (pad "4" smd roundrect (at -2.559994 -0.75) (size 1.7 0.82) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.15)
      (chamfer_ratio 0) (chamfer top_left bottom_left)
      (net 71 "Net-(LED10-DOUT)") (pinfunction "DIN") (pintype "input") (thermal_bridge_angle 45) (tstamp c5ea6de4-0914-424b-bca0-16bc032d7be2))
    (pad "4" smd custom (at -2.559994 0.75) (size 0.82 0.82) (layers "B.Cu")
      (net 71 "Net-(LED10-DOUT)") (pinfunction "DIN") (pintype "input") (thermal_bridge_angle 45)
      (options (clearance outline) (anchor circle))
      (primitives
        (gr_poly
          (pts
            (xy 0.85 0.287)
            (xy 0.840637 0.33407)
            (xy 0.813974 0.373974)
            (xy 0.77407 0.400637)
            (xy 0.727 0.41)
            (xy -0.85 0.41)
            (xy -0.85 -0.41)
            (xy 0.727 -0.41)
            (xy 0.77407 -0.400637)
            (xy 0.813974 -0.373974)
            (xy 0.840637 -0.33407)
            (xy 0.85 -0.287)
          )
          (width 0) (fill yes))
        (gr_arc (start 0.775921 0.285915) (mid 0.854998 0.094994) (end 1.045921 0.015921) (width 0.15))
        (gr_line (start 1.65 -0.16) (end 0.36 -0.16) (width 0.5))
        (gr_arc (start 1.65 -0.16) (mid 2.29347 0.10653) (end 2.56 0.75) (width 0.5))
        (gr_line (start 0 -1) (end 0 0.01) (width 0.6))
        (gr_arc (start 0 -1) (mid -0.187314 -0.527589) (end -0.560627 -0.182775) (width 0.6))
        (gr_arc (start 0.70603 -0.100001) (mid 0.197569 -0.428057) (end -0.000001 -1) (width 0.6))
      ) (tstamp 86030f5d-d814-4377-b07e-17dd78a514dd))
    (pad "4" smd roundrect (at -2.559994 0.75 180) (size 1.7 0.82) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.15)
      (chamfer_ratio 0) (chamfer top_right bottom_right)
      (net 71 "Net-(LED10-DOUT)") (pinfunction "DIN") (pintype "input") (thermal_bridge_angle 45) (tstamp 9246726c-0ddc-4069-af23-a37c51906d08))
    (pad "4" thru_hole circle (at -2.559994 1.75 180) (size 0.6 0.6) (drill 0.3) (layers "*.Cu")
      (net 71 "Net-(LED10-DOUT)") (pinfunction "DIN") (pintype "input") (tstamp 15737c7d-6279-45d1-9642-e73c6c77f943))
    (group "" (id e2d34c46-93d0-4128-a17a-202a7ace95b5)
      (members
        11e8d386-8ae5-48c7-9d74-e61d2a38d9a9
        15737c7d-6279-45d1-9642-e73c6c77f943
        1a18e369-fbaf-4137-8fe2-a6bf3cba4669
        286bf183-fbe4-47e3-8988-bde9db411330
        2ee3d004-c0e1-4f31-8f2f-dcdd3d2e9bf7
        38614203-f472-4b93-a2b5-af62c508ab8a
        3b730c67-5218-4665-94ed-7985cce11b1c
        4425cb0e-e15b-466b-a89a-3bb8e6b1b30b
        44723416-51bc-44ca-adbc-49a65d2b5d1f
        4be78302-4d4b-4d36-837a-1ad4b9166882
        4eb84557-1f97-47ba-9116-30274f44466d
        506b70af-7604-41d5-891b-efcee3776c84
        52ac9641-cbc9-416c-b6d1-b88711c78d22
        55c87e00-1e80-49fb-9f68-735c8c77e750
        572c2825-d8a8-4a91-b405-26c932570f7c
        683fbe9f-f452-4c49-82f5-b32df16dbaad
        6c136294-4d9b-4e68-ae6d-1eeb2a206e34
        7856c91d-1e8b-40ba-8892-da37179ae107
        7fe3bfcf-e21c-42e6-ab96-2fb24e39bff3
        81904974-a114-4041-a4e5-cef5951c6fd2
        86030f5d-d814-4377-b07e-17dd78a514dd
        8e17280e-b4b6-41da-8ac9-9963e06fbce4
        9246726c-0ddc-4069-af23-a37c51906d08
        93d65aaa-1fdf-4da4-bb9d-5cd3c2298af8
        97646aa2-e8d3-41af-ba3c-12f31411bf97
        a06198b9-2886-4541-97fc-279a85231abe
        a3fbe60f-1182-4a70-9d49-359785dafa9f
        a6b7b664-9929-4a44-93b8-4de87848c2cd
        b5cd0b38-f6df-41e0-ad01-2838bb155da1
        bc7a3fb8-1e54-4c59-9da7-a0bd9561a2cd
        bea2859d-185a-40c0-80b6-7291c586f69a
        bf281a55-c571-4065-bc61-97327a311cae
        c5ea6de4-0914-424b-bca0-16bc032d7be2
        d6801709-2299-4974-9e1c-99e8ea06b90d
        d6a0e5ed-1095-42ce-a26c-3505eddfa766
        e1d5ea30-293a-4062-8ccf-ff5c93f286cb
        f314b36c-1e09-470a-a759-3ef4c27eba37
        f6f53543-2c1e-4955-a66f-90ee554d41da
      )
    )
    (model "${KIPRJMOD}/Sofle_Pico.3dshapes/YS-SK6812MINI-E.step"
      (offset (xyz 0 0 0.1))
      (scale (xyz 1 1 1))
      (rotate (xyz 180 0 180))
    )
  )