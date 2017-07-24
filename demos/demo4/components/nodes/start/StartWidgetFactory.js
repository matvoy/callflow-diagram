import * as RJD from '../../../../../src/main';
import { StartNodeWidgetFactory } from './StartNodeWidget';

export class StartWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('start');
  }

  generateReactWidget(diagramEngine, node) {
    return StartNodeWidgetFactory({ node });
  }
}
