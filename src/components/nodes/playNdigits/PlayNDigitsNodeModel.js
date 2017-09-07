import _ from 'lodash';
import * as RJD from 'react-js-diagrams';

export class PlayNDigitsNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(114, 128, 150)', extras = {playback:{files:[], getDigits:{setVar:'', min:0, max:0, tries:0, timeout:0, flushDTMF: true}}}) {
    super('playNdigits');
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
