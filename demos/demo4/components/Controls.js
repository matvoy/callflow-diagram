import React from 'react';
import { Parameters } from './Parameters';

export class Controls extends React.Component {
	getCallflowJSON(){
		if(!this.props.model)return;
		const { links, nodes } = this.props.model;
		if (links.length === 0 || nodes.length === 0) return;
		const json = []
		let link = {};
		let node = {}
        for	(let l of links){
            let start =  nodes.filter((n)=>{
                return l.source === n.id && n.type === 'start';
            })
            if(start.length > 0){
                link = l;
            	break;
            }
        }
        while(link){
            node = nodes.filter((n)=>{
                return n.id === link.target;
            })[0];
            if(!node)break;
            if(node.type === 'stop'){
            	json[json.length-1].break = true;
            	break;
			}
			else{
                json.push(Object.assign({},node.extras));
			}
            link =  links.filter((l)=>{
                return l.source === node.id;
            })[0];
		}
		console.log(JSON.stringify(json));

	}
	render() {
		const { model, selectedNode } = this.props;
		const content = selectedNode ? JSON.stringify(selectedNode.serialize(), null, 2) : '';
		const param = selectedNode && (selectedNode.nodeType !== 'start' && selectedNode.nodeType !== 'stop') ? (<Parameters model={model} node={selectedNode}/>) : null;
		return (
		  <div className='controls'>
			  <button onClick={this.getCallflowJSON.bind(this)}>Generate Callflow</button>
			<div className="parameters">
                {param}
			</div>
			<pre>
			  {content}
			</pre>
		  </div>
		);
	}
}
