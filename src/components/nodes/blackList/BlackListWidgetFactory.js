import * as RJD from 'react-js-diagrams';
import { BlackListNodeWidgetFactory } from './BlackListNodeWidget';

export class BlackListWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('blackList');
  }

  generateReactWidget(diagramEngine, node) {
    return BlackListNodeWidgetFactory({ node });
  }
}
