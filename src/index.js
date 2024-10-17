import React from 'react';
import ReactDOM from 'react-dom';
import GraphEditor from './GraphEditor';
import "./GraphEditor.css";
import '@xyflow/react/dist/style.css';
import '@clayui/css/lib/css/atlas.css';

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
                    nodeService={new NodeService(this.authString, this.client)}
                    edgeService={new EdgeService(this.authString, this.client)}
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