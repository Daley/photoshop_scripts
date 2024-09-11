import requests
from uhf.reader import *
from time import *

# 全局变量

connected=False
g_client=GClient()
## post 参数 rfid
url="http://106.14.157.122/rfid/scanRfid"

reqDict={}

def receivedEpc(epcInfo: LogBaseEpcInfo):
    #当前时间
    now = time()
    if epcInfo.result == 0:
        print(epcInfo.epc , epcInfo.tid)
        myTime=reqDict.get(epcInfo.epc)
        if(reqDict.get(epcInfo.epc)==None or now-myTime>180):   # 3分钟内不重复请求
            reqDict[epcInfo.epc]=now
            # post
            data = {'rfid':epcInfo.epc,'app':'pay'}
            r = requests.post(url, data = data)
            print(r.text)



def receivedEpcOver(epcOver: LogBaseEpcOver):
    print("LogBaseEpcOver")

def waitAndContinue(self,addr):
    global connected
    connected=False
    print("tcp disconnect",addr)
    while True:
        print("状态检测",connected)
        if(connected):
            break
        sleep(5)
        connectAndWait()

def connectAndWait():
    global connected
    print("----- 开始链接")
    
    # if g_client.openSerial(("COM7", 115200)):
    if g_client.openTcp(("172.16.74.17", 8160)):
        print("连接成功")
        # 修改全局变量
        connected=True
        # 读epc
        msg = MsgBaseInventoryEpc(antennaEnable=EnumG.AntennaNo_4.value,
                                  inventoryMode=EnumG.InventoryMode_Inventory.value)

        # 匹配TID读 E280110520007993A8F708A8 可选参数
        # epc_filter = ParamEpcFilter(EnumG.ParamFilterArea_TID.value, 0, "E280110520007993A8F708A8")
        # msg.filter = epc_filter

        # 读TID 默认只读EPC 可选参数
        tid = ParamEpcReadTid(mode=EnumG.ParamTidMode_Auto.value, dataLen=6)
        msg.readTid = tid
        # 读UserData 可选参数
        # userData = ParamEpcReadUserData(start=0, dataLen=4)  # word
        # msg.readUserData = userData

        # 读保留区 可选参数
        # reserved = ParamEpcReadReserved(start=0, dataLen=4)  # word
        # msg.readReserved = reserved

        if g_client.sendSynMsg(msg) == 0:
            print("盘点",msg.rtMsg)

        # stop = MsgBaseStop()
        # if g_client.sendSynMsg(stop) == 0:
        #     print(stop.rtMsg)

        # g_client.close()


if __name__ == '__main__':
    g_client.callEpcInfo = receivedEpc
    g_client.callEpcOver = receivedEpcOver
    g_client.callTcpDisconnect = waitAndContinue
    
    waitAndContinue("","init")
    while(True):
        sleep(3)
        print("++++  waiting")
