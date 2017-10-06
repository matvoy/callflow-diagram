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
import { EchoNodeWidget } from './nodes/echo/EchoNodeWidget';
import { SleepNodeWidget } from './nodes/sleep/SleepNodeWidget';
import { RecordFileNodeWidget } from './nodes/recordFile/RecordFileNodeWidget';
import { RecordSessionNodeWidget } from './nodes/recordSession/RecordSessionNodeWidget';
import { SwitchNodeWidget } from './nodes/switch/SwitchNodeWidget';
import { BlackListNodeWidget } from './nodes/blackList/BlackListNodeWidget';
import { CalendarNodeWidget } from './nodes/calendar/CalendarNodeWidget';
import { ConferenceNodeWidget } from './nodes/conference/ConferenceNodeWidget';
import { BridgeNodeWidget } from './nodes/bridge/BridgeNodeWidget';
import { PlayNDigitsNodeWidget } from './nodes/playNdigits/PlayNDigitsNodeWidget';
import { SendEmailNodeWidget } from './nodes/sendEmail/SendEmailNodeWidget';
import { ReceiveFaxNodeWidget } from './nodes/receiveFax/ReceiveFaxNodeWidget';
import { HttpRequestNodeWidget } from './nodes/httpRequest/HttpRequestNodeWidget';
import { ParkNodeWidget } from './nodes/park/ParkNodeWidget';
import { TtsNodeWidget } from './nodes/tts/TtsNodeWidget';
import { PickupNodeWidget } from './nodes/pickup/PickupNodeWidget';
import { VariablesNodeWidget } from './nodes/variables/VariablesNodeWidget';
import { VoicemailNodeWidget } from './nodes/voicemail/VoicemailNodeWidget';
import { CustomCodeNodeWidget } from './nodes/customCode/CustomCodeNodeWidget';
import { TransferNodeWidget } from './nodes/transfer/TransferNodeWidget';

