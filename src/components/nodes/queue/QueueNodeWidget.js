import React from 'react';
import * as RJD from 'react-js-diagrams';
import { QueueNodeModel } from './QueueNodeModel';

export class QueueNodeWidget extends RJD.DefaultNodeWidget {
  static defaultProps = {
    node: null,
    color: 'rgb(100, 218, 229)'
  };

  getInPort() {
    const { node, color, displayOnly } = this.props;
    let inputNode = node;

    if (displayOnly) {
      inputNode = new QueueNodeModel(node.name, color);
    }

    return inputNode.getInPort ? <RJD.DefaultPortLabel model={inputNode.getInPort()} key='in-port' /> : null;
  }

  getOutPort() {
    const { node, color, displayOnly } = this.props;
    let outputNode = node;

    if (displayOnly) {
      outputNode = new QueueNodeModel(node.name, color);
    }

    return outputNode.getOutPort ? <RJD.DefaultPortLabel model={outputNode.getOutPort()} key='out-port' /> : null;
  }

  getTimersPort() {
      const { node, color, displayOnly } = this.props;
      let outputNode = node;

      if (displayOnly) {
          outputNode = new QueueNodeModel(node.name, color);
      }

      return outputNode.getTimersPort ? <RJD.DefaultPortLabel model={outputNode.getTimersPort()} key='out-port' /> : null;
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
        <div className="app-center">
          <span className="app-img-queue">
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
        <div className='ports'>
          <div className='out'>
              {this.getTimersPort()}
          </div>
        </div>
      </div>
    );
  }
}

export const QueueNodeWidgetFactory = React.createFactory(QueueNodeWidget);
