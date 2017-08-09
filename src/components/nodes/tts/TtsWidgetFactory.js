import * as RJD from 'react-js-diagrams';
import { TtsNodeWidgetFactory } from './TtsNodeWidget';

export class TtsWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('tts');
  }

  generateReactWidget(diagramEngine, node) {
    return TtsNodeWidgetFactory({ node });
  }
}
