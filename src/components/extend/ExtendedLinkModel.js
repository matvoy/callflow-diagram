/**
 * Created by matvij on 03.08.17.
 */

import * as RJD from 'react-js-diagrams';

export class ExtendedLinkModel extends RJD.LinkModel {
	addPoint(pointModel, index = 1) {
		if(this.points.length<2){
			this.points.splice(index, 0, pointModel);
		}
	}
	deSerialize(ob){
		super.deSerialize(ob);
		this.extras = ob.extras;
	}
}

export class LinkInstanceFactory extends RJD.AbstractInstanceFactory {
	constructor() {
		super('ExtendedLinkModel');
	}

	getInstance() {
		return new ExtendedLinkModel();
	}
}

