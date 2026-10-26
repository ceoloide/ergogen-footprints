(footprint "local:C_0603_1608Metric"
		(layer "B.Cu")
		(uuid "192b48a7-6ac1-4dd6-9b70-2771d2417472")
		(at 73.3 103.5 90)
		(descr "Capacitor SMD 0603 (1608 Metric), square (rectangular) end terminal, IPC_7351 nominal, (Body size source: IPC-SM-782 page 76, https://www.pcb-3d.com/wordpress/wp-content/uploads/ipc-sm-782a_amendment_1_and_2.pdf), generated with kicad-footprint-generator")
		(tags "capacitor")
		(property "Reference" "C1001"
			(at 0 1.43 90)
			(layer "B.SilkS")
			(hide yes)
			(uuid "4277b169-e262-4fc1-9477-31418d1ee6b2")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
				(justify mirror)
			)
		)
		(property "Value" "4.7uF"
			(at 0 -1.43 90)
			(layer "B.Fab")
			(uuid "5d08aae1-7ca5-47e0-bc74-3b495c2a3ee4")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
				(justify mirror)
			)
		)
		(property "Footprint" "local:C_0603_1608Metric"
			(at 0 0 90)
			(layer "F.Fab")
			(hide yes)
			(uuid "a576141d-6879-4ded-9bb6-fcfe9b377eec")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property "Datasheet" ""
			(at 0 0 90)
			(layer "F.Fab")
			(hide yes)
			(uuid "9ce36464-eca1-4c7f-89f1-bb670ff3ea0b")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property "Description" ""
			(at 0 0 90)
			(layer "F.Fab")
			(hide yes)
			(uuid "49dcd1ba-7144-438a-9141-4911d5bf5788")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property "LCSC" "C19666"
			(at 176.8 30.2 0)
			(layer "B.Fab")
			(hide yes)
			(uuid "8b55e9fa-663b-470d-b84d-98253e010092")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
				(justify mirror)
			)
		)
		(property ki_fp_filters "C_*")
		(path "/00000000-0000-0000-0000-00005f6c443f")
		(sheetname "Root")
		(sheetfile "sensor.kicad_sch")
		(attr smd)
		(fp_line
			(start -0.14058 -0.51)
			(end 0.14058 -0.51)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "B.SilkS")
			(uuid "6fe35da2-4d2c-4c3a-bda5-ba35c0bf4030")
		)
		(fp_line
			(start -0.14058 0.51)
			(end 0.14058 0.51)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "B.SilkS")
			(uuid "2e3486e4-cfb4-479a-9964-c25cf13d2acd")
		)
		(fp_line
			(start 1.48 -0.73)
			(end -1.48 -0.73)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "B.CrtYd")
			(uuid "265e9fb2-c5f7-4003-9e31-48be4d5cc648")
		)
		(fp_line
			(start -1.48 -0.73)
			(end -1.48 0.73)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "B.CrtYd")
			(uuid "4555d662-ee96-4281-a237-3cb4a61339a3")
		)
		(fp_line
			(start 1.48 0.73)
			(end 1.48 -0.73)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "B.CrtYd")
			(uuid "2231b73c-9038-4607-91e0-5c56a052f840")
		)
		(fp_line
			(start -1.48 0.73)
			(end 1.48 0.73)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "B.CrtYd")
			(uuid "ff73c4bb-49d9-453b-89eb-c766353abb35")
		)
		(fp_line
			(start 0.8 -0.4)
			(end -0.8 -0.4)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "B.Fab")
			(uuid "6b6b551a-bca9-4c1f-aedb-bb83de8ea23b")
		)
		(fp_line
			(start -0.8 -0.4)
			(end -0.8 0.4)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "B.Fab")
			(uuid "c994eb7a-1021-4362-b498-5f271234d0d7")
		)
		(fp_line
			(start 0.8 0.4)
			(end 0.8 -0.4)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "B.Fab")
			(uuid "05fe0a30-4995-45c0-aeb9-2cbd1195e249")
		)
		(fp_line
			(start -0.8 0.4)
			(end 0.8 0.4)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "B.Fab")
			(uuid "cce8f694-f3d7-4313-bc46-6440649982b6")
		)
		(fp_text user "${REFERENCE}"
			(at 0 0 90)
			(layer "B.Fab")
			(uuid "a9b6bef5-2d46-46a4-a6fb-71de71700f4f")
			(effects
				(font
					(size 0.4 0.4)
					(thickness 0.06)
				)
				(justify mirror)
			)
		)
		(pad "1" smd roundrect
			(at -0.775 0 90)
			(size 0.9 0.95)
			(layers "B.Cu" "B.Paste" "B.Mask")
			(roundrect_rratio 0.25)
			(net 3 "Net-(U1001-VDDPIX)")
			(pintype "passive")
			(uuid "6c2205a2-9ced-44d8-a55b-f92c3ade094c")
		)
		(pad "2" smd roundrect
			(at 0.775 0 90)
			(size 0.9 0.95)
			(layers "B.Cu" "B.Paste" "B.Mask")
			(roundrect_rratio 0.25)
			(net 1 "GND")
			(pintype "passive")
			(uuid "e976e337-ac4e-446d-9318-51a4c5bd4675")
		)
		(model "${KICAD6_3DMODEL_DIR}/Capacitor_SMD.3dshapes/C_0603_1608Metric.wrl"
			(offset
				(xyz 0 0 0)
			)
			(scale
				(xyz 1 1 1)
			)
			(rotate
				(xyz 0 0 0)
			)
		)
	)