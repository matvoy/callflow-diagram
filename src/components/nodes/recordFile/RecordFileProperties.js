/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class RecordFileProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras.recordFile;
        this.state={
            name: this.json.name,
            terminators: this.json.terminators,
            type: this.json.type,
            maxSec: this.json.maxSec,
            silenceHits: this.json.silenceHits,
            email: this.json.email,
            emailText: ''
        };
        this.typeChanged = this.typeChanged.bind(this);
        this.nameChanged = this.nameChanged.bind(this);
        this.terminatorsChanged = this.terminatorsChanged.bind(this);
        this.maxSecChanged = this.maxSecChanged.bind(this);
        this.silenceHitsChanged = this.silenceHitsChanged.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.json = nextProps.node.extras.recordFile;
        this.setState({
           name: this.json.name,
           terminators: this.json.terminators,
           type: this.json.type,
           maxSec: this.json.maxSec,
           silenceHits: this.json.silenceHits,
           email: this.json.email,
            emailText: ''
        });
    }
    nameChanged(e){
        this.json.name = e.target.value;
        this.setState({
            name: e.target.value
        });
    }
    terminatorsChanged(e){
        this.json.terminators = e.target.value;
        this.setState({
            terminators: e.target.value
        });
    }
    typeChanged(e){
        this.json.type = e.target.value;
        this.setState({
            type: e.target.value
        });
    }
    maxSecChanged(e){
        this.json.maxSec = e.target.value;
        this.setState({
            maxSec: e.target.value
        });
    }
    silenceHitsChanged(e){
        this.json.silenceHits = e.target.value;
        this.setState({
            silenceHits: e.target.value
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
                    <label>Name</label>
                    <input type="text" value={ this.state.name} onInput={(e)=>{this.nameChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Terminators</label>
                    <input type="text" value={ this.state.terminators} onInput={(e)=>{this.terminatorsChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
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
                    <label>Max Seconds</label>
                    <input type="number" value={ this.state.maxSec} onInput={(e)=>{this.maxSecChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Silence Hits</label>
                    <input type="number" value={ this.state.silenceHits} onInput={(e)=>{this.silenceHitsChanged(e)}}
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
