import React from 'react';
import * as RJD from 'react-js-diagrams';
import { BlackListNodeModel } from './BlackListNodeModel';

export class BlackListNodeWidget extends RJD.DefaultNodeWidget {
  static defaultProps = {
    node: null,
    color: 'rgb(100, 218, 229)'
  };

  getInPort() {
    const { node, color, displayOnly } = this.props;
    let inputNode = node;

    if (displayOnly) {
      inputNode = new BlackListNodeModel(node.name, color);
    }

    return inputNode.getInPort ? <RJD.DefaultPortLabel model={inputNode.getInPort()} key='in-port' /> : null;
  }

  getOutPort() {
    const { node, color, displayOnly } = this.props;
    let outputNode = node;

    if (displayOnly) {
      outputNode = new BlackListNodeModel(node.name, color);
    }

    return outputNode.getOutPort ? <RJD.DefaultPortLabel model={outputNode.getOutPort()} key='out-port' /> : null;
  }

	getActionsPort() {
      const { node, color, displayOnly } = this.props;
      let outputNode = node;

      if (displayOnly) {
          outputNode = new BlackListNodeModel(node.name, color);
      }

      return outputNode.getActionsPort ? <RJD.DefaultPortLabel model={outputNode.getActionsPort()} key='out-port' /> : null;
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
          <span className="app-img-blackList">
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
              {this.getActionsPort()}
          </div>
        </div>
      </div>
    );
  }
}

export const BlackListNodeWidgetFactory = React.createFactory(BlackListNodeWidget);
