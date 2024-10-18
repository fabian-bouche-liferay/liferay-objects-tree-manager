import ApiService from './ApiService';

class NodeService {

    constructor(baseURL, authString, client, nodeObjectName, treeObjectName, treeNodesRelationName, treeNodesRelationId, nodeTitle, nodeText, xPosition, yPosition) {
        this.baseURL = baseURL;
        this.authString = authString;
        this.client = client;
        this.nodeObjectName = nodeObjectName;
        this.treeObjectName = treeObjectName;
        this.treeNodesRelationName = treeNodesRelationName;
        this.treeNodesRelationId = treeNodesRelationId;
        this.nodeTitle = nodeTitle;
        this.nodeText = nodeText;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    getNodes(treeId) {

        return ApiService.makeCall(this.baseURL + this.treeObjectName + "/" + treeId + "/" + this.treeNodesRelationName + "/?fields=id%2C" + this.nodeTitle + "%2C" + this.nodeText + "%2C" + this.xPosition + "%2C" + this.yPosition, this.authString, this.client, "GET").then(data => {
            return data.items.map(item => ({
                id: item.id,
                nodeTitle: item[this.nodeTitle],
                nodeText: item[this.nodeText],
                xPosition: item[this.xPosition] ?? 0,
                yPosition: item[this.yPosition] ?? 0
            }));
        });

    }

    createNode(treeId, nodeTitle, nodeText, xPosition, yPosition) {
        
        const body = {
            [this.treeNodesRelationId]: treeId,
            [this.nodeTitle]: nodeTitle,
            [this.nodeText]: nodeText,
            [this.xPosition]: xPosition,
            [this.yPosition]: yPosition
        };
        return ApiService.makeCall(this.baseURL + this.nodeObjectName, this.authString, this.client, "POST", body).then(data => {
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

        return ApiService.makeCall(this.baseURL + this.nodeObjectName + "/" + nodeId, this.authString, this.client, "PATCH", body);

    }

    updateNodePosition(nodeId, xPosition, yPosition) {

        const body = {
            [this.xPosition]: xPosition,
            [this.yPosition]: yPosition
        };

        return ApiService.makeCall(this.baseURL + this.nodeObjectName + "/" + nodeId, this.authString, this.client, "PATCH", body);

    }

    deleteNode(nodeId) {

        return ApiService.makeCall(this.baseURL + this.nodeObjectName + "/" + nodeId, this.authString, this.client, "DELETE");

    }

}

export default NodeService;