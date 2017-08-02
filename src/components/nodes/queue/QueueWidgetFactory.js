import * as RJD from 'react-js-diagrams';
import { QueueNodeWidgetFactory } from './QueueNodeWidget';

export class QueueWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('queue');
  }

  generateReactWidget(diagramEngine, node) {
    return QueueNodeWidgetFactory({ node });
  }
}
