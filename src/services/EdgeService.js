import ApiService from './ApiService';

class EdgeService {

    constructor(authString, client, edgeObjectName, sourceRelationId, targetRelationId, edgeLabel) {
        this.authString = authString;
        this.client = client;
        this.edgeLabel = edgeLabel;
        this.edgeObjectName = edgeObjectName;
        this.sourceRelationId = sourceRelationId;
        this.targetRelationId = targetRelationId;
    }

    getEdges() {

        return ApiService.makeCall("http://localhost:8080/o/c/" + this.edgeObjectName + "/?fields=id%2C" + this.edgeLabel + "%2C" + this.targetRelationId + "%2C" + this.sourceRelationId, this.authString, this.client, "GET").then(data => {
            return data.items.map(item => ({
                id: item.id,
                sourceNodeId: item[this.sourceRelationId],
                targetNodeId: item[this.targetRelationId],
                edgeLabel: item[this.edgeLabel]
            }));
        });

    }

    deleteEdge(edgeId) {

        return ApiService.makeCall("http://localhost:8080/o/c/" + this.edgeObjectName + "/" + edgeId, this.authString, this.client, "DELETE")

    }

    updateEdgeLabel(edgeId, newLabel) {

        const body = {
            [this.edgeLabel]: newLabel
        };

        return ApiService.makeCall("http://localhost:8080/o/c/" + this.edgeObjectName + "/" + edgeId, this.authString, this.client, "PATCH", body)

    }

    createEdge(sourceNodeId, targetNodeId, edgeLabel) {

        const body = {
            [this.edgeLabel]: edgeLabel,
            [this.targetRelationId]: targetNodeId,
            [this.sourceRelationId]: sourceNodeId
        };

        return ApiService.makeCall("http://localhost:8080/o/c/" + this.edgeObjectName + "/", this.authString, this.client, "POST", body).then(data => {
            return {
                id: data.id,
                edgeLabel: data[this.edgeLabel],
                sourceNodeId: data[this.sourceRelationId],
                targetNodeId: data[this.targetRelationId]
            }
        });

    }

}

export default EdgeService;
