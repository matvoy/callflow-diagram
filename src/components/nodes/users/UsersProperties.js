/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

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
						userParametersText: '',
						codecsSelect: 'PCMA',
						endpointsObject: {
            	name: '',
							type: 'user',
							parameters: []
						}
        };
        this.usernameChanged = this.parametersTextChanged.bind(this);
        this.strategyChanged = this.strategyChanged.bind(this);
        this.pickupChanged = this.pickupChanged.bind(this);
        this.userParametersTextChanged = this.userParametersTextChanged.bind(this);
        this.addParameter = this.addParameter.bind(this);
				this.deleteParameter = this.deleteParameter.bind(this);
        this.addCodecs = this.addCodecs.bind(this);
        this.deleteCodecs = this.deleteCodecs.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.json = nextProps.node.extras.bridge;
        this.setState({
					strategy: this.json.strategy,
					pickup: this.json.pickup,
					codecs: this.json.codecs,
					parameters: this.json.parameters,
					endpoints: this.json.endpoints,
					parametersText: '',
					userParametersText: '',
					userNameText: '',
					// codecsSelect: 'PCMA',
					endpointsObject: {
						name: '',
						type: 'user',
						parameters: []
					}
        });
    }
		strategyChanged(e){
        this.json.strategy = e.target.value;
        this.setState({
					strategy: e.target.value
        });
    }
		pickupChanged(e){
        this.json.pickup = e.target.value;
        this.setState({
					pickup: e.target.value
        });
    }
    usernameChanged(e){
        this.setState({
					userNameText: e.target.value
        });
    }
		parametersTextChanged(e){
				this.setState({
					parametersText: e.target.value
				});
		}
		userParametersTextChanged(e){
				this.setState({
					userParametersText: e.target.value
				});
		}
		codecsChanged(e){
			this.setState({
				codecsSelect: e.target.value
			});
		}
    addCodecs(){
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
    getParameters(){
        return(
            <div>
								<div>
									<label>Strategy</label>
									<select value={this.state.strategy} onChange={(e)=>{this.strategyChanged(e)}}
													onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
										{this.defValues.strategy.map( (i, index) => {
											return <option key={index} value={i}>{i}</option>;
										})}
									</select>
								</div>
                <div>
                    <label>Pickup</label>
                    <input type="text" value={ this.state.pickup} onInput={(e)=>{this.pickupChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
								<div>
									<label>Codecs</label>
									<select value={this.state.codecsSelect} onChange={(e)=>{this.codecsChanged(e)}}
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
									<input type="text" value={ this.state.parametersText} onInput={(e)=>{this.parametersTextChanged(e)}}
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
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
