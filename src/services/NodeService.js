import ApiService from './ApiService';

class NodeService {

    nodeObjectName = 'questions';
    nodeTitle = 'title';
    nodeText = 'question';
    xPosition = 'xPosition';
    yPosition = 'yPosition';

    constructor(authString, client) {
        this.authString = authString;
        this.client = client;
    }

    getNodes() {

        return ApiService.makeCall("http://localhost:8080/o/c/" + this.nodeObjectName + "/?fields=id%2C" + this.nodeTitle + "%2C" + this.nodeText + "%2C" + this.xPosition + "%2C" + this.yPosition, this.authString, this.client, "GET").then(data => {
            return data.items.map(item => ({
                id: item.id,
                nodeTitle: item[this.nodeTitle],
                nodeText: item[this.nodeText],
                xPosition: item[this.xPosition] ?? 0,
                yPosition: item[this.yPosition] ?? 0
            }));
        });

    }

    createNode(nodeTitle, nodeText, xPosition, yPosition) {
        
        const body = {
            [this.nodeTitle]: nodeTitle,
            [this.nodeText]: nodeText,
            [this.xPosition]: xPosition,
            [this.yPosition]: yPosition
        };
        return ApiService.makeCall("http://localhost:8080/o/c/" + this.nodeObjectName, this.authString, this.client, "POST", body).then(data => {
            return {
                id: data.id,
                nodeTitle: data[this.nodeTitle],
                nodeText: data[this.nodeText],
                xPosition: data[this.xPosition] ?? 0,
                yPosition: data[this.yPosition] ?? 0
            }
        });

    }

    updateNode(nodeId, nodeTitle, nodeText) {

        const body = {
            [this.nodeTitle]: nodeTitle,
            [this.nodeText]: nodeText
        };

        return ApiService.makeCall("http://localhost:8080/o/c/" + this.nodeObjectName + "/" + nodeId, this.authString, this.client, "PATCH", body);

    }

    updateNodePosition(nodeId, xPosition, yPosition) {

        const body = {
            [this.xPosition]: xPosition,
            [this.yPosition]: yPosition
        };

        return ApiService.makeCall("http://localhost:8080/o/c/" + this.nodeObjectName + "/" + nodeId, this.authString, this.client, "PATCH", body);

    }

    deleteNode(nodeId) {

        return ApiService.makeCall("http://localhost:8080/o/c/" + this.nodeObjectName + "/" + nodeId, this.authString, this.client, "DELETE");

    }

}

export default NodeService;