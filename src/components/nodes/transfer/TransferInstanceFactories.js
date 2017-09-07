import * as RJD from 'react-js-diagrams';
import { TransferNodeModel } from './TransferNodeModel';

export class TransferNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('TransferNodeModel');
  }

  getInstance() {
    return new TransferNodeModel();
  }
}
