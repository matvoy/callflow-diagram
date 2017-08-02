/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from './PropertyValues';
import { SingleProperty } from './SingleParamProperty';
import { PlaybackProperties } from './nodes/playback/PlaybackProperties';
import { LogicProperties } from './nodes/if/LogicProperties';
import { QueueProperties } from './nodes/queue/QueueProperties';
import { QueueTimerProperties } from './nodes/queue_timer/QueueTimerProperties';
import { RecordSessionProperties } from './nodes/recordSession/RecordSessionProperties';
import { RecordFileProperties } from './nodes/recordFile/RecordFileProperties';
import { SwitchProperties } from './nodes/switch/SwitchProperties';

export class Parameters extends React.Component {
    getParameters(nodeType){
        let node = Element[nodeType];
        //SINGLE PARAMS ELEMENT
        if(node.single) {
            return (
              <SingleProperty setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
            );
        }
        else{
            if(nodeType === 'playback'){
                return (
                    <PlaybackProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
                );
            }
            if(nodeType === 'if'){
                return (
                    <LogicProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
                );
            }
            if(nodeType === 'queue'){
                return (
                    <QueueProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
                );
            }
            if(nodeType === 'queueTimer'){
                return (
                    <QueueTimerProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
                );
            }
            if(nodeType === 'recordFile'){
                return (
                    <RecordFileProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
                );
            }
            if(nodeType === 'recordSession'){
                return (
                    <RecordSessionProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
                );
            }
            if(nodeType === 'switch'){
                return (
                    <SwitchProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
                );
            }
        }
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return (
            <div>
                {this.getParameters(this.props.node.nodeType)}
            </div>
        );
    }
}
