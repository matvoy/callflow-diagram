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
		this.jsonGetDigitsPropertyChanged = this.jsonGetDigitsPropertyChanged.bind(this);
		this.jsonGetDigitsCheckboxChanged = this.jsonGetDigitsCheckboxChanged.bind(this);
		this.propertyChanged = this.propertyChanged.bind(this);
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
	propertyChanged(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	jsonGetDigitsPropertyChanged(e){
		this.json.getDigits[e.target.name] = e.target.value;
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	jsonGetDigitsCheckboxChanged(e){
		this.json.getDigits[e.target.name] = e.target.checked;
		this.setState({
			[e.target.name]: e.target.value
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
					<input name="setVar" type="text" value={ this.state.setVar} onInput={(e)=>{this.jsonGetDigitsPropertyChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Minimum digits</label>
					<input name="min" type="number" value={ this.state.min} onInput={(e)=>{this.jsonGetDigitsPropertyChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Maximum digits</label>
					<input name="max" type="number" value={ this.state.max} onInput={(e)=>{this.jsonGetDigitsPropertyChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Number of tries</label>
					<input name="tries" type="number" value={ this.state.tries} onInput={(e)=>{this.jsonGetDigitsPropertyChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Timeout</label>
					<input name="timeout" type="number" value={ this.state.timeout} onInput={(e)=>{this.jsonGetDigitsPropertyChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Flush DTMF</label>
					<input name="flushDTMF" type="checkbox" checked={ this.state.flushDTMF} onChange={(e)=>{this.jsonGetDigitsCheckboxChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
				</div>
				<div>
					<label>Audio files</label>
					<div>
						<div>
							<label>Type</label>
							<select name="type" value={this.state.type} onChange={(e)=>{this.propertyChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.defValues.files.map( (i, index) => {
									return <option key={index} value={i}>{i}</option>;
								})}
							</select>
						</div>
						<div>
							<label>Name</label>
							<input name="name" type="text" value={ this.state.name} onInput={(e)=>{this.propertyChanged(e)}}
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
