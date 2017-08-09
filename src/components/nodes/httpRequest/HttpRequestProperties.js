/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class HttpRequestProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras.httpRequest;
        this.state={
            url: this.json.url,
            method: this.json.method,
						timeout: this.json.timeout,
						exportCookie: this.json.exportCookie,
						headers: this.json.headers,
						path: this.json.path,
						data: this.json.data,
						exportVariables: this.json.exportVariables,
						headerKey: '',
						headerValue: '',
						pathKey: '',
						pathValue: '',
						dataKey: '',
						dataValue: '',
						exportVariablesKey: '',
						exportVariablesValue: ''
        };
        this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
				this.propertyChanged = this.propertyChanged.bind(this);
        this.addKeyValue = this.addKeyValue.bind(this);
        this.deleteKeyValue = this.deleteKeyValue.bind(this);
        this.getData = this.getData.bind(this);
        this.getHeaders = this.getHeaders.bind(this);
				this.getExportVariables = this.getExportVariables.bind(this);
				this.getPath = this.getPath.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    		if(this.props.node.id === nextProps.node.id)
    			return;
        this.json = nextProps.node.extras.httpRequest;
        this.setState({
						url: this.json.url,
						method: this.json.method,
						timeout: this.json.timeout,
						exportCookie: this.json.exportCookie,
						headers: this.json.headers,
						path: this.json.path,
						data: this.json.data,
						exportVariables: this.json.exportVariables,
						headerKey: '',
						headerValue: '',
						pathKey: '',
						pathValue: '',
						dataKey: '',
						dataValue: '',
						exportVariablesKey: '',
						exportVariablesValue: ''
        });
    }

		jsonPropertyChanged(e){
        this.json[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        });
    }

		propertyChanged(e){
			this.setState({
				[e.target.name]: e.target.value
			});
		}

    addKeyValue(e){
        this.json[e.target.name][this.state[e.target.name + 'Key']] = this.state[e.target.name + 'Value'];
        this.setState({
            email: this.json.email,
						[e.target.name + 'Key']: '',
						[e.target.name + 'Value']: ''
        });
    }

    deleteKeyValue(e, item){
        delete this.json[e.target.name][item];
        this.setState({
					[e.target.name]: this.json[e.target.name]
        });
    }

    getParameters(){
        return(
            <div>
                <div>
                    <label>URL</label>
                    <input name="url" type="text" value={ this.state.name} onInput={(e)=>{this.jsonPropertyChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Method</label>
										<select name="method" value={this.state.method} onChange={(e)=>{this.jsonPropertyChanged(e)}}
														onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
											{this.defValues.method.map( (i, index) => {
												return <option key={index} value={i}>{i}</option>;
											})}
										</select>
                </div>
                <div>
                    <label>Timeout, ms</label>
                    <input name="timeout" type="number" value={ this.state.timeout} onInput={(e)=>{this.jsonPropertyChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Export cookie</label>
                    <input name="exportCookie" type="text" value={ this.state.exportCookie} onInput={(e)=>{this.jsonPropertyChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
								{this.getHeaders()}
								{this.getPath()}
								{this.getData()}
								{this.getExportVariables()}
            </div>
        );
    }

    getHeaders(){
				let list = [];
				for(let option in this.state.headers){
					list.push((
						<li>
							{option + ': ' + this.state.headers[option]}
							<button name="headers" onClick={(e)=>{this.deleteKeyValue(e, option)}}>delete</button>
						</li>
					));
				}
				return (
					<div>
						<label>Headers</label>
						<div>
							<label>Key</label>
							<input name="headersKey" type="text" value={ this.state.headersKey} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
							<label>Value</label>
							<input name="headersValue" type="text" value={ this.state.headersValue} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<button name="headers" onClick={(e)=>{this.addKeyValue(e)}}>push</button>
						<ul>
							{list}
						</ul>
					</div>
				);
		}

		getPath(){
				let list = [];
				for(let option in this.state.path){
					list.push((
						<li>
							{option + ': ' + this.state.path[option]}
							<button name="path" onClick={(e)=>{this.deleteKeyValue(e, option)}}>delete</button>
						</li>
					));
				}
				return (
					<div>
						<label>Path</label>
						<div>
							<label>Key</label>
							<input name="pathKey" type="text" value={ this.state.pathKey} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
							<label>Value</label>
							<input name="pathValue" type="text" value={ this.state.pathValue} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<button name="path" onClick={(e)=>{this.addKeyValue(e)}}>push</button>
						<ul>
							{list}
						</ul>
					</div>
				);
		}

		getData(){
				let list = [];
				for(let option in this.state.data){
					list.push((
						<li>
							{option + ': ' + this.state.data[option]}
							<button name="data" onClick={(e)=>{this.deleteKeyValue(e, option)}}>delete</button>
						</li>
					));
				}
				return (
					<div>
						<label>Data</label>
						<div>
							<label>Key</label>
							<input name="dataKey" type="text" value={ this.state.dataKey} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
							<label>Value</label>
							<input name="dataValue" type="text" value={ this.state.dataValue} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<button name="data" onClick={(e)=>{this.addKeyValue(e)}}>push</button>
						<ul>
							{list}
						</ul>
					</div>
				);
		}

		getExportVariables(){
				let list = [];
				for(let option in this.state.exportVariables){
					list.push((
						<li>
							{option + ': ' + this.state.exportVariables[option]}
							<button name="exportVariables" onClick={(e)=>{this.deleteKeyValue(e, option)}}>delete</button>
						</li>
					));
				}
				return (
					<div>
						<label>Export variables</label>
						<div>
							<label>Key</label>
							<input name="exportVariablesKey" type="text" value={ this.state.exportVariablesKey} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
							<label>Value</label>
							<input name="exportVariablesValue" type="text" value={ this.state.exportVariablesValue} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<button name="exportVariables" onClick={(e)=>{this.addKeyValue(e)}}>push</button>
						<ul>
							{list}
						</ul>
					</div>
				);
		}

    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
