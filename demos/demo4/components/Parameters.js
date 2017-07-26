/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from './PropertyValues';
import { SingleProperty } from './SingleParamProperty';
import { PlaybackProperties } from './nodes/playback/PlaybackProperties';

export class Parameters extends React.Component {
    getParameters(nodeType){
        let node = Element[nodeType];
        //SINGLE PARAMS ELEMENT
        if(node.single) {
            return (
              <SingleProperty node = {this.props.node}/>
            );
        }
        else{
            if(nodeType === 'playback'){
                return (
                    <PlaybackProperties node = {this.props.node}/>
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
