import * as RJD from 'react-js-diagrams';
import { UsersNodeModel } from './UsersNodeModel';

export class UsersNodeFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('UsersNodeModel');
  }

  getInstance() {
    return new UsersNodeModel();
  }
}
