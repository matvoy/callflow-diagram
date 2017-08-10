import React from 'react';
import * as RJD from 'react-js-diagrams';
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
  getCasePorts() {
      const { node, color, displayOnly } = this.props;
      let outputNode = node;

      if (displayOnly) {
          outputNode = new SwitchNodeModel(node.name, color);
      }

			let arr=[];
      if(outputNode.getCasePorts().length>0){
				for(let port of outputNode.getCasePorts()) {
					arr.push((
						<div className='ports-black'>
							<div className='out'>
								<RJD.DefaultPortLabel model={outputNode.getCustomPort(port)} key='out-port' />
							</div>
						</div>));
				}
				return arr;
      }
      else{
      	return null;
			}
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
				{this.getCasePorts()}
      </div>
    );
  }
}

export const SwitchNodeWidgetFactory = React.createFactory(SwitchNodeWidget);
