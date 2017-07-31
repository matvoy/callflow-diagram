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
        this.intervalChanged = this.intervalChanged.bind(this);
        this.triesChanged = this.triesChanged.bind(this);
        this.positionChanged = this.positionChanged.bind(this);
        this.state = { interval: this.props.node.extras.interval, tries: this.props.node.extras.tries, position: this.props.node.extras.actions[0].ccPosition.var};
    }
    intervalChanged(e){
        this.props.node.extras.interval=parseInt(e.target.value);
        this.setState({
            interval: e.target.value
        });
    }
    triesChanged(e){
        this.props.node.extras.timer=parseInt(e.target.value);
        this.setState({
            tries: e.target.value
        });
    }
    positionChanged(e){
        this.props.node.extras.actions[0].ccPosition.var=e.target.value;
        this.setState({
            position: e.target.value
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ interval: nextProps.node.extras.interval, tries: nextProps.node.extras.tries, position: nextProps.node.extras.actions[0].ccPosition.var});
    }
    getParameters(){
        return(
            <div>
                <label>Interval</label>
                <input type="number" value={this.state.interval} onInput={(e)=>{this.intervalChanged(e)}}></input>
                <label>Retries</label>
                <input type="number" value={this.state.tries} onInput={(e)=>{this.triesChanged(e)}}></input>
                <label>Set current positions</label>
                <input type="text" value={this.state.position} onInput={(e)=>{this.positionChanged(e)}}></input>
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}

