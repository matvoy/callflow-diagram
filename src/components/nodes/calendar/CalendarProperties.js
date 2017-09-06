/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class CalendarProperties extends React.Component {
    constructor(props){
        super(props);
				this.webitel = Element.webitelParams.calendar;
        this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
				this.json = this.props.node.extras.calendar;
        this.state = { name: this.json.name, setVar: this.json.setVar};
    }
		jsonPropertyChanged(e){
        this.json[e.target.name]=e.target.value;
        this.setState({
					[e.target.name]: e.target.value
        });
    }
    componentWillReceiveProps(nextProps) {
			if(this.props.node.id === nextProps.node.id) return;
				this.json = nextProps.node.extras.calendar;
        this.setState({ name: this.json.name, setVar: this.json.setVar});
    }
    getParameters(){
        return(
        	<div>
						<div>
							<label>Name</label>
							<select name="name" value={this.state.name} onChange={(e)=>{this.jsonPropertyChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.webitel.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
							</select>
						</div>
						<div>
							<label>Variable</label>
							<input name="setVar" type="text" value={this.state.setVar} onInput={(e)=>{this.jsonPropertyChanged(e)}}
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

