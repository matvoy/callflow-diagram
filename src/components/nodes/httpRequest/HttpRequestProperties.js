/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class HttpRequestProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras.httpRequest;
        this.state={
            name: this.json.name,
            terminators: this.json.terminators,
            type: this.json.type,
            maxSec: this.json.maxSec,
            silenceHits: this.json.silenceHits,
            email: this.json.email,
            emailText: ''
        };
        this.propertyChanged = this.propertyChanged.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
    }
    componentWillReceiveProps(nextProps) {
    		if(this.props.node.id === nextProps.node.id)
    			return;
        this.json = nextProps.node.extras.httpRequest;
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
    propertyChanged(e){
        this.json[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
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
                    <input name="name" type="text" value={ this.state.name} onInput={(e)=>{this.propertyChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Terminators</label>
                    <input name="terminators" type="text" value={ this.state.terminators} onInput={(e)=>{this.propertyChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Type</label>
                    <select name="type" value={this.state.type} onChange={(e)=>{this.propertyChanged(e)}}
														onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
                        {this.defValues.type.map( (i, index) => {
                            return <option key={index} value={i}>{i}</option>;
                        })}
                    </select>
                </div>
                <div>
                    <label>Max Seconds</label>
                    <input name="maxSec" type="number" value={ this.state.maxSec} onInput={(e)=>{this.propertyChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Silence Hits</label>
                    <input name="silenceHits" type="number" value={ this.state.silenceHits} onInput={(e)=>{this.propertyChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input name="emailText" type="text" value={ this.state.emailText} onInput={(e)=>{this.emailTextChanged(e)}}
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
