import ApiService from './ApiService';

class NodeService {

    //new NodeService(this.baseURL, this.authString, this.client, this.nodeObjectName, this.treeObjectName, this.treeNodesRelationshipName, this.treeNodesRelationshipId, this.nodeTitle, this.nodeText, this.nodeRoot, this.xPosition, this.yPosition)}

    constructor(baseURL, nodeObjectName, treeObjectName, treeNodesRelationName, treeNodesRelationId, nodeTitle, nodeText, nodeRoot, xPosition, yPosition) {
        this.baseURL = baseURL;
        this.nodeObjectName = nodeObjectName;
        this.treeObjectName = treeObjectName;
        this.treeNodesRelationName = treeNodesRelationName;
        this.treeNodesRelationId = treeNodesRelationId;
        this.nodeTitle = nodeTitle;
        this.nodeText = nodeText;
        this.nodeRoot = nodeRoot;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    getStartNode(treeId) {
       
        return ApiService.makeCall(this.baseURL + this.treeObjectName + "/" + treeId + "/" + this.treeNodesRelationName + "/?fields=id%2C" + this.nodeRoot, "GET").then(data => {
            return data.items.filter(item => {return item[this.nodeRoot]}).map(item => ({
                id: item.id
            }))
        });

    }

    getNodes(treeId) {

        return ApiService.makeCall(this.baseURL + this.treeObjectName + "/" + treeId + "/" + this.treeNodesRelationName + "/?pageSize=500&fields=id%2C" + this.nodeRoot + "%2C"+ this.nodeTitle + "%2C" + this.nodeText + "%2C" + this.xPosition + "%2C" + this.yPosition, "GET").then(data => {
            return data.items.map(item => ({
                id: item.id,
                nodeTitle: item[this.nodeTitle],
                nodeText: item[this.nodeText],
                nodeRoot: item[this.nodeRoot],
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
            [this.nodeRoot]: false,
            [this.xPosition]: xPosition,
            [this.yPosition]: yPosition
        };
        return ApiService.makeCall(this.baseURL + this.nodeObjectName, "POST", body).then(data => {
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

        return ApiService.makeCall(this.baseURL + this.nodeObjectName + "/" + nodeId, "PATCH", body);

    }

    setNodeAsStart(nodeId) {

        ApiService.makeCall(this.baseURL + this.nodeObjectName + "/" + nodeId + "?fields=id%2C" + this.treeNodesRelationId, "GET").then(data => {

            this.getNodes(data[this.treeNodesRelationId]).then(nodes => {

                nodes.forEach(node => {
    
                    let body = {
                        [this.nodeRoot]: node.id == nodeId
                    }
                    ApiService.makeCall(this.baseURL + this.nodeObjectName + "/" + node.id, "PATCH", body);
    
                });
    
            });
    

        });

    }

    updateNodePosition(nodeId, xPosition, yPosition) {

        const body = {
            [this.xPosition]: xPosition,
            [this.yPosition]: yPosition
        };

        return ApiService.makeCall(this.baseURL + this.nodeObjectName + "/" + nodeId, "PATCH", body);

    }

    deleteNode(nodeId) {

        return ApiService.makeCall(this.baseURL + this.nodeObjectName + "/" + nodeId, "DELETE");

    }

}

export default NodeService;