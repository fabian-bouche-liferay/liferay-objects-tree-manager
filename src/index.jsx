import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import GraphEditor from './GraphEditor';
import GraphNavigator from './GraphNavigator';
import "./GraphEditor.css";
import '@xyflow/react/dist/style.css';
import '@clayui/css/lib/css/atlas.css';

import TreeService from './services/TreeService';
import NodeService from './services/NodeService';
import EdgeService from './services/EdgeService';

import {
    ReactFlowProvider,
  } from '@xyflow/react';

class GraphEditorWebComponent extends HTMLElement {

    baseURL = "http://localhost:8080/o/c/";

    constructor() {
        super();
        this._reactRoot = null;
        this._rootInstance = null;
    }

    connectedCallback() {
        if (!this.querySelector('.react-root')) {
            const reactRoot = document.createElement('div');
            reactRoot.className = 'react-root';
            this.appendChild(reactRoot);
        }

        this._renderReact();
    }

    disconnectedCallback() {
        if (this._rootInstance) {
            this._rootInstance.unmount();
            this._rootInstance = null;
        }
    }

    _renderReact() {
        const reactRoot = this.querySelector('.react-root');
        if (reactRoot) {
            if (!this._rootInstance) {
                this._rootInstance = createRoot(reactRoot);
            }

            const nodeObjectName = this.querySelector("node").getAttribute('object-name'); 
            const nodeObjectNamePlural = this.querySelector("node").getAttribute('object-name-plural');
            const nodeTitle = this.querySelector("node").getAttribute('label');
            const nodeText = this.querySelector("node").getAttribute('text');
            const nodeRoot = this.querySelector("node").getAttribute('root');
            const xPosition = this.querySelector("node").getAttribute('x');
            const yPosition = this.querySelector("node").getAttribute('y');

            const edgeObjectName = this.querySelector("edge").getAttribute('object-name');
            const edgeObjectNamePlural = this.querySelector("edge").getAttribute('object-name-plural');
            const sourceRelationName = this.querySelector("edge").getAttribute('source-relationship');
            const targetRelationName = this.querySelector("edge").getAttribute('target-relationship');
            const edgeLabel = this.querySelector("edge").getAttribute('label');

            const treeObjectName = this.querySelector("tree").getAttribute('object-name');
            const treeObjectNamePlural = this.querySelector("tree").getAttribute('object-name-plural');
            const treeNodesRelationshipName = this.querySelector("tree").getAttribute('node-belongs-relationship');
            const treeEdgesRelationshipName = this.querySelector("tree").getAttribute('edge-belongs-relationship');
            const treeLabel = this.querySelector("tree").getAttribute('label');

            const edgeDptBaseUrl = this.getAttribute("edge-dpt-base-url");
            const nodeDptBaseUrl = this.getAttribute("node-dpt-base-url");

            const sourceRelationId = 'r_' + sourceRelationName + '_c_' + nodeObjectName + 'Id';
            const targetRelationId = 'r_' + targetRelationName + '_c_' + nodeObjectName + 'Id';

            const treeNodesRelationshipId = 'r_' + treeNodesRelationshipName + '_c_' + treeObjectName + 'Id';
            const treeEdgesRelationshipId = 'r_' + treeEdgesRelationshipName + '_c_' + treeObjectName + 'Id';

            const portalBaseUrl = this.getAttribute("portal-base-url");

            this._rootInstance.render(
                <ReactFlowProvider>  
                    <GraphEditor
                        edgeDptBaseUrl={edgeDptBaseUrl}
                        nodeDptBaseUrl={nodeDptBaseUrl}
                        treeId={null}
                        treeService={new TreeService(portalBaseUrl, treeObjectNamePlural, treeLabel)}
                        nodeService={new NodeService(portalBaseUrl, nodeObjectNamePlural, treeObjectNamePlural, treeNodesRelationshipName, treeNodesRelationshipId, nodeTitle, nodeText, nodeRoot, xPosition, yPosition)}
                        edgeService={new EdgeService(portalBaseUrl, edgeObjectNamePlural, treeObjectNamePlural, treeEdgesRelationshipName, treeEdgesRelationshipId, sourceRelationId, targetRelationId, edgeLabel)}
                    />
                </ReactFlowProvider>
            );
        }
    }

}

class GraphNavigatorWebComponent extends HTMLElement {

