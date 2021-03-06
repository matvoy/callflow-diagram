/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from './PropertyValues';

export class SingleProperty extends React.Component {
    constructor(props){
        super(props);
        this.propertyChanged = this.propertyChanged.bind(this);
        this.state = { value: this.props.node.extras[this.props.node.nodeType]};
    }
    propertyChanged(e){
        this.props.node.extras[this.props.node.nodeType]=e.target.value;
        this.setState({
            value: e.target.value
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.node.extras[nextProps.node.nodeType]});
    }
    getParameters(nodeType){
        let node = Element[nodeType];
        switch(node.type){
            case 'select':{
                return(
                    <div>
                        <label>{node.name}</label>
                        <select value={this.state.value} onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}} onChange={(e)=>{this.propertyChanged(e)}}>
                            {node.values.map( (i, index) => {
                                return <option key={index} value={i}>{i}</option>
                            })}
                        </select>
                    </div>
                );
            }
            case 'text':{
                return(
                    <div>
                        <label>{node.name}</label>
                        <input type="text" value={this.state.value} onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}} onInput={(e)=>{this.propertyChanged(e)}}></input>
                    </div>
                );
            }
            case 'number':{
                return(
                    <div>
                        <label>{node.name}</label>
                        <input type="number" value={this.state.value} onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}} onInput={(e)=>{this.propertyChanged(e)}}></input>
                    </div>
                );
            }
        }
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters(this.props.node.nodeType);
    }
}
