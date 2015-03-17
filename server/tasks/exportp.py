import urllib2
from string import maketrans
from string import whitespace
import csv
import time
import json
import requests




def readPv( id ):
    source_url = "http://localhost:1337/pres/" + id
    response = urllib2.urlopen(source_url).read()
    return response
def createApi(elpv):
    token = 'KWrxiDejXLkZ2kGcE9oLmclHxmsatK5hTtiTbDKTGsgZAppGplmzDXVEjX0EW4PU'
    api_url = 'http://localhost:3000/api/presidentielles?access_token=' + token
    pv = elpv
    payload = {"PollingCenterName": pv['PollingCenterName'],
	"aSigningVoters": pv['aSigningVoters'],
    "bDeliveredBallots": pv['bDeliveredBallots'],
    "cSpoiledBallots": pv['cSpoiledBallots'],
    "centerID": pv['centerID'],
    "circonscriptionId": pv['circonscriptionId'],
    "dLeftBallots": pv['dLeftBallots'],
    "delegationId": pv['delegationId'],
    "fExtractedBallots": pv['fExtractedBallots'],
    "kCancelledVotes": pv['kCancelledVotes'],
    "lBlankVotes": pv['lBlankVotes'],
    "registeredVoters": pv['registeredVoters'],
    "stationId": pv['stationId'],
    "subDelegationId": pv['subDelegationId'],
    "sebsiVotes": pv['sebsi'],
    "marzoukiVotes":pv['marzouki']}
    r = requests.post(api_url, data=payload)
    print r.json()['id']
    return
def addHeader( id,circ ):
    filename= '../exports/presidentielles/'+ str(circ) + '.csv'
    f = csv.writer(open(filename, "wb+"))
    headerRow= ['circonscriptionId','delegationId','subDelegationId','centerID','stationId','registeredVoters','aSigningVoters','bDeliveredBallots','cSpoiledBallots','dLeftBallots','fExtractedBallots','gEplusF','hBminusG','iAminusF','jListVotes','kCancelledVotes','lBlankVotes','mJplusKplusL','nFminusM','countingStart',
                'countingEnd','tampon','sebsi','marzouki']
    headerRow.append('observers')
    f.writerow(headerRow)
    return
def addData( id,circ ):
    filename= '../exports/presidentielles/' + str(circ) + '.csv'
    f = csv.writer(open(filename, "ab+"))
    dataRow=[id['circonscriptionId'],
                id['delegationId'],
                id['subDelegationId'],
                id['centerID'],
                id['stationId'],
                id['registeredVoters'],
                id['aSigningVoters'],
                id['bDeliveredBallots'],
                id['cSpoiledBallots'],
                id['dLeftBallots'],
                id['fExtractedBallots'],
                id['gEplusF'],
                id['hBminusG'],
                id['iAminusF'],
                id['jListVotes'],
                id['kCancelledVotes'],
                id['lBlankVotes'],
                id['mJplusKplusL'],
                id['nFminusM'],
                id['countingStart'],
                id['countingEnd'],
                id['tampon'],
                id['sebsi'],
                id['marzouki']]
    ps = json.dumps(id['partySingatures'])
    tmp=''
    for item in id['partySingatures']:

        sigName= item.get('name','').encode("UTF-8")
        sigCount= item.get('signaturesCount','').encode("UTF-8")
        tmp = tmp + sigName + ':' + sigCount +'  '

    dataRow.append(tmp)
    f.writerow(dataRow)
    return

def exportCirc( circ ):
    r = requests.get("http://localhost:1337/presidentielles/list/" + str(circ))
    pvList= r.json()['pvlist']

    pvDetails = readPv(pvList[0])
    pvv = json.loads(pvDetails)
    addHeader(pvv,circ)
    for pv in pvList:
        pvDetails= readPv(pv)
        pvv = json.loads(pvDetails)
        addData(pvv,circ)
        createApi(pvv)
    return

for i in range(1,28):
    exportCirc(i)
