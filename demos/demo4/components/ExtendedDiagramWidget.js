/**
 * Created by matvij on 02.08.17.
 */
import React from 'react';
import _ from 'lodash';
// import { DiagramModel } from '../DiagramModel';
// import { PointModel, NodeModel, LinkModel, PortModel } from '../Common';
// import { SelectingAction, MoveCanvasAction, MoveItemsAction } from './actions';
// import { LinkLayerWidget } from './LinkLayerWidget';
// import { NodeLayerWidget } from './NodeLayerWidget';
// import { Toolkit } from '../Toolkit';
import * as RJD from '../../../src/main';

export class ExtendedDiagramWidget extends RJD.DiagramWidget {

    componentDidMount() {
        const { diagramEngine, onChange } = this.props;
        diagramEngine.setCanvas(this.refs['canvas']);
        diagramEngine.setForceUpdate(this.forceUpdate.bind(this));
        const { selectAll, deselectAll, copy, paste, deleteItems } = this.getActions();

        // Add a keyboard listener
        this.setState({
            renderedNodes: true,
            windowListener: window.addEventListener('keydown', event => {
                const selectedItems = diagramEngine.getDiagramModel().getSelectedItems();
                const ctrl = (event.metaKey || event.ctrlKey);

                // Select all
                if (event.keyCode === 65 && ctrl && selectAll) {
                    this.selectAll(true);
                    event.preventDefault();
                    event.stopPropagation();
                }

                // Deselect all
                if (event.keyCode === 68 && ctrl && deselectAll) {
                    this.selectAll(false);
                    event.preventDefault();
                    event.stopPropagation();
                }

                // Copy selected
                if (event.keyCode === 67 && ctrl && selectedItems.length && copy) {
                    this.copySelectedItems(selectedItems);
                }

                // Paste from clipboard
                if (event.keyCode === 86 && ctrl && this.state.clipboard && paste) {
                    this.pasteSelectedItems(selectedItems);
                }

                // Delete all selected
                if ([46].indexOf(event.keyCode) !== -1 && selectedItems.length && deleteItems) {
                    selectedItems.forEach(element => {
                        element.remove();
                    });

                    onChange(diagramEngine.getDiagramModel().serializeDiagram(), { type: 'items-deleted', items: selectedItems });
                    this.forceUpdate();
                }
            })
        });
        window.focus();
    }
}
