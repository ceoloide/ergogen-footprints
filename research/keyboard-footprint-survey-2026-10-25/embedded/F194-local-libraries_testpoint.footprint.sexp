(footprint "local-libraries:testpoint"
		(layer "F.Cu")
		(uuid "06c31965-3802-4dd0-ab9a-524945687244")
		(at 195.5 93.65)
		(descr "Through hole straight pin header, 1x01, 1.27mm pitch, single row")
		(tags "Through hole pin header THT 1x01 1.27mm single row")
		(property "Reference" "J5006"
			(at 0 -1.695 0)
			(layer "F.SilkS")
			(hide yes)
			(uuid "f101e370-cded-4c50-93b3-ba6f6333a861")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
			)
		)
		(property "Value" "Conn_01x01_Socket"
			(at 0 1.695 0)
			(layer "F.Fab")
			(uuid "c039ca66-dd1b-4a31-8bff-f263627b7e26")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
			)
		)
		(property "Datasheet" ""
			(at 0 0 0)
			(unlocked yes)
			(layer "F.Fab")
			(hide yes)
			(uuid "fb573d57-5e28-4d9c-be49-8f7b8caed7a9")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property "Description" "Generic connector, single row, 01x01, script generated"
			(at 0 0 0)
			(unlocked yes)
			(layer "F.Fab")
			(hide yes)
			(uuid "b211b64f-f9ea-4c85-9e8d-e6f40998a216")
			(effects
				(font
					(size 1.27 1.27)
					(thickness 0.15)
				)
			)
		)
		(property ki_fp_filters "Connector*:*_1x??_*")
		(path "/5e167201-c0ff-4435-9d7e-9c2f48366f59")
		(sheetname "/")
		(sheetfile "dilemma.kicad_sch")
		(attr through_hole dnp)
		(fp_line
			(start -0.8 -0.8)
			(end -0.8 0.8)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "F.CrtYd")
			(uuid "09fa1c87-a4d3-4b5e-934b-5c7efffd5113")
		)
		(fp_line
			(start -0.8 0.8)
			(end 0.8 0.8)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "F.CrtYd")
			(uuid "3b09ac6f-3c53-41f2-aacd-980cf0c7b58e")
		)
		(fp_line
			(start 0.8 -0.8)
			(end -0.8 -0.8)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "F.CrtYd")
			(uuid "4e68b17e-55ba-4f92-b7d5-7599d9175f1a")
		)
		(fp_line
			(start 0.8 0.8)
			(end 0.8 -0.8)
			(stroke
				(width 0.05)
				(type solid)
			)
			(layer "F.CrtYd")
			(uuid "1bbee768-9a01-4f64-8850-7ebd63aeba82")
		)
		(fp_line
			(start -1.05 -0.11)
			(end -0.525 -0.635)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "F.Fab")
			(uuid "f2d3ade7-b998-4519-a023-7e614510bcc3")
		)
		(fp_line
			(start -1.05 0.635)
			(end -1.05 -0.11)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "F.Fab")
			(uuid "c354ea74-6c7a-4dba-b7f1-c8864ca3caa4")
		)
		(fp_line
			(start -0.525 -0.635)
			(end 1.05 -0.635)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "F.Fab")
			(uuid "884d3f2e-c041-4f4f-8b54-44a57faa04bc")
		)
		(fp_line
			(start 1.05 -0.635)
			(end 1.05 0.635)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "F.Fab")
			(uuid "00c37cc4-259c-4cca-b8a8-bc7567688b0d")
		)
		(fp_line
			(start 1.05 0.635)
			(end -1.05 0.635)
			(stroke
				(width 0.1)
				(type solid)
			)
			(layer "F.Fab")
			(uuid "a69ef8fb-5d1e-4534-aed4-ad79a0bd8dda")
		)
		(fp_text user "${REFERENCE}"
			(at 0 0 90)
			(layer "F.Fab")
			(uuid "54420a7e-cd2a-4d11-b602-d0668e021933")
			(effects
				(font
					(size 1 1)
					(thickness 0.15)
				)
			)
		)
		(pad "1" thru_hole circle
			(at 0 0)
			(size 1.3 1.3)
			(drill 0.8)
			(layers "*.Cu" "*.Mask")
			(remove_unused_layers no)
			(net 14 "M_COL1")
			(pinfunction "Pin_1")
			(pintype "passive")
			(uuid "dc6ba815-1324-4210-a358-62424815caf3")
		)
		(embedded_fonts no)
		(model "${KICAD9_3DMODEL_DIR}/Connector_PinHeader_1.27mm.3dshapes/PinHeader_1x01_P1.27mm_Vertical.wrl"
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