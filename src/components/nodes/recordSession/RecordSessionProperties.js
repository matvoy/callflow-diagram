/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

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
            email: this.json.email,
            emailText: ''
        };
        this.typeChanged = this.typeChanged.bind(this);
        this.actionChanged = this.actionChanged.bind(this);
        this.stereoChanged = this.stereoChanged.bind(this);
        this.bridgedChanged = this.bridgedChanged.bind(this);
        this.minSecChanged = this.minSecChanged.bind(this);
        this.followTransferChanged = this.followTransferChanged.bind(this);
        this.emailTextChanged = this.emailTextChanged.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.json = nextProps.node.extras.recordSession;
        this.setState({
            action: this.json.action,
            type: this.json.type,
            stereo: this.json.stereo,
            bridged: this.json.bridged,
            minSec: this.json.minSec,
            followTransfer: this.json.followTransfer,
            email: this.json.email,
            emailText: ''
        });
    }
    actionChanged(e){
        this.json.action = e.target.value;
        this.setState({
            action: e.target.value
        });
    }
    stereoChanged(e){
        this.json.stereo = e.target.value;
        this.setState({
            stereo: e.target.value
        });
    }
    followTransferChanged(e){
        this.json.followTransfer = e.target.value;
        this.setState({
            followTransfer: e.target.value
        });
    }
    typeChanged(e){
        this.json.type = e.target.value;
        this.setState({
            type: e.target.value
        });
    }
    minSecChanged(e){
        this.json.minSec = e.target.value;
        this.setState({
            minSec: e.target.value
        });
    }
    bridgedChanged(e){
        this.json.bridged = e.target.value;
        this.setState({
            bridged: e.target.value
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
                    <label>Type</label>
                    <select value={this.state.type} onChange={(e)=>{this.typeChanged(e)}}
														onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
                        {this.defValues.type.map( (i, index) => {
                            return <option key={index} value={i}>{i}</option>;
                        })}
                    </select>
                </div>
                <div>
                    <label>Stereo</label>
                    <input type="checkbox" value={ this.state.stereo} onInput={(e)=>{this.stereoChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Bridged</label>
                    <input type="checkbox" value={ this.state.bridged} onInput={(e)=>{this.bridgedChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Min Seconds</label>
                    <input type="number" value={ this.state.minSec} onInput={(e)=>{this.minSecChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Follow Transfer</label>
                    <input type="checkbox" value={ this.state.followTransfer} onInput={(e)=>{this.followTransferChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={ this.state.emailText} onInput={(e)=>{this.emailTextChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                    <button onClick={this.addEmail}>push</button>
                    <ul>
                        {this.state.email.map((i)=> {
                                return (
                                    <li>
                                        {i}
                                        <button onClick={()=>{this.deleteEmail(i)}}>delete</button>
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
