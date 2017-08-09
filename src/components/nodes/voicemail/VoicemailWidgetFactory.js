import * as RJD from 'react-js-diagrams';
import { VoicemailNodeWidgetFactory } from './VoicemailNodeWidget';

export class VoicemailWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('voicemail');
  }

  generateReactWidget(diagramEngine, node) {
    return VoicemailNodeWidgetFactory({ node });
  }
}
