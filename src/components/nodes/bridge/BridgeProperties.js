/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';
import { Tabs, Pane } from '../../Tabs';

export class BridgeProperties extends React.Component {
	constructor(props){
		super(props);
		this.defValues = Element[this.props.node.nodeType];
		this.webitel = Element.webitelParams.directory;
		this.json = this.props.node.extras.bridge;
		this.state={
			pickup: this.json.pickup,
			strategy: this.json.strategy,
			codecs: this.json.codecs || [],
			parameters: this.json.parameters || [],
			endpoints: this.json.endpoints || [],
			type: 'sipGateway',
			parametersText: '',
			name:'',
			host:'',
			dialString:'',
			profile: this.defValues.profile[0],
			userNameText: this.webitel[0] || '',
			endpointParametersText: '',
			codecsSelect: 'PCMA',
			showEndpoint: false
		};
		this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
		this.propertyChanged = this.propertyChanged.bind(this);
		this.endpointParametersTextChanged = this.endpointParametersTextChanged.bind(this);
		this.addParameter = this.addParameter.bind(this);
		this.deleteParameter = this.deleteParameter.bind(this);
		this.addCodecs = this.addCodecs.bind(this);
		this.deleteCodecs = this.deleteCodecs.bind(this);
		this.getTypedParameters = this.getTypedParameters.bind(this);
		this.addEndpoint = this.addEndpoint.bind(this);
		this.deleteEndpoint = this.deleteEndpoint.bind(this);
		this.addEndpointParameter = this.addEndpointParameter.bind(this);
		this.deleteEndpointParameter = this.deleteEndpointParameter.bind(this);
		this.getEndpoint = this.getEndpoint.bind(this);
		this.getEndpointInputForm = this.getEndpointInputForm.bind(this);
		this.showEndpoint = this.showEndpoint.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.node.id !== nextProps.node.id){
			this.json = nextProps.node.extras.bridge;
			this.setState({
				pickup: this.json.pickup,
				strategy: this.json.strategy,
				codecs: this.json.codecs || [],
				parameters: this.json.parameters || [],
				endpoints: this.json.endpoints || [],
				type: 'sipGateway',
				parametersText: '',
				name:'',
				host:'',
				dialString:'',
				profile: this.defValues.profile[0],
				userNameText: this.webitel[0] || '',
				endpointParametersText: '',
				codecsSelect: 'PCMA',
				showEndpoint: false
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
				name: '',
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
					userNameText: this.webitel[0] || '',
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
			name:'',
			host:'',
			userNameText: this.webitel[0],
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
					<label className="bridge-header">{endpoint.name!==undefined ? 'Name: ' + endpoint.name : 'Host: ' + endpoint.host}</label>
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
										<button onClick={()=>{this.deleteEndpointParameter(j, this.state.endpointIndex)}}>x</button>
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
									<span className="bridge-item" onClick={()=>{this.showEndpoint(true, index)}}>Type: {i.type}<br/><span>{i.name!==undefined ? 'Name: ' + i.name : 'Host: ' + i.host}</span></span>
									<button onClick={()=>{this.deleteEndpoint(i)}}>x</button>
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
							<ul className="params-list">
								{this.state.codecs.map((i)=> {
										return (
											<li>
												<span>{i}</span>
												<button onClick={()=>{this.deleteCodecs(i)}}>x</button>
											</li>
										);
									}
								)}
							</ul>
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
							<ul className="params-list">
								{this.state.parameters.map((i)=> {
										return (
											<li>
												<span>{i}</span>
												<button onClick={()=>{this.deleteParameter(i)}}>x</button>
											</li>
										);
									}
								)}
							</ul>
						</form>
					</Pane>
					<Pane label="Endpoint">
						{this.state.showEndpoint === false ? this.getEndpointInputForm() : this.getEndpoint()}

					</Pane>
				</Tabs>
			</div>
		);
	}

	getTypedParameters(){
		if(this.state.type === 'sipGateway'){
			return(
				<div>
					<div>
						<label>Name</label>
						<input name="name" type="text" value={ this.state.name} onInput={(e)=>{this.propertyChanged(e)}}
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
						<select name="userNameText" value={this.state.userNameText} onChange={(e)=>{this.propertyChanged(e)}}
										onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
							{this.webitel.map( (i, index) => {
								return <option key={index} value={i}>{i}</option>;
							})}
						</select>
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
