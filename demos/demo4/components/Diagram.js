import React from 'react';
import _ from 'lodash';
import { DropTarget } from 'react-dnd';
import * as RJD from '../../../src/main';
import { StartNodeModel } from './nodes/start/StartNodeModel';
import { StopNodeModel } from './nodes/stop/StopNodeModel';
import { AnswerNodeModel } from './nodes/answer/AnswerNodeModel';
import { HangupNodeModel } from './nodes/hangup/HangupNodeModel';
import { PlaybackNodeModel } from './nodes/playback/PlaybackNodeModel';
import { diagramEngine } from './Engine';

// Setup the diagram model
let diagramModel = new RJD.DiagramModel();

const nodesTarget = {
  drop(props, monitor, component) {
    const { x: pageX, y: pageY } = monitor.getSourceClientOffset();
    const { left = 0, top = 0 } = diagramEngine.canvas.getBoundingClientRect();
    const { offsetX, offsetY } = diagramEngine.diagramModel;
    const x = pageX - left - offsetX;
    const y = pageY - top - offsetY;
    const item = monitor.getItem();

    let node;
    if (item.type === 'start') {
      node = new StartNodeModel('Start', item.color);
    }
    if (item.type === 'stop') {
      node = new StopNodeModel('Stop', item.color);
    }
    if (item.type === 'answer') {
      node = new AnswerNodeModel('Answer', item.color);
    }
    if (item.type === 'hangup') {
      node = new HangupNodeModel('Hangup', item.color);
    }
    if (item.type === 'playback') {
      node = new PlaybackNodeModel('Playback', item.color);
    }

    node.x = x;
    node.y = y;

    if (node.nodeType === 'start') {
      for (let startNode in diagramModel.nodes) {
          if (diagramModel.nodes[startNode].nodeType === 'start') return;
      }
    }
    diagramModel.addNode(node);
    props.updateModel(diagramModel.serializeDiagram());
  },
};

@DropTarget('node-source', nodesTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export class Diagram extends React.Component {
  componentDidMount() {
    const { model } = this.props;
    if (model) {
      this.setModel(model);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.model, nextProps.model)) {
      this.setModel(nextProps.model);
    }
  }

  setModel(model) {
    diagramModel = new RJD.DiagramModel();
    if (model) {
      diagramModel.deSerializeDiagram(model, diagramEngine);
    }
    diagramEngine.setDiagramModel(diagramModel);
  }

  checkLinks(model, linkModel) {
    if(linkModel.sourcePort.in === linkModel.targetPort.in
        || linkModel.sourcePort.parentNode.id === linkModel.targetPort.parentNode.id) {
      for(let i=0;i<model.links.length;i++)
        if(model.links[i].id === linkModel.id) model.links.splice(i, 1);
    }
    else{
        for(let i=0; i<model.links.length; i++) {
            if(model.links[i].id===linkModel.id)continue;
            if(model.links[i].sourcePort === linkModel.sourcePort.id || model.links[i].sourcePort === linkModel.targetPort.id
                || model.links[i].targetPort === linkModel.sourcePort.id || model.links[i].targetPort === linkModel.targetPort.id) {
                model.links.splice(i,1);
                i--;
            }
        }
    }
    this.props.updateModel(model);
  }

  onChange(model, action) {
    console.log('ON DIAGRAM CHANGE');
    console.log(action);

    // Ignore some events
    if (['items-copied'].indexOf(action.type) !== -1) {
      return;
    }

    // Check for links
    if(['link-connected'].indexOf(action.type) !== -1){
      this.checkLinks(model, action.linkModel);
    }

    // Check for single selected items
    if (['node-selected', 'node-moved'].indexOf(action.type) !== -1) {
      return this.props.updateModel(model, { selectedNode: action.model });
    }

    // Check for canvas events
    const deselectEvts = ['canvas-click', 'canvas-drag', 'items-selected', 'items-drag-selected', 'items-moved'];
    if (deselectEvts.indexOf(action.type) !== -1) {
      return this.props.updateModel(model, { selectedNode: null });
    }

    // Check if this is a deselection and a single node exists
    const isDeselect = ['node-deselected', 'link-deselected'].indexOf(action.type) !== -1;
    if (isDeselect && action.items.length < 1 && action.model.nodeType) {
      return this.props.updateModel(model, { selectedNode: action.model });
    }

    this.props.updateModel(model);
  }

  render() {
    const { connectDropTarget, onUndo, onRedo, canUndo, canRedo} = this.props;

    // Render the canvas
    return connectDropTarget (
      <div className='diagram-drop-container'>
        <div className="do-buttons-container">
          <a onClick={canUndo ? onUndo : null} disabled={!canUndo} className="undo-img">
          </a>
          <a onClick={canRedo ? onRedo : null} disabled={!canRedo} className="redo-img">
          </a>
        </div>
        <RJD.DiagramWidget diagramEngine={diagramEngine} onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}