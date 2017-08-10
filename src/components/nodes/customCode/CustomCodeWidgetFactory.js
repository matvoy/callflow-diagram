import * as RJD from 'react-js-diagrams';
import { CustomCodeNodeWidgetFactory } from './CustomCodeNodeWidget';

export class CustomCodeWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('customCode');
  }

  generateReactWidget(diagramEngine, node) {
    return CustomCodeNodeWidgetFactory({ node });
  }
}
