import React from 'react';
import * as RJD from 'react-js-diagrams';
import { ReceiveFaxNodeModel } from './ReceiveFaxNodeModel';

export class ReceiveFaxNodeWidget extends RJD.DefaultNodeWidget {
  static defaultProps = {
    node: null,
    color: 'rgb(73, 72, 79)'
  };

  getInPort() {
    const { node, color, displayOnly } = this.props;
    let inputNode = node;

    if (displayOnly) {
      inputNode = new ReceiveFaxNodeModel(node.name, color);
    }

    return inputNode.getInPort ? <RJD.DefaultPortLabel model={inputNode.getInPort()} key='in-port' /> : null;
  }

  getOutPort() {
    const { node, color, displayOnly } = this.props;
    let outputNode = node;

    if (displayOnly) {
      outputNode = new ReceiveFaxNodeModel(node.name, color);
    }

    return outputNode.getOutPort ? <RJD.DefaultPortLabel model={outputNode.getOutPort()} key='out-port' /> : null;
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
          {!displayOnly ? <div className='fa fa-times' onClick={this.onRemove.bind(this)} /> : null}
        </div>
        <div className="app-center">
          <span className="app-img-receiveFax">
          </span>
        </div>
        <div className='ports'>
          <div className='in'>
            {this.getInPort()}
          </div>
          <div className='out'>
            {this.getOutPort()}
          </div>
        </div>
      </div>
    );
  }
}

export const ReceiveFaxNodeWidgetFactory = React.createFactory(ReceiveFaxNodeWidget);
