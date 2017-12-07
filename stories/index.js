import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import {Button, Welcome} from '@storybook/react/demo';
// import NewProjectModal from '../components/new_project_modal/new_project_modal.jsx';
import ProjectDetail from '../components/project_detail';
// import {IntlProvider} from 'react-intl';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')}/>);

// console.log(NewProjectModal)

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

const LangDecorator = (storyFn) => (
    <IntlProvider>
      { storyFn() }
  </IntlProvider>
);

// storiesOf('New Project Modal', module).
// addDecorator(LangDecorator).
// add('normal', () => <NewProjectModal show={true}/>);

storiesOf('ProjectDetail', module).
// addDecorator(LangDecorator).
add('normal', () => <ProjectDetail/>);
