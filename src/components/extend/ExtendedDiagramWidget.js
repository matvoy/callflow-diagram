/**
 * Created by matvij on 02.08.17.
 */
import React from 'react';
import _ from 'lodash';
import * as RJD from 'react-js-diagrams';

export class ExtendedDiagramWidget extends RJD.DiagramWidget {
		constructor(props){
			super(props);
			this.keydownListener = this.keydownListener.bind(this);
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
				let self = this;
				const { diagramEngine, onChange } = this.props;
				const { selectAll, deselectAll, copy, paste, deleteItems } = this.getActions();
				this.arguments = {diagramEngine, onChange, selectAll, deselectAll, copy, paste, deleteItems};
				window.removeEventListener('keydown', this.state.windowListener);
				this.setState({
					windowListener: window.addEventListener('keydown', (event)=>{self.keydownListener(event)})
				})
			}
		}

		componentDidMount() {
			this.attachDiagramEngine();
			const { diagramEngine, onChange } = this.props;
			const { selectAll, deselectAll, copy, paste, deleteItems } = this.getActions();
			this.arguments = {diagramEngine, onChange, selectAll, deselectAll, copy, paste, deleteItems};
			let self = this;
			// Add a keyboard listener
			this.setState({
				renderedNodes: true,
				windowListener: window.addEventListener('keydown', (event)=>{self.keydownListener(event)})
			});
			window.focus();
		}

		onMouseDown(event){
			super.onMouseDown(event);
			const model = this.getMouseElement(event);
			if (model && (model.model instanceof RJD.PortModel) && event.shiftKey) {
				model.model.getLinks()[Object.keys(model.model.getLinks())[Object.keys(model.model.getLinks()).length-1]].extras.goto = true;
			}
		}

		onMouseUp(event) {
			if(event.target.className === 'fa fa-close'){
				const { diagramEngine, onChange } = this.props;
				onChange(diagramEngine.getDiagramModel().serializeDiagram(), {type: 'item-deleted'});
			}
			else {
				const element = this.getMouseElement(event);
				const {action, actionType} = this.state;

				if(!(element && (element.model instanceof RJD.PortModel))) {
					super.onMouseUp(event);
					return;
				}
				if(!!action.selectionModels[0].model.getLink().extras.goto) {
					const {diagramEngine, onChange} = this.props;

					const actionOutput = {
						type: actionType
					};
					// Connect the link
					action.selectionModels[0].model.getLink().setTargetPort(element.model);

					// Link was connected to a port, update the output
					actionOutput.type = 'goto-created';
					delete actionOutput.model;
					actionOutput.linkModel = action.selectionModels[0].model.getLink();
					actionOutput.portModel = element.model;

					diagramEngine.clearRepaintEntities();
					onChange(diagramEngine.getDiagramModel().serializeDiagram(), actionOutput);
				}
				else{
					super.onMouseUp(event);
				}
			}
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
