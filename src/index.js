// import React from 'react';
// import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
// import App from './demo4.js';
//
// render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));
//
// if (module && module.hot) {
//   module.hot.accept('./demo4', () => {
//     render(
//       <AppContainer>
//         <App/>
//       </AppContainer>,
//       document.querySelector("#app")
//     );
//   });
// }
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './app';

window.onload = () => {
	const rootEl = document.getElementById('root');
	const render = Component => {
		ReactDOM.render(
			<Provider store={store}>
				<AppContainer>
					<Component />
				</AppContainer>
			</Provider>,
			rootEl
		);
	};

	render(App);
	if (module.hot) module.hot.accept('./app', () => render(App));
};
