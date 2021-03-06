import _ from 'lodash';
import * as RJD from 'react-js-diagrams';

export class RecordFileNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(73, 72, 79)', extras = { recordFile: { name:'', terminators:'', type:'mp3', maxSec:0, silenceHits:0, email:[] } }) {
    super('recordFile');
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
