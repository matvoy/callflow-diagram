import * as RJD from 'react-js-diagrams';
import { TransferNodeWidgetFactory } from './TransferNodeWidget';

export class TransferWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('transfer');
  }

  generateReactWidget(diagramEngine, node) {
    return TransferNodeWidgetFactory({ node });
  }
}
