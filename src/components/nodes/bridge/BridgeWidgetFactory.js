import * as RJD from 'react-js-diagrams';
import { BridgeNodeWidgetFactory } from './BridgeNodeWidget';

export class BridgeWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('bridge');
  }

  generateReactWidget(diagramEngine, node) {
    return BridgeNodeWidgetFactory({ node });
  }
}