    baseURL = "http://localhost:8080/o/c/";

    constructor() {
        super();
        this._reactRoot = null;
        this._rootInstance = null;
    }

    connectedCallback() {
        if (!this.querySelector('.react-root')) {
            const reactRoot = document.createElement('div');
            reactRoot.className = 'react-root';
            this.appendChild(reactRoot);
        }

        this._renderReact();
    }

    disconnectedCallback() {
        if (this._rootInstance) {
            this._rootInstance.unmount();
            this._rootInstance = null;
        }
    }

    _renderReact() {
        const reactRoot = this.querySelector('.react-root');
        if (reactRoot) {
            if (!this._rootInstance) {
                this._rootInstance = createRoot(reactRoot);
            }

            const nodeObjectName = this.querySelector("node").getAttribute('object-name'); 
            const nodeObjectNamePlural = this.querySelector("node").getAttribute('object-name-plural');
            const nodeTitle = this.querySelector("node").getAttribute('label');
            const nodeText = this.querySelector("node").getAttribute('text');
            const nodeRoot = this.querySelector("node").getAttribute('root');
            const xPosition = this.querySelector("node").getAttribute('x');
            const yPosition = this.querySelector("node").getAttribute('y');

            const edgeObjectName = this.querySelector("edge").getAttribute('object-name');
            const edgeObjectNamePlural = this.querySelector("edge").getAttribute('object-name-plural');
            const sourceRelationName = this.querySelector("edge").getAttribute('source-relationship');
            const targetRelationName = this.querySelector("edge").getAttribute('target-relationship');
            const edgeLabel = this.querySelector("edge").getAttribute('label');

            const treeObjectName = this.querySelector("tree").getAttribute('object-name');
            const treeObjectNamePlural = this.querySelector("tree").getAttribute('object-name-plural');
            const treeNodesRelationshipName = this.querySelector("tree").getAttribute('node-belongs-relationship');
            const treeEdgesRelationshipName = this.querySelector("tree").getAttribute('edge-belongs-relationship');
            const treeLabel = this.querySelector("tree").getAttribute('label');

            const edgeDptBaseUrl = this.getAttribute("edge-dpt-base-url");
            const nodeDptBaseUrl = this.getAttribute("node-dpt-base-url");

            const sourceRelationId = 'r_' + sourceRelationName + '_c_' + nodeObjectName + 'Id';
            const targetRelationId = 'r_' + targetRelationName + '_c_' + nodeObjectName + 'Id';

            const treeNodesRelationshipId = 'r_' + treeNodesRelationshipName + '_c_' + treeObjectName + 'Id';
            const treeEdgesRelationshipId = 'r_' + treeEdgesRelationshipName + '_c_' + treeObjectName + 'Id';

            const treeERC = this.getAttribute("tree-erc");

            const portalBaseUrl = this.getAttribute("portal-base-url");

            this._rootInstance.render(
                <GraphNavigator
                    edgeDptBaseUrl={edgeDptBaseUrl}
                    nodeDptBaseUrl={nodeDptBaseUrl}
                    treeERC={treeERC}
                    treeService={new TreeService(portalBaseUrl, treeObjectNamePlural, treeLabel)}
                    nodeService={new NodeService(portalBaseUrl, nodeObjectNamePlural, treeObjectNamePlural, treeNodesRelationshipName, treeNodesRelationshipId, nodeTitle, nodeText, nodeRoot, xPosition, yPosition)}
                    edgeService={new EdgeService(portalBaseUrl, edgeObjectNamePlural, treeObjectNamePlural, treeEdgesRelationshipName, treeEdgesRelationshipId, sourceRelationId, targetRelationId, edgeLabel)}
                />
            );
        }
    }    

}

const GRAPH_EDITOR_ELEMENT_ID = 'graph-editor';

if (!customElements.get(GRAPH_EDITOR_ELEMENT_ID)) {
	customElements.define(GRAPH_EDITOR_ELEMENT_ID, GraphEditorWebComponent);
}

const GRAPH_NAVIGATOR_ELEMENT_ID = 'graph-navigator';

if (!customElements.get(GRAPH_NAVIGATOR_ELEMENT_ID)) {
	customElements.define(GRAPH_NAVIGATOR_ELEMENT_ID, GraphNavigatorWebComponent);
}