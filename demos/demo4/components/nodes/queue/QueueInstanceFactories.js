import * as RJD from '../../../../../src/main';
import { QueueNodeModel } from './QueueNodeModel';

export class QueueNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('QueueNodeModel');
  }

  getInstance() {
    return new QueueNodeModel();
  }
}