class Node extends React.Component {
  renderNode() {
    const { type, color, query } = this.props;

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
    if (type === 'echo') {
      return <EchoNodeWidget node={{ name: 'Echo' }} color={color} displayOnly />;
    }
    if (type === 'sleep') {
      return <SleepNodeWidget node={{ name: 'Sleep' }} color={color} displayOnly />;
    }
    if (type === 'recordFile') {
      return <RecordFileNodeWidget node={{ name: 'Record File' }} color={color} displayOnly />;
    }
    if (type === 'recordSession') {
      return <RecordSessionNodeWidget node={{ name: 'Record Session' }} color={color} displayOnly />;
    }
    if (type === 'switch') {
      return <SwitchNodeWidget node={{ name: 'Switch' }} color={color} displayOnly />;
    }
		if (type === 'blackList') {
			return <BlackListNodeWidget node={{ name: 'BlackList' }} color={color} displayOnly />;
		}
		if (type === 'calendar') {
			return <CalendarNodeWidget node={{ name: 'Calendar' }} color={color} displayOnly />;
		}
		if (type === 'conference') {
			return <ConferenceNodeWidget node={{ name: 'Conference' }} color={color} displayOnly />;
		}
		if (type === 'bridge') {
			return <BridgeNodeWidget node={{ name: 'Bridge' }} color={color} displayOnly />;
		}
		if (type === 'playNdigits') {
			return <PlayNDigitsNodeWidget node={{ name: 'Play and get digits' }} color={color} displayOnly />;
		}
		if (type === 'sendEmail') {
			return <SendEmailNodeWidget node={{ name: 'Send Email' }} color={color} displayOnly />;
		}
		if (type === 'receiveFax') {
			return <ReceiveFaxNodeWidget node={{ name: 'Receive Fax' }} color={color} displayOnly />;
		}
		if (type === 'httpRequest') {
			return <HttpRequestNodeWidget node={{ name: 'HTTP Request' }} color={color} displayOnly />;
		}
		if (type === 'park') {
			return <ParkNodeWidget node={{ name: 'Park' }} color={color} displayOnly />;
		}
		if (type === 'pickup') {
			return <PickupNodeWidget node={{ name: 'Pickup' }} color={color} displayOnly />;
		}
		if (type === 'tts') {
			return <TtsNodeWidget node={{ name: 'Text-To-Speech' }} color={color} displayOnly />;
		}
		if (type === 'variables') {
			return <VariablesNodeWidget node={{ name: 'Variables' }} color={color} displayOnly />;
		}
		if (type === 'voicemail') {
			return <VoicemailNodeWidget node={{ name: 'Voicemail' }} color={color} displayOnly />;
		}
		if (type === 'customCode') {
			return <CustomCodeNodeWidget node={{ name: 'Custom Code' }} color={color} displayOnly />;
		}
		if (type === 'transfer') {
			return <TransferNodeWidget node={{ name: 'Transfer' }} color={color} displayOnly />;
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
	constructor(props){
		super(props);
		this.state = {
			general: true,
			basic: false,
			advanced: false,
			searchText: ''
		}
		this
	}
	searchChanged(e){
		this.setState({
			searchText: e.target.value
		});
	}
  render() {
    return (
      <div className='nodes-panel'>
				<div className="logo">
					<span>Webitel</span>
				</div>
				<div className="search">
					<i className="fa fa-search search-icon"></i>
					<input type="text" value={this.state.searchText} onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}} onInput={(e)=>{this.searchChanged(e)}}>
					</input>
				</div>
				<ul className="group-list">
					<li hidden={this.state.searchText.length === 0}>
						<ul style={{maxHeight: '2000px'}}>
							{'start'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='start' color='rgb(215, 225, 239)'/>
								</li>) : null}
							{'stop'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='stop' color='rgb(67, 71, 76)'/>
								</li>) : null}
							{'log'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='log' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'variables'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='variables' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'calendar'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='calendar' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'switch'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='switch' color='rgb(55, 209, 165)'/>
								</li>) : null}
							{'if'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='if' color='rgb(200, 219, 94)'/>
								</li>) : null}
							{'answer'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='answer' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'hangup'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='hangup' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'playback'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='playback' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'play and get digits'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='playNdigits' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'sleep'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='sleep' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'queue'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='queue' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'queue timer'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='queueTimer' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'record file'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='recordFile' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'record session'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='recordSession' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'echo'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='echo' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'conference'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='conference' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'bridge'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='bridge' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'transfer'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='transfer' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'send email'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='sendEmail' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'receive fax'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='receiveFax' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'blacklist'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='blackList' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'park'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='park' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'pickup'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='pickup' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'text-to-speech'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='tts' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'voicemail'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='voicemail' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'http request'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='httpRequest' color='rgb(114, 128, 150)'/>
								</li>) : null}
							{'custom code'.includes(this.state.searchText.toLowerCase()) ?
								(<li className='node-wrapper'>
									<Node type='customCode' color='rgb(114, 128, 150)'/>
								</li>) : null}
						</ul>
					</li>
					<li hidden={this.state.searchText.length !== 0}>
						<div className="group-header" onClick={()=>{
							let tmp = !this.state.general;
							this.setState({general:tmp});
						}}>General<i className={this.state.general ? 'dropdown-icon-open' : 'dropdown-icon'}></i></div>
						<ul style={this.state.general ? {maxHeight:'2000px'} : null}>
							<li className='node-wrapper'>
								<Node type='start' color='rgb(215, 225, 239)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='stop' color='rgb(67, 71, 76)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='log' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='variables' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='calendar' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='switch' color='rgb(55, 209, 165)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='if' color='rgb(200, 219, 94)'/>
							</li>
						</ul>
					</li>
					<li hidden={this.state.searchText.length !== 0}>
						<div className="group-header" onClick={()=>{
							let tmp = !this.state.basic;
							this.setState({basic:tmp});
						}}>Basic<i className={this.state.basic ? 'dropdown-icon-open' : 'dropdown-icon'}></i></div>
						<ul style={this.state.basic ? {maxHeight:'2000px'} : null }>
							<li className='node-wrapper'>
								<Node type='answer' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='hangup' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='playback' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='playNdigits' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='sleep' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='queue' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='queueTimer' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='recordFile' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='recordSession' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='echo' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='conference' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='bridge' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='transfer' color='rgb(114, 128, 150)'/>
							</li>
						</ul>
					</li>
					<li hidden={this.state.searchText.length !== 0}>
						<div className="group-header" onClick={()=>{
							let tmp = !this.state.advanced;
							this.setState({advanced:tmp});
						}}>Advanced<i className={this.state.advanced ? 'dropdown-icon-open' : 'dropdown-icon'}></i></div>
						<ul style={this.state.advanced ? {maxHeight:'2000px'} : null}>
							<li className='node-wrapper'>
								<Node type='sendEmail' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='receiveFax' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='blackList' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='park' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='pickup' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='tts' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='voicemail' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='httpRequest' color='rgb(114, 128, 150)'/>
							</li>
							<li className='node-wrapper'>
								<Node type='customCode' color='rgb(114, 128, 150)'/>
							</li>
						</ul>
					</li>
				</ul>
      </div>
    );
  }
}
