import React from 'react';
import { DragWrapper } from './DragWrapper';
import { StartNodeWidget } from './nodes/start/StartNodeWidget';
import { StopNodeWidget } from './nodes/stop/StopNodeWidget';
import { AnswerNodeWidget } from './nodes/answer/AnswerNodeWidget';
import { HangupNodeWidget } from './nodes/hangup/HangupNodeWidget';
import { PlaybackNodeWidget } from './nodes/playback/PlaybackNodeWidget';
import { LogNodeWidget } from './nodes/log/LogNodeWidget';
import { LogicNodeWidget } from './nodes/if/LogicNodeWidget';
import { QueueNodeWidget } from './nodes/queue/QueueNodeWidget';
import { QueueTimerNodeWidget } from './nodes/queue_timer/QueueTimerNodeWidget';

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
    if (type === 'playback') {
      return <PlaybackNodeWidget node={{ name: 'Playback' }} color={color} displayOnly />;
    }
    if (type === 'log') {
      return <LogNodeWidget node={{ name: 'Log' }} color={color} displayOnly />;
    }
    if (type === 'if') {
      return <LogicNodeWidget node={{ name: 'If' }} color={color} displayOnly />;
    }
    if (type === 'queue') {
      return <QueueNodeWidget node={{ name: 'Queue' }} color={color} displayOnly />;
    }
    if (type === 'queueTimer') {
      return <QueueTimerNodeWidget node={{ name: 'Queue Timer' }} color={color} displayOnly />;
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
          <Node type='start' color='rgb(215, 225, 239)'/>
        </div>
        <div className='node-wrapper'>
          <Node type='answer' color='rgb(114, 128, 150)' />
        </div>
        <div className='node-wrapper'>
          <Node type='hangup' color='rgb(114, 128, 150)' />
        </div>
        <div className='node-wrapper'>
          <Node type='playback' color='rgb(114, 128, 150)' />
        </div>
        <div className='node-wrapper'>
          <Node type='log' color='rgb(114, 128, 150)' />
        </div>
        <div className='node-wrapper'>
          <Node type='queue' color='rgb(114, 128, 150)' />
        </div>
        <div className='node-wrapper'>
          <Node type='queueTimer' color='rgb(114, 128, 150)' />
        </div>
        <div className='node-wrapper'>
          <Node type='if' color='rgb(200, 219, 94)' />
        </div>
        <div className='node-wrapper'>
          <Node type='stop' color='rgb(67, 71, 76)'/>
        </div>
      </div>
    );
  }
}
