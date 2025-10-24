import ApiService from './ApiService';

class TreeService {

    constructor(baseURL, treeObjectName, treeLabel) {
        this.baseURL = baseURL;
        this.treeObjectName = treeObjectName;
        this.treeLabel = treeLabel;
    }

    getTrees() {

        return ApiService.makeCall(this.baseURL + this.treeObjectName + "/?fields=id%2C" + this.treeLabel, "GET").then(data => {
            return data.items.map(item => ({
                id: item.id,
                treeLabel: item[this.treeLabel]
            }));
        });

    }

    getTree(erc) {

        return ApiService.makeCall(this.baseURL + this.treeObjectName + "/by-external-reference-code/" + erc + "/?fields=id", "GET").then(data => {
            return data;
        });

    }

}

export default TreeService;
