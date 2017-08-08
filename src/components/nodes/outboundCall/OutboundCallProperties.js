/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class OutboundCallProperties extends React.Component {
	constructor(props){
		super(props);
		this.defValues = Element[this.props.node.nodeType];
		this.json = this.props.node.extras.bridge;
		this.state={
			strategy: this.json.strategy,
			codecs: this.json.codecs,
			parameters: this.json.parameters,
			endpoints: this.json.endpoints,
			type: 'sipGateway',
			parametersText: '',
			name:'',
			host:'',
			dialString:'',
			profile: this.defValues.profile[0],
			endpointParametersText: [],
			codecsSelect: 'PCMA',
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
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.node.id !== nextProps.node.id){
			this.json = nextProps.node.extras.bridge;
			this.setState({
				strategy: this.json.strategy,
				codecs: this.json.codecs,
				parameters: this.json.parameters,
				endpoints: this.json.endpoints,
				type: 'sipGateway',
				parametersText: '',
				name:'',
				host:'',
				dialString:'',
				profile: this.defValues.profile[0],
				endpointParametersText: [],
				codecsSelect: 'PCMA'
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
		let arr = this.state.endpointParametersText.slice();
		arr.push('');
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
				endpointParametersText: arr
			});
		}
		else{
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
				endpointParametersText: arr
			});
		}
	}
	deleteEndpoint(item){
		let index = this.json.endpoints.indexOf(item);
		this.json.endpoints.splice(index,1);
		let arr = this.state.endpointParametersText.slice(index,1);
		this.setState({
			endpoints: this.json.endpoints,
			endpointParametersText: arr
		});
	}
	endpointParametersTextChanged(e, index){
		let tmp = this.state.endpointParametersText.slice();
		tmp[index] = e.target.value;
		this.setState({
			endpointParametersText: tmp
		});
	}
	typeChanged(e){
		this.setState({
			type: e.target.value,
			name:'',
			host:'',
			dialString:'',
			profile: this.defValues.profile[0]
		});
	}
	addEndpointParameter(endpointIndex){
		this.json.endpoints[endpointIndex].parameters.push(this.state.endpointParametersText[endpointIndex]);
		let arr = this.state.endpointParametersText.slice();
		arr[endpointIndex]='';
		this.setState({
			endpoints: this.json.endpoints,
			endpointParametersText: arr
		});
	}
	deleteEndpointParameter(item, endpointIndex){
		let index = this.json.endpoints[endpointIndex].parameters.indexOf(item);
		this.json.endpoints[endpointIndex].parameters.splice(index, 1);
		this.setState({
			endpoints: this.json.endpoints
		});
	}
	getParameters(){
		return(
			<div>
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
					<label>Codecs</label>
					<select name="codecsSelect" value={this.state.codecsSelect} onChange={(e)=>{this.propertyChanged(e)}}
									onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
						{this.defValues.codecs.map( (i, index) => {
							return <option key={index} value={i}>{i}</option>;
						})}
					</select>
					<button onClick={this.addCodecs}>push</button>
					<ul>
						{this.state.codecs.map((i)=> {
								return (
									<li>
										{i}
										<button onClick={()=>{this.deleteCodecs(i)}}>delete</button>
									</li>
								);
							}
						)}
					</ul>
				</div>
				<div>
					<label>Parameters</label>
					<input name="parametersText" type="text" value={ this.state.parametersText} onInput={(e)=>{this.propertyChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
					<button onClick={this.addParameter}>push</button>
					<ul>
						{this.state.parameters.map((i)=> {
								return (
									<li>
										{i}
										<button onClick={()=>{this.deleteParameter(i)}}>delete</button>
									</li>
								);
							}
						)}
					</ul>
				</div>
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
					<ul>
						{this.state.endpoints.map((i, index)=> {
								return (
									<li>
										<div>
											<label>{i.type + '\t' + i.name||i.host}</label>
											<input type="text" value={ this.state.endpointParametersText[index]} onInput={(e)=>{this.endpointParametersTextChanged(e, index)}}
														 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
											<button onClick={()=>{this.addEndpointParameter(index)}}>push param</button>
											<ul>
												{this.state.endpoints[index].parameters.map((j)=> {
														return (
															<li>
																{j}
																<button onClick={()=>{this.deleteEndpointParameter(j, index)}}>delete param</button>
															</li>
														);
													}
												)}
											</ul>
										</div>
										<button onClick={()=>{this.deleteEndpoint(i)}}>delete endpoint</button>
									</li>
								);
							}
						)}
					</ul>
				</div>
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
	}

	render() {
		if(!this.props.node||!this.props.node.nodeType)return;
		return this.getParameters();
	}
}
