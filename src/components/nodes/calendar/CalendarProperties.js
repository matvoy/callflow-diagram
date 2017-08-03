/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';

export class CalendarProperties extends React.Component {
    constructor(props){
        super(props);
        this.nameChanged = this.nameChanged.bind(this);
				this.setVarChanged = this.setVarChanged.bind(this);
        this.state = { name: this.props.node.extras.calendar.name, setVar: this.props.node.extras.calendar.setVar};
    }
    nameChanged(e){
        this.props.node.extras.calendar.name=e.target.value;
        this.setState({
            name: e.target.value
        });
    }
		setVarChanged(e){
				this.props.node.extras.calendar.setVar=e.target.value;
				this.setState({
					setVar: e.target.value
				});
		}
    componentWillReceiveProps(nextProps) {
        this.setState({ name: nextProps.node.extras.calendar.name, setVar: nextProps.node.extras.calendar.setVar});
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
							<label>Variable</label>
							<input type="text" value={this.state.setVar} onInput={(e)=>{this.setVarChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
					</div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}

