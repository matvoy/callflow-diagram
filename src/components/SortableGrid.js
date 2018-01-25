/**
 * Created by matvij on 25.01.18.
 */
import React from 'react';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement((props) =>//<i className="fa fa-times"></i>
	<li className="callflow-diagram-params-item"><span>{props.value}</span><button className="fa fa-times delete-button" onClick={()=>{props.deleteFunc(props.value)}}></button></li>
);

const SortablePlaybackItem = SortableElement((props) =>
	<li className="callflow-diagram-params-item">
		<span>Type: {props.value.type}<br/><span style={{color:'yellow'}}>{props.value.name}</span></span>
		<button className="fa fa-times delete-button" onClick={()=>{props.deleteFunc(props.value)}}></button>
	</li>
);

const SortableList = SortableContainer((props) => {
	var Item = props.type && props.type === 'playback' ? SortablePlaybackItem : SortableItem;
	return (
		<ul className="params-list">
			{props.items.map((value, index) => (
				<Item key={`item-${index}`} index={index} value={value} deleteFunc={props.deleteFunc} />
			))}
		</ul>
	);
});

export class SortableGrid extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			items: props.items
		};
		this.onSortEnd = this.onSortEnd.bind(this);
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			items: nextProps.items
		})
	}

	onSortEnd ({oldIndex, newIndex}) {
		let arr = arrayMove(this.state.items, oldIndex, newIndex);
		// this.setState({
		// 	items: arrayMove(this.state.items, oldIndex, newIndex)
		// });
		this.props.setFunc(arr);
	}

	render() {
		return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} deleteFunc={this.props.deleteFunc} type={this.props.type}/>;
	}
}
