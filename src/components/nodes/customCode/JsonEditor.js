/**
 * Created by matvij on 10.08.17.
 */
import React from 'react';

export class JsonEditor extends React.Component {
	constructor(props){
		super(props);
		this.json = this.props.initial;
		this.state = {
			value: Object.assign({},this.json),
			error: false
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		try {
			this.setState({
				value: JSON.parse(e.target.value),
				error: false
			});
			for(let option in this.json){
				delete this.json[option];
			}
			Object.assign(this.json, JSON.parse(e.target.value));
		} catch (e) {
			//couldn't parse string, don't update object
			this.setState({error: e})
		}
	}

	render() {
		return (
			<div>
				<label>Code</label>
				<textarea
					onChange={(e)=>{this.handleChange(e)}}
					defaultValue={JSON.stringify(this.state.value)}
					onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}/>
				<label>View</label>
				<div className={(this.state.error) ? 'has-error' : 'normalJson'}>
					<div className="help">{this.state.error.message}</div>
					<pre>
             {JSON.stringify(this.state.value, null, 2)}
           </pre>
				</div>
			</div>
		);
	}
}
