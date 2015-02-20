/**
 * SuiviController
 *
 * @description :: Server-side logic for managing suivis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
  list:function(req,res){

  var ident= req.body['pv']
  Pv.find({
          id:ident
        }).populate('lists')
      .exec(function(err, pvs) {
        console.log(pvs[0]);
        return res.ok(pvs[0]);

      });

},
    match: function(req, res) {

        var circons = req.body['circ'];
        if (circons == undefined)
            return res.badRequest("not circonscription given ");
        var c_id = parseInt(circons);

        var fs = require("fs"),
            filepath = './assets/data/pc.json',
            file = fs.readFileSync(filepath, 'utf8');
        //Test here for file existence .
        var data = JSON.parse(file);
        var found = false;
        var l = data.length,
            noPv = [],
            onePv = [],
            twoPv = [],
            validPv = [],
            morePV = [];
        // refactoring

        var arrangepv = function(d) {
                if (d.length == 0) {

                    return res.ok({
                        nopv: noPv,
                        onepv: onePv,
                        twopv: twoPv
                    });
                } else {
                    var pv = d.pop();
                    var pvId = pv.number.toString();
                    if (pvId.length == 10)
                        pvId = '0' + pvId;
                    var pcirc = parseInt(pvId.substr(0, 2)),
                        pdeleg = parseInt(pvId.substr(2, 2)),
                        psubDeleg = parseInt(pvId.substr(4, 2)),
                        pcenter = parseInt(pvId.substr(6, 3)),
                        pstation = parseInt(pvId.substr(9, 2));

                    if (pcirc == c_id) {
                        Pv.find({
                                circonscriptionId: pcirc,
                                delegationId: pdeleg,
                                subDelegationId: psubDeleg,
                                centerID: pcenter,
                                stationId: pstation
                                })
                            .exec(function(err, pvs) {

                                if (pvs.length == 0)
                                    noPv.push(pcirc.toString()+'-'+pdeleg+'-'+psubDeleg+'-'+pcenter+'-'+ pstation);
                                if (pvs.length == 1)
                                    onePv.push(pcirc.toString()+'-'+pdeleg+'-'+psubDeleg+'-'+pcenter+'-'+ pstation);
                                if (pvs.length == 2) {
                                    if(!pvs[0].valid && !pvs[1].valid)
                                        twoPv.push(pvs);


                                }
                                process.nextTick(function() {

                                    arrangepv(d)
                                });

                            });



                    } else {

                        process.nextTick(function() {
                             arrangepv(d)
                        });



                    }


                }




            }
            // end refactoring
        arrangepv(data);


        // end function
    },
    updatePv:function(req,res){
        var pvData = req.body;
        console.log(req.body);
        if(pvData ) {

            lists = pvData.lists;
            lists.forEach(function(element,index){
                Candidate.update({ id: element.id }, { votesCount: element.votesCount })
            .exec(function(err, cand) {
                    if(err)
                        console.log('error updating');
                    else
                        console.log('updated' + cand.id);
                });

            });
               delete pvData.lists;
                delete pvData.createdAt;
                delete pvData.updatedAt;
                delete pvData.partySingatures;
                pvData.corrected = true;
            Pv.update({ id: pvData.id}, pvData)
            .exec(function(err, pv) {
                  if(err)
                        console.log('error updating');
                    else
                    {   console.log('updated' + pv.id);

                        return res.ok(pv);}

            });



        }
        else
        return res.badRequest();




    }

};
