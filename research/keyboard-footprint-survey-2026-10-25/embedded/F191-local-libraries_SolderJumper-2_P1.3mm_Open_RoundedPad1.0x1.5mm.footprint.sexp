(footprint "local-libraries:SolderJumper-2_P1.3mm_Open_RoundedPad1.0x1.5mm"
		(layer "F.Cu")
		(uuid "60e02eaa-adf3-48fc-af07-b7d735dcef36")
		(at 237.17 71.86 90)
		(descr "SMD Solder Jumper, 1x1.5mm, rounded Pads, 0.3mm gap, open")
		(tags "solder jumper open")
		(property "Reference" "NA_JP5004"
			(at 0 -1.8 270)
			(layer "F.SilkS")
			(hide yes)
			(uuid "34dc210b-1951-463e-922e-a92310728f57")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
			)
		)
		(property "Value" "NA_Jumper_2_Open"
			(at 0 1.9 270)
			(layer "F.Fab")
			(uuid "73e9b39e-1a3e-4cc6-9e68-8b3ac2aa1ee5")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
			)
		)
		(property "Datasheet" ""
			(at 0 0 90)
			(unlocked yes)
			(layer "F.Fab")
			(hide yes)
			(uuid "343ecaee-a85d-4bba-9a06-281c493115e8")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property "Description" ""
			(at 0 0 90)
			(unlocked yes)
			(layer "F.Fab")
			(hide yes)
			(uuid "ebbd6bf9-0ccd-47c1-8d7c-514417c08eea")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property ki_fp_filters "Jumper* TestPoint*2Pads* TestPoint*Bridge*")
		(path "/b14f1b4c-237f-4e52-8564-9603d9991cc6")
		(sheetname "/")
		(sheetfile "dilemma.kicad_sch")
		(attr exclude_from_pos_files exclude_from_bom)
		(fp_line
			(start -0.7 -1)
			(end 0.7 -1)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "F.SilkS")
			(uuid "e14058c5-05e4-496b-a75b-5770e9342819")
		)
		(fp_line
			(start 1.4 -0.3)
			(end 1.4 0.3)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "F.SilkS")
			(uuid "d9b8646c-5c6b-4b5c-9171-556400faa176")
		)
		(fp_line
			(start -1.4 0.3)
			(end -1.4 -0.3)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "F.SilkS")
			(uuid "4f0138f9-8a86-4004-9182-111d1d9520cb")
		)
		(fp_line
			(start 0.7 1)
			(end -0.7 1)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "F.SilkS")
			(uuid "256b5a7c-b727-4313-b5ad-09c6576ee87f")
		)
		(fp_arc
			(start 0.7 -1)
			(mid 1.194975 -0.794975)
			(end 1.4 -0.3)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "F.SilkS")
			(uuid "379e0451-eba5-4374-afcc-accf12fbef18")
		)
		(fp_arc
			(start -1.4 -0.3)
			(mid -1.194975 -0.794975)
			(end -0.7 -1)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "F.SilkS")
			(uuid "c4ee7e7b-d555-4dc8-87a0-22688f73145c")
		)
		(fp_arc
			(start 1.4 0.3)
			(mid 1.194975 0.794975)
			(end 0.7 1)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "F.SilkS")
			(uuid "8e8cc949-92f6-42ae-b680-fa2e1612ac5e")
		)
		(fp_arc
			(start -0.7 1)
			(mid -1.194975 0.794975)
			(end -1.4 0.3)
			(stroke
				(width 0.12)
				(type solid)
			)
			(layer "F.SilkS")
			(uuid "c6325d40-cb75-4f3a-a6b3-6c0468a046b2")
		)
		(fp_line
			(start -1.65 -1.25)
			(end 1.65 -1.25)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "F.CrtYd")
			(uuid "e13d8aa9-cb3e-4c25-a265-80478469b511")
		)
		(fp_line
			(start -1.65 -1.25)
			(end -1.65 1.25)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "F.CrtYd")
			(uuid "430df68d-7c53-45d8-8689-f325b2979cda")
		)
		(fp_line
			(start 1.65 1.25)
			(end 1.65 -1.25)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "F.CrtYd")
			(uuid "15b329e9-ec41-4541-ab40-e44c7524e40d")
		)
		(fp_line
			(start 1.65 1.25)
			(end -1.65 1.25)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "F.CrtYd")
			(uuid "aa008ad6-f70e-4dd1-9f60-01a643332388")
		)
		(pad "1" smd custom
			(at -0.65 0 90)
			(size 1 0.5)
			(layers "F.Cu" "F.Mask")
			(net 1 "+5V")
			(pinfunction "A")
			(pintype "passive")
			(zone_connect 2)
			(options
				(clearance outline)
				(anchor rect)
			)
			(primitives
				(gr_circle
					(center 0 0.25)
					(end 0.5 0.25)
					(width 0)
					(fill yes)
				)
				(gr_circle
					(center 0 -0.25)
					(end 0.5 -0.25)
					(width 0)
					(fill yes)
				)
				(gr_poly
					(pts
						(xy 0.5 0.75) (xy 0 0.75) (xy 0 -0.75) (xy 0.5 -0.75)
					)
					(width 0)
					(fill yes)
				)
			)
			(uuid "5860c69e-05fc-43f1-8692-9a89cb6ee2cc")
		)
		(pad "2" smd custom
			(at 0.65 0 90)
			(size 1 0.5)
			(layers "F.Cu" "F.Mask")
			(net 164 "Net-(J113-Pin_7)")
			(pinfunction "B")
			(pintype "passive")
			(zone_connect 2)
			(options
				(clearance outline)
				(anchor rect)
			)
			(primitives
				(gr_circle
					(center 0 0.25)
					(end 0.5 0.25)
					(width 0)
					(fill yes)
				)
				(gr_circle
					(center 0 -0.25)
					(end 0.5 -0.25)
					(width 0)
					(fill yes)
				)
				(gr_poly
					(pts
						(xy 0 0.75) (xy -0.5 0.75) (xy -0.5 -0.75) (xy 0 -0.75)
					)
					(width 0)
					(fill yes)
				)
			)
			(uuid "2ac11e9b-4d29-4ac9-b2d7-25da66b54e1f")
		)
		(embedded_fonts no)
	)