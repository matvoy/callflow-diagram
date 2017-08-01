import * as RJD from '../../../../../src/main';
import { SleepNodeModel } from './SleepNodeModel';

export class SleepNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('SleepNodeModel');
  }

  getInstance() {
    return new SleepNodeModel();
  }
}
