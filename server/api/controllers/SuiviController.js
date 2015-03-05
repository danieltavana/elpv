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
                        Pres.find({
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
                                    if( pvs[0].marzouki !=pvs[1].marzouki || pvs[0].sebsi !=pvs[1].sebsi || pvs[0].nFminusM !=pvs[1].nFminusM || pvs[0].mJplusKplusL !=pvs[1].mJplusKplusL || pvs[0].lBlankVotes !=pvs[1].lBlankVotes || pvs[0].kCancelledVotes !=pvs[1].kCancelledVotes || pvs[0].jListVotes !=pvs[1].jListVotes || pvs[0].iAminusF !=pvs[1].iAminusF || pvs[0].hBminusG !=pvs[1].hBminusG || pvs[0].gEplusF !=pvs[1].gEplusF || pvs[0].registeredVoters !=pvs[1].registeredVoters || pvs[0].aSigningVoters != pvs[1].aSigningVoters || pvs[0].bDeliveredBallots != pvs[1].bDeliveredBallots || pvs[0].cSpoiledBallots != pvs[1].cSpoiledBallots  || pvs[0].dLeftBallots != pvs[1].dLeftBallots || pvs[0].fExtractedBallots != pvs[1].fExtractedBallots )
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
    missing:function(req,res) {

              var fs = require("fs"),
                  filepath = './assets/data/pc-full.json',
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
                                console.log(noPv);
                                  return res.ok({
                                      nopv: noPv
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

                                      Pv.find({
                                              circonscriptionId: pcirc,
                                              delegationId: pdeleg,
                                              subDelegationId: psubDeleg,
                                              centerID: pcenter,
                                              stationId: pstation
                                              })
                                          .exec(function(err, pvs) {

                                              if (pvs.length == 0){
                                                noPv.push(pv);
                                              }
                                                  //noPv.push(pcirc.toString()+'-'+pdeleg+'-'+psubDeleg+'-'+pcenter+'-'+ pstation);

                                              process.nextTick(function() {

                                                  arrangepv(d)
                                              });

                                          });
                              }
                          }
                          // end refactoring
                          process.nextTick(function() {

                              arrangepv(data)
                          });
    },
    updatePv:function(req,res){
        var pvData = req.body;
        console.log(req.body);
        if(pvData ) {


                delete pvData.createdAt;
                delete pvData.updatedAt;
                pvData.corrected = true;
            Pres.update({ id: pvData.id}, pvData)
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
