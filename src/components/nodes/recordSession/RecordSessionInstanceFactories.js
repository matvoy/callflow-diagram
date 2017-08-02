import * as RJD from 'react-js-diagrams';
import { RecordSessionNodeModel } from './RecordSessionNodeModel';

export class RecordSessionNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('RecordSessionNodeModel');
  }

  getInstance() {
    return new RecordSessionNodeModel();
  }
}
