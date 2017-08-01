import * as RJD from '../../../../../src/main';
import { EchoNodeWidgetFactory } from './EchoNodeWidget';

export class EchoWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('echo');
  }

  generateReactWidget(diagramEngine, node) {
    return EchoNodeWidgetFactory({ node });
  }
}
