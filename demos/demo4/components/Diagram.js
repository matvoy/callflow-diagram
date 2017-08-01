import React from 'react';
import _ from 'lodash';
import { DropTarget } from 'react-dnd';
import * as RJD from '../../../src/main';
import { StartNodeModel } from './nodes/start/StartNodeModel';
import { StopNodeModel } from './nodes/stop/StopNodeModel';
import { AnswerNodeModel } from './nodes/answer/AnswerNodeModel';
import { HangupNodeModel } from './nodes/hangup/HangupNodeModel';
import { PlaybackNodeModel } from './nodes/playback/PlaybackNodeModel';
import { LogNodeModel } from './nodes/log/LogNodeModel';
import { LogicNodeModel } from './nodes/if/LogicNodeModel';
import { QueueNodeModel } from './nodes/queue/QueueNodeModel';
import { QueueTimerNodeModel } from './nodes/queue_timer/QueueTimerNodeModel';
import { SleepNodeModel } from './nodes/sleep/SleepNodeModel';
import { EchoNodeModel } from './nodes/echo/EchoNodeModel';
import { RecordFileNodeModel } from './nodes/recordFile/RecordFileNodeModel';
import { RecordSessionNodeModel } from './nodes/recordSession/RecordSessionNodeModel';
import { SwitchNodeModel } from './nodes/switch/SwitchNodeModel';
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
    if (item.type === 'log') {
      node = new LogNodeModel('Log', item.color);
    }
    if (item.type === 'if') {
      node = new LogicNodeModel('If', item.color);
    }
    if (item.type === 'queue') {
        node = new QueueNodeModel('Queue', item.color);
    }
    if (item.type === 'queueTimer') {
        node = new QueueTimerNodeModel('Queue Timer', item.color);
    }
    if (item.type === 'sleep') {
      node = new SleepNodeModel('Sleep', item.color);
    }
    if (item.type === 'echo') {
      node = new EchoNodeModel('Echo', item.color);
    }
    if (item.type === 'recordFile') {
      node = new RecordFileNodeModel('Record File', item.color);
    }
    if (item.type === 'recordSession') {
      node = new RecordSessionNodeModel('Record Session', item.color);
    }
    if (item.type === 'switch') {
      node = new SwitchNodeModel('Switch', item.color);
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

  clearOffsets(model){
    model.offsetX = 0;
    model.offsetY = 0;
    model.zoom = 100;
    this.setModel(model);
    this.forceUpdate();
  }

  checkTimers(model, linkModel){
      if(linkModel.sourcePort.name === 'timers') {
          if (linkModel.targetPort.parentNode.nodeType !== 'queueTimer') {
              for (let i = 0; i < model.links.length; i++)
                  if (model.links[i].id === linkModel.id) model.links.splice(i, 1);
              return;
          }
          if (Object.keys(linkModel.targetPort.links).length !== 1) {
              for (let i = 0; i < model.links.length; i++) {
                  if (model.links[i].id === linkModel.id) continue;
                  if (model.links[i].targetPort === linkModel.targetPort.id || model.links[i].sourcePort === linkModel.targetPort.id) {
                      model.links.splice(i, 1);
                      i--;
                  }
              }
          }
      }
      else {
          if(linkModel.sourcePort.parentNode.nodeType !== 'queueTimer'){
              for(let i=0;i<model.links.length;i++)
                  if(model.links[i].id === linkModel.id) model.links.splice(i, 1);
              return;
          }
          if(Object.keys(linkModel.sourcePort.links).length !== 1) {
              for(let i = 0; i < model.links.length; i++){
                  if(model.links[i].id === linkModel.id) continue;
                  if(model.links[i].targetPort === linkModel.sourcePort.id || model.links[i].sourcePort === linkModel.sourcePort.id){
                      model.links.splice(i,1);
                      i--;
                  }
              }
          }
      }
  }

  checkLinks(model, linkModel) {
    //BASE RULES
    if(linkModel.sourcePort.in === linkModel.targetPort.in
        || linkModel.sourcePort.parentNode.id === linkModel.targetPort.parentNode.id) {
      for(let i=0;i<model.links.length;i++)
        if(model.links[i].id === linkModel.id) model.links.splice(i, 1);
    }
    else{
      //TIMERS
      if(linkModel.sourcePort.name === 'timers' || linkModel.targetPort.name === 'timers'){
          this.checkTimers(model, linkModel);
          return;
      }
      //QUEUE TIMER INPUT
      if((linkModel.sourcePort.name !== 'timers' &&  linkModel.targetPort.parentNode.nodeType === 'queueTimer' && linkModel.targetPort.in)
          || (linkModel.targetPort.name !== 'timers' &&  linkModel.sourcePort.parentNode.nodeType === 'queueTimer' && linkModel.sourcePort.in))
          for(let i=0;i<model.links.length;i++)
              if(model.links[i].id === linkModel.id) model.links.splice(i, 1);
      //ONE LINK ON PORT
      for(let i = 0; i < model.links.length; i++) {
          if(model.links[i].id === linkModel.id) continue;
          if(model.links[i].sourcePort === linkModel.sourcePort.id || model.links[i].sourcePort === linkModel.targetPort.id
              || model.links[i].targetPort === linkModel.sourcePort.id || model.links[i].targetPort === linkModel.targetPort.id) {
              model.links.splice(i,1);
              i--;
          }
      }
    }
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
    const { connectDropTarget, model, onUndo, onRedo, canUndo, canRedo} = this.props;
    let isOffset = !model || (model && (model.offsetX == 0 && model.offsetY == 0 && model.zoom == 100));
    // Render the canvas
    return connectDropTarget (
      <div className='diagram-drop-container'>
        <div className="do-buttons-container">
          <a onClick={!isOffset ? () => {this.clearOffsets(model)} : null} disabled={isOffset} className="target-img">
          </a>
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
