import * as RJD from '../../../../../src/main';
import { AnswerNodeModel } from './AnswerNodeModel';

export class AnswerNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('AnswerNodeModel');
  }

  getInstance() {
    return new AnswerNodeModel();
  }
}
