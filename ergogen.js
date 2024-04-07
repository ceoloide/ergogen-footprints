// ergogen logo
module.exports = {
    params: {
        designator: 'LOGO',
        side: 'F',
        layer: 'SilkS',
        scale: 1.0
    },
    body: p => `
    (module "travis:ergogen" (layer "${p.side}.Cu")
    ${p.at /* parametric position */}
    (attr virtual)
    (fp_text reference "${p.ref}" (at ${p.scale * 4.572} 0 0) (layer "${p.side}.${p.layer}") hide
      (effects (font (size 1 1) (thickness 0.1)))
    )
    (fp_poly 
      (pts 
        (xy ${p.scale * 2.501231} 0) (xy ${p.scale * 2.501231} ${p.scale * 2.501231}) (xy 0 ${p.scale * 2.501231}) (xy ${p.scale * -2.50123} ${p.scale * 2.501231}) (xy ${p.scale * -2.50123} ${p.scale * 1.013088})
        (xy ${p.scale * -1.738355} ${p.scale * 1.013088}) (xy ${p.scale * -0.021885} ${p.scale * 1.009917}) (xy ${p.scale * 1.694584} ${p.scale * 1.006746}) (xy ${p.scale * 1.697905} ${p.scale * 0.662827}) (xy ${p.scale * 1.701225} ${p.scale * 0.318907})
        (xy ${p.scale * 1.52891} ${p.scale * 0.490867}) (xy ${p.scale * 1.356594} ${p.scale * 0.662827}) (xy ${p.scale * -0.19088} ${p.scale * 0.662827}) (xy ${p.scale * -1.738355} ${p.scale * 0.662827}) (xy ${p.scale * -1.738355} ${p.scale * 0.837957})
        (xy ${p.scale * -1.738355} ${p.scale * 1.013088}) (xy ${p.scale * -2.50123} ${p.scale * 1.013088}) (xy ${p.scale * -2.50123} ${p.scale * 0.150074}) (xy ${p.scale * -1.394101} ${p.scale * 0.150074}) (xy ${p.scale * -0.637478} ${p.scale * 0.150074})
        (xy ${p.scale * 0.119144} ${p.scale * 0.150074}) (xy ${p.scale * 0.293895} ${p.scale * -0.025012}) (xy ${p.scale * 0.468646} ${p.scale * -0.200098}) (xy ${p.scale * -0.287976} ${p.scale * -0.200098}) (xy ${p.scale * -1.044599} ${p.scale * -0.200098})
        (xy ${p.scale * -1.21935} ${p.scale * -0.025012}) (xy ${p.scale * -1.394101} ${p.scale * 0.150074}) (xy ${p.scale * -2.50123} ${p.scale * 0.150074}) (xy ${p.scale * -2.50123} 0) (xy ${p.scale * -2.50123} ${p.scale * -1.063023})
        (xy ${p.scale * -1.738355} ${p.scale * -1.063023}) (xy ${p.scale * -1.738355} ${p.scale * -0.887937}) (xy ${p.scale * -1.738355} ${p.scale * -0.71285}) (xy ${p.scale * -0.190545} ${p.scale * -0.71285}) (xy ${p.scale * 1.357266} ${p.scale * -0.71285})
        (xy ${p.scale * 1.525751} ${p.scale * -0.544017}) (xy ${p.scale * 1.578342} ${p.scale * -0.491483}) (xy ${p.scale * 1.624575} ${p.scale * -0.445614}) (xy ${p.scale * 1.661679} ${p.scale * -0.409133}) (xy ${p.scale * 1.686885} ${p.scale * -0.384763})
        (xy ${p.scale * 1.697422} ${p.scale * -0.375226}) (xy ${p.scale * 1.697537} ${p.scale * -0.375184}) (xy ${p.scale * 1.698399} ${p.scale * -0.387158}) (xy ${p.scale * 1.699177} ${p.scale * -0.420952}) (xy ${p.scale * 1.69984} ${p.scale * -0.473372})
        (xy ${p.scale * 1.700359} ${p.scale * -0.541225}) (xy ${p.scale * 1.700701} ${p.scale * -0.62132}) (xy ${p.scale * 1.700836} ${p.scale * -0.710463}) (xy ${p.scale * 1.700837} ${p.scale * -0.719103}) (xy ${p.scale * 1.700837} ${p.scale * -1.063023})
        (xy ${p.scale * -0.018759} ${p.scale * -1.063023}) (xy ${p.scale * -1.738355} ${p.scale * -1.063023}) (xy ${p.scale * -2.50123} ${p.scale * -1.063023}) (xy ${p.scale * -2.50123} ${p.scale * -2.50123}) (xy 0 ${p.scale * -2.50123})
        (xy ${p.scale * 2.501231} ${p.scale * -2.50123})
      ) 
      (layer "${p.side}.${p.layer}") (width 0.01)
    )
  )`
};