import * as RJD from '../../../../../src/main';
import { LogNodeModel } from './LogNodeModel';

export class LogNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('LogNodeModel');
  }

  getInstance() {
    return new LogNodeModel();
  }
}
