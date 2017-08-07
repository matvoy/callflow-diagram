import * as RJD from 'react-js-diagrams';
import { UsersNodeWidgetFactory } from './UsersNodeWidget';

export class UsersWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('users');
  }

  generateReactWidget(diagramEngine, node) {
    return UsersNodeWidgetFactory({ node });
  }
}
