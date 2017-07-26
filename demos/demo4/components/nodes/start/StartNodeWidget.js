import React from 'react';
import * as RJD from '../../../../../src/main';
import { StartNodeModel } from './StartNodeModel';

// const answerImg = require('../../../images/test.svg');
// var answerImg = require('../../../images/test.svg');

export class StartNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
    color: 'rgb(215, 225, 239)'
  };

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

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
          <div className='name' style={{color:'#000000', fontWeight: 'bold'}}>
            {name}
          </div>
          {!displayOnly ? <div className='fa fa-close' onClick={this.onRemove.bind(this)} /> : null}
        </div>
        <div>
          <span className="app-img-start">
          </span>
        </div>
        <div className='ports'>
          <div className='out' style={{color:'#000000', fontWeight: 'bold'}}>
            {this.getOutPorts()}
          </div>
        </div>
      </div>
    );
  }
}

export const StartNodeWidgetFactory = React.createFactory(StartNodeWidget);
