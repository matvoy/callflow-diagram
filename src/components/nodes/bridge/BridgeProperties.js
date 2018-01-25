/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';
import { Tabs, Pane } from '../../Tabs';
import {SortableGrid} from '../../SortableGrid';

export class BridgeProperties extends React.Component {
	constructor(props){
		super(props);
		this.defValues = Element[this.props.node.nodeType];
		// this.webitelDirectory = Element.webitelParams.directory;
		// this.webitelGateway = Element.webitelParams.gateway;
		let gtwArr = Element.webitelParams.gatewayArr;
		let dirArr = Element.webitelParams.directoryArr;
		let medArr = Element.webitelParams.mediaArr;
		this.json = this.props.node.extras.bridge;
		this.json.queue.playback.files = this.json.queue.playback.hasOwnProperty('files') ? this.json.queue.playback.files : [{name: this.json.queue.playback.name, type: this.json.queue.playback.type}]
		delete this.json.queue.playback.type;
		delete this.json.queue.playback.name;
		this.state={
			pickup: this.json.pickup,
			strategy: this.json.strategy,
			codecs: this.json.codecs || [],
			parameters: this.json.parameters || [],
			endpoints: this.json.endpoints || [],
			type: 'sipGateway',
			parametersText: '',
			name: '',//gtwArr[0] || '',
			host:'',
			dialString:'',
			profile: this.defValues.profile[0],
			userNameText: '',//dirArr[0] || '',
			endpointParametersText: '',
			codecsSelect: 'PCMA',
			showEndpoint: false,

			//Media>>
			mediaType: this.defValues.mediaType[0],
			mediaName: '',
			mediaFiles: this.json.queue.playback.files || [],
			//<<Media

			//Queue>>
			queueEnabled: this.json.queue.enable,
			queueRetries: this.json.queue.retries,
			queueTimeout: this.json.queue.timeout,
			queueSleep: this.json.queue.sleep,
			//<<Queue

			webitelDirectory: dirArr,
			webitelGateway: gtwArr,
			webitelMedia: medArr

		};
		this.getWebitelParam();
		this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
		this.propertyChanged = this.propertyChanged.bind(this);
		this.endpointParametersTextChanged = this.endpointParametersTextChanged.bind(this);
		this.addParameter = this.addParameter.bind(this);
		this.deleteParameter = this.deleteParameter.bind(this);
		this.addCodecs = this.addCodecs.bind(this);
		this.deleteCodecs = this.deleteCodecs.bind(this);
		this.getTypedParameters = this.getTypedParameters.bind(this);
		this.upEndpoint = this.upEndpoint.bind(this);
		this.downEndpoint = this.downEndpoint.bind(this);
		this.addEndpoint = this.addEndpoint.bind(this);
		this.deleteEndpoint = this.deleteEndpoint.bind(this);
		this.addEndpointParameter = this.addEndpointParameter.bind(this);
		this.deleteEndpointParameter = this.deleteEndpointParameter.bind(this);
		this.getEndpoint = this.getEndpoint.bind(this);
		this.getEndpointInputForm = this.getEndpointInputForm.bind(this);
		this.showEndpoint = this.showEndpoint.bind(this);
		this.getInputMedia = this.getInputMedia.bind(this);
		this.mediaTypeChanged = this.mediaTypeChanged.bind(this);
		this.addFile = this.addFile.bind(this);
		this.deleteFile = this.deleteFile.bind(this);
		this.queueEnabledChanged = this.queueEnabledChanged.bind(this);
		this.queueRetriesChanged = this.queueRetriesChanged.bind(this);
		this.queueTimeoutChanged = this.queueTimeoutChanged.bind(this);
		this.queueSleepChanged = this.queueSleepChanged.bind(this);
		this.setMediaArray = this.setMediaArray.bind(this);
		this.setParamsArray = this.setParamsArray.bind(this);
		this.setCodecsArray = this.setCodecsArray.bind(this);
	}
	getWebitelParam(){
		this.getGateway();
		this.getDirectory();
		this.getMedia();
	}
	getGateway(){
		if(Element.webitelParams.gatewayArr.length === 0 && typeof Element.webitelParams.gateway === 'function') {
			Element.webitelParams.gateway((arr) => {
					this.setState({
						webitelGateway: arr,
						name: ''//arr[0] || ''
					});
					Element.webitelParams.gatewayArr = arr;
				}
			);
		}
	}
	getDirectory(){
		if(Element.webitelParams.directoryArr.length === 0 && typeof Element.webitelParams.directory === 'function') {
			Element.webitelParams.directory((arr) => {
					this.setState({
						webitelDirectory: arr,
						userNameText: ''//arr[0] || ''
					});
					Element.webitelParams.directoryArr = arr;
				}
			);
		}
	}
	getMedia(){
		if(Element.webitelParams.mediaArr.length === 0 && typeof Element.webitelParams.media === 'function') {
			Element.webitelParams.media((arr) => {
					this.setState({
						webitelMedia: arr,
						mediaName: ''/*arr.filter((item) => {
						 return item.substr(item.length - 3) === 'wav'
						 })[0]*/
					});
					Element.webitelParams.mediaArr = arr;
				}
			);
		}	else {
			let arr = Element.webitelParams.mediaArr;
			this.setState({
				webitelMedia: arr,
				mediaName: ''/*arr.filter((item) => {
				 return item.substr(item.length - 3) === 'wav'
				 })[0]*/
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.node.id !== nextProps.node.id){
			this.json = nextProps.node.extras.bridge;
			this.json.queue.playback.files = this.json.queue.playback.hasOwnProperty('files') ? this.json.queue.playback.files : [{name: this.json.queue.playback.name, type: this.json.queue.playback.type}]
			delete this.json.queue.playback.type;
			delete this.json.queue.playback.name;
			this.setState({
				pickup: this.json.pickup,
				strategy: this.json.strategy,
				codecs: this.json.codecs || [],
				parameters: this.json.parameters || [],
				endpoints: this.json.endpoints || [],
				type: 'sipGateway',
				parametersText: '',
				name: '',//this.state.webitelGateway[0] || '',
				host: '',
				dialString: '',
				profile: this.defValues.profile[0],
				userNameText: '',//this.state.webitelDirectory[0] || '',
				endpointParametersText: '',
				codecsSelect: 'PCMA',
				showEndpoint: false,
				//Media>>
				mediaType: this.defValues.mediaType[0],
				mediaName: '',
				mediaFiles: this.json.queue.playback.files || [],
				//<<Media
				//Queue>>
				queueEnabled: this.json.queue.enable,
				queueRetries: this.json.queue.retries,
				queueTimeout: this.json.queue.timeout,
				queueSleep: this.json.queue.sleep,
				//<<Queue
			});
		}
	}
	jsonPropertyChanged(e){
		this.json[e.target.name] = e.target.value;
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	propertyChanged(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	addCodecs(){
		if (this.json.codecs.indexOf(this.state.codecsSelect) !== -1) return;
		this.json.codecs.push(this.state.codecsSelect);
		this.setState({
			codecs: this.json.codecs
		});
	}
	deleteCodecs(item){
		let index = this.json.codecs.indexOf(item);
		this.json.codecs.splice(index,1);
		this.setState({
			codecs: this.json.codecs
		});
	}
	setCodecsArray(arr){
		this.json.codecs = arr;
		this.setState({
			codecs: this.json.codecs
		});
	}
	addParameter(){
		this.json.parameters.push(this.state.parametersText);
		this.setState({
			parameters: this.json.parameters,
			parametersText:''
		});
	}
	deleteParameter(item){
		let index = this.json.parameters.indexOf(item);
		this.json.parameters.splice(index,1);
		this.setState({
			parameters: this.json.parameters
		});
	}
	setParamsArray(arr){
		this.json.parameters = arr;
		this.setState({
			parameters: this.json.parameters
		});
	}
	upEndpoint(item){
		let index = this.json.endpoints.indexOf(item);
		let tmp = this.json.endpoints[index - 1];
		this.json.endpoints[index - 1] = item;
		this.json.endpoints[index] = tmp;
		this.setState({
			endpoints: this.json.endpoints
		});
	}
	downEndpoint(item){
		let index = this.json.endpoints.indexOf(item);
		let tmp = this.json.endpoints[index + 1];
		this.json.endpoints[index + 1] = item;
		this.json.endpoints[index] = tmp;
		this.setState({
			endpoints: this.json.endpoints
		});
	}
	addEndpoint(){
		if(this.state.type === 'sipGateway'){
			this.json.endpoints.push({
				name: this.state.name,
				type: this.state.type,
				dialString: this.state.dialString,
				parameters: []
			});
			this.setState({
				endpoints: this.json.endpoints,
				dialString: '',
				name: '',//this.state.webitelGateway[0] || '',
				endpointParametersText: ''
			});
		}
		else{
			if(this.state.type === 'sipUri'){
				this.json.endpoints.push({
					profile: this.state.profile,
					host: this.state.host,
					type: this.state.type,
					dialString: this.state.dialString,
					parameters: []
				});
				this.setState({
					endpoints: this.json.endpoints,
					profile: this.defValues.profile[0],
					host: '',
					dialString: '',
					endpointParametersText: ''
				});
			}
			else{
				this.json.endpoints.push({
					name: this.state.userNameText || '',
					type: this.state.type,
					parameters: []
				});
				this.setState({
					endpoints: this.json.endpoints,
					userNameText: '',//this.state.webitelDirectory[0] || '',
					endpointParametersText: ''
				});
			}
		}
	}
	deleteEndpoint(item){
		let index = this.json.endpoints.indexOf(item);
		this.json.endpoints.splice(index,1);
		this.setState({
			endpoints: this.json.endpoints,
			endpointParametersText: ''
		});
	}
	endpointParametersTextChanged(e){
		this.setState({
			endpointParametersText: e.target.value
		});
	}
	typeChanged(e){
		this.setState({
			type: e.target.value,
			name: '',//this.state.webitelGateway[0] || '',
			host: '',
			userNameText: '',//this.state.webitelDirectory[0],
			dialString:'',
			profile: this.defValues.profile[0]
		});
	}
	addEndpointParameter(endpointIndex){
		this.json.endpoints[endpointIndex].parameters.push(this.state.endpointParametersText);
		this.setState({
			endpoints: this.json.endpoints,
			endpointParametersText: ''
		});
	}
	deleteEndpointParameter(item, endpointIndex){
		let index = this.json.endpoints[endpointIndex].parameters.indexOf(item);
		this.json.endpoints[endpointIndex].parameters.splice(index, 1);
		this.setState({
			endpoints: this.json.endpoints
		});
	}
	getEndpoint(){
		let endpoint = this.state.endpoints[this.state.endpointIndex];
		return(
			<div>
				<div style={{display:'inline-flex', marginBottom:'10px'}}>
					<label className="bridge-header">{endpoint.name !== undefined ?  (endpoint.dialString !== undefined ? ('Dial String: ' + endpoint.dialString) : ('Name: ' + endpoint.name)) : 'Host: ' + endpoint.host}</label>
					<button className="bridge-button" onClick={()=>{this.showEndpoint(false, null)}}>back</button>
				</div>
				<form onSubmit={(e)=>{e.preventDefault()}}>
					<label>Parameter</label>
					<input type="text" value={ this.state.endpointParametersText}
								 onInput={(e)=>{this.endpointParametersTextChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}
								 ></input>
					<button onClick={()=>{this.addEndpointParameter(this.state.endpointIndex)}}>push</button>
					<ul className="params-list">
						{endpoint.parameters.map((j)=> {
								return (
									<li>
										<span>{j}</span>
										<button onClick={()=>{this.deleteEndpointParameter(j, this.state.endpointIndex)}}><i className="fa fa-times"></i></button>
									</li>
								);
							}
						)}
					</ul>
				</form>
			</div>
		);
	}
	getEndpointInputForm(){
		return(
			<div>
				<label>Type</label>
				<select name="type" value={this.state.type} onChange={(e)=>{this.typeChanged(e)}}
								onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
					{this.defValues.type.map( (i, index) => {
						return <option key={index} value={i.value}>{i.name}</option>;
					})}
				</select>
				{this.getTypedParameters()}
				<button onClick={()=>{this.addEndpoint()}}>push endpoint</button>
				<ul className="params-list">
					{this.state.endpoints.map((i, index)=> {
							return (
								<li>
									<span className="bridge-item" onClick={()=>{this.showEndpoint(true, index)}}>Type: {i.type}<br/><span>{i.name !== undefined ? (i.dialString !== undefined ? ('Dial String: ' + i.dialString) : ('Name: ' + i.name)) : 'Host: ' + i.host}</span></span>
									<button onClick={()=>{this.deleteEndpoint(i)}} style={{margin:'-2px'}}><i className="fa fa-times"></i></button>
									{index !== 0 ? (<button onClick={()=>{this.upEndpoint(i)}} style={{margin:'-2px'}}><i className="fa fa-arrow-up"></i></button>) : null}
									{index !== this.state.endpoints.length-1 ? (<button onClick={()=>{this.downEndpoint(i)}} style={{margin:'-2px'}}><i className="fa fa-arrow-down"></i></button>) : null}
								</li>
							);
						}
					)}
				</ul>
			</div>
		);
	}
	showEndpoint(value, index){
		this.setState({
			showEndpoint: value,
			endpointIndex: index,
			endpointParametersText: ''
		})
	}
	mediaTypeChanged(e){
		this.setState({
			mediaType: e.target.value,
			mediaName: ''
		});
	}
	queueEnabledChanged(e){
		this.json.queue.enable = e.target.checked;
		this.setState({
			queueEnabled: e.target.checked
		});
	}
	queueRetriesChanged(e){
		this.json.queue.retries = e.target.valueAsNumber;
		this.setState({
			queueRetries: e.target.valueAsNumber
		});
	}
	queueTimeoutChanged(e){
		this.json.queue.timeout = e.target.valueAsNumber;
		this.setState({
			queueTimeout: e.target.valueAsNumber
		});
	}
	queueSleepChanged(e){
		this.json.queue.sleep = e.target.valueAsNumber;
		this.setState({
			queueSleep: e.target.valueAsNumber
		});
	}
	addFile(){
		this.json.queue.playback.files.push({name:this.state.mediaName, type:this.state.mediaType});
		this.setState({
			mediaFiles: this.json.queue.playback.files,
			mediaName: '',
			mediaType: this.defValues.mediaType[0]
		});
	}
	deleteFile(item){
		let index = this.json.queue.playback.files.indexOf(item);
		this.json.queue.playback.files.splice(index, 1);
		this.setState({
			mediaFiles: this.json.queue.playback.files
		});
	}
	setMediaArray(arr){
		this.json.queue.playback.files = arr;
		this.setState({
			mediaFiles: this.json.queue.playback.files
		});
	}
	getInputMedia(){
		let time = new Date();
		let pblist = time.getTime() + 1;
		if(['mp3', 'wav'].indexOf(this.state.mediaType) !== -1 && this.state.webitelMedia){
			return (
				<div>
					<input type="text" autoComplete="off" name="mediaName" list={pblist} value={this.state.mediaName} onChange={(e)=>{this.propertyChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}/>
					<datalist id={pblist}>
						{this.state.webitelMedia.map( (i, index) => {
							if(i.substr(i.length - 3) === this.state.mediaType){
								return <option key={index} value={i}>{i}</option>;
							}
						})}
					</datalist>
				</div>
			);
		}
		else{
			return (
				<input type="text" name="mediaName" value={ this.state.mediaName} onInput={(e)=>{this.propertyChanged(e)}}
							 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
			)
		}
	}
	getParameters(){
		return(
			<div>
				<Tabs>
					<Pane label="General">
						<div>
							<label>Strategy</label>
							<select name="strategy" value={this.state.strategy} onChange={(e)=>{this.jsonPropertyChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.defValues.strategy.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
							</select>
						</div>
						<div>
							<label>Pickup</label>
							<input name="pickup" type="text" value={ this.state.pickup} onInput={(e)=>{this.jsonPropertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Codecs</label>
							<select name="codecsSelect" value={this.state.codecsSelect} onChange={(e)=>{this.propertyChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.defValues.codecs.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
							</select>
							<button onClick={()=>{this.addCodecs()}}>push</button>
							<SortableGrid items={this.state.codecs} deleteFunc={this.deleteCodecs} setFunc={this.setCodecsArray}/>
						</div>
					</Pane>
					<Pane label="Params">
						<form onSubmit={(e)=>{e.preventDefault()}}>
							<label>Parameters</label>
							<input name="parametersText" type="text" value={ this.state.parametersText}
										 onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}}
										 onBlur={()=>{this.props.setIsFocused(false)}}
										 ></input>
							<button onClick={()=>{this.addParameter()}}>push</button>
							<SortableGrid items={this.state.parameters} deleteFunc={this.deleteParameter} setFunc={this.setParamsArray}/>
						</form>
					</Pane>
					<Pane label="Endpoint">
						{this.state.showEndpoint === false ? this.getEndpointInputForm() : this.getEndpoint()}

					</Pane>
					<Pane label="Queue">
						<div>
							<label>Enable</label>
							<input name='enable' type="checkbox" checked={ this.state.queueEnabled } onChange={(e)=>{this.queueEnabledChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Retries</label>
							<input name="retries" type="number" value={ this.state.queueRetries} onInput={(e)=>{this.queueRetriesChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Timeout</label>
							<input name="timeout" type="number" value={ this.state.queueTimeout} onInput={(e)=>{this.queueTimeoutChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Sleep</label>
							<input name="sleep" type="number" value={ this.state.queueSleep} onInput={(e)=>{this.queueSleepChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label className="bridge-header" style={{textAlign: 'center', margin:'0px'}}>Playback</label>
							<div>
								<label>Type</label>
								<select name="type" value={this.state.mediaType} onChange={(e)=>{this.mediaTypeChanged(e)}}
												onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
									{this.defValues.mediaType.map( (i, index) => {
										return <option key={index} value={i}>{i}</option>;
									})}
								</select>
							</div>
							<div>
								<label>Name</label>
								{this.getInputMedia()}
							</div>
							<button onClick={this.addFile}>push</button>
							<SortableGrid items={this.state.mediaFiles} deleteFunc={this.deleteFile} setFunc={this.setMediaArray} type="playback"/>
						</div>
					</Pane>
				</Tabs>
			</div>
		);
	}

	getTypedParameters(){
		let time = new Date();
		let gwid = time.getTime();
		let usrid =  time.getTime() + 1;
		if(this.state.type === 'sipGateway'){
			return(
				<div>
					<div>
						<label>Name</label>
						<input type="text" autoComplete="off" name="name" list={gwid} value={this.state.name} onChange={(e)=>{this.propertyChanged(e)}}
									 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}/>
						<datalist id={gwid}>
							{this.state.webitelGateway.map( (i, index) => {
								return <option key={index} value={i}>{i}</option>;
							})}
						</datalist>
					</div>
					<div>
						<label>Dial String</label>
						<input name="dialString" type="text" value={ this.state.dialString} onInput={(e)=>{this.propertyChanged(e)}}
									 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
					</div>
				</div>
			);
		}
		else{
			if(this.state.type === 'sipUri'){
				return(
					<div>
						<div>
							<label>Profile</label>
							<select name="profile" value={this.state.profile} onChange={(e)=>{this.propertyChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.defValues.profile.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
							</select>
						</div>
						<div>
							<label>Host</label>
							<input name="host" type="text" value={ this.state.host} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Dial String</label>
							<input name="dialString" type="text" value={ this.state.dialString} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
					</div>
				);
			}
			else{
				return(
					<div>
						<label>Username</label>
						<input type="text" autoComplete="off" name="userNameText" list={usrid} value={this.state.userNameText} onChange={(e)=>{this.propertyChanged(e)}}
									 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}/>
						<datalist id={usrid}>
							{this.state.webitelDirectory.map( (i, index) => {
								return <option key={index} value={i}>{i}</option>;
							})}
						</datalist>
					</div>
				);
			}
		}
	}

	render() {
		if(!this.props.node||!this.props.node.nodeType)return;
		return this.getParameters();
	}
}
