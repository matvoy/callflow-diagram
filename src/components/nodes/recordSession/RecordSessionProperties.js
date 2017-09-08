/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';
import { Tabs, Pane } from '../../Tabs';

export class RecordSessionProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras.recordSession;
        this.state = {
            action: this.json.action,
            type: this.json.type,
            stereo: this.json.stereo,
            bridged: this.json.bridged,
            minSec: this.json.minSec,
            followTransfer: this.json.followTransfer,
            email: this.json.email || [],
            emailText: ''
        };
        this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
				this.jsonCheckboxPropertyChanged = this.jsonCheckboxPropertyChanged.bind(this);
        this.emailTextChanged = this.emailTextChanged.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
    }
    componentWillReceiveProps(nextProps) {
				if(this.props.node.id === nextProps.node.id)
					return;
        this.json = nextProps.node.extras.recordSession;
        this.setState({
            action: this.json.action,
            type: this.json.type,
            stereo: this.json.stereo,
            bridged: this.json.bridged,
            minSec: this.json.minSec,
            followTransfer: this.json.followTransfer,
            email: this.json.email || [],
            emailText: ''
        });
    }
    jsonPropertyChanged(e){
			this.json[e.target.name] = e.target.value;
			this.setState({
				[e.target.name]: e.target.value
			});
		}
		jsonCheckboxPropertyChanged(e){
			this.json[e.target.name] = e.target.checked;
			this.setState({
				[e.target.name]: e.target.checked
			});
		}
    emailTextChanged(e){
        this.setState({
            emailText: e.target.value
        });
    }
    addEmail(){
        this.json.email.push(this.state.emailText);
        this.setState({
            email: this.json.email,
            emailText:''
        });
    }
    deleteEmail(item){
        let index = this.json.email.indexOf(item);
        this.json.email.splice(index,1);
        this.setState({
            email: this.json.email
        });
    }
    getParameters(){
        return(
            <div>
							<Tabs selected={0}>
								<Pane label="General">
									<div>
											<label>Action</label>
											<select name="action" value={this.state.action} onChange={(e)=>{this.jsonPropertyChanged(e)}}
															onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
													{this.defValues.action.map( (i, index) => {
															return <option key={index} value={i}>{i}</option>;
													})}
											</select>
									</div>
									<div>
											<label>Type</label>
											<select name="type" value={this.state.type} onChange={(e)=>{this.jsonPropertyChanged(e)}}
															onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
													{this.defValues.type.map( (i, index) => {
															return <option key={index} value={i}>{i}</option>;
													})}
											</select>
									</div>
									<div>
											<label>Stereo</label>
											<input name="stereo" type="checkbox" checked={ this.state.stereo} onChange={(e)=>{this.jsonCheckboxPropertyChanged(e)}}
														 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
									</div>
									<div>
											<label>Bridged</label>
											<input name='bridged' type="checkbox" checked={ this.state.bridged} onChange={(e)=>{this.jsonCheckboxPropertyChanged(e)}}
														 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
									</div>
									<div>
											<label>Min Seconds</label>
											<input name="minSec" type="number" value={ this.state.minSec} onInput={(e)=>{this.jsonPropertyChanged(e)}}
														 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
									</div>
									<div>
											<label>Follow Transfer</label>
											<input name="followTransfer" type="checkbox" checked={ this.state.followTransfer} onChange={(e)=>{this.jsonCheckboxPropertyChanged(e)}}
														 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
									</div>
								</Pane>
								<Pane label="Email">
									<div>
										<form onSubmit={(e)=>{e.preventDefault()}}>
											<label>Email</label>
											<input type="text" value={ this.state.emailText}
														 onInput={(e)=>{this.emailTextChanged(e)}}
														 onFocus={()=>{this.props.setIsFocused(true)}}
														 onBlur={()=>{this.props.setIsFocused(false)}}
														 ></input>
											<button onClick={()=>{this.addEmail()}}>push</button>
											<ul className="params-list">
													{this.state.email.map((i)=> {
																	return (
																			<li>
																					<span>{i}</span>
																					<button onClick={()=>{this.deleteEmail(i)}}>x</button>
																			</li>
																	);
															}
													)}
											</ul>
										</form>
									</div>
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
