/**
 * Created by matvij on 26.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class PlaybackProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
				this.webitel = Element.webitelParams.media;
        this.state={name:'', type: this.defValues.files[0]};
        this.files = this.props.node.extras[this.props.node.nodeType]['files'];
        this.typeChanged = this.typeChanged.bind(this);
        this.nameChanged = this.nameChanged.bind(this);
        this.addMedia = this.addMedia.bind(this);
        this.deleteMedia = this.deleteMedia.bind(this);
				this.getInputMedia = this.getInputMedia.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.files = nextProps.node.extras[nextProps.node.nodeType]['files'];
    }
    typeChanged(e){
        this.setState({
            type: e.target.value
        });
    }
    nameChanged(e){
        this.setState({
            name: e.target.value
        });
    }
    addMedia(){
        let file = {name:this.state.name, type:this.state.type};
        this.files.push(file);
        this.setState({name:'', type: this.defValues.files[0]});
    }
    deleteMedia(item){
        let index = this.files.indexOf(item);
        this.files.splice(index,1);
        this.forceUpdate();
    }
    getInputMedia(){
    	if(['mp3', 'wav'].indexOf(this.state.type) !== -1){
    		return (
					<select value={this.state.name} onChange={(e)=>{this.nameChanged(e)}}
									onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
						{this.webitel.map( (i, index) => {
							return <option key={index} value={i}>{i}</option>;
						})}
					</select>
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
                    <ul className="params-list">
                        {this.files.map((i)=> {
                                return (
                                    <li>
																			<span>Type: {i.type}<br/><span style={{color:'yellow'}}>{i.name}</span></span>
																			<button onClick={()=>{this.deleteMedia(i)}}>x</button>
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
