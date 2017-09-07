import * as RJD from 'react-js-diagrams';
import { BridgeNodeModel } from './BridgeNodeModel';

export class BridgeNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('BridgeNodeModel');
  }

  getInstance() {
    return new BridgeNodeModel();
  }
}
