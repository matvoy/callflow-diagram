/**
 * Created by matvij on 07.09.17.
 */
import { ExtendedDiagramModel } from './extend/ExtendedDiagramModel';
import { ExtendedLinkModel } from './extend/ExtendedLinkModel';
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
import { BlackListNodeModel } from './nodes/blackList/BlackListNodeModel';
import { CalendarNodeModel } from './nodes/calendar/CalendarNodeModel';
import { ConferenceNodeModel } from './nodes/conference/ConferenceNodeModel';
import { UsersNodeModel } from './nodes/users/UsersNodeModel';
import { OutboundCallNodeModel } from './nodes/outboundCall/OutboundCallNodeModel';
import { PlayNDigitsNodeModel } from './nodes/playNdigits/PlayNDigitsNodeModel';
import { SendEmailNodeModel } from './nodes/sendEmail/SendEmailNodeModel';
import { ReceiveFaxNodeModel } from './nodes/receiveFax/ReceiveFaxNodeModel';
import { HttpRequestNodeModel } from './nodes/httpRequest/HttpRequestNodeModel';
import { TtsNodeModel } from './nodes/tts/TtsNodeModel';
import { PickupNodeModel } from './nodes/pickup/PickupNodeModel';
import { ParkNodeModel } from './nodes/park/ParkNodeModel';
import { VariablesNodeModel } from './nodes/variables/VariablesNodeModel';
import { VoicemailNodeModel } from './nodes/voicemail/VoicemailNodeModel';
import { CustomCodeNodeModel } from './nodes/customCode/CustomCodeNodeModel';
import { TransferNodeModel } from './nodes/transfer/TransferNodeModel';

export class DiagramCreator {
	constructor(json){
		this.json = json;
		this.position = {
			x: 100,
			y: 100
		};
		this.diagramModel = new ExtendedDiagramModel();
		this.startNode();
		this.modelGenerator(this.json, this.diagramModel.nodes[Object.keys(this.diagramModel.nodes)[0]]);
	}

	getModel(){
		return this.diagramModel.serializeDiagram();
	}

	startNode(){
		let node = new StartNodeModel('Start');
		node.x = this.position.x;
		node.y = this.position.y;
		this.diagramModel.addNode(node);
		this.position = {
			x: this.position.x + 100,
			y: this.position.y + 100
		}
	}

	stopNode(prevNode){
		let node = new StopNodeModel('Stop');
		node.x = this.position.x;
		node.y = this.position.y;
		let link = new ExtendedLinkModel();
		link.setTargetPort(node.getInPort());
		link.setSourcePort(prevNode.getOutPort());
		this.diagramModel.addNode(node);
		this.diagramModel.addLink(link);
		this.position = {
			x: this.position.x + 100,
			y: this.position.y + 100
		}
	}

	modelGenerator(json, lastNode, specType = false){
		let node = null;
		let prevNode = lastNode;
		for(let i=0; i < json.length; i++){
			node = this.createNode(json[i]);
			node.x = this.position.x;
			node.y = this.position.y;
			this.position = {
				x: this.position.x + 100,
				y: this.position.y + 100
			}
			node.extras = json[i];
			let outPort = prevNode.getOutPort();

			if(specType === 'then'){
				outPort = prevNode.getIfPort();
				specType = false;
			}
			if(specType === 'else'){
				outPort = prevNode.getElsePort();
				specType = false;
			}
			if(specType === 'action'){
				outPort = prevNode.getActionsPort();
				specType = false;
			}

			if (Object.keys(json[i])[0] === 'if') {
				this.modelGenerator(json[i].if.then, node, 'then');
				this.modelGenerator(json[i].if.else, node, 'else')
			}

			if (Object.keys(json[i])[0] === 'blackList') {
				this.modelGenerator(json[i].blackList.action, node, 'action');
			}

			let link = new ExtendedLinkModel();
			link.setTargetPort(node.getInPort());
			link.setSourcePort(outPort);
			this.diagramModel.addNode(node);
			this.diagramModel.addLink(link);
			prevNode = node;
			if (json[i].hasOwnProperty('break')){
				this.stopNode(node);
			}
		}
	}

	createNode(element) {
		let node = null;
		if (Object.keys(element)[0] === 'answer') {
			node = new AnswerNodeModel('Answer');
		}
		if (Object.keys(element)[0] === 'hangup') {
			node = new HangupNodeModel('Hangup');
		}
		if (Object.keys(element)[0] === 'playback') {
			node = new PlaybackNodeModel('Playback');
		}
		if (Object.keys(element)[0] === 'log') {
			node = new LogNodeModel('Log');
		}
		if (Object.keys(element)[0] === 'sleep') {
			node = new SleepNodeModel('Sleep');
		}
		if (Object.keys(element)[0] === 'echo') {
			node = new EchoNodeModel('Echo');
		}
		if (Object.keys(element)[0] === 'recordFile') {
			node = new RecordFileNodeModel('Record File');
		}
		if (Object.keys(element)[0] === 'recordSession') {
			node = new RecordSessionNodeModel('Record Session');
		}
		if (Object.keys(element)[0] === 'switch') {
			node = new SwitchNodeModel('Switch');
		}
		if (Object.keys(element)[0] === 'calendar') {
			node = new CalendarNodeModel('Calendar');
		}
		if (Object.keys(element)[0] === 'conference') {
			node = new ConferenceNodeModel('Conference');
		}
		if (Object.keys(element)[0] === 'playNdigits') {
			node = new PlayNDigitsNodeModel('Play and get digits');
		}
		if (Object.keys(element)[0] === 'sendEmail') {
			node = new SendEmailNodeModel('Send Email');
		}
		if (Object.keys(element)[0] === 'receiveFax') {
			node = new ReceiveFaxNodeModel('Receive Fax');
		}
		if (Object.keys(element)[0] === 'httpRequest') {
			node = new HttpRequestNodeModel('HTTP Request');
		}
		if (Object.keys(element)[0] === 'park') {
			node = new ParkNodeModel('Park');
		}
		if (Object.keys(element)[0] === 'pickup') {
			node = new PickupNodeModel('Pickup');
		}
		if (Object.keys(element)[0] === 'tts') {
			node = new TtsNodeModel('Text-To-Speech');
		}
		if (Object.keys(element)[0] === 'voicemail') {
			node = new VoicemailNodeModel('Voicemail');
		}
		if (['setVar', 'unSet', 'export'].indexOf(Object.keys(element)[0]) !== -1) {
			node = new VariablesNodeModel('Variables');
		}
		if (Object.keys(element)[0] === 'goto' && element.goto.split(':')[0] !== 'local') {
			node = new TransferNodeModel('Transfer');
		}
		// if (Object.keys(element)[0] === 'users') {
		// 	node = new UsersNodeModel('Users');
		// }
		// if (Object.keys(element)[0] === 'outboundCall') {
		// 	node = new OutboundCallNodeModel('Outbound call');
		// }



		if (Object.keys(element)[0] === 'blackList') {
			node = new BlackListNodeModel('BlackList');
		}
		if (Object.keys(element)[0] === 'queue') {
			node = new QueueNodeModel('Queue');
		}
		if (Object.keys(element)[0] === 'queueTimer') {
			node = new QueueTimerNodeModel('Queue Timer');
		}
		if (Object.keys(element)[0] === 'if') {
			node = new LogicNodeModel('If');
		}
		if (!node) {
			node = new CustomCodeNodeModel('Custom Code');
		}
		return node;
	}
}
