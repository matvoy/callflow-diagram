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
import { BlackListProperties } from './nodes/blackList/BlackListProperties';
import { CalendarProperties } from './nodes/calendar/CalendarProperties';
import { ConferenceProperties } from './nodes/conference/ConferenceProperties';
import { BridgeProperties } from './nodes/bridge/BridgeProperties';
import { PlayNDigitsProperties } from './nodes/playNdigits/PlayNDigitsProperties';
import { SendEmailProperties } from './nodes/sendEmail/SendEmailProperties';
import { ReceiveFaxProperties } from './nodes/receiveFax/ReceiveFaxProperties';
import { HttpRequestProperties } from './nodes/httpRequest/HttpRequestProperties';
import { ParkProperties } from './nodes/park/ParkProperties';
import { TtsProperties } from './nodes/tts/TtsProperties';
import { VariablesProperties } from './nodes/variables/VariablesProperties';
import { VoicemailProperties } from './nodes/voicemail/VoicemailProperties';
import { CustomCodeProperties } from './nodes/customCode/CustomCodeProperties';
import { TransferProperties } from './nodes/transfer/TransferProperties';
import { ExistsProperties }  from './nodes/exists/ExistsProperties';

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
                    <SwitchProperties setIsFocused={this.props.setIsFocused} model={this.props.model} updateModel={this.props.updateModel} node = {this.props.node}/>
                );
            }
						if(nodeType === 'blackList'){
							return (
								<BlackListProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'calendar'){
							return (
								<CalendarProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'conference'){
							return (
								<ConferenceProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'bridge'){
							return (
								<BridgeProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'playNdigits'){
							return (
								<PlayNDigitsProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'sendEmail'){
							return (
								<SendEmailProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'receiveFax'){
							return (
								<ReceiveFaxProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'httpRequest'){
							return (
								<HttpRequestProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'park'){
							return (
								<ParkProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'tts'){
							return (
								<TtsProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'variables'){
							return (
								<VariablesProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'voicemail'){
							return (
								<VoicemailProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'customCode'){
							return (
								<CustomCodeProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'transfer'){
							return (
								<TransferProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
						if(nodeType === 'exists'){
							return (
								<ExistsProperties setIsFocused={this.props.setIsFocused} node = {this.props.node}/>
							);
						}
        }
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return (
                this.getParameters(this.props.node.nodeType)
        );
    }
}
