/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class SendEmailProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras.sendEmail;
        this.state={
            to: this.json.to,
            subject: this.json.subject,
            message: this.json.message,
            emailText: ''
        };
        this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
        this.emailTextChanged = this.emailTextChanged.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
    }
    componentWillReceiveProps(nextProps) {
    		if(this.props.node.id === nextProps.node.id)
    			return;
        this.json = nextProps.node.extras.sendEmail;
        this.setState({
					to: this.json.to,
					subject: this.json.subject,
					message: this.json.message,
					emailText: ''
        });
    }
		jsonPropertyChanged(e){
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
    		if (this.json.to.indexOf(this.state.emailText) !== -1) return;
        this.json.to.push(this.state.emailText);
        this.setState({
            to: this.json.to,
            emailText:''
        });
    }
    deleteEmail(item){
        let index = this.json.to.indexOf(item);
        this.json.to.splice(index, 1);
        this.setState({
            to: this.json.to
        });
    }
    getParameters(){
        return(
            <div>
                <div>
                    <label>Subject</label>
                    <input name="subject" type="text" value={ this.state.subject} onInput={(e)=>{this.jsonPropertyChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Message</label>
                    <input name="message" type="text" value={ this.state.message} onInput={(e)=>{this.jsonPropertyChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
									<form onSubmit={(e)=>{e.preventDefault()}}>
                    <label>To</label>
                    <input type="text" value={ this.state.emailText}
													 onInput={(e)=>{this.emailTextChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}}
													 onBlur={()=>{this.props.setIsFocused(false)}}
													 ></input>
                    <button onClick={()=>{this.addEmail()}}>push</button>
                    <ul className="params-list">
                        {this.state.to.map((i)=> {
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
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
