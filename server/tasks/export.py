import urllib2
from string import maketrans
from string import whitespace
import csv
import time
import json
import requests




def readPv( id ):
    source_url = "http://localhost:1337/pv/" + id
    response = urllib2.urlopen(source_url).read()
    return response
def addHeader( id ):
    f = csv.writer(open("nabeul.csv", "wb+"))
    headerRow= ['circonscriptionId','delegationId','subDelegationId','centerID','stationId','registeredVoters','aSigningVoters','bDeliveredBallots','cSpoiledBallots','dLeftBallots','eCplusD','fExtractedBallots','gEplusF','hBminusG','iAminusF','jListVotes','kCancelledVotes','lBlankVotes','mJplusKplusL','nFminusM','countingStart',
                'countingEnd','tampon']
    partyLists = id['lists']
    for item in partyLists:
        headerRow.append(item['candidateName'].encode("UTF-8"))
    headerRow.append('observers')
    f.writerow(headerRow)
    return
def addData( id ):
    f = csv.writer(open("nabeul.csv", "ab+"))
    partyLists = id['lists']
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
                id['eCplusD'],
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
                id['tampon']]

    for item in partyLists:
        dataRow.append(item['votesCount'])
    ps = json.dumps(id['partySingatures'])
    tmp=''
    for item in id['partySingatures']:

        sigName= item.get('name','').encode("UTF-8")
        sigCount= item.get('signaturesCount','').encode("UTF-8")
        tmp = tmp + sigName + ':' + sigCount +'  '

    dataRow.append(tmp)
    f.writerow(dataRow)
    return

# getting the list of pvs in nabeul
r = requests.get("http://localhost:1337/legislatives/list/11")
pvList= r.json()['pvlist']

pvDetails = readPv(pvList[0])
pvv = json.loads(pvDetails)
addHeader(pvv)
for pv in pvList:
    pvDetails= readPv(pv)
    pvv = json.loads(pvDetails)
    addData(pvv)
