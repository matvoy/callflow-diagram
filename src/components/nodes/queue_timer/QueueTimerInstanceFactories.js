import * as RJD from 'react-js-diagrams';
import { QueueTimerNodeModel } from './QueueTimerNodeModel';

export class QueueTimerNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('QueueTimerNodeModel');
  }

  getInstance() {
    return new QueueTimerNodeModel();
  }
}
