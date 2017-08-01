import React from 'react';
import * as RJD from '../../../../../src/main';
import { SwitchNodeModel } from './SwitchNodeModel';

export class SwitchNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
    color: 'rgb(100, 218, 229)'
  };

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  getInPort() {
    const { node, color, displayOnly } = this.props;
    let inputNode = node;

    if (displayOnly) {
      inputNode = new SwitchNodeModel(node.name, color);
    }

    return inputNode.getInPort ? <RJD.DefaultPortLabel model={inputNode.getInPort()} key='in-port' /> : null;
  }

  getOutPort() {
    const { node, color, displayOnly } = this.props;
    let outputNode = node;

    if (displayOnly) {
      outputNode = new SwitchNodeModel(node.name, color);
    }

    return outputNode.getOutPort ? <RJD.DefaultPortLabel model={outputNode.getOutPort()} key='out-port' /> : null;
  }
  // getIfPort() {
  //     const { node, color, displayOnly } = this.props;
  //     let inputNode = node;
  //
  //     if (displayOnly) {
  //         inputNode = new SwitchNodeModel(node.name, color);
  //     }
  //
  //     return inputNode.getIfPort ? <RJD.DefaultPortLabel model={inputNode.getIfPort()} key='out-port' /> : null;
  // }
  // getElsePort() {
  //     const { node, color, displayOnly } = this.props;
  //     let inputNode = node;
  //
  //     if (displayOnly) {
  //         inputNode = new SwitchNodeModel(node.name, color);
  //     }
  //
  //     return inputNode.getElsePort ? <RJD.DefaultPortLabel model={inputNode.getElsePort()} key='out-port' /> : null;
  // }
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
        <div>
          <span className="app-img-switch">
          </span>
        </div>
        <div className='ports-black'>
          <div className='in'>
            {this.getInPort()}
          </div>
          <div className='out'>
            {this.getOutPort()}
          </div>
        </div>
        {/*<div className='ports-black'>*/}
          {/*<div className='out'>*/}
              {/*{this.getIfPort()}*/}
          {/*</div>*/}
          {/*<div className='out'>*/}
              {/*{this.getElsePort()}*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export const SwitchNodeWidgetFactory = React.createFactory(SwitchNodeWidget);
