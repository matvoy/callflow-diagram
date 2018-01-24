/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class ExistsProperties extends React.Component {
    constructor(props){
        super(props);
				this.defValues = Element.exists;
        this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
				this.resourceChanged = this.resourceChanged.bind(this);
				this.json = this.props.node.extras.exists;
        this.state = {
        	name: this.json.name,
					setVar: this.json.setVar,
					resource: this.json.resource,
					type: this.json.type
        };

    }

    resourceChanged(e){
				this.json.resource = e.target.value
    		if(e.target.value==='media'){
    			this.json.type = 'mp3';
    			this.setState({
						resource: this.json.resource,
						type: this.json.type
					})
				} else {
    			delete this.json.type;
					this.setState({
						resource: this.json.resource,
						type: null
					})
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
				this.json = nextProps.node.extras.exists;
				this.json.name = this.json.name === '' && this.state.webitel.length > 0 ? this.state.webitel[0] : this.json.name;
        this.setState({ name: this.json.name, setVar: this.json.setVar});
    }
    getParameters(){
        return(
        	<div>
						<div>
							<label>Resource</label>
							<select name="resource" value={this.state.resource} onChange={(e)=>{this.resourceChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.defValues.resource.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
							</select>
						</div>
						<div>
							<label>Name</label>
							<input name="name" type="text" value={this.state.name} onInput={(e)=>{this.jsonPropertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>SetVar</label>
							<input name="setVar" type="text" value={this.state.setVar} onInput={(e)=>{this.jsonPropertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						{(this.state.resource === 'media') ? (
							<div>
								<label>Type</label>
								<select name="type" value={this.state.type} onChange={(e)=>{this.jsonPropertyChanged(e)}}
								onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.defValues.type.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
								</select>
							</div>
							) : null
						}

					</div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}

