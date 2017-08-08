import * as RJD from 'react-js-diagrams';
import { SendEmailNodeWidgetFactory } from './SendEmailNodeWidget';

export class SendEmailWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('sendEmail');
  }

  generateReactWidget(diagramEngine, node) {
    return SendEmailNodeWidgetFactory({ node });
  }
}
