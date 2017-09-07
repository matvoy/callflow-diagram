/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class QueueProperties extends React.Component {
    constructor(props){
        super(props);
        this.propertyChanged = this.propertyChanged.bind(this);
        this.json = this.props.node.extras.queue;
        this.webitel = Element.webitelParams.acd;
				this.json.name = this.json.name === '' && this.webitel.length > 0 ? this.webitel[0] : this.json.name;
        this.state = { value: this.props.node.extras.queue.name};
    }
    propertyChanged(e){
				this.json.name=e.target.value;
        this.setState({
            value: e.target.value
        });
    }
    componentWillReceiveProps(nextProps) {
			if(this.props.node.id === nextProps.node.id) return;
			this.json = nextProps.node.extras.queue;
			this.json.name = this.json.name === '' && this.webitel.length > 0 ? this.webitel[0] : this.json.name;
			this.setState({ value: this.json.name});
    }
    getParameters(){
        return(
            <div>
                <label>Name</label>
								<select name="name" value={this.state.value} onChange={(e)=>{this.propertyChanged(e)}}
												onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
									{this.webitel.map( (i, index) => {
										return <option key={index} value={i}>{i}</option>;
									})}
								</select>
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}

