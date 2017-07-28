import * as RJD from '../../../../../src/main';
import { LogicNodeModel } from './LogicNodeModel';

export class LogicNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('LogicNodeModel');
  }

  getInstance() {
    return new LogicNodeModel();
  }
}
