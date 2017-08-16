/**
 * Created by matvij on 16.08.17.
 */
import React from 'react';
import * as RJD from 'react-js-diagrams';


export class ExtendedLinkWidget extends RJD.DefaultLinkWidget {
		constructor(props){
			super(props);
		}

		generateLink(extraProps) {
			const { link, width, color } = this.props;
			const { selected } = this.state;
			const goto = !!link.extras.goto ? ' goto' : '';
			const bottom = (
				<path
					className={(selected || link.isSelected()) ? 'selected' + goto : goto}
					strokeWidth={width}
					stroke={color}
					{...extraProps}
				/>
			);
			const top = (
				<path
					strokeLinecap={'round'}
					data-linkid={link.getID()}
					stroke={color}
					strokeOpacity={selected ? 0.1 : 0}
					strokeWidth={20}
					onMouseLeave={() => this.setState({ selected: false })}
					onMouseEnter={() => this.setState({ selected: true })}
					onContextMenu={event => {
						event.preventDefault();
						this.props.link.remove();
					}}
					{...extraProps}
				/>
			);
			return (
				<g key={`link-${extraProps.id}`}>
					{bottom}
					{top}
				</g>
			);
		}
}

export class ExtendedLinkFactory extends RJD.DefaultLinkFactory {
	constructor() {
		super('default');
	}

	generateReactWidget(diagramEngine, link) {
		return (
			<ExtendedLinkWidget link={link} diagramEngine={diagramEngine} />
		);
	}
}
