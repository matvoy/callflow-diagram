import _ from 'lodash';
import * as RJD from 'react-js-diagrams';

export class TtsNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(73, 72, 79)', extras = { tts: { provider: 'polly', voice:'Joey', text:'' } }) {
    super('tts');
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
