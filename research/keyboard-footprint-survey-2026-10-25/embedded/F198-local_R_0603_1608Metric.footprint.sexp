(footprint "local:R_0603_1608Metric"
		(layer "B.Cu")
		(uuid "004d31cb-c2c0-45e4-8788-88357f1060ae")
		(at 90.9 108.4 -90)
		(descr "Resistor SMD 0603 (1608 Metric), square (rectangular) end terminal, IPC_7351 nominal, (Body size source: IPC-SM-782 page 72, https://www.pcb-3d.com/wordpress/wp-content/uploads/ipc-sm-782a_amendment_1_and_2.pdf), generated with kicad-footprint-generator")
		(tags "resistor")
		(property "Reference" "R1001"
			(at 0 1.43 90)
			(layer "B.SilkS")
			(hide yes)
			(uuid "d76f60ee-b3b7-4c85-b463-02ac2bf3b088")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
				(justify mirror)
			)
		)
		(property "Value" "10k"
			(at 0 -1.43 90)
			(layer "B.Fab")
			(uuid "e835a132-496b-4ca4-b8fd-194275466f7b")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
				(justify mirror)
			)
		)
		(property "Footprint" "local:R_0603_1608Metric"
			(at 0 0 -90)
			(layer "F.Fab")
			(hide yes)
			(uuid "8a3f0708-8e13-455b-a394-cebcd9ea3416")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property "Datasheet" ""
			(at 0 0 -90)
			(layer "F.Fab")
			(hide yes)
			(uuid "2be8a4da-26c9-4c50-86f5-68037c54c324")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property "Description" ""
			(at 0 0 -90)
			(layer "F.Fab")
			(hide yes)
			(uuid "87341b96-8d10-4d4a-91cc-68e77a0f2fe5")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property "LCSC" "C25804"
			(at -17.5 199.3 0)
			(layer "B.Fab")
			(hide yes)
			(uuid "b639018e-f6b2-4193-b36e-c65b51711127")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
				(justify mirror)
			)
		)
		(property ki_fp_filters "R_*")
		(path "/f68aeb40-f110-443f-b132-14452b68234a")
		(sheetname "Root")
		(sheetfile "sensor.kicad_sch")
		(attr smd)
		(fp_line
			(start -0.237258 0.5225)
			(end 0.237258 0.5225)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "B.SilkS")
			(uuid "35e1ae3c-9271-4c74-8e9d-d493d91bb5c0")
		)
		(fp_line
			(start -0.237258 -0.5225)
			(end 0.237258 -0.5225)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "B.SilkS")
			(uuid "a8d13d18-d3c0-41dc-8e83-144a78063e9f")
		)
		(fp_line
			(start -1.48 0.73)
			(end 1.48 0.73)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "B.CrtYd")
			(uuid "bd1c45b3-2f32-42a1-a9e5-fa1c067fb319")
		)
		(fp_line
			(start 1.48 0.73)
			(end 1.48 -0.73)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "B.CrtYd")
			(uuid "5501e182-3bdd-4191-a4ee-f608a8cb3b53")
		)
		(fp_line
			(start -1.48 -0.73)
			(end -1.48 0.73)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "B.CrtYd")
			(uuid "ae566db9-5e07-43bc-9aa0-6c3a4ba48d91")
		)
		(fp_line
			(start 1.48 -0.73)
			(end -1.48 -0.73)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "B.CrtYd")
			(uuid "ccd74f9c-06ee-4363-8681-6666e2afaef4")
		)
		(fp_line
			(start -0.8 0.4125)
			(end 0.8 0.4125)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "B.Fab")
			(uuid "61c94a2c-34db-44f3-8f1a-8ff6623b5c10")
		)
		(fp_line
			(start 0.8 0.4125)
			(end 0.8 -0.4125)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "B.Fab")
			(uuid "2c44ccc9-ac40-486d-85ba-35d94bdf2e76")
		)
		(fp_line
			(start -0.8 -0.4125)
			(end -0.8 0.4125)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "B.Fab")
			(uuid "6cd4be7d-90c6-4c17-8d71-ae82cab12cbb")
		)
		(fp_line
			(start 0.8 -0.4125)
			(end -0.8 -0.4125)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "B.Fab")
			(uuid "39f1f189-2d6a-414e-ac40-7ef12d5bc4eb")
		)
		(fp_text user "${REFERENCE}"
			(at 0 0 90)
			(layer "B.Fab")
			(uuid "b2731d24-0cf8-4d4d-ac43-76736e708b3d")
			(effects
				(font
					(size 0.4 0.4)
					(thickness 0.06)
				)
				(justify mirror)
			)
		)
		(pad "1" smd roundrect
			(at -0.825 0 270)
			(size 0.8 0.95)
			(layers "B.Cu" "B.Paste" "B.Mask")
			(roundrect_rratio 0.25)
			(net 2 "VDD_3.3V")
			(pintype "passive")
			(uuid "9f9075fb-4373-47ae-aad0-cf432b84c704")
		)
		(pad "2" smd roundrect
			(at 0.825 0 270)
			(size 0.8 0.95)
			(layers "B.Cu" "B.Paste" "B.Mask")
			(roundrect_rratio 0.25)
			(net 8 "MISO")
			(pintype "passive")
			(uuid "21059972-aa38-4116-b15a-3b52ba8d41d6")
		)
		(model "${KICAD6_3DMODEL_DIR}/Resistor_SMD.3dshapes/R_0603_1608Metric.wrl"
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