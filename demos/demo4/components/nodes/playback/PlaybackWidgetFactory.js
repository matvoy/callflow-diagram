import * as RJD from '../../../../../src/main';
import { PlaybackNodeWidgetFactory } from './PlaybackNodeWidget';

export class PlaybackWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('playback');
  }

  generateReactWidget(diagramEngine, node) {
    return PlaybackNodeWidgetFactory({ node });
  }
}
