/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';
import { Tabs, Pane } from '../../Tabs';
import JSONInput from '../customCode/JsonInput';

export class HttpRequestProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.json = this.props.node.extras.httpRequest;
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
        this.state={
            url: this.json.url,
            method: this.json.method,
						timeout: this.json.timeout,
						exportCookie: this.json.exportCookie,
						responseCode: this.json.responseCode,
						headers: this.json.headers || [],
						path: this.json.path || [],
						data: this.json.data || {},
						exportVariables: this.json.exportVariables || [],
						headerKey: '',
						headerValue: '',
						pathKey: '',
						pathValue: '',
						dataKey: '',
						dataValue: '',
						exportVariablesKey: '',
						exportVariablesValue: '',
						dataType: typeof this.json.data === 'object' ? 'json' : 'string'
        };
        this.jsonPropertyChanged = this.jsonPropertyChanged.bind(this);
				this.jsonNumberPropertyChanged = this.jsonNumberPropertyChanged.bind(this);
				this.propertyChanged = this.propertyChanged.bind(this);
        this.addKeyValue = this.addKeyValue.bind(this);
        this.deleteKeyValue = this.deleteKeyValue.bind(this);
        this.getData = this.getData.bind(this);
        this.getHeaders = this.getHeaders.bind(this);
				this.getExportVariables = this.getExportVariables.bind(this);
				this.getPath = this.getPath.bind(this);
				this.setOutputJson = this.setOutputJson.bind(this);
				this.dataTypeChanged = this.dataTypeChanged.bind(this);
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
						responseCode: this.json.responseCode,
						headers: this.json.headers || [],
						path: this.json.path || [],
						data: this.json.data || {},
						exportVariables: this.json.exportVariables || [],
						headerKey: '',
						headerValue: '',
						pathKey: '',
						pathValue: '',
						dataKey: '',
						dataValue: '',
						exportVariablesKey: '',
						exportVariablesValue: '',
						dataType: typeof this.json.data === 'object' ? 'json' : 'string'
        });
    }
		jsonNumberPropertyChanged(e){
			this.json[e.target.name] = e.target.valueAsNumber;
			this.setState({
				[e.target.name]: e.target.valueAsNumber
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

		dataTypeChanged(e){
			this.json.data = e.target.value === 'string' ? '' : {}
			this.setState({
				dataType: e.target.value,
				data: this.json.data
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
						<Tabs>
							<Pane label="General">
								<div>
									<label>URL</label>
									<input name="url" type="text" value={ this.state.url} onInput={(e)=>{this.jsonPropertyChanged(e)}}
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
									<input name="timeout" type="number" value={ this.state.timeout} onInput={(e)=>{this.jsonNumberPropertyChanged(e)}}
												 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
								</div>
								<div>
									<label>Export cookie</label>
									<input name="exportCookie" type="text" value={ this.state.exportCookie} onInput={(e)=>{this.jsonPropertyChanged(e)}}
												 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
								</div>
								<div>
									<label>Response code</label>
									<input name="responseCode" type="text" value={ this.state.responseCode} onInput={(e)=>{this.jsonPropertyChanged(e)}}
												 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
								</div>
							</Pane>
							<Pane label="Headers">
								{this.getHeaders()}
							</Pane>
							<Pane label="Path">
								{this.getPath()}
							</Pane>
							<Pane label="Data">
								{this.getData()}
							</Pane>
							<Pane label="Export variables">
								{this.getExportVariables()}
							</Pane>
						</Tabs>
					</div>
        );
    }

    getHeaders(){
				let list = [];
				for(let option in this.state.headers){
					list.push((
						<li>
							<span>{option + ': ' + this.state.headers[option]}</span>
							<button className="fa fa-times" name="headers" onClick={(e)=>{this.deleteKeyValue(e, option)}}></button>
						</li>
					));
				}
				return (
					<div>
						<label className="header">Headers</label>
						<div>
							<label>Key</label>
							<input name="headersKey" type="text" value={ this.state.headersKey} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
							<label>Value</label>
							<input name="headersValue" type="text" value={ this.state.headersValue} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<button name="headers" onClick={(e)=>{this.addKeyValue(e)}}>push</button>
						<ul className="params-list">
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
							<span>{option + ': ' + this.state.path[option]}</span>
							<button className="fa fa-times" name="path" onClick={(e)=>{this.deleteKeyValue(e, option)}}></button>
						</li>
					));
				}
				return (
					<div>
						<label className="header">Path</label>
						<div>
							<label>Key</label>
							<input name="pathKey" type="text" value={ this.state.pathKey} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
							<label>Value</label>
							<input name="pathValue" type="text" value={ this.state.pathValue} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<button name="path" onClick={(e)=>{this.addKeyValue(e)}}>push</button>
						<ul className="params-list">
							{list}
						</ul>
					</div>
				);
		}

		setOutputJson(obj){
			if(!obj) return;
			for(let option in this.json.data){
				delete this.json[option];
			}
			Object.assign(this.json.data, obj);
		}

		getData(){
				//let list = [];
				// for(let option in this.state.data){
				// 	list.push((
				// 		<li>
				// 			<span>{option + ': ' + this.state.data[option]}</span>
				// 			<button className="fa fa-times" name="data" onClick={(e)=>{this.deleteKeyValue(e, option)}}></button>
				// 		</li>
				// 	));
				// }
				return (
					<div>
						<label className="header">Data</label>
						<div>
							<label>Data type</label>
							<select name="dataType" value={this.state.dataType} onChange={(e)=>{this.dataTypeChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								<option key={0} value={'json'}>json</option>
								<option key={1} value={'string'}>string</option>
							</select>
						</div>
						{this.state.dataType === 'json' ? (<JSONInput
							id = 'jsoneditor24879924'
							placeholder = { this.json.data }
							colors      = { this.darktheme }
							height      = '550px'
							setIsFocused={this.props.setIsFocused}
							returning = {this.setOutputJson}
						/>) : (<textarea name="data" type="text" value={ this.state.data} onInput={(e)=>{this.jsonPropertyChanged(e)}}
														 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></textarea>)}
						{/*<div>*/}
							{/*<label>Key</label>*/}
							{/*<input name="dataKey" type="text" value={ this.state.dataKey} onInput={(e)=>{this.propertyChanged(e)}}*/}
										 {/*onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>*/}
							{/*<label>Value</label>*/}
							{/*<input name="dataValue" type="text" value={ this.state.dataValue} onInput={(e)=>{this.propertyChanged(e)}}*/}
										 {/*onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>*/}
						{/*</div>*/}
						{/*<button name="data" onClick={(e)=>{this.addKeyValue(e)}}>push</button>*/}
						{/*<ul className="params-list">*/}
							{/*{list}*/}
						{/*</ul>*/}
					</div>
				);
		}

		getExportVariables(){
				let list = [];
				for(let option in this.state.exportVariables){
					list.push((
						<li>
							<span>{option + ': ' + this.state.exportVariables[option]}</span>
							<button className="fa fa-times" name="exportVariables" onClick={(e)=>{this.deleteKeyValue(e, option)}}></button>
						</li>
					));
				}
				return (
					<div>
						<label className="header">Export variables</label>
						<div>
							<label>Key</label>
							<input name="exportVariablesKey" type="text" value={ this.state.exportVariablesKey} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
							<label>Value</label>
							<input name="exportVariablesValue" type="text" value={ this.state.exportVariablesValue} onInput={(e)=>{this.propertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<button name="exportVariables" onClick={(e)=>{this.addKeyValue(e)}}>push</button>
						<ul className="params-list">
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
