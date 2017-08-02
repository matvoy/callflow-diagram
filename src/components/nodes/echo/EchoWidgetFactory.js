import * as RJD from 'react-js-diagrams';
import { EchoNodeWidgetFactory } from './EchoNodeWidget';

export class EchoWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('echo');
  }

  generateReactWidget(diagramEngine, node) {
    return EchoNodeWidgetFactory({ node });
  }
}
