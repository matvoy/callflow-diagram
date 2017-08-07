import * as RJD from 'react-js-diagrams';
import { OutboundCallNodeModel } from './OutboundCallNodeModel';

export class OutboundCallNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('OutboundCallNodeModel');
  }

  getInstance() {
    return new OutboundCallNodeModel();
  }
}
