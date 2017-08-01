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
        this.json.email.push(this.state.emailText);
        this.setState({
            email: this.json.email,
            emailText:''
        });
    }
    deleteCase(item){
        let index = this.json.email.indexOf(item);
        this.json.email.splice(index,1);
        this.setState({
            email: this.json.email
        });
    }
    componentWillReceiveProps(nextProps) {
        this.json = nextProps.node.extras.switch;
        this.setState({ variable: this.json.variable, case: this.json.case, caseText:''});
    }
    getParameters(){
        return(
            <div>
                <div>
                    <label>Variable</label>
                    <input type="text" value={this.state.variable} onInput={(e)=>{this.variableChanged(e)}}></input>
                </div>
                <div>
                    <label>Case</label>
                    <input type="text" value={this.state.caseText} onInput={(e)=>{this.caseTextChanged(e)}}></input>
                    <button onClick={this.addCase}>push</button>
                    <ul>
                        {this.files.map((i)=> {
                                return (
                                    <li>
                                        {i.name + '\t' + i.type}
                                        <button onClick={()=>{this.deleteCase(i)}}>delete</button>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
