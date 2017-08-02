/**
 * Created by matvij on 28.07.17.
 */
/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';

export class LogicProperties extends React.Component {
    constructor(props){
        super(props);
        this.propertyChanged = this.propertyChanged.bind(this);
        this.state = { value: this.props.node.extras.if.expression};
    }
    propertyChanged(e){
        this.props.node.extras.if.expression=e.target.value;
        this.setState({
            value: e.target.value
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.node.extras.if.expression});
    }
    getParameters(){
        return(
            <div>
                <label>Expression</label>
                <input type="text" value={this.state.value} onInput={(e)=>{this.propertyChanged(e)}}
											 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
