/**
 * PresController
 *
 * @description :: Server-side logic for managing pres
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	preparePv: function (req, res) {
		var circ = parseInt(req.body.circ),
			deleg = parseInt(req.body.deleg),
			subDeleg = parseInt(req.body.subDeleg),
			center = parseInt(req.body.center),
			station = parseInt(req.body.station);
		if (circ == undefined || deleg == undefined || subDeleg == undefined || center == undefined || station == undefined)
			return res.badRequest('polling center indentifiers are missing from request body ');
		var fs = require("fs"),
			filepath = './assets/data/pc.json',
			file = fs.readFileSync(filepath, 'utf8');
		//Test here for file existence .
		var data = JSON.parse(file);
		var found = false;
		for (var i = 0; i < data.length; i++) {
			var pvId = data[i].number.toString();
			if (pvId.length == 10)
				pvId = '0' + pvId;
			var pcirc = parseInt(pvId.substr(0, 2)),
				pdeleg = parseInt(pvId.substr(2, 2)),
				psubDeleg = parseInt(pvId.substr(4, 2)),
				pcenter = parseInt(pvId.substr(6, 3)),
				pstation = parseInt(pvId.substr(9, 2));
			if (pcirc == circ && pdeleg == deleg && psubDeleg == subDeleg && pcenter == center && pstation == station)
				break
		}
		if (data[i] == undefined)
			return res.badRequest('polling center not existing in our database , verify that your request has the correct values');
	//	var listFile = 'assets/data/lists/' + circ.toString() + '.json';
		//var lists = JSON.parse(fs.readFileSync(listFile, 'utf8'));
		if (lists == undefined)
			return res.badRequest('not lists Found ,please contact the admin ');
		var template = {
			circ: circ,
			deleg: deleg,
			subDeleg: subDeleg,
			center: center,
			station: station,
			circName: data[i].circonscription,
			centerName: data[i].center_name,
			//lists: lists,
			tampon : false
		};
		return res.ok(template);

	},
	createPv: function (req, res) {
		var pvData = req.body;

		var newPv = {
			circonscriptionId: pvData.circ,
			delegationId: pvData.deleg,
			subDelegationId: pvData.subDeleg,
			centerID: pvData.center,
			stationId: pvData.station,
			circonscriptionName: pvData.circName,
			PollingCenterName: pvData.centerName,
			registeredVoters: pvData.registeredVoters,
			aSigningVoters: pvData.aSigningVoters,
			bDeliveredBallots: pvData.bDeliveredBallots,
			cSpoiledBallots: pvData.cSpoiledBallots,
			dLeftBallots: pvData.dLeftBallots,
			fExtractedBallots: pvData.fExtractedBallots,
			gEplusF: pvData.gEplusF,
			hBminusG: pvData.hBminusG,
			iAminusF: pvData.iAminusF,
			hReasons: pvData.hReasons,
			iReasons: pvData.iReasons,
			jListVotes: pvData.jListVotes,
			kCancelledVotes: pvData.kCancelledVotes,
			lBlankVotes: pvData.lBlankVotes,
			mJplusKplusL: pvData.mJplusKplusL,
			nFminusM: pvData.nFminusM,
			nReasons: pvData.nReasons,
			countingStart: pvData.countingStart,
			countingEnd: pvData.countingEnd,
			filledBy: pvData.user,
			election: pvData.election,
			partySingatures: pvData.partySingatures,
			doneTime:pvData.doneTime,
			tampon:pvData.tampon,
			sebsi:pvData.sebsi,
			marzouki:pvData.marzouki

		};
		Pres.create(newPv).exec(function (err, pv) {

			if (err) {
				return res.serverError(err);

			}


			return res.ok();

		});


	}

};
