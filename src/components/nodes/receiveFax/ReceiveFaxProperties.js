/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class ReceiveFaxProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras.receiveFax;
        this.state={
            email: this.json.email,
						enable_t38: this.json.enable_t38,
            emailText: ''
        };
				this.jsonCheckboxPropertyChanged = this.jsonCheckboxPropertyChanged.bind(this);
        this.emailTextChanged = this.emailTextChanged.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
    }
    componentWillReceiveProps(nextProps) {
    		if(this.props.node.id === nextProps.node.id)
    			return;
        this.json = nextProps.node.extras.receiveFax;
        this.setState({
					email: this.json.email,
					enable_t38: this.json.enable_t38,
					emailText: ''
        });
    }
		jsonCheckboxPropertyChanged(e){
			this.json[e.target.name] = e.target.checked;
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
    		if (this.json.email.indexOf(this.state.emailText) !== -1) return;
        this.json.email.push(this.state.emailText);
        this.setState({
						email: this.json.email,
            emailText:''
        });
    }
    deleteEmail(item){
        let index = this.json.email.indexOf(item);
        this.json.email.splice(index, 1);
        this.setState({
					email: this.json.email
        });
    }
    getParameters(){
        return(
            <div>
                <div>
                    <label>t38</label>
                    <input name="enable_t38" type="checkbox" checked={ this.state.enable_t38} onChange={(e)=>{this.jsonCheckboxPropertyChanged(e)}}
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
