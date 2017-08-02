import * as RJD from 'react-js-diagrams';
import { StartNodeWidgetFactory } from './StartNodeWidget';

export class StartWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('start');
  }

  generateReactWidget(diagramEngine, node) {
    return StartNodeWidgetFactory({ node });
  }
}
