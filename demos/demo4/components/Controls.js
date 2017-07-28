import React from 'react';
import { Parameters } from './Parameters';

export class Controls extends React.Component {
	getCallflowJSON(){
		if(!this.props.model)return;
		const { links, nodes } = this.props.model;
		if (links.length === 0 || nodes.length === 0) return;
		const json = []
		let link = {};
        for	(let l of links){
            let start =  nodes.filter((n)=>{
                return l.source === n.id && n.type === 'start';
            })
            if(start.length > 0){
                link = l;
            	break;
            }
        }
        this.recursiveElementsParser(json, link, links, nodes, false, null);
		console.log(JSON.stringify(json));

	}

	recursiveElementsParser(json, link, links, nodes, isIf, logic_node){
		if(!link){
            return json;
        }
		if(isIf){
			for(let i=0; i<logic_node.ports.length; i++){
				if(logic_node.ports[i].name === 'if'){
                    var trueLink = link.filter((l)=>{
                        return logic_node.ports[i].id === l.sourcePort;
                    })[0];
				}
                if(logic_node.ports[i].name === 'else'){
                    var falseLink = link.filter((l)=>{
                        return logic_node.ports[i].id === l.sourcePort;
                    })[0];
                }
			}
            json[json.length - 1].if.then = [];
            json[json.length - 1].if.else = [];
            this.recursiveElementsParser(json[json.length - 1].if.then, trueLink, links, nodes, false, logic_node);
            this.recursiveElementsParser(json[json.length - 1].if.else, falseLink, links, nodes, false, logic_node);
		}
		else{
            let node = nodes.filter((n)=>{
                return n.id === link.target;
            })[0];

            if(!node)return json;

            if(node.type === 'stop'){
                json[json.length-1].break = true;
                return json;
            }
            else{
                json.push(Object.assign({},node.extras));
            }
            if(node.type === 'if'){
                link =  links.filter((l)=>{
                    return l.source === node.id;
                });
            	this.recursiveElementsParser(json, link, links, nodes, true, node);
                for(let i=0; i<node.ports.length; i++){
                    if(node.ports[i].name === 'output'){
                        link = link.filter((l)=>{
                            return node.ports[i].id === l.sourcePort;
                        })[0];
                        this.recursiveElementsParser(json, link, links, nodes, false, null);
                    }
                }

            }
            else{
                link =  links.filter((l)=>{
                    return l.source === node.id;
                })[0];
                this.recursiveElementsParser(json, link, links, nodes, false, logic_node);
			}
		}
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
