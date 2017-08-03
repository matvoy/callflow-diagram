/**
 * Created by matvij on 28.07.17.
 */
/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import * as RJD from 'react-js-diagrams';
import { ExtendedDiagramModel } from '../../ExtendedDiagramModel';
import { diagramEngine } from '../../Engine';

export class SwitchProperties extends React.Component {
    constructor(props){
        super(props);
        this.json = this.props.node.extras.switch;
        this.state = { variable: this.json.variable, case: this.json.case, caseText:''};
        this.variableChanged = this.variableChanged.bind(this);
        this.caseTextChanged = this.caseTextChanged.bind(this);
        this.addCase = this.addCase.bind(this);
        this.deleteCase = this.deleteCase.bind(this);

    }
    variableChanged(e){
        this.json.variable = e.target.value;
        this.setState({
            variable: e.target.value
        });
    }
    caseTextChanged(e){
        this.setState({
            caseText: e.target.value
        });
    }
    addCase(){
        this.props.node.addPort(new RJD.DefaultPortModel(false, this.state.caseText, 'case: '+this.state.caseText));
				this.json.case[this.state.caseText]=[];
				let diagramModel = new ExtendedDiagramModel();
			  diagramModel.deSerializeDiagram(this.props.model, diagramEngine);
				diagramModel.setNode(this.props.node);
			  diagramEngine.setDiagramModel(diagramModel);
			  this.props.setIsFocused(false);
        this.setState({
            case: this.json.case,
            caseText:''
        });
    }
    deleteCase(item){
				this.props.node.removePort(this.props.node.ports[item]);
        delete this.json.case[item];
				let diagramModel = new ExtendedDiagramModel();
				diagramModel.deSerializeDiagram(this.props.model, diagramEngine);
				diagramModel.setNode(this.props.node);
				diagramEngine.setDiagramModel(diagramModel);
				this.props.setIsFocused(false);
        this.setState({
            case: this.json.case
        });
    }
    componentWillReceiveProps(nextProps) {
    	if(nextProps.node.id!==this.props.node.id){
				this.json = nextProps.node.extras.switch;
				this.setState({ variable: this.json.variable, case: this.json.case, caseText:''});
			}
    }
    getParameters(){
        let arr = [];
        for(let i in this.state.case){
            arr.push (
                <li>
                    {i}
                    <button onClick={() => { this.deleteCase(i) }}>delete</button>
                </li>
            );
        }
        return(
            <div>
                <div>
                    <label>Variable</label>
                    <input type="text" value={this.state.variable} onInput={(e)=>{this.variableChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Case</label>
                    <input type="text" value={this.state.caseText} onInput={(e)=>{this.caseTextChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                    <button onClick={()=>{this.addCase()}}>push</button>
                    <ul>{arr}</ul>
                </div>
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
