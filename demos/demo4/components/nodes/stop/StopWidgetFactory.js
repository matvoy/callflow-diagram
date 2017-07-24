import * as RJD from '../../../../../src/main';
import { StopNodeWidgetFactory } from './StopNodeWidget';

export class StopWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('stop');
  }

  generateReactWidget(diagramEngine, node) {
    return StopNodeWidgetFactory({ node });
  }
}
