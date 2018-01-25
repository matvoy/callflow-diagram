/**
 * Created by matvij on 26.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';
import {SortableGrid} from '../../SortableGrid';

export class PlaybackProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
				//this.webitel = Element.webitelParams.media;
				let mediaArr = Element.webitelParams.mediaArr;
				this.json = props.node.extras.playback;
				this.json.files =this.json.hasOwnProperty('files') ? this.json['files'] : [{name: this.json.name, type: this.json.type}];
				delete this.json.type;
				delete this.json.name;
        this.state={files:this.json.files,
					name: '',//mediaArr.filter((item)=>{return item.substr(item.length - 3) === 'wav'})[0],
					type: this.defValues.files[0],
					webitel: mediaArr};
        //this.files = props.node.extras.playback.hasOwnProperty('files') ? props.node.extras.playback['files'] : [{name: props.node.extras.playback.name, type: props.node.extras.playback.type}];


				this.getWebitelParam();
        this.typeChanged = this.typeChanged.bind(this);
        this.nameChanged = this.nameChanged.bind(this);
        this.addMedia = this.addMedia.bind(this);
        this.deleteMedia = this.deleteMedia.bind(this);
				this.getInputMedia = this.getInputMedia.bind(this);
				this.setArray = this.setArray.bind(this);
    }
    componentWillReceiveProps(nextProps) {
				if(this.props.node.id === nextProps.node.id)
					return;
				this.json = nextProps.node.extras.playback;
				this.json.files = this.json.hasOwnProperty('files') ? this.json.files : [{name: this.json.name, type: this.json.type}];
				delete this.json.type;
				delete this.json.name;
				this.state={
					name: '',//this.state.webitel.filter((item)=>{return item.substr(item.length - 3) === 'wav'})[0],
					type: this.defValues.files[0],
					files: this.json.files
				};
				this.getWebitelParam();
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
			else{
				let arr = Element.webitelParams.mediaArr;
				this.setState({
					webitel: arr,
					name: ''/*arr.filter((item) => {
						return item.substr(item.length - 3) === 'wav'
					})[0]*/
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
    addMedia(){
			this.json.files.push({name:this.state.name, type:this.state.type});
			this.setState({
				files: this.json.files,
				name: '',//this.state.webitel.filter((item)=>{return item.substr(item.length - 3) === 'wav'})[0],
				type: this.defValues.files[0]
			});
    }
    deleteMedia(item){
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
										{this.getInputMedia()}
                    <button onClick={this.addMedia}>push</button>
										<SortableGrid items={this.state.files} deleteFunc={this.deleteMedia} setFunc={this.setArray} type="playback"/>
                </div>
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
