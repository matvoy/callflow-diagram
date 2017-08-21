import React from 'react';
import { Parameters } from './Parameters';
import * as RJD from 'react-js-diagrams';

export class Controls extends React.Component {
	constructor(props){
		super(props);
		this.state = {panelOpen:this.props.panelOpen};
		this.panelChange = this.panelChange.bind(this);
		window.getCallflowJSON = this.getCallflowJSON.bind(this);
	}
	getCallflowJSON(){
		if(!this.props.model)return;
		const { links, nodes } = this.props.model;
		if (links.length === 0 || nodes.length === 0) return;
		const json = [];
		let start = {};
		let link = {};
		for	(let l of links){
				start =  nodes.filter((n)=>{
						return !l.extras.goto && (l.source === n.id || l.target === n.id) && n.type === 'start';
				});
				if(start.length > 0){
					link = l;
					break;
				}
		}
		let self = this;
		this.gotoParser(links, nodes, ()=>{
			self.recursiveElementsParser(json, link, links, nodes, start[0]);
		});
		return {
			callflowModel: this.props.model,
			callflowJson: json
		}
	}

		gotoParser(links, nodes, cb){
			let gotoLinks = links.filter((l)=>{
				return l.extras.goto;
			});
			gotoLinks.forEach((l)=>{
				let sourceNode = nodes.filter((n)=>{
					return n.id === l.source;
				})[0];
				let targetNode = nodes.filter((n)=>{
					return n.id === l.target;
				})[0];
				if(!!targetNode.extras.tag){
					sourceNode.goto = targetNode.extras.tag;
				}
				else{
					let uid = RJD.Toolkit.UID();
					targetNode.extras.tag = uid;
					sourceNode.goto = uid;
				}
			});
			cb();
		}

		switchRecurse(json, link, links, nodes, logic_node){
			for(let i=0; i<logic_node.ports.length; i++){
				if(logic_node.ports[i].name !== 'input' && logic_node.ports[i].name !== 'output'){
					let tmpLink = link.filter((l)=>{
						return !l.extras.goto && (logic_node.ports[i].id === l.sourcePort || logic_node.ports[i].id === l.targetPort);
					})[0];
					json[json.length - 1].switch.case[logic_node.ports[i].name] = [];
					this.recursiveElementsParser(json[json.length - 1].switch.case[logic_node.ports[i].name], tmpLink, links, nodes, logic_node);
				}
			}
		}

		blackListRecurse(json, link, links, nodes, logic_node){
			let flag = false;
			for(let i=0; i<logic_node.ports.length; i++){
				if(logic_node.ports[i].name === 'actions'){
					var tmpLink = link.filter((l)=>{
						return !l.extras.goto && (logic_node.ports[i].id === l.sourcePort || logic_node.ports[i].id === l.targetPort);
					})[0];
					flag = !!tmpLink ? true : false;
					break;
				}
			}
			if(flag){
				json[json.length - 1].blackList.action = [];
				this.recursiveElementsParser(json[json.length - 1].blackList.action, tmpLink, links, nodes, logic_node);
			}
			else{
				delete json[json.length - 1].blackList.action;
			}
		}

    ifRecurse(json, link, links, nodes, logic_node){
			let trueLink = {};
			let falseLink = {};
        for(let i = 0; i < logic_node.ports.length; i++){
            if(logic_node.ports[i].name === 'if'){
                trueLink = link.filter((l)=>{
                    return !l.extras.goto && (logic_node.ports[i].id === l.sourcePort || logic_node.ports[i].id === l.targetPort);
                })[0];
            }
            if(logic_node.ports[i].name === 'else'){
                falseLink = link.filter((l)=>{
                    return !l.extras.goto && (logic_node.ports[i].id === l.sourcePort || logic_node.ports[i].id === l.targetPort);
                })[0];
            }
        }
        json[json.length - 1].if.then = [];
        json[json.length - 1].if.else = [];
        this.recursiveElementsParser(json[json.length - 1].if.then, trueLink, links, nodes, logic_node);
        this.recursiveElementsParser(json[json.length - 1].if.else, falseLink, links, nodes, logic_node);
    }

