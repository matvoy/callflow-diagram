/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from './PropertyValues';

export class Parameters extends React.Component {

    constructor(props){
        super(props);
        this.propertyChanged = this.propertyChanged.bind(this);
        this.property = '';
    }
    propertyChanged(e){
        this.props.node.extras.value=e.target.value;
        this.props.node.selected=false;
        //this.props.node.selected=true;
    }
    getParameters(nodeType){
        if(!this.props.node.extras.value)this.props.node.extras.value='';
        let node = Element[nodeType];
        //SINGLE PARAMS ELEMENT
        if(!Array.isArray(node)){
            if(node.type==='select'){
                return(
                    <div>
                        <label>{node.name}</label>
                        <select defaultValue={this.props.node.extras.value} onChange={(e)=>{this.propertyChanged(e)}}>
                            {node.values.map( (i, index) => {
                                return <option key={index} value={i}>{i}</option>
                            })}
                        </select>
                    </div>
                );
            }
            if(node.type==='text'){
                return(
                    <div>
                        <label>{node.name}</label>
                        <input type="text" value={this.props.node.extras.value}></input>
                    </div>
                );
            }
        }
        //MULTI PARAMS ELEMENT
        else{
            node.forEach((el)=>{
                if(el.type==='select'){
                    return(
                        <div>
                            <label>{el.name}</label>
                            <select>
                                {el.values.map( (i, index) => {
                                    return <option key={index} value={i}>{i}</option>
                                })}
                            </select>
                        </div>
                    );
                }
                if(el.type==='text'){
                    return(
                        <div>
                            <label>{el.name}</label>
                            <input type="text"></input>
                        </div>
                    );
                }
            });
        }
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return (
            <div style={{margin:'10px'}}>
                {this.getParameters(this.props.node.nodeType)}
            </div>
        );
    }
}
