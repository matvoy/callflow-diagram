import _ from 'lodash';
import * as RJD from '../../../../../src/main';

export class StartNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(31, 211, 55)') {
    super('start');
    this.addPort(new RJD.DefaultPortModel(false, 'output', 'Out'));
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

  getOutPorts() {
    return _.filter(this.ports, portModel => !portModel.in);
  }
}
