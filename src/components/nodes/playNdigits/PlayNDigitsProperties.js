/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';
import { Tabs, Pane } from '../../Tabs';
import {SortableGrid} from '../../SortableGrid';

export class PlayNDigitsProperties extends React.Component {
	constructor(props){
		super(props);
		this.defValues = Element[this.props.node.nodeType];
		//this.webitel = Element.webitelParams.media;
		this.json = this.props.node.extras.playback;
		this.json.files = this.json.hasOwnProperty('files') ? this.json.files : [{name: this.json.name, type: this.json.type}];
		delete this.json.type;
		delete this.json.name;
		let mediaArr = Element.webitelParams.mediaArr;
		this.state={
			files: this.json.files || [],
			setVar: this.json.getDigits.setVar,
			min: this.json.getDigits.min,
			max: this.json.getDigits.max,
			tries: this.json.getDigits.tries,
			timeout: this.json.getDigits.timeout,
			flushDTMF: this.json.getDigits.flushDTMF,
			name: '',//mediaArr.filter((item)=>{return item.substr(item.length - 3) === 'wav'})[0],
			type: this.defValues.files[0],
			webitel: mediaArr
		};
		this.getWebitelParam();
		this.jsonGetDigitsPropertyChanged = this.jsonGetDigitsPropertyChanged.bind(this);
		this.jsonGetDigitsCheckboxChanged = this.jsonGetDigitsCheckboxChanged.bind(this);
		this.jsonGetDigitsNumberChanged = this.jsonGetDigitsNumberChanged.bind(this);
		this.typeChanged = this.typeChanged.bind(this);
		this.nameChanged = this.nameChanged.bind(this);
		this.addFile = this.addFile.bind(this);
		this.deleteFile = this.deleteFile.bind(this);
		this.getInputMedia = this.getInputMedia.bind(this);
		this.setArray = this.setArray.bind(this);
	}
	getWebitelParam(){
		if(Element.webitelParams.mediaArr.length === 0 && typeof Element.webitelParams.media === 'function') {
			Element.webitelParams.media((arr) => {
					this.setState({
						webitel: arr,
						name: ''/*arr.filter((item) => {
							return item.substr(item.length - 3) === 'wav'
						})[0]*/
					});
					Element.webitelParams.mediaArr = arr;
				}
			);
		}
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.node.id !== nextProps.node.id){
			this.json = nextProps.node.extras.playback;
			this.json.files = this.json.hasOwnProperty('files') ? this.json.files : [{name: this.json.name, type: this.json.type}];
			delete this.json.type;
			delete this.json.name;
			this.setState({
				files: this.json.files,
				setVar: this.json.getDigits.setVar,
				min: this.json.getDigits.min,
				max: this.json.getDigits.max,
				tries: this.json.getDigits.tries,
				timeout: this.json.getDigits.timeout,
				flushDTMF: this.json.getDigits.flushDTMF,
				name: '',//this.state.webitel.filter((item)=>{return item.substr(item.length - 3) === 'wav'})[0],
				type: this.defValues.files[0]
			});
		}
	}
	typeChanged(e){
		this.setState({
			type: e.target.value,
			name: ''//['mp3', 'wav'].indexOf(e.target.value) !== -1 ? this.state.webitel.filter((item)=>{return item.substr(item.length - 3) === e.target.value})[0] : ''
		});
	}
	nameChanged(e){
		this.setState({
			name: e.target.value
		});
	}
	jsonGetDigitsPropertyChanged(e){
		this.json.getDigits[e.target.name] = e.target.value;
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	jsonGetDigitsNumberChanged(e){
		this.json.getDigits[e.target.name] = e.target.valueAsNumber;
		this.setState({
			[e.target.name]: e.target.valueAsNumber
		});
	}
	jsonGetDigitsCheckboxChanged(e){
		this.json.getDigits[e.target.name] = e.target.checked;
		this.setState({
			[e.target.name]: e.target.checked
		});
	}
	addFile(){
		this.json.files.push({name:this.state.name, type:this.state.type});
		this.setState({
			files: this.json.files,
			name: '',//this.state.webitel.filter((item)=>{return item.substr(item.length - 3) === 'wav'})[0],
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
	setArray(arr){
		this.json.files = arr;
		this.setState({
			files: this.json.files
		});
	}
	getInputMedia(){
		let time = new Date();
		let pblist = time.getTime() + 1;
		if(['mp3', 'wav'].indexOf(this.state.type) !== -1 && this.state.webitel){
			return (
				<div>
					<input type="text" autoComplete="off" name="name" list={pblist} value={this.state.name} onChange={(e)=>{this.nameChanged(e)}}
								 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}/>
					<datalist id={pblist}>
						{this.state.webitel.map( (i, index) => {
							if(i.substr(i.length - 3) === this.state.type){
								return <option key={index} value={i}>{i}</option>;
							}
						})}
					</datalist>
				</div>
			);
		}
		else{
			return (
				<input type="text" value={ this.state.name} onInput={(e)=>{this.nameChanged(e)}}
							 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
			)
		}
	}
	getParameters(){
		return(
			<div>
				<Tabs selected={0}>
					<Pane label="Digits">
						<div>
							<label>Variable</label>
							<input name="setVar" type="text" value={ this.state.setVar} onInput={(e)=>{this.jsonGetDigitsPropertyChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Minimum digits</label>
							<input name="min" type="number" value={ this.state.min} onInput={(e)=>{this.jsonGetDigitsNumberChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Maximum digits</label>
							<input name="max" type="number" value={ this.state.max} onInput={(e)=>{this.jsonGetDigitsNumberChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Number of tries</label>
							<input name="tries" type="number" value={ this.state.tries} onInput={(e)=>{this.jsonGetDigitsNumberChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Timeout</label>
							<input name="timeout" type="number" value={ this.state.timeout} onInput={(e)=>{this.jsonGetDigitsNumberChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
						<div>
							<label>Flush DTMF</label>
							<input name="flushDTMF" type="checkbox" checked={ this.state.flushDTMF} onChange={(e)=>{this.jsonGetDigitsCheckboxChanged(e)}}
										 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
						</div>
					</Pane>
					<Pane label="Audio files">
						<div>
							<div>
								<label>Type</label>
								<select name="type" value={this.state.type} onChange={(e)=>{this.typeChanged(e)}}
												onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
									{this.defValues.files.map( (i, index) => {
										return <option key={index} value={i}>{i}</option>;
									})}
								</select>
							</div>
							<div>
								<label>Name</label>
								{this.getInputMedia()}
							</div>
							<button onClick={this.addFile}>push</button>
							<SortableGrid items={this.state.files} deleteFunc={this.deleteFile} setFunc={this.setArray} type="playback"/>
						</div>
					</Pane>
				</Tabs>
			</div>
		);
	}
	render() {
		if(!this.props.node || !this.props.node.nodeType)return;
		return this.getParameters();
	}
}
