import _ from 'lodash';
import * as RJD from 'react-js-diagrams';

export class StopNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(67, 71, 76)') {
    super('stop');
    this.addPort(new RJD.DefaultPortModel(true, 'input', 'In'));
    this.name = name;
    this.color = color;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
    });
  }

  getInPorts() {
    return _.filter(this.ports, portModel => !portModel.out);
  }

	getInPort() {
		return this.ports.input;
	}
}
