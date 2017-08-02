import * as RJD from 'react-js-diagrams';
import { AnswerNodeWidgetFactory } from './AnswerNodeWidget';

export class AnswerWidgetFactory extends RJD.NodeWidgetFactory{
  constructor() {
    super('answer');
  }

  generateReactWidget(diagramEngine, node) {
    return AnswerNodeWidgetFactory({ node });
  }
}
