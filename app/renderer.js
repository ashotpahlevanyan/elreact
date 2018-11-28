import React from 'react';
import { render } from 'react-dom';
import Application from './components/Application';
import { AppContainer } from 'react-hot-loader';
import database from './database';

const renderApplication = async () => {
	const Application = await require('./components/Application').default;

	render(
		<AppContainer>
			<Application database={database}/>
		</AppContainer>,
		document.getElementById('application')
	);
};

renderApplication();

if(module.hot) {
	module.hot.accept(renderApplication);
}