import * as RJD from '../../../../../src/main';
import { RecordFileNodeModel } from './RecordFileNodeModel';

export class RecordFileNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('RecordFileNodeModel');
  }

  getInstance() {
    return new RecordFileNodeModel();
  }
}
