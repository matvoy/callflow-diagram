import * as RJD from 'react-js-diagrams';
import { ReceiveFaxNodeWidgetFactory } from './ReceiveFaxNodeWidget';

export class ReceiveFaxWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('receiveFax');
  }

  generateReactWidget(diagramEngine, node) {
    return ReceiveFaxNodeWidgetFactory({ node });
  }
}
