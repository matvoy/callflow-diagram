import * as RJD from '../../../../../src/main';
import { QueueNodeWidgetFactory } from './QueueNodeWidget';

export class QueueWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('queue');
  }

  generateReactWidget(diagramEngine, node) {
    return QueueNodeWidgetFactory({ node });
  }
}
