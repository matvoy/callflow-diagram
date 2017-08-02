import * as RJD from 'react-js-diagrams';
import { QueueNodeModel } from './QueueNodeModel';

export class QueueNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('QueueNodeModel');
  }

  getInstance() {
    return new QueueNodeModel();
  }
}
