import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { formShape } from '../src/_propTypes';
import { CONTEXT_NAME } from '../src/_constants';
import { _createForm } from '../src/_createForm';
import withForm from '../src/withForm';

describe('with form', () => {
  class MockForm extends React.Component {
    static childContextTypes = {
      [CONTEXT_NAME]: formShape.isRequired,
    };

    getChildContext() {
      return {
        [CONTEXT_NAME]: _createForm('simpleForm', () => {}),
      };
    }

    render() {
      return React.Children.only(this.props.children);
    }
  }

  class Field extends React.Component {
    render() {
      return <div />;
    }
  }

  it('should receive the form in the context', () => {
    const FieldWithForm = withForm(Field);
    const tree = TestUtils.renderIntoDocument(<MockForm><FieldWithForm /></MockForm>);
    const field = TestUtils.findRenderedComponentWithType(tree, FieldWithForm);
    expect(field.context[CONTEXT_NAME].getFormId()).toBe('simpleForm');
  });

  it('should receive the form in the props', () => {
    const FieldWithForm = withForm(Field);
    const tree = TestUtils.renderIntoDocument(<MockForm><FieldWithForm /></MockForm>);
    const field = TestUtils.findRenderedComponentWithType(tree, Field);
    expect(field.props.form.getFormId()).toBe('simpleForm');
  });
});
