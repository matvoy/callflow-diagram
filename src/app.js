import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import * as actions from './actions';
import { NodesPanel } from './components/NodesPanel';
import { Diagram } from './components/Diagram';
import { Controls } from './components/Controls';
import './styles/index.scss';

class Application extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			propertyFocused: false,
			panelOpen: false
		}
		this.setIsFocused = this.setIsFocused.bind(this);
		this.setIsOpened = this.setIsOpened.bind(this);
	}
	setIsFocused(value){
		this.setState({
			propertyFocused: value
		})
	}
	setIsOpened(value){
		this.setState({
			panelOpen: value
		})
	}
  render() {
    const { model, selectedNode, onNodeSelected, updateModel, onUndo, onRedo, canUndo, canRedo } = this.props;

  	return (
  	  <DragDropContextProvider backend={HTML5Backend}>
    	  <div className='parent-container'>
    	    <NodesPanel />
  	      <Diagram
						onUndo={onUndo}
						onRedo={onRedo}
						canUndo={canUndo}
						canRedo={canRedo}
  	        model={model}
  	        updateModel={updateModel}
  	        onNodeSelected={onNodeSelected}
						allowDelete={!this.state.propertyFocused}
						panelOpen={this.state.panelOpen}
  	       />
  	      <Controls
  	        selectedNode={selectedNode}
						model={model}
						updateModel={updateModel}
						setIsFocused={this.setIsFocused}
						setIsOpened={this.setIsOpened}
						panelOpen={this.state.panelOpen}
  	       />
    	  </div>
  	  </DragDropContextProvider>
  	);
  }
}

const mapStateToProps = state => ({
  selectedNode: state.history.present.selectedNode,
  model: state.history.present.model,
  canUndo: state.history.past.length > 0,
  canRedo: state.history.future.length > 0
});

const mapDispatchToProps = dispatch => ({
  onNodeSelected: node => dispatch(actions.onNodeSelected(node)),
  updateModel: (model, props) => dispatch(actions.updateModel(model, props)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo())
});

export const App = connect(mapStateToProps, mapDispatchToProps)(Application);
