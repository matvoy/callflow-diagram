import * as RJD from '../../../../../src/main';
import { StopNodeModel } from './StopNodeModel';

export class StopNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('StopNodeModel');
  }

  getInstance() {
    return new StopNodeModel();
  }
}
