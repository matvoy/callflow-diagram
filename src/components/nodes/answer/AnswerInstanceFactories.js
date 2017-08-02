import * as RJD from 'react-js-diagrams';
import { AnswerNodeModel } from './AnswerNodeModel';

export class AnswerNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('AnswerNodeModel');
  }

  getInstance() {
    return new AnswerNodeModel();
  }
}
