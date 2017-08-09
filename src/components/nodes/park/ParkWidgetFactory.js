import * as RJD from 'react-js-diagrams';
import { ParkNodeWidgetFactory } from './ParkNodeWidget';

export class ParkWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('park');
  }

  generateReactWidget(diagramEngine, node) {
    return ParkNodeWidgetFactory({ node });
  }
}
