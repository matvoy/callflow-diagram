/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';
//import {JsonEditor} from './JsonEditor';
import JSONInput from './JsonInput';

export class CustomCodeProperties extends React.Component {
    constructor(props){
        super(props);
        this.darktheme = {
					default         : '#D4D4D4',
					background      : '#1E1E1E',
					border          : '#000000',
					string          : '#CE8453',
					number          : '#B5CE9F',
					colon           : '#49B8F7',
					keys            : '#9CDCFE',
					keys_whiteSpace : '#AF74A5',
					primitive       : '#6392C6'
				}
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras;
        this.setOutputJson = this.setOutputJson.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    		if(this.props.node.id === nextProps.node.id)
    			return;
        this.json = nextProps.node.extras;
    }

    setOutputJson(obj){
    	if(!obj) return;
			for(let option in this.json){
				delete this.json[option];
			}
			Object.assign(this.json, obj);
		}

    getParameters(){
        return(
            <div>
							<JSONInput
								id = 'jsoneditor24234324'
								placeholder = { this.json }
								colors      = { this.darktheme }
								height      = '550px'
								setIsFocused={this.props.setIsFocused}
								returning = {this.setOutputJson}
							/>
            </div>
        );
    }

    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
