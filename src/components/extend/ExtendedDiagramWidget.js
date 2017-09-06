/**
 * Created by matvij on 02.08.17.
 */
import React from 'react';
import _ from 'lodash';
import * as RJD from 'react-js-diagrams';

export class ExtendedDiagramWidget extends RJD.DiagramWidget {
		constructor(props){
			super(props);
			//this.keydownListener = this.keydownListener.bind(this);
			window.keydownDiagramListener = this.keydownListener.bind(this);
		}

  	attachDiagramEngine() {
		   const { diagramEngine } = this.props;
	     diagramEngine.setCanvas(this.refs['canvas']);
	     diagramEngine.setForceUpdate(this.forceUpdate.bind(this));
	  }

		componentWillUpdate(nextProps) {
			if (this.props.diagramEngine.diagramModel.id !== nextProps.diagramEngine.diagramModel.id) {
				this.setState({ renderedNodes: false });
				nextProps.diagramEngine.diagramModel.rendered = true;
			}
			if (!nextProps.diagramEngine.diagramModel.rendered) {
				this.setState({ renderedNodes: false });
				nextProps.diagramEngine.diagramModel.rendered = true;
			}
			this.isChanged = this.props.actions.deleteItems !== nextProps.actions.deleteItems ? true : false;
		}

		componentDidUpdate() {
			//this.attachDiagramEngine();
			if (!this.state.renderedNodes) {
				this.setState({
					renderedNodes: true
				});
			}
			if(this.isChanged){
				const { diagramEngine, onChange } = this.props;
				const { selectAll, deselectAll, copy, paste, deleteItems } = this.getActions();
				this.arguments = {diagramEngine, onChange, selectAll, deselectAll, copy, paste, deleteItems};
			}
		}

		// componentWillUnmount() {
		// 	this.props.diagramEngine.setCanvas(null);
		// 	document.getElementById('rootParent').removeEventListener('keydown', this.state.windowListener);
		// }

		componentDidMount() {
			this.attachDiagramEngine();
			const { diagramEngine, onChange } = this.props;
			const { selectAll, deselectAll, copy, paste, deleteItems } = this.getActions();
			this.arguments = {diagramEngine, onChange, selectAll, deselectAll, copy, paste, deleteItems};
			let self = this;
			// Add a keyboard listener
			this.setState({
				renderedNodes: true,
				windowListener: window.addEventListener('keydown', (event)=>{window.keydownDiagramListener(event)})
			});
			window.focus();//document.getElementById('rootParent')
		}

		onMouseDown(event){
			super.onMouseDown(event);
			const model = this.getMouseElement(event);
			if (model && (model.model instanceof RJD.PortModel) && event.shiftKey) {
				model.model.getLinks()[Object.keys(model.model.getLinks())[Object.keys(model.model.getLinks()).length-1]].extras.goto = true;
			}
		}

		onMouseUp(event) {
			const { diagramEngine, onChange } = this.props;
			const {action, actionType} = this.state;
			if(event.target.className === 'fa fa-times' && actionType !== 'link-created'){
				onChange(diagramEngine.getDiagramModel().serializeDiagram(), {type: 'item-deleted'});
			}
			else {
				const element = this.getMouseElement(event);

				// if(actionType === 'link-created' && (element.model instanceof RJD.NodeModel || element.model instanceof RJD.PortModel)) {
				// 	const actionOutput = {
				// 		type: 'link-created',
				// 		model: action.selectionModels[0].model
				// 	};
				// 	onChange(diagramEngine.getDiagramModel().serializeDiagram(), actionOutput);
				// 	return;
				// }

				if(actionType === 'items-moved' && (element.model instanceof RJD.PointModel)){
					const actionOutput = {
						type: 'link-created',
						model: element.model
					};
					onChange(diagramEngine.getDiagramModel().serializeDiagram(), actionOutput);
					return;
				}

				if(actionType === 'link-created' && (element.model instanceof RJD.NodeModel)) {
					let link = action.selectionModels[0].model.getLink();
					let node = element.model;
					let type = !!action.selectionModels[0].model.getLink().extras.goto ? 'goto-created' : 'link-connected';
					const actionOutput = {
						type: actionType
					};
					if(!!link.sourcePort){
						if(link.sourcePort.in){
							if(!!node.ports.output){
								link.setTargetPort(node.ports.output);
								actionOutput.type = type;
							}
						}
						else{
							if(!!node.ports.input){
								link.setTargetPort(node.ports.input);
								actionOutput.type = type;
							}
						}
					}
					(actionOutput.type === 'link-connected' || actionOutput.type === 'goto-created') ? actionOutput.linkModel = link : actionOutput.model = action.selectionModels[0].model;
					onChange(diagramEngine.getDiagramModel().serializeDiagram(), actionOutput);
					return;
				}

				if(!(element && (element.model instanceof RJD.PortModel))) {
					super.onMouseUp(event);
					return;
				}

				if(!!action.selectionModels[0].model.getLink().extras.goto) {
					this.gotoCreate(element.model, action.selectionModels[0].model.getLink());
				}
				else{
					super.onMouseUp(event);
				}
			}
		}

