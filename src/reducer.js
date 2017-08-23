import undoable, { includeAction } from 'redux-undo';

const getInitialState = () => ({
  selectedNode: null,
  model: null,
	propertyFocused: false
});

export const reducerFn = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'node-selected':
      return {
        ...state,
        selectedNode: action.node
      };
    case 'update-model':
			return {
				...state,
				model: action.model,
				...action.props
			};
		case 'focus':
			return {
				...state,
				propertyFocused: action.focused
			};
    default:
      return state;
  }
};

export const reducer = undoable(reducerFn, {
  filter: includeAction(['update-model'])
});
