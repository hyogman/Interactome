#from django.shortcuts import render
import json
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from boto import dynamodb2
import sys
import csv
import logging
import argparse
import time
from boto.s3.key import Key
from boto.dynamodb2.table import Table
from boto import s3
import urllib2, urllib
import requests

SECRET_KEY_EXCEL_FIELD = 'Secret Access Key'
ACCESS_KEY_EXCEL_FIELD = 'Access Key Id'

#this function is essentially the main it maps to the url /recs/ and 
# for some reason I cannot call other functions out of here, it needs to be mapped to new URL
@csrf_exempt
def getRecs(request):
	limit = 0
	numberOfAbstracts = 0 
	sendDataBack = ' '
	if request.method == 'POST':
		jsonFile = json.loads(request.body)
		numberOfAbstracts = jsonFile['numAbstracts']
		sendDataBack = jsonFile['list']
		limit = 100 + numberOfAbstracts
		print numberOfAbstracts
		if (numberOfAbstracts > 0):
		# does authentication for AWS, will not need this when EC2 is running. 
			REGION = 'us-west-2'
			try:
				csvfile = open('/Users/henryyogman/Desktop/credentials.csv', 'rU')
				reader = csv.DictReader(csvfile) 
				authLine = reader.next()	
				accessKey = authLine[ACCESS_KEY_EXCEL_FIELD]
				secretKey = authLine[SECRET_KEY_EXCEL_FIELD]
				db = dynamodb2.connect_to_region(REGION, aws_access_key_id=accessKey, aws_secret_access_key=secretKey)
				#scan through table 
				scanResults = db.scan('Paper', attributes_to_get= ['Id'], limit = numberOfAbstracts)
				print scanResults 
				



			except Exception, e:
				print "failed to connect!"
				print(e)
			
	# Send back JsonFile to angular
		
		#sendDataBack = requests.post("http://127.0.0.1:9000/#/", params=jsonFile)
		#print jsonFile
	return HttpResponse(sendDataBack)


	#limit = request.size









