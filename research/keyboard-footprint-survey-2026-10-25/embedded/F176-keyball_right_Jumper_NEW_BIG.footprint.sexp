(module keyball_right:Jumper_NEW_BIG (layer B.Cu) (tedit 64C8AD3A) (tstamp 61C434A6)
    (at 189.914 115.725)
    (path /60780834)
    (attr smd)
    (fp_text reference JP14 (at -2.413 -0.127) (layer B.SilkS) hide
      (effects (font (size 0.8128 0.8128) (thickness 0.1524)) (justify mirror))
    )
    (fp_text value Device_Jumper_NO_Small (at -0.3 1.6) (layer B.SilkS) hide
      (effects (font (size 0.8128 0.8128) (thickness 0.15)) (justify mirror))
    )
    (fp_line (start -1.683 0.889) (end 1.643 0.889) (layer B.SilkS) (width 0.15))
    (fp_line (start 1.643 0.889) (end 1.643 -0.889) (layer B.SilkS) (width 0.15))
    (fp_line (start 1.643 -0.889) (end -1.683 -0.889) (layer B.SilkS) (width 0.15))
    (fp_line (start -1.683 -0.889) (end -1.683 0.889) (layer B.SilkS) (width 0.15))
    (pad 1 smd custom (at -0.55 0) (size 0.35 1.143) (layers B.Cu B.Paste B.Mask)
      (net 60 "Net-(J2-Pad6)") (clearance 0.1905) (zone_connect 0)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
           (xy -0.8 0.5715) (xy 0.175 0.5715) (xy 0.575 0) (xy 0.175 -0.5715) (xy -0.8 -0.5715)
) (width 0))
      ))
    (pad 2 smd custom (at 0.5 0) (size 0.35 1.143) (layers B.Cu B.Paste B.Mask)
      (net 37 MOSI) (clearance 0.1905) (zone_connect 0)
      (options (clearance outline) (anchor rect))
      (primitives
        (gr_poly (pts
           (xy 0.8175 0.5715) (xy -0.575 0.5715) (xy -0.175 0) (xy -0.575 -0.5715) (xy 0.8175 -0.5715)
) (width 0))
      ))
    (model smd\resistors\R0603.wrl
      (offset (xyz 0 0 0.02539999961853028))
      (scale (xyz 0.5 0.5 0.5))
      (rotate (xyz 0 0 0))
    )
  )