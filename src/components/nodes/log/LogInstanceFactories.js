import * as RJD from 'react-js-diagrams';
import { LogNodeModel } from './LogNodeModel';

export class LogNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('LogNodeModel');
  }

  getInstance() {
    return new LogNodeModel();
  }
}
