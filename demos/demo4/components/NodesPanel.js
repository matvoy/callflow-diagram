import React from 'react';
import { DragWrapper } from './DragWrapper';
import { StartNodeWidget } from './nodes/start/StartNodeWidget';
import { StopNodeWidget } from './nodes/stop/StopNodeWidget';
import { AnswerNodeWidget } from './nodes/answer/AnswerNodeWidget';
import { HangupNodeWidget } from './nodes/hangup/HangupNodeWidget';

class Node extends React.Component {
  renderNode() {
    const { type, color } = this.props;

    if (type === 'start') {
      return <StartNodeWidget node={{ name: 'Start' }} displayOnly />;
    }
    if (type === 'stop') {
      return <StopNodeWidget node={{ name: 'Stop' }} displayOnly />;
    }
    if (type === 'answer') {
      return <AnswerNodeWidget node={{ name: 'Answer' }} color={color} displayOnly />;
    }
    if (type === 'hangup') {
      return <HangupNodeWidget node={{ name: 'Hangup' }} color={color} displayOnly />;
    }
    console.warn('Unknown node type');
    return null;
  }

  render() {
    const { type, color } = this.props;

    return (
      <DragWrapper type={type} color={color} style={{ display: 'inline-block' }}>
        {this.renderNode()}
      </DragWrapper>
    );
  }
}

export class NodesPanel extends React.Component {
  render() {
    return (
      <div className='nodes-panel'>
        <div className='node-wrapper'>
          <Node type='start' color='rgb(31, 211, 55)'/>
        </div>
        <div className='node-wrapper'>
          <Node type='answer' color='rgb(100, 218, 229)' />
        </div>
        <div className='node-wrapper'>
          <Node type='hangup' color='rgb(224, 98, 20)' />
        </div>
        <div className='node-wrapper'>
          <Node type='stop' color='rgb(224, 24, 24)'/>
        </div>
      </div>
    );
  }
}
