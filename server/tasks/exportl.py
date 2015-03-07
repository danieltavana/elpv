#!/usr/local/bin/python
# coding: utf-8

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
def addHeader( id,circ ):
    filename= '../exports/legislatives/'+ str(circ) + '.csv'
    f = csv.writer(open(filename, "wb+"))
    headerRow= ['circonscriptionId','delegationId','subDelegationId','centerID','stationId','registeredVoters','aSigningVoters','bDeliveredBallots','cSpoiledBallots','dLeftBallots','eCplusD','fExtractedBallots','gEplusF','hBminusG','iAminusF','jListVotes','kCancelledVotes','lBlankVotes','mJplusKplusL','nFminusM','countingStart',
                'countingEnd','tampon']
    partyLists = id['lists']
    for item in partyLists:
        candidateName = item['candidateName'].encode("UTF-8")

        newName = normaliseName(candidateName)
        headerRow.append(newName)
    headerRow.append('observers')
    f.writerow(headerRow)
    return
def addData( id,circ ):
    filename= '../exports/legislatives/' + str(circ) + '.csv'
    f = csv.writer(open(filename, "ab+"))
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
                id.get('tampon','False')]
    if id['countingStart'] != None:
        dataRow.append(id['countingStart'].encode("UTF-8"))
    else:
        dataRow.append('')
    if id['countingEnd'] != None:
        dataRow.append(id['countingEnd'].encode("UTF-8"))
    else:
        dataRow.append('')

    for item in partyLists:
        dataRow.append(item['votesCount'])
    ps = json.dumps(id['partySingatures'])
    tmp=''
    for item in id['partySingatures']:

        sigName= item.get('name','')
        sigCount= item.get('signaturesCount','')
        tmp = tmp + sigName + ':' + sigCount +'  '

    dataRow.append(tmp.encode('utf8', 'replace'))
    try:
        f.writerow(dataRow)
    except UnicodeEncodeError:
        print dataRow
    return
def normaliseName (name):

    if name ==' قائمة  افاق تونس':

        newName = 'آفاق تونس'
        return newName
    elif name =='افاق تونس':

        newName = 'آفاق تونس'
        return newName
    elif name ==' قائمة  افاق تونس':

        newName = 'آفاق تونس'
        return newName
    elif name ==' أفاق تونس':

        newName = 'آفاق تونس'
        return newName
    elif name ==' قائمة  افاق تونس ':

        newName = 'آفاق تونس'
        return newName
    elif name =='افاق تونس':

        newName = 'آفاق تونس'
        return newName
    elif name =='الأتحاد الوطني الحر':

        newName = 'الاتحاد الوطني الحر'
        return newName
    elif name ==' قائمة حزب الاتحاد الوطنى الحر':

        newName = 'الاتحاد الوطني الحر'
        return newName
    elif name ==' قائمة الإتحاد الوطني الحرّ':

        newName = 'الاتحاد الوطني الحر'
        return newName
    elif name =='اتحاد الوطني الحر':

        newName = 'الاتحاد الوطني الحر'
        return newName
    elif name ==' قائمة حزب الاتحاد الوطنلا الحر':

        newName = 'الاتحاد الوطني الحر'
        return newName
    elif name =='الإتحاد الوطني الحر':

        newName = 'الاتحاد الوطني الحر'
        return newName
    elif name =='قائمة الجبهة الشعبية':

        newName ='الجبهة الشعبية'
        return newName
    elif name ==' الجبهة الشعبية':

        newName ='الجبهة الشعبية'
        return newName
    elif name ==' قائمة الجبهة الشعبية':

        newName ='الجبهة الشعبية'
        return newName
    elif name ==' الجبهة الشعبية ':

        newName ='الجبهة الشعبية'
        return newName

    elif name ==' قائمة حزب حركة النهضة ':

        newName ='حركة النهضة'
        return newName
    elif name ==' حزب حركة النهضة':

        newName ='حركة النهضة'
        return newName
    elif name =='قائمة حزب حركة النهضة':

        newName ='حركة النهضة'
        return newName
    elif name =='حزب حركة النهضة':

        newName ='حركة النهضة'
        return newName
    elif name ==' حركة النهضة ':

        newName ='حركة النهضة'
        return newName

    elif name =='نداء تونس':

        newName ='حركة نداء تونس'
        return newName
    elif name =='نداء تونس ':

        newName ='حركة نداء تونس'
        return newName
    elif name ==' قائمة حركة نداء تونس':

        newName ='حركة نداء تونس'
        return newName
    elif name ==' حركة نداء تونس':

        newName ='حركة نداء تونس'
        return newName
    elif name ==' نداء تونس':

        newName ='حركة نداء تونس'
        return newName
    elif name ==' حركة نداء تونس ':

        newName ='حركة نداء تونس'
        return newName
    else:
        return name


def exportCirc( circ ):
    r = requests.get("http://localhost:1337/legislatives/list/" + str(circ))
    pvList= r.json()['pvlist']

    pvDetails = readPv(pvList[0])
    pvv = json.loads(pvDetails)
    addHeader(pvv,circ)
    for pv in pvList:
        pvDetails= readPv(pv)
        pvv = json.loads(pvDetails)
        addData(pvv,circ)
    return

for i in range(1,28):
    exportCirc(i)
