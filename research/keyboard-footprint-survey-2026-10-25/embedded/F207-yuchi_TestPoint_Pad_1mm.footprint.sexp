(footprint "yuchi:TestPoint_Pad_1mm"
		(layer "B.Cu")
		(uuid "00bef98e-79a3-452c-a497-c029678cd8a7")
		(at 218.6 132 180)
		(property "Reference" "TP32"
			(at 0 0.8 0)
			(unlocked yes)
			(layer "B.SilkS")
			(hide yes)
			(uuid "ec73eda0-11f3-4d2d-8ac9-1d29a3ccab92")
			(effects
				(font
					(size 0.5 0.5)
					(thickness 0.1)
					(bold yes)
				)
				(justify mirror)
			)
		)
		(property "Value" "SWC"
			(at 0 -1 0)
			(unlocked yes)
			(layer "B.Fab")
			(uuid "d31c6aef-31b3-4895-abe7-437a52f01548")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
				(justify mirror)
			)
		)
		(property "Datasheet" ""
			(at 0 0 180)
			(layer "F.Fab")
			(hide yes)
			(uuid "a88ecb60-020c-4f8a-a2c0-d9d406d44675")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property "Description" ""
			(at 0 0 180)
			(layer "F.Fab")
			(hide yes)
			(uuid "29ac9d79-27ae-449f-b002-bb9ae53a90e1")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property ki_fp_filters "Pin* Test*")
		(path "/77b159b9-2407-44c8-b27f-5d73e692b5e2")
		(sheetname "/")
		(sheetfile "Pro_V2.kicad_sch")
		(attr smd)
		(fp_text user "${REFERENCE}"
			(at 0 -2.5 0)
			(unlocked yes)
			(layer "B.Fab")
			(uuid "7c471134-b9e4-4b0c-8178-2147b127eb38")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
				(justify mirror)
			)
		)
		(pad "1" smd circle
			(at 0 0 180)
			(size 1 1)
			(layers "B.Cu" "B.Mask" "B.Paste")
			(net 182 "SWCLK_R")
			(pinfunction "1")
			(pintype "passive")
			(uuid "e6162b68-c073-44c0-8586-2c2bc7f8798f")
		)
		(embedded_fonts no)
	)