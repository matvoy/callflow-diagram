/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';
import {JsonEditor} from './JsonEditor';

export class CustomCodeProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras;
        this.state={
            code: JSON.stringify(this.json)
        };
    }

    componentWillReceiveProps(nextProps) {
    		if(this.props.node.id === nextProps.node.id)
    			return;
        this.json = nextProps.node.extras;
				this.state={
					code: JSON.stringify(this.json),
				};
    }

    getParameters(){
        return(
            <div>
								<JsonEditor initial={this.json} setIsFocused={this.props.setIsFocused}/>
            </div>
        );
    }

    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
