import _ from 'lodash';
import * as RJD from 'react-js-diagrams';


export class TransferNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(114, 128, 150)', extras = {goto:'default:'}) {
    super('transfer');
    this.addPort(new RJD.DefaultPortModel(true, 'input', 'In'));
    this.name = name;
    this.color = color;
    this.extras = extras;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.extras = object.extras;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color, extras: this.extras
    });
  }

  getInPort() {
    return this.ports.input;
  }

}
