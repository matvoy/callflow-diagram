/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class VariablesProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras;
        let option = Object.keys(this.json)[0];
        this.state = {
        	stateObject: {
						[option]: this.json[option]
					},
					action: option,
					varText: ''
        };
        this.actionChanged = this.actionChanged.bind(this);
        this.varTextChanged = this.varTextChanged.bind(this);
        this.addVar = this.addVar.bind(this);
				this.deleteVar = this.deleteVar.bind(this);
    }
    componentWillReceiveProps(nextProps) {
    		if(this.props.node.id === nextProps.node.id)
    			return;
        this.json = nextProps.node.extras;
				let option = Object.keys(this.json)[0];
				this.setState({
					stateObject: {
						[option]: this.json[option],
					},
					action: option,
					varText: ''
				});
    }
    actionChanged(e){
			delete this.json[Object.keys(this.json)[0]];
			this.json[e.target.value] = [];
        this.setState({
					stateObject: {
						[e.target.value]: []
					},
					action: e.target.value,
					varText: ''
        });
    }
    varTextChanged(e){
        this.setState({
            varText: e.target.value
        });
    }
    addVar(){
        this.json[this.state.action].push(this.state.varText);
        this.setState({
					stateObject:{
						[this.state.action]: this.json[this.state.action]
					},
					varText: ''
        });
    }
    deleteVar(item){
        let index = this.json[this.state.action].indexOf(item);
        this.json[this.state.action].splice(index,1);
        this.setState({
					stateObject:{
						[this.state.action]: this.json[this.state.action]
					}
        });
    }
    getParameters(){
        return(
            <div>
                <div>
                    <label>Action</label>
                    <select value={this.state.action} onChange={(e)=>{this.actionChanged(e)}}
														onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
                        {this.defValues.action.map( (i, index) => {
                            return <option key={index} value={i}>{i}</option>;
                        })}
                    </select>
                </div>
                <div>
									<form onSubmit={(e)=>{e.preventDefault()}}>
                    <label>Variable</label>
                    <input type="text" value={this.state.varText}
													 onInput={(e)=>{this.varTextChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}}
													 onBlur={()=>{this.props.setIsFocused(false)}}
													 ></input>
                    <button onClick={()=>{this.addVar()}}>push</button>
                    <ul className="params-list">
                        {this.state.stateObject[this.state.action].map((i)=> {
                                return (
                                    <li>
																			<span>{i}</span>
                                        <button onClick={()=>{this.deleteVar(i)}}>x</button>
                                    </li>
                                );
                            }
                        )}
                    </ul>
									</form>
                </div>
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