    queueRecurse(json, link, links, nodes, logic_node){
        for(let i = 0; i < logic_node.ports.length; i++){
            if(logic_node.ports[i].name === 'timers'){
                link = link.filter((l)=>{
                    return !l.extras.goto && (logic_node.ports[i].id === l.sourcePort || logic_node.ports[i].id === l.targetPort);
                });
                break;
            }
        }
        if(link.length > 0) json[json.length - 1].queue.timer = [];
        for(let i = 0; i < link.length; i++){
            let node = nodes.filter((n)=>{
                return (n.id === link[i].target || n.id === link[i].source) && n.id !== logic_node.id;
            })[0];
            let tmpLink =  links.filter((l)=>{
                return !l.extras.goto && (l.source === node.id || l.target === node.id) && l.id !== link[i].id;
            })[0];
            json[json.length - 1].queue.timer.push(Object.assign({},node.extras));
            json[json.length - 1].queue.timer[i].actions = [];
            if(node.extras.actions[0].ccPosition.var !== '') json[json.length - 1].queue.timer[i].actions.push(node.extras.actions[0]);
            this.recursiveElementsParser(json[json.length - 1].queue.timer[i].actions, tmpLink, links, nodes, node);
        }
    }

	recursiveElementsParser(json, link, links, nodes, prev_node){
		if(!link) return json;
		//SEARCH NEXT NODE BY LINK TARGET
		let node = nodes.filter((n)=>{
				return (n.id === link.target || n.id === link.source) && n.id !== prev_node.id;
		})[0];
		//END OF ELEMENTS
		if(!node) return json;
		//STOP
		if(node.type === 'stop'){
				if(json.length > 0)json[json.length - 1].break = true;
				return json;
		}
		//ADD ELEMENT TO JSON
		else{
			json.push(Object.assign({}, node.extras));
			if(!!node.goto){
				json.push({goto: node.goto});
				return
			}
			link =  links.filter((l)=>{
					return !l.extras.goto && (l.source === node.id || l.target === node.id) && l.id !== link.id;
			});
		}

		switch (node.type) {
			case 'if': {
				this.ifRecurse(json, link, links, nodes, node);
				for(let i = 0; i < node.ports.length; i++){
					if(node.ports[i].name === 'output'){
						link = link.filter((l)=>{
							return !l.extras.goto && (node.ports[i].id === l.sourcePort || node.ports[i].id === l.targetPort);
						})[0];
						this.recursiveElementsParser(json, link, links, nodes, node);
					}
				}
				break;
			}

			case 'queue': {
				this.queueRecurse(json, link, links, nodes, node);
				for(let i = 0; i < node.ports.length; i++){
					if(node.ports[i].name === 'output'){
						link = link.filter((l)=>{
							return !l.extras.goto && (node.ports[i].id === l.sourcePort || node.ports[i].id === l.targetPort);
						})[0];
						this.recursiveElementsParser(json, link, links, nodes, node);
					}
				}
				break;
			}

			case 'switch': {
				this.switchRecurse(json, link, links, nodes, node);
				for(let i = 0; i < node.ports.length; i++){
					if(node.ports[i].name === 'output'){
						link = link.filter((l)=>{
							return !l.extras.goto && (node.ports[i].id === l.sourcePort || node.ports[i].id === l.targetPort);
						})[0];
						this.recursiveElementsParser(json, link, links, nodes, node);
					}
				}
				break;
			}

			case 'blackList': {
				this.blackListRecurse(json, link, links, nodes, node);
				for(let i = 0; i < node.ports.length; i++){
					if(node.ports[i].name === 'output'){
						link = link.filter((l)=>{
							return !l.extras.goto && (node.ports[i].id === l.sourcePort || node.ports[i].id === l.targetPort);
						})[0];
						this.recursiveElementsParser(json, link, links, nodes, node);
					}
				}
				break;
			}

			default: {
				this.recursiveElementsParser(json, link[0], links, nodes, node);
			}
		}
	}

	panelChange(){
		let tmp = !this.state.panelOpen;
		this.props.setIsOpened(tmp);
		this.setState({panelOpen:tmp});

	}

	render() {
		const { model, selectedNode, updateModel } = this.props;
		//const content = selectedNode ? JSON.stringify(selectedNode.serialize(), null, 2) : '';
		const param = selectedNode && (selectedNode.nodeType !== 'start' && selectedNode.nodeType !== 'stop') ? (<Parameters setIsFocused={this.props.setIsFocused} model={model} updateModel={updateModel} node={selectedNode}/>) : null;
		return (
		  <div className='controls' style={this.state.panelOpen === true ? null : {width: '15px', flex: 'none'}}>
				<div className="parameters">
					{param}
				</div>
				<div className="hiding-button" style={this.state.panelOpen === true ? null : {right: '8px'}} onClick={()=>{this.panelChange()}}>
					<a className= {this.state.panelOpen === true ? "arrow-right" : "arrow-left"}></a>
				</div>
				{/*<pre>*/}
					{/*{content}*/}
				{/*</pre>*/}
		  </div>
		);
	}
}
