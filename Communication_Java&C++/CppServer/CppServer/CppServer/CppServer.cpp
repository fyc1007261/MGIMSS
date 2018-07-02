#include <stdio.h>  
#include <winsock2.h>  

#pragma comment(lib,"ws2_32.lib")  

#define CppPort 8085

int CppServer(int argc, char* argv[]) {
	//initialization
	WORD sockVersion = MAKEWORD(2, 2);
	WSADATA wsaData;
	if (WSAStartup(sockVersion, &wsaData) != 0) {
		return -1;
	}

	//create socket
	SOCKET slisten = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
	if (slisten == INVALID_SOCKET) {
		printf("socket error !");
		return -1;
	}

	//bind IP and port
	sockaddr_in sin;
	sin.sin_family = AF_INET;
	sin.sin_port = htons(CppPort);
	sin.sin_addr.S_un.S_addr = INADDR_ANY;
	if (bind(slisten, (LPSOCKADDR)&sin, sizeof(sin)) == SOCKET_ERROR) {
		printf("bind error !");
	}

	//start listening
	if (listen(slisten, 5) == SOCKET_ERROR) {
		printf("listen error !");
		return 0;
	}

	//while loop to receive data
	SOCKET sClient;
	sockaddr_in remoteAddr;
	int nAddrlen = sizeof(remoteAddr);
	char revData[255];
	while (true) {
		printf("Waiting for connection...\n");
		sClient = accept(slisten, (SOCKADDR *)&remoteAddr, &nAddrlen);
		if (sClient == INVALID_SOCKET) {
			printf("accept error !\n");
			continue;
		}
		printf("Connection from£º%s \r\n", inet_ntoa(remoteAddr.sin_addr));

		//receive data
		int ret = recv(sClient, revData, 255, 0);
		if (ret > 0) {
			revData[ret] = 0x00;
			printf(revData);
			printf("\n");
		}

		//send data
		const char * sendData = "Hello Java Client!\n";
		send(sClient, sendData, strlen(sendData), 0);
		closesocket(sClient);
	}

	closesocket(slisten);
	WSACleanup();
	return 0;
}

int main(int argc, char* argv[]) {
	CppServer(argc, argv);
	return 0;
}