import _ from 'lodash';
import * as RJD from '../../../../../src/main';

export class RecordSessionNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(73, 72, 79)', extras = { recordSession: { action:'start', type:'mp3', stereo:true, followTransfer:true, bridged:true, minSec:0, email:[] } }) {
    super('recordSession');
    this.addPort(new RJD.DefaultPortModel(false, 'output', 'Out'));
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

  getOutPort() {
    return this.ports.output;
  }
}