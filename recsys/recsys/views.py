#from django.shortcuts import render
import json
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from boto import dynamodb2
import sys




def connectAWS():
	REGION = 'us-west-2'
	try:
		dynamoConn = dynamodb2.connect_to_region(REGION, aws_access_key_id=accessKey, aws_secret_access_key=secretKey)
	except Exception, e:
		print(e)
	sys.exit(1)

# Create your views here.
@csrf_exempt
def getRecs(request):
	limit = 0
	numberofAbstracts = 0 
	print request.body
	if request.method == 'POST':
		numberofAbstracts = numberofAbstracts + 1
		abstractList = request.body
		limit = 100 + numberofAbstracts
		if (numberofAbstracts > 0):
			#connectAWS()
			print numberofAbstracts
	return HttpResponse("success")
	#limit = request.size








