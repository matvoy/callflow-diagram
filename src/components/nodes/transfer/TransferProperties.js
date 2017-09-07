/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class TransferProperties extends React.Component {
    constructor(props){
        super(props);
				this.defValues = Element.transfer.context;
        this.contextChanged = this.contextChanged.bind(this);
				this.numberChanged = this.numberChanged.bind(this);
				this.json = this.props.node.extras;
        this.state = { number: this.json.goto.substr(this.json.goto.indexOf(':')+1), context: this.json.goto.split(':')[0]};
        debugger;
    }
    numberChanged(e){
			this.json.goto = this.state.context + ':' + e.target.value;
			this.setState({
				number: e.target.value
			});
		}
		contextChanged(e){
        this.json.goto = e.target.value + ':';
        this.setState({
					context: e.target.value,
					number: ''
        });
    }
    componentWillReceiveProps(nextProps) {
			if(this.props.node.id === nextProps.node.id) return;
				this.json = nextProps.node.extras;
        this.setState({ number: this.json.goto.substr(this.json.goto.indexOf(':')+1), context: this.json.goto.split(':')[0]});
    }
    getParameters(){
        return(
        	<div>
						<div>
							<label>Context</label>
							<select name="context" value={this.state.context} onChange={(e)=>{this.contextChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.defValues.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
							</select>
						</div>
						<div>
							<label>Number</label>
							<input name="number" type="text" value={this.state.number} onInput={(e)=>{this.numberChanged(e)}}
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

