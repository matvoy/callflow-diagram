import * as RJD from 'react-js-diagrams';
import { RecordFileNodeModel } from './RecordFileNodeModel';

export class RecordFileNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('RecordFileNodeModel');
  }

  getInstance() {
    return new RecordFileNodeModel();
  }
}
