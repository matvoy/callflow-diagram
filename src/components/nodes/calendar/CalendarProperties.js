/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class CalendarProperties extends React.Component {
    constructor(props){
        super(props);
				//this.webitel = Element.webitelParams.calendar;
        this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
				this.json = this.props.node.extras.calendar;
				//this.json.name = this.json.name === '' && this.webitel.length > 0 ? this.webitel[0] : this.json.name;
        this.state = { name: this.json.name === '' && Element.webitelParams.calendarArr.length > 0 ? Element.webitelParams.calendarArr[0] : this.json.name, setVar: this.json.setVar, webitel: Element.webitelParams.calendarArr};
        this.getWebitelParam();
    }
    getWebitelParam(){
    	if(Element.webitelParams.calendarArr.length === 0){
				Element.webitelParams.calendar((arr) => {
						this.json.name = this.json.name === '' && arr.length > 0 ? arr[0] : this.json.name;
						this.setState({
							webitel: arr || [],
							name: this.json.name
						});
						Element.webitelParams.calendarArr = arr || [];
					}
				);
			}
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
				this.json.name = this.json.name === '' && this.state.webitel.length > 0 ? this.state.webitel[0] : this.json.name;
        this.setState({ name: this.json.name, setVar: this.json.setVar});
        //this.getWebitelParam();
    }
    getParameters(){
        return(
        	<div>
						<div>
							<label>Name</label>
							<select name="name" value={this.state.name} onChange={(e)=>{this.jsonPropertyChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.state.webitel.map( (i, index) => {
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

