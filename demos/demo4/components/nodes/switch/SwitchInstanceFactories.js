import * as RJD from '../../../../../src/main';
import { SwitchNodeModel } from './SwitchNodeModel';

export class SwitchNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('SwitchNodeModel');
  }

  getInstance() {
    return new SwitchNodeModel();
  }
}
