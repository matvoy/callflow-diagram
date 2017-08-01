import * as RJD from '../../../../../src/main';
import { RecordSessionNodeModel } from './RecordSessionNodeModel';

export class RecordSessionNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('RecordSessionNodeModel');
  }

  getInstance() {
    return new RecordSessionNodeModel();
  }
}
