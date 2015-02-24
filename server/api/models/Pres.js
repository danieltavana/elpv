/**
* Pres.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    attributes: {
        circonscriptionId:{
            type:'integer',
            required:true,
            maxLength: 2
        },
        delegationId:{
            type:'integer',
            required:true,
            maxLength: 2
        },
        subDelegationId:{
            type:'integer',
            required:true,
            maxLength: 2
        },
        centerID:{
            type:'integer',
            required:true,
            maxLength: 3
        },
        stationId:{
            type:'integer',
            required:true,
            maxLength: 2
        },
         circonscriptionName:{
            type:'string',
            required:true,
        },
        PollingCenterName:{
            type:'string',
            required:true,
        },
        election:{
            type:'string',
            required:true,
        },
        filledBy:{
            model:'user'
        },
        filledIn:{
           type:'integer'
        },
        registeredVoters :{
            type:'integer',
            required:true,
        },
        aSigningVoters:{
            type:'integer',
            required:true,
        },
        bDeliveredBallots :{
            type:'integer',
            required:true,
        },
        cSpoiledBallots :{
            type:'integer',
            required:true,
        },
        dLeftBallots :{
            type:'integer',
            required:true,
        },

        fExtractedBallots :{
            type:'integer',
            required:true,
        },
      gEplusF :{
            type:'integer',
            required:true,
        },
      hBminusG :{
            type:'integer',
            required:true,
        },
      iAminusF:{
            type:'integer',
            required:true,
        },
      hReasons:{
          type:'string'
      },
       iReasons:{
          type:'string'
      },
      jListVotes:{
            type:'integer',
            required:true,
      },
      kCancelledVotes:{
            type:'integer',
            required:true,
      },
      lBlankVotes:{
            type:'integer',
            required:true,
      },
      mJplusKplusL:{
            type:'integer',
            required:true,
      },
      nFminusM:{
            type:'integer',
            required:true,
      },
      nReasons:{
          type:'string'
      },
      partySingatures:{
         type:'JSON'
      },
      countingStart:{
        type:'string'
     },
     countingEnd:{
        type:'string'
     },
     doneTime:{
        type:'integer'
     },
     tampon:  {
      type:'boolean'
    },
    valid:{
        type:'boolean',
        defaultsTo: 'false'
    },
     corrected:{
        type:'boolean',
        defaultsTo: 'false'
    },
    sebsi:{
      type:'integer',
      required:true
    },
    marzouki:{
      type:'integer',
      required:true
      }
    }
};
