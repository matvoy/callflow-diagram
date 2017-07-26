import React from 'react';
import * as RJD from '../../../../../src/main';
import { StopNodeModel } from './StopNodeModel';

export class StopNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
    color: 'rgb(67, 71, 76)'
  };

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  getInPorts() {
    const { node, color, displayOnly } = this.props;
    let inputNode = node;

    if (displayOnly) {
      inputNode = new StopNodeModel(node.name, color);
    }

    return inputNode.getInPorts ? inputNode.getInPorts().map((port, i) => (
      <RJD.DefaultPortLabel model={port} key={`in-port-${i}`} />
    )) : [];
  }

  render() {
    const { node, displayOnly, color: displayColor } = this.props;
    const { name, color } = node;
    const style = {};
    if (color || displayColor) {
      style.background = color || displayColor;
    }

    return (
      <div className='basic-node' style={style}>
        <div className='title'>
          <div className='name'>
            {name}
          </div>
          {!displayOnly ? <div className='fa fa-close' onClick={this.onRemove.bind(this)} /> : null}
        </div>
        <div>
          <span className="app-img-stop">
          </span>
        </div>
        <div className='ports'>
          <div className='in'>
            {this.getInPorts()}
          </div>
        </div>
      </div>
    );
  }
}

export const StopNodeWidgetFactory = React.createFactory(StopNodeWidget);
