import * as RJD from 'react-js-diagrams';
import { SleepNodeModel } from './SleepNodeModel';

export class SleepNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('SleepNodeModel');
  }

  getInstance() {
    return new SleepNodeModel();
  }
}
