/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class ConferenceProperties extends React.Component {
    constructor(props){
        super(props);
				this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
        this.propertyChanged = this.propertyChanged.bind(this);
				this.addFlag = this.addFlag.bind(this);
				this.deleteFlag = this.deleteFlag.bind(this);
				this.json = this.props.node.extras.conference;
				this.defValues = Element[this.props.node.nodeType];
        this.state = { name: this.json.name, pin: this.json.pin, flags:this.json.flags || [], flag:'moderator'};
    }
		jsonPropertyChanged(e){
			this.json[e.target.name]=e.target.value;
			this.setState({
				[e.target.name]: e.target.value
			});
		}
		propertyChanged(e){
			this.setState({
				[e.target.name]: e.target.value
			});
		}
		addFlag(){
			if(this.json.flags.indexOf(this.state.flag) === -1){
				this.json.flags.push(this.state.flag);
				this.setState({
					flags: this.json.flags
				});
			}
		}
		deleteFlag(item){
			let index = this.json.flags.indexOf(item);
			this.json.flags.splice(index,1);
			this.setState({
				flags: this.json.flags
			});
		}
    componentWillReceiveProps(nextProps) {
			if(nextProps.node.id !== this.props.node.id){
				this.json = nextProps.node.extras.conference;
				this.setState({ name: this.json.name, pin: this.json.pin, flags:this.json.flags || [], flag:'moderator'});
			}
    }
    getParameters(){
        return(
        	<div>
						<div>
							<label>Name</label>
							<input name="name" type="text" value={this.state.name} onInput={(e)=>{this.jsonPropertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>PIN</label>
							<input name="pin" type="text" value={this.state.pin} onInput={(e)=>{this.jsonPropertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Flags</label>
							<select name="flag" value={this.state.flag} onChange={(e)=>{this.propertyChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.defValues.flags.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
							</select>
							<button onClick={this.addFlag}>push</button>
							<ul className="params-list">
								{this.state.flags.map((i)=> {
										return (
											<li>
												<span>{i}</span>
												<button onClick={()=>{this.deleteFlag(i)}}>delete</button>
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

