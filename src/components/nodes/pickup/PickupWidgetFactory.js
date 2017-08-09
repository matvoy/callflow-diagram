import * as RJD from 'react-js-diagrams';
import { PickupNodeWidgetFactory } from './PickupNodeWidget';

export class PickupWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('pickup');
  }

  generateReactWidget(diagramEngine, node) {
    return PickupNodeWidgetFactory({ node });
  }
}
