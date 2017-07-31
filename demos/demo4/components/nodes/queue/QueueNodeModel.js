import _ from 'lodash';
import * as RJD from '../../../../../src/main';


export class QueueNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(100, 218, 229)', extras = {queue:{name:''}}) {
    super('queue');
    this.addPort(new RJD.DefaultPortModel(false, 'output', 'Out'));
    this.addPort(new RJD.DefaultPortModel(true, 'input', 'In'));
    this.addPort(new RJD.DefaultPortModel(false, 'timers', 'Timers'));
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

  getTimersPort() {
      return this.ports.timers;
  }
}
