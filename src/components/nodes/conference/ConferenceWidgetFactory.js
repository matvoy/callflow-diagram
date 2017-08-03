import * as RJD from 'react-js-diagrams';
import { ConferenceNodeWidgetFactory } from './ConferenceNodeWidget';

export class ConferenceWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('conference');
  }

  generateReactWidget(diagramEngine, node) {
    return ConferenceNodeWidgetFactory({ node });
  }
}
