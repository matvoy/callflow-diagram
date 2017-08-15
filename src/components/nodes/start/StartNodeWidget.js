import React from 'react';
import * as RJD from 'react-js-diagrams';
import { StartNodeModel } from './StartNodeModel';

export class StartNodeWidget extends RJD.DefaultNodeWidget {
  static defaultProps = {
    node: null,
    color: 'rgb(215, 225, 239)'
  };

  getOutPorts() {
    const { node, color, displayOnly } = this.props;
    let outputNode = node;

    if (displayOnly) {
      outputNode = new StartNodeModel(node.name, color);
    }

    return outputNode.getOutPorts ? outputNode.getOutPorts().map((port, i) => (
      <RJD.DefaultPortLabel model={port} key={`out-port-${i}`} />
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
          <div className='name-black'>
            {name}
          </div>
          {!displayOnly ? <div className='fa fa-close' onClick={this.onRemove.bind(this)} /> : null}
        </div>
        <div className="app-center">
          <span className="app-img-start">
          </span>
        </div>
        <div className='ports-black'>
          <div className='out'>
            {this.getOutPorts()}
          </div>
        </div>
      </div>
    );
  }
}

export const StartNodeWidgetFactory = React.createFactory(StartNodeWidget);
