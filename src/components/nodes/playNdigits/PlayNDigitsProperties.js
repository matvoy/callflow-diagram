/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class PlayNDigitsProperties extends React.Component {
	constructor(props){
		super(props);
		this.defValues = Element[this.props.node.nodeType];
		this.json = this.props.node.extras.playback;
		this.state={
			files: this.json.files,
			setVar: this.json.getDigits.setVar,
			min: this.json.getDigits.min,
			max: this.json.getDigits.max,
			tries: this.json.getDigits.tries,
			timeout: this.json.getDigits.timeout,
			flushDTMF: this.json.getDigits.flushDTMF,
			name: '',
			type: this.defValues.files[0]
		};
		this.typeChanged = this.typeChanged.bind(this);
		this.nameChanged = this.nameChanged.bind(this);
		this.setVarChanged = this.setVarChanged.bind(this);
		this.minChanged = this.minChanged.bind(this);
		this.maxChanged = this.maxChanged.bind(this);
		this.triesChanged = this.triesChanged.bind(this);
		this.timeoutChanged = this.timeoutChanged.bind(this);
		this.flushDTMFChanged = this.flushDTMFChanged.bind(this);
		this.addFile = this.addFile.bind(this);
		this.deleteFile = this.deleteFile.bind(this);

	}
	componentWillReceiveProps(nextProps) {
		if(this.props.node.id !== nextProps.node.id){
			this.json = nextProps.node.extras.playback;
			this.setState({
				files: this.json.files,
				setVar: this.json.getDigits.setVar,
				min: this.json.getDigits.min,
				max: this.json.getDigits.max,
				tries: this.json.getDigits.tries,
				timeout: this.json.getDigits.timeout,
				flushDTMF: this.json.getDigits.flushDTMF,
				name: '',
				type: this.defValues.files[0]
			});
		}
	}
	nameChanged(e){
		this.setState({
			name: e.target.value
		});
	}
	typeChanged(e){
		this.setState({
			type: e.target.value
		});
	}
	setVarChanged(e){
		this.json.getDigits.setVar = e.target.value;
		this.setState({
			setVar: e.target.value
		});
	}
	minChanged(e){
		this.json.getDigits.min = e.target.value;
		this.setState({
			min: e.target.value
		});
	}
	maxChanged(e){
		this.json.getDigits.max = e.target.value;
		this.setState({
			max: e.target.value
		});
	}
	triesChanged(e){
		this.json.getDigits.tries = e.target.value;
		this.setState({
			tries: e.target.value
		});
	}
	timeoutChanged(e){
		this.json.getDigits.timeout = e.target.value;
		this.setState({
			timeout: e.target.value
		});
	}
	flushDTMFChanged(e){
		this.json.getDigits.flushDTMF = e.target.value;
		this.setState({
			flushDTMF: e.target.value
		});
	}
	addFile(){
		this.json.files.push({name:this.state.name, type:this.state.type});
		this.setState({
			files: this.json.files,
			name: '',
			type: this.defValues.files[0]
		});
	}
	deleteFile(item){
		let index = this.json.files.indexOf(item);
		this.json.files.splice(index, 1);
		this.setState({
			files: this.json.files
		});
	}
	getParameters(){
		return(
			<div>
				<div>
					<label>Variable</label>
					<input type="text" value={ this.state.setVar} onInput={(e)=>{this.setVarChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Minimum digits</label>
					<input type="number" value={ this.state.min} onInput={(e)=>{this.minChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Maximum digits</label>
					<input type="number" value={ this.state.max} onInput={(e)=>{this.maxChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Number of tries</label>
					<input type="number" value={ this.state.tries} onInput={(e)=>{this.triesChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Timeout</label>
					<input type="number" value={ this.state.timeout} onInput={(e)=>{this.timeoutChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Flush DTMF</label>
					<input type="checkbox" value={ this.state.flushDTMF} onInput={(e)=>{this.flushDTMFChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Audio files</label>
					<div>
						<div>
							<label>Type</label>
							<select value={this.state.type} onChange={(e)=>{this.typeChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.defValues.files.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
							</select>
						</div>
						<div>
							<label>Name</label>
							<input type="text" value={ this.state.name} onInput={(e)=>{this.nameChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<button onClick={this.addFile}>push</button>
						<ul>
							{this.state.files.map((i)=> {
									return (
										<li>
											{i.name + '\t' + i.type}
											<button onClick={()=>{this.deleteFile(i)}}>delete</button>
										</li>
									);
								}
							)}
						</ul>
					</div>
				</div>
			</div>
		);
	}
	render() {
		if(!this.props.node || !this.props.node.nodeType)return;
		return this.getParameters();
	}
}
