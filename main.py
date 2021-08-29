import requests
import os
import xmltodict

BASE_URL = 'https://e-commerce.kapitalbank.az'
PORT='5443'

CERT_FILE = os.getenv("KAPITAL_CERT_FILE", "./taskilled.crt")
KEY_FILE = os.getenv("KAPITAL_KEY_FILE", "./merchant_name.key")

# from requests.packages.urllib3.exceptions import InsecureRequestWarning
# requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

def post(data):
      headers = {'Content-Type': 'application/xml'} 
      r = requests.post(
            f'{BASE_URL}:{PORT}/Exec',
            data=data,
            verify=False,
            headers=headers,
            cert=(CERT_FILE, KEY_FILE)
        )
      return r.text

data = """<?xml version="1.0" encoding="UTF-8"?>
<TKKPG>
      <Request>
              <Operation>CreateOrder</Operation>
              <Language>RU</Language>
              <Order>
                    <OrderType>Purchase</OrderType>
                    <Merchant>E1180054</Merchant>
                    <Amount>2500</Amount>
                    <Currency>944</Currency>
                    <Description>xxxxxxxx</Description>
                    <ApproveURL>/testshopPageReturn.jsp</ApproveURL>
                    <CancelURL>/testshopPageReturn.jsp</CancelURL>
                    <DeclineURL>/testshopPageReturn.jsp</DeclineURL>
              </Order>
      </Request>
</TKKPG>"""

response = post(data)

dict_resp = xmltodict.parse(response)

print(dict_resp['TKKPG']['Response']['Order']['URL'])






# res = requests.post('https://e-commerce.kapitalbank.az:5443/Exec', data=xml, headers=headers, verify='/Users/muradaghazada/Desktop/Projects/taskilled/cert.pem')

# print(res.content)