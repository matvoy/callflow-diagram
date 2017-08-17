/**
 * Created by matvij on 03.08.17.
 */
import _ from 'lodash';
import * as RJD from 'react-js-diagrams';

export class ExtendedDiagramModel extends RJD.DiagramModel {
	setNode(node){
		if (this.nodes[node.id]) {
			this.nodes[node.id]=node;
		}
	}
}
