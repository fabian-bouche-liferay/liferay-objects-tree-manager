import ApiService from './ApiService';

class TreeService {

    constructor(authString, client, treeObjectName, treeLabel) {
        this.authString = authString;
        this.client = client;
        this.treeObjectName = treeObjectName;
        this.treeLabel = treeLabel;
    }

    getTrees() {

        return ApiService.makeCall("http://localhost:8080/o/c/" + this.treeObjectName + "/?fields=id%2C" + this.treeLabel, this.authString, this.client, "GET").then(data => {
            return data.items.map(item => ({
                id: item.id,
                treeLabel: item[this.treeLabel]
            }));
        });

    }

}

export default TreeService;
