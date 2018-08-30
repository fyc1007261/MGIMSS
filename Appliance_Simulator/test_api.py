import requests


username = "534949863394MsG8x"
password = "FG5flab"
#
# http://api.data.cma.cn:8090/api?userId=<帐号>&pwd=<密码>&dataFormat=json&
#     interfaceId=getRadiEleByTimeRangeAndStaID&dataCode=RADI_CHN_MUL_HOR2400&
#     timeRange=<时间范围>&staIds=<台站列表>&elements=<要素列表>
# 其中，userId，pwd：分配给您的帐号和密码，从订单中获取
#           dataFormat：返回的数据格式，目前仅支持json格式
#           staIDs：站号，支持1-30个站点，多个站点之间以“,”分隔，参见中国地面气象站点清单文档
#           interfaceId：此数据的接口ID，值为getRadiEleByTimeRangeAndStaID
#           dataCode：此数据的编码，中国2000余站太阳总辐射逐小时资料的编码为RADI_CHN_MUL_HOR2400
#           timeRange：时间范围，支持最近7天的数据访问，格式为“[YYYYMMDDHHMISS,YYYYMMDDHHMISS]”
#           elements：返回数据字段，多个字段之间使用“,”分隔，<要素列表>为您订单中订制的要素，参见辐射要素清单

args = {"userID": username, "pwd": password, "dataFormat": "json", "staIDs": 58361,
        "interfaceId": "getRadiEleByTimeRangeAndStaID", "dataCode": "RADI_CHN_MUL_HOR2400",
        "timeRange": "[20180708000000,20180709000000]", "elements": "V14311"
        }
r = requests.get("http://api.data.cma.cn:8090/api", args)
if __name__ == "__main__":
        print(r.text)
