import React from 'react';
import ReactDOM from 'react-dom';
import GraphEditor from './GraphEditor';
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

    /* For Local Testing */
    username = 'test@test.intra';
    password = 'test1234';
    authString = `${this.username}:${this.password}`;

    client = "graph-editor-user-agent";

    baseURL = "http://localhost:8080/o/c/";

    treeObjectName = 'decisiontrees';
    treeNodesRelationshipName = 'decisionTreeQuestions';
    treeNodesRelationshipId = 'r_decisionTreeQuestions_c_decisionTreeId';
    treeEdgesRelationshipName = 'decisionTreeOptions';
    treeEdgesRelationshipId = 'r_decisionTreeOptions_c_decisionTreeId';
    treeLabel = 'decisionTreeName';

    nodeObjectName = 'questions';
    nodeTitle = 'title';
    nodeText = 'question';
    xPosition = 'xPosition';
    yPosition = 'yPosition';

    edgeObjectName = 'options';
    sourceRelationId = 'r_questionOption_c_questionId';
    targetRelationId = 'r_optionNextQuestion_c_questionId';
    edgeLabel = 'optionText';


    constructor() {
        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {

        this.renderReactComponent();

    }

    renderReactComponent() {
        const parentStyles = Array.from(document.styleSheets)
            .map((sheet) => {
                try {
                    return Array.from(sheet.cssRules)
                        .map((rule) => rule.cssText)
                        .join('');
                } catch (e) {
                    return '';
                }
            })
            .join('');

        ReactDOM.render(
            <ReactFlowProvider>  
                <GraphEditor
                    parentStyles={parentStyles} 
                    treeId={null}
                    treeService={new TreeService(this.baseURL, this.authString, this.client, this.treeObjectName, this.treeLabel)}
                    nodeService={new NodeService(this.baseURL, this.authString, this.client, this.nodeObjectName, this.treeObjectName, this.treeNodesRelationshipName, this.treeNodesRelationshipId, this.nodeTitle, this.nodeText, this.xPosition, this.yPosition)}
                    edgeService={new EdgeService(this.baseURL, this.authString, this.client, this.edgeObjectName, this.treeObjectName, this.treeEdgesRelationshipName, this.treeEdgesRelationshipId, this.sourceRelationId, this.targetRelationId, this.edgeLabel)}
                />
            </ReactFlowProvider>,
            this.shadowRoot
        );
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this.shadowRoot);
    }
}

const GRAPH_EDITOR_ELEMENT_ID = 'graph-editor';

if (!customElements.get(GRAPH_EDITOR_ELEMENT_ID)) {
	customElements.define(GRAPH_EDITOR_ELEMENT_ID, GraphEditorWebComponent);
}