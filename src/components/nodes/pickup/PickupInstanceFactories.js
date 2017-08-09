import * as RJD from 'react-js-diagrams';
import { PickupNodeModel } from './PickupNodeModel';

export class PickupNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('PickupNodeModel');
  }

  getInstance() {
    return new PickupNodeModel();
  }
}
