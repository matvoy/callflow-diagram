import * as RJD from 'react-js-diagrams';
import { SendEmailNodeModel } from './SendEmailNodeModel';

export class SendEmailNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('SendEmailNodeModel');
  }

  getInstance() {
    return new SendEmailNodeModel();
  }
}
