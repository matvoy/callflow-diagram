/**
 * Created by matvij on 31.07.17.
 */
/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';

export class QueueTimerProperties extends React.Component {
    constructor(props){
        super(props);
				this.propertyNumberChanged = this.propertyNumberChanged.bind(this);
        this.propertyChanged = this.propertyChanged.bind(this);
        this.positionChanged = this.positionChanged.bind(this);
        this.json = this.props.node.extras;
        this.state = { interval: this.json.interval, tries: this.json.tries, position: this.json.actions[0].ccPosition.var};
    }
		propertyNumberChanged(e){
			this.json[e.target.name]=e.target.valueAsNumber;
			this.setState({
				[e.target.name]: e.target.valueAsNumber
			});
		}
    positionChanged(e){
        this.props.node.extras.actions[0].ccPosition.var=e.target.value;
        this.setState({
            position: e.target.value
        });
    }
    componentWillReceiveProps(nextProps) {
    	if(this.props.node.id === nextProps.node.id) return;
    		this.json = nextProps.node.extras;
        this.setState({ interval: this.json.interval, tries: this.json.tries, position: this.json.actions[0].ccPosition.var});
    }
    getParameters(){
        return(
            <div>
                <div>
                    <label>Interval</label>
                    <input name="interval" type="number" value={this.state.interval} onInput={(e)=>{this.propertyNumberChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Retries</label>
                    <input name="tries" type="number" value={this.state.tries} onInput={(e)=>{this.propertyNumberChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Set current positions</label>
                    <input type="text" value={this.state.position} onInput={(e)=>{this.positionChanged(e)}}
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

