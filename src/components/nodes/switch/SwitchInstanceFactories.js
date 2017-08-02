import * as RJD from 'react-js-diagrams';
import { SwitchNodeModel } from './SwitchNodeModel';

export class SwitchNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('SwitchNodeModel');
  }

  getInstance() {
    return new SwitchNodeModel();
  }
}
