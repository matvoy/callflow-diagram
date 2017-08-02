import * as RJD from 'react-js-diagrams';
import { LogicNodeModel } from './LogicNodeModel';

export class LogicNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('LogicNodeModel');
  }

  getInstance() {
    return new LogicNodeModel();
  }
}
