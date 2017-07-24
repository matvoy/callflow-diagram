import * as RJD from '../../../../../src/main';
import { StartNodeModel } from './StartNodeModel';

export class StartNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('StartNodeModel');
  }

  getInstance() {
    return new StartNodeModel();
  }
}