		gotoCreate(targetPort, link){
			const {diagramEngine, onChange} = this.props;

			const actionOutput = {};
			// Connect the link
			link.setTargetPort(targetPort);

			// Link was connected to a port, update the output
			actionOutput.type = 'goto-created';
			actionOutput.linkModel = link;
			actionOutput.portModel = targetPort;

			diagramEngine.clearRepaintEntities();
			onChange(diagramEngine.getDiagramModel().serializeDiagram(), actionOutput);
		}

		onWheel(event) {
			const { diagramEngine } = this.props;
			const actions = this.getActions();
			if (!actions.zoom) {
				return;
			}
			const diagramModel = diagramEngine.getDiagramModel();
			event.preventDefault();
			event.stopPropagation();
			const relativeMouse = diagramEngine.getRelativeMousePoint(event);
			const initialOffsetX = diagramModel.getOffsetX();
			const initialOffsetY = diagramModel.getOffsetY();
			const initialZoom = diagramModel.getZoomLevel();

			if((initialZoom > 200 && event.deltaY > 0) || (initialZoom < 40 && event.deltaY < 0))return;

			const zoom = initialZoom + (event.deltaY * (initialZoom / 100.0) * 0.2);

			diagramModel.setOffset(
				(relativeMouse.x + initialOffsetX) * (initialZoom/zoom) - relativeMouse.x,
				(relativeMouse.y + initialOffsetY) * (initialZoom/zoom) - relativeMouse.y
			);
			diagramModel.setZoomLevel(zoom);
			diagramEngine.enableRepaintEntities([]);
			this.forceUpdate();
		}

		keydownListener(event){
			const selectedItems = this.arguments.diagramEngine.getDiagramModel().getSelectedItems();
			const ctrl = (event.metaKey || event.ctrlKey);

			// Select all
			if (event.keyCode === 65 && ctrl && this.arguments.selectAll) {
				this.selectAll(true);
				event.preventDefault();
				event.stopPropagation();
			}

			// Deselect all
			if (event.keyCode === 68 && ctrl && this.arguments.deselectAll) {
				this.selectAll(false);
				event.preventDefault();
				event.stopPropagation();
			}

			// Copy selected
			if (event.keyCode === 67 && ctrl && selectedItems.length && this.arguments.copy) {
				this.copySelectedItems(selectedItems);
			}

			// Paste from clipboard
			if (event.keyCode === 86 && ctrl && this.state.clipboard && this.arguments.paste) {
				this.pasteSelectedItems(selectedItems);
			}

			// Delete all selected
			if ([8, 46].indexOf(event.keyCode) !== -1 && selectedItems.length && this.arguments.deleteItems) {
				selectedItems.forEach(element => {
					element.remove();
				});

				this.arguments.onChange(this.arguments.diagramEngine.getDiagramModel().serializeDiagram(), { type: 'items-deleted', items: selectedItems });
				this.forceUpdate();
			}
		}
}
