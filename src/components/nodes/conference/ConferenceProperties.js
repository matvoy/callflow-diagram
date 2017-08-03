/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class ConferenceProperties extends React.Component {
    constructor(props){
        super(props);
        this.nameChanged = this.nameChanged.bind(this);
				this.pinChanged = this.pinChanged.bind(this);
				this.flagChanged = this.flagChanged.bind(this);
				this.addFlag = this.addFlag.bind(this);
				this.deleteFlag = this.deleteFlag.bind(this);
				this.json = this.props.node.extras.conference;
				this.defValues = Element[this.props.node.nodeType];
        this.state = { name: this.json.name, pin: this.json.pin, flags:this.json.flags, flag:'moderator'};
    }
    nameChanged(e){
			this.json.name=e.target.value;
        this.setState({
            name: e.target.value
        });
    }
		pinChanged(e){
			this.json.pin=e.target.value;
				this.setState({
					pin: e.target.value
				});
		}
		flagChanged(e){
			this.setState({
				flag: e.target.value
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
				this.setState({ name: this.json.name, pin: this.json.pin, flags:this.json.flags, flag:'moderator'});
			}
    }
    getParameters(){
        return(
        	<div>
						<div>
							<label>Name</label>
							<input type="text" value={this.state.name} onInput={(e)=>{this.nameChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>PIN</label>
							<input type="text" value={this.state.pin} onInput={(e)=>{this.pinChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Flags</label>
							<select value={this.state.flag} onChange={(e)=>{this.flagChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.defValues.flags.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
							</select>
							<button onClick={this.addFlag}>push</button>
							<ul>
								{this.state.flags.map((i)=> {
										return (
											<li>
												{i}
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

