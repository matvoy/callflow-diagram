/**
 * Created by matvij on 31.07.17.
 */
import React from 'react';
import Element from '../../PropertyValues';

export class QueueProperties extends React.Component {
    constructor(props){
        super(props);
        this.propertyChanged = this.propertyChanged.bind(this);
        this.json = this.props.node.extras.queue;
        // this.webitel = Element.webitelParams.acd;
				let acdArr = Element.webitelParams.acdArr;
				this.json.name = this.json.name === '' && acdArr.length > 0 ? acdArr[0] : this.json.name;
        this.state = { value: this.json.name, webitel: acdArr};
        this.getWebitelParam();
    }
		getWebitelParam(){
			if(Element.webitelParams.acdArr.length === 0) {
				Element.webitelParams.acd((arr) => {
						this.json.name = this.json.name === '' && arr.length > 0 ? arr[0] : this.json.name;
						this.setState({
							webitel: arr,
							value: this.json.name
						});
						Element.webitelParams.acdArr = arr;
					}
				);
			}
		}
    propertyChanged(e){
				this.json.name=e.target.value;
        this.setState({
            value: e.target.value
        });
    }
    componentWillReceiveProps(nextProps) {
			if(this.props.node.id === nextProps.node.id) return;
			this.json = nextProps.node.extras.queue;
			this.json.name = this.json.name === '' && this.state.webitel.length > 0 ? this.state.webitel[0] : this.json.name;
			this.setState({ value: this.json.name});
    }
    getParameters(){
        return(
            <div>
                <label>Name</label>
								<select name="name" value={this.state.value} onChange={(e)=>{this.propertyChanged(e)}}
												onFocus={()=>{this.props.setIsFocused(true)}} onBlur={()=>{this.props.setIsFocused(false)}}>
									{this.state.webitel.map( (i, index) => {
										return <option key={index} value={i}>{i}</option>;
									})}
								</select>
            </div>
        );
    }
    render() {
        if(!this.props.node||!this.props.node.nodeType)return;
        return this.getParameters();
    }
}

