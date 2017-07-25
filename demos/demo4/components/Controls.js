import React from 'react';
import { Parameters } from './Parameters';

export class Controls extends React.Component {
	getCallflowJSON(){
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
        while(true){
            node = nodes.filter((n)=>{
                return n.id === link.target;
            })[0];
            if(!node||node.type === 'stop'){
            	json[json.length-1].break = true;
            	break;
			}
			else{
                json.push(Object.assign({},node.extras));
			}
            link =  links.filter((l)=>{
                return l.source === node.id;
            })[0];
            if(link.length === 0)break;
		}
		console.log(JSON.stringify(json));

	}
	render() {
		const { model, selectedNode, onUndo, onRedo, canUndo, canRedo } = this.props;
		const content = selectedNode ? JSON.stringify(selectedNode.serialize(), null, 2) : '';
		const param = selectedNode && (selectedNode.nodeType !== 'start' && selectedNode.nodeType !== 'stop') ? (<Parameters model={model} node={selectedNode}/>) : null;
		return (
		  <div className='controls'>
			<div>
			  <button onClick={onUndo} disabled={!canUndo}>Undo</button>
			  <button onClick={onRedo} disabled={!canRedo}>Redo</button>
				<button onClick={this.getCallflowJSON.bind(this)}>Generate Callflow</button>
			</div>
			  {param}
			<pre>
			  {content}
			</pre>
			</div>
		);
	}
}
