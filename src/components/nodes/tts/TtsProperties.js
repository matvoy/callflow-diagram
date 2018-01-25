/**
 * Created by matvij on 26.07.17.
 */
/**
 * Created by matvij on 24.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class TtsProperties extends React.Component {
    constructor(props){
        super(props);
        this.defValues = Element[this.props.node.nodeType];
        this.provs = {};
        this.defValues.providers.forEach((item)=>{
        	this.provs[item.name] = item.voice;
				})
        this.json = this.props.node.extras.tts;
        let lang = '';
        if(this.json.provider === 'polly'){
					lang = 'English (US) (en-US)';
					if(this.json.voice !== ''){
						lang = this.defValues.providers[0].voice.filter((item)=>{
							return item.male.indexOf(this.json.voice)!==-1||item.female.indexOf(this.json.voice)!==-1;
						})[0].language;
					}
				}
				else if(this.json.provider === 'microsoft'){
        	lang = this.json.voice.language + ' ' + this.json.voice.gender;
				}
        this.state={
            provider: this.json.provider,
            accessKey: this.json.accessKey,
						accessToken: this.json.accessToken,
						voice: this.json.voice,
            text: this.json.text,
						textType: this.json.textType,
						language: lang
        };
        this.propertyChanged = this.propertyChanged.bind(this);
				this.langChanged = this.langChanged.bind(this);
				this.providerChanged = this.providerChanged.bind(this);
				this.msLangChanged = this.msLangChanged.bind(this);
				this.keyTokenChanged = this.keyTokenChanged.bind(this);
				this.getVoicesByLanguage = this.getVoicesByLanguage.bind(this);
				this.getParametersByProvider = this.getParametersByProvider.bind(this);
    }
    componentWillReceiveProps(nextProps) {
    		if(this.props.node.id === nextProps.node.id)
    			return;
        this.json = nextProps.node.extras.tts;
				let lang = '';
				if(this.json.provider === 'polly') {
						lang = 'English (US) (en-US)';
						if (this.json.voice !== '') {
							lang = this.defValues.providers[0].voice.filter((item) => {
								return item.male.indexOf(this.json.voice) !== -1 || item.female.indexOf(this.json.voice) !== -1;
							})[0].language;
						}
					}
				else if(this.json.provider === 'microsoft'){
					lang = this.json.voice.language + ' ' + this.json.voice.gender;
				}
        this.setState({
					provider: this.json.provider,
					accessKey: this.json.accessKey,
					accessToken: this.json.accessToken,
					voice: this.json.voice,
					text: this.json.text,
					textType: this.json.textType,
					language: lang
        });
    }

    providerChanged(e){
			if(e.target.value === 'polly'){
				this.json.provider = e.target.value;
				this.json.voice = 'Joey';
				this.setState({
					provider: this.json.provider,
					voice: this.json.voice,
					language: 'English (US) (en-US)'
				});
			}
			else if(e.target.value === 'microsoft'){
				this.json.provider = e.target.value;
				this.json.voice = {
					language: 'en-US',
					gender: 'Male'
				};
				this.setState({
					provider: this.json.provider,
					voice: this.json.voice,
					language: 'en-US Male'
				});
			}
		}

		msLangChanged(e){
    	let str = e.target.value.split(' ');
			this.json.voice = {
				language: str[0],
				gender: str[1]
			};
			this.setState({
				language: e.target.value
			});
		}

    propertyChanged(e){
        this.json[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        });
    }

		keyTokenChanged(e){
    	if(e.target.value!==''){
				this.json[e.target.name] = e.target.value;
				this.setState({
					[e.target.name]: e.target.value
				});
			}
			else{
    		delete this.json[e.target.name];
				this.setState({
					[e.target.name]: e.target.value
				});
			}
		}

		langChanged(e){
			this.setState({
				language: e.target.value
			});
		}

    getParameters(){
        return(
            <div>
                <div>
                    <label>Provider</label>
										<select name="provider" value={this.state.provider} onChange={(e)=>{this.providerChanged(e)}}
														onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
											{this.defValues.providers.map( (i, index) => {
												return <option key={index} value={i.name}>{i.name}</option>;
											})}
										</select>
                </div>
                <div>
                    <label>Access key</label>
                    <input name="accessKey" type="text" value={ this.state.accessKey} onInput={(e)=>{this.keyTokenChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
                <div>
                    <label>Access token</label>
										<input name="accessToken" type="text" value={ this.state.accessToken} onInput={(e)=>{this.keyTokenChanged(e)}}
													 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></input>
                </div>
								{this.getParametersByProvider()}
								<div>
									<label>Text type</label>
									<select name="textType" value={this.state.textType} onChange={(e)=>{this.propertyChanged(e)}}
													onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
										{this.defValues.textType.map( (i, index) => {
											return <option key={index} value={i}>{i}</option>;
										})}
									</select>
								</div>
								<div>
									<label>Text</label>
									<textarea name="text" type="text" value={ this.state.text} onInput={(e)=>{this.propertyChanged(e)}}
												 onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}></textarea>
								</div>
            </div>
        );
    }
    getParametersByProvider(){
			if(this.state.provider === 'polly'){
				return(
					<div>
						<div>
							<label>Language</label>
							<select name="language" value={this.state.language} onChange={(e)=>{this.langChanged(e)}}
											onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
								{this.provs[this.state.provider].map( (i, index) => {
									return <option key={index} value={i.language}>{i.language}</option>;
								})}
							</select>
						</div>
						<div>
							<label>Voice</label>
							{this.getVoicesByLanguage()}
						</div>
					</div>
				);
			}
			else if(this.state.provider === 'microsoft'){
				return(
					<div>
						<label>Language</label>
						<select name="language" value={this.state.language} onChange={(e)=>{this.msLangChanged(e)}}
										onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
							{this.provs[this.state.provider].map( (i, index) => {
								return <option key={index} value={i.language + ' ' + i.gender}>{i.language + ' ' + i.gender}</option>;
							})}
						</select>
					</div>
				);
			}
		}
    getVoicesByLanguage(){
    	let lanVoices = this.defValues.providers[0].voice.filter((i)=>{
    		return i.language === this.state.language;
			})[0];
    	let voices = [];
			lanVoices.male.forEach((item, index)=>{
				voices.push((
					<option value={item}>{item} (male)</option>
				));
			});
			lanVoices.female.forEach((item, index)=>{
				voices.push((
					<option value={item}>{item} (female)</option>
				));
			})
    	return(
				<select name="voice" value={this.state.voice} onChange={(e)=>{this.propertyChanged(e)}}
								onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
					{voices}
				</select>
			);
		}
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}
