/**
 * Created by matvij on 14.08.17.
 */
import React from 'react';

export class Tabs extends React.Component{
	constructor(props){
		super(props);
		this.state = { selected: this.props.selected||0};
	}

	handleClick(index, event) {
		event.preventDefault();
		this.setState({
			selected: index
		});
	}
	_renderTitles() {
		function labels(child, index) {
			let activeClass = (this.state.selected === index ? 'active' : '');
			return (
				<li key={index} className={activeClass} onClick={this.handleClick.bind(this, index)}>
						{child.props.label}
				</li>
			);
		}
		return (
			<ul className="tabs__labels">
				{this.props.children.map(labels.bind(this))}
			</ul>
		);
	}

	_renderContent() {
		return (
			<div className="tabs__content">
				{this.props.children[this.state.selected]}
			</div>
		);
	}

	render() {
		return (
			<div className="tabs">
				{this._renderTitles()}
				{this._renderContent()}
			</div>
		);
	}
};

export class Pane extends React.Component{
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
};
