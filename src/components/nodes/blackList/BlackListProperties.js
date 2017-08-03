/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';

export class BlackListProperties extends React.Component {
    constructor(props){
        super(props);
        this.propertyChanged = this.propertyChanged.bind(this);
        this.state = { value: this.props.node.extras.blackList.name};
    }
    propertyChanged(e){
        this.props.node.extras.blackList.name=e.target.value;
        this.setState({
            value: e.target.value
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.node.extras.blackList.name});
    }
    getParameters(){
        return(
            <div>
                <label>Name</label>
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

