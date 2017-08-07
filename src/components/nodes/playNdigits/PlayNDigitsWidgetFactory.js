import * as RJD from 'react-js-diagrams';
import { PlayNDigitsNodeWidgetFactory } from './PlayNDigitsNodeWidget';

export class PlayNDigitsWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('playNdigits');
  }

  generateReactWidget(diagramEngine, node) {
    return PlayNDigitsNodeWidgetFactory({ node });
  }
}
