/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';
import { Tabs, Pane } from '../../Tabs';

export class UsersProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras.bridge;
        this.state={
            strategy: this.json.strategy,
						pickup: this.json.pickup,
						codecs: this.json.codecs,
						parameters: this.json.parameters,
						endpoints: this.json.endpoints,
					  parametersText: '',
						userParametersText: [],
						codecsSelect: 'PCMA',
						showUser: false
        };
				this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
				this.propertyChanged = this.propertyChanged.bind(this);
        this.userParametersTextChanged = this.userParametersTextChanged.bind(this);
        this.addParameter = this.addParameter.bind(this);
				this.deleteParameter = this.deleteParameter.bind(this);
        this.addCodecs = this.addCodecs.bind(this);
        this.deleteCodecs = this.deleteCodecs.bind(this);
				this.addUserParameter = this.addUserParameter.bind(this);
				this.deleteUserParameter = this.deleteUserParameter.bind(this);
				this.addUser = this.addUser.bind(this);
				this.deleteUser = this.deleteUser.bind(this);
				this.showUser = this.showUser.bind(this);
				this.getUser = this.getUser.bind(this);
				this.getUserInputForm = this.getUserInputForm.bind(this);
    }
    componentWillReceiveProps(nextProps) {
    	if(this.props.node.id !== nextProps.node.id){
				this.json = nextProps.node.extras.bridge;
				this.setState({
					strategy: this.json.strategy,
					pickup: this.json.pickup,
					codecs: this.json.codecs,
					parameters: this.json.parameters,
					endpoints: this.json.endpoints,
					parametersText: '',
					userParametersText: [],
					userNameText: '',
					codecsSelect: 'PCMA',
					showUser: false
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

		userParametersTextChanged(e, index){
				let tmp = this.state.userParametersText.slice();
				tmp[index] = e.target.value;
				this.setState({
					userParametersText: tmp
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
		addUser(){
			this.json.endpoints.push({
				name: this.state.userNameText,
				type: 'user',
				parameters: []
			});
			let arr = this.state.userParametersText.slice();
			arr.push('');
			this.setState({
				endpoints: this.json.endpoints,
				userNameText: '',
				userParametersText: arr
			});
		}
		deleteUser(item){
			let index = this.json.endpoints.indexOf(item);
			this.json.endpoints.splice(index,1);
			let arr = this.state.userParametersText.slice(index,1);
			this.setState({
				endpoints: this.json.endpoints,
				userParametersText: arr
			});
		}
		addUserParameter(userIndex){
			this.json.endpoints[userIndex].parameters.push(this.state.userParametersText[userIndex]);
			let arr = this.state.userParametersText.slice();
			arr[userIndex]='';
			this.setState({
				endpoints: this.json.endpoints,
				userParametersText: arr
			});
		}
		deleteUserParameter(item, userIndex){
			let index = this.json.endpoints[userIndex].parameters.indexOf(item);
			this.json.endpoints[userIndex].parameters.splice(index, 1);
			this.setState({
				endpoints: this.json.endpoints
			});
		}
		showUser(value, index){
			this.setState({
				showUser: value,
				userIndex: index
			})
		}
		getUser(){
			return(
				<div>
					<div style={{display:'inline-flex', marginBottom:'10px'}}>
						<label className="bridge-header">User: {this.state.endpoints[this.state.userIndex].name}</label>
						<button className="bridge-button" onClick={()=>{this.showUser(false, null)}}>back</button>
					</div>

					<label>Parameter</label>
					<input type="text" value={ this.state.userParametersText[this.state.userIndex]} onInput={(e)=>{this.userParametersTextChanged(e, this.state.userIndex)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
					<button onClick={()=>{this.addUserParameter(this.state.userIndex)}}>push</button>
					<ul className="params-list">
						{this.state.endpoints[this.state.userIndex].parameters.map((j)=> {
								return (
									<li>
										<span>{j}</span>
										<button onClick={()=>{this.deleteUserParameter(j, this.state.userIndex)}}>x</button>
									</li>
								);
							}
						)}
					</ul>
				</div>
			);
		}
		getUserInputForm(){
			return(
				<div>
					<label>Username</label>
					<input name="userNameText" type="text" value={ this.state.userNameText} onInput={(e)=>{this.propertyChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
					<button onClick={()=>{this.addUser()}}>push user</button>
					<ul className="params-list">
						{this.state.endpoints.map((i, index)=> {
								return (
									<li>
										<span className="bridge-item" onClick={()=>{this.showUser(true, index)}}>{i.name}</span>
										<button onClick={()=>{this.deleteUser(i)}}>x</button>
									</li>
								);
							}
						)}
					</ul>
				</div>
			);
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
									<div>
										<label>Parameters</label>
										<input name="parametersText" type="text" value={ this.state.parametersText} onInput={(e)=>{this.propertyChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
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
									</div>
								</Pane>
								<Pane label="Users">
									{this.state.showUser === true ? this.getUser() : this.getUserInputForm()}
								</Pane>
							</Tabs>
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
