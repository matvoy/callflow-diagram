/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class VoicemailProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.webitel = Element.webitelParams.directory;
        this.json = this.props.node.extras.voicemail;
				this.json.user = this.json.user === '' && this.webitel.length > 0 ? this.webitel[0] : this.json.user;
        if(this.json.hasOwnProperty('check')){
					this.state={
						action: 'check',
						stateObject:{
							user: this.json.user,
							check: this.json.check,
							auth: this.json.auth
						}
					};
				}
				else{
					this.state={
						action: 'leave',
						stateObject:{
							user: this.json.user,
							skip_greeting: this.json.skip_greeting,
							skip_instructions: this.json.skip_instructions,
							cc: this.json.cc || [],
							ccText:''
						}
					};
				}
				this.actionChanged = this.actionChanged.bind(this);
        this.propertyChanged = this.propertyChanged.bind(this);
				this.ccTextChanged = this.ccTextChanged.bind(this);
        this.addCC = this.addCC.bind(this);
        this.deleteCC = this.deleteCC.bind(this);
        this.getActionProperties = this.getActionProperties.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    		if(this.props.node.id === nextProps.node.id)
    			return;
        this.json = nextProps.node.extras.voicemail;
				this.json.user = this.json.user === '' && this.webitel.length > 0 ? this.webitel[0] : this.json.user;
				if(this.json.hasOwnProperty('check')){
					this.state={
						action: 'check',
						stateObject:{
							user: this.json.user,
							check: this.json.check,
							auth: this.json.auth
						}
					};
				}
				else{
					this.state={
						action: 'leave',
						stateObject:{
							user: this.json.user,
							skip_greeting: this.json.skip_greeting,
							skip_instructions: this.json.skip_instructions,
							cc: this.json.cc || [],
							ccText:''
						}
					};
				}
    }

    propertyChanged(e){
        this.json[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let items = Object.assign({}, this.state.stateObject);
        items[e.target.name] = this.json[e.target.name];
        this.setState({
					stateObject: items
        });
    }

    ccTextChanged(e){
        this.setState({
					ccText: e.target.value
        });
    }

    addCC(){
        this.json.cc.push(this.state.ccText);
				let items = Object.assign({},this.state.stateObject);
				items.cc = this.json.cc;
        this.setState({
					stateObject: items,
					ccText:''
        });
    }

    deleteCC(item){
        let index = this.json.cc.indexOf(item);
        this.json.cc.splice(index,1);
				let items = Object.assign({},this.state.stateObject);
				items.cc = this.json.cc;
        this.setState({
					stateObject: items
        });
    }

		actionChanged(e){
			Object.keys(this.json).forEach((option)=>{delete this.json[option]});
			let tmpObj = {};
    	if(e.target.value === 'leave') {
				tmpObj = { skip_greeting: false, skip_instructions: false, cc: [] };
				Object.assign(this.json, { user: '', skip_greeting: false, skip_instructions: false, cc: [] });
			}
			else{
    		tmpObj = { check: true, auth: true };
				Object.assign(this.json, { user: '', check: true, auth: true });
			}
			this.setState({
				stateObject: tmpObj,
				action: e.target.value,
				varText: ''
			});
		}

    getParameters(){
        return(
            <div>
                <div>
                    <label>Action</label>
                    <select value={this.state.action} onChange={(e)=>{this.actionChanged(e)}}
														onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
                        {this.defValues.action.map( (i, index) => {
                            return <option key={index} value={i}>{i}</option>;
                        })}
                    </select>
                </div>
                <div>
                    <label>User</label>
										<select name="user" value={this.state.stateObject.user} onChange={(e)=>{this.propertyChanged(e)}}
														onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
											{this.webitel.map( (i, index) => {
												return <option key={index} value={i}>{i}</option>;
											})}
										</select>
										{this.getActionProperties()}
                </div>

            </div>
        );
    }

    getActionProperties(){
			if (this.state.action === 'leave') {
				return (
					<div>
						<div>
							<label>Skip greeting</label>
							<input name="skip_greeting" type="checkbox" checked={ this.state.stateObject.skip_greeting} onChange={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Skip instructions</label>
							<input name="skip_instructions" type="checkbox" checked={ this.state.stateObject.skip_instructions} onChange={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<form onSubmit={(e)=>{e.preventDefault()}}>
								<label>Copy</label>
								<input name="ccText" type="text" value={ this.state.ccText}
											 onInput={(e)=>{this.ccTextChanged(e)}}
											 onFocus={()=>{this.props.setIsFocused(true)}}
											 onBlur={()=>{this.props.setIsFocused(false)}}
											 ></input>
								<button onClick={()=>{this.addCC()}}>push</button>
								<ul className="params-list">
									{this.state.stateObject.cc.map((i)=> {
											return (
												<li>
													<span>{i}</span>
													<button onClick={()=>{this.deleteCC(i)}}>x</button>
												</li>
											);
										}
									)}
								</ul>
							</form>
						</div>
					</div>
				);
			}
			else {
				return (
					<div>
						<div>
							<label>Check</label>
							<input name="check" type="checkbox" checked={ this.state.stateObject.check} onChange={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Auth</label>
							<input name="auth" type="checkbox" checked={ this.state.stateObject.auth} onChange={(e)=>{this.propertyChanged(e)}}
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
