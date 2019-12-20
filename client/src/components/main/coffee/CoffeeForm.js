import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { CoffeeSchema } from './CoffeeSchema.js';
import RenderErrors from '../../util/RenderErrors';
import FormErrorMessage from '../../util/FormErrorMessage';
import './CoffeeForm.scss';

import Mutations from '../../../graphql/mutations';
const { ADD_COFFEE } = Mutations;

export default props => {
  const history = useHistory();
  const [create, { error }] = useMutation(ADD_COFFEE, {
    onCompleted: data => {
      history.push(`/coffee/${data.addCoffee.id}`);
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <div className="coffee-form-container">
      <Formik
        initialValues={{
          name: '',
          origin: '',
          processing: '',
          roasting: '',
          price: '',
        }}
        validationSchema={CoffeeSchema}
        onSubmit={values => create({ variables: values })}
      >
        <Form className="coffee-form">
          <h1>Add a New Coffee</h1>
          <Field name="name" type="text" placeholder="Coffee Name" />
          <FormErrorMessage name="name" />
          <Field name="origin" type="text" placeholder='Origin or "Blend"' />
          <FormErrorMessage name="origin" />
          <Field name="processing" as="select" placeholder="Processing Method">
            <option value="" disabled>
              Processing Method
            </option>
            <option value="unknown">Unknown/Blend</option>
            <option value="washed/wet">Washed/Wet</option>
            <option value="honey">Honey/Semi-washed</option>
            <option value="natural">Natural/Dry</option>
          </Field>
          <FormErrorMessage name="processing" />
          <Field name="roasting" as="select" placeholder="Roast">
            <option value="" disabled>
              Roast
            </option>
            <option value="unknown">Unknown/Blend</option>
            <option value="light">Light</option>
            <option value="medium-light">Medium-light</option>
            <option value="medium">Medium</option>
            <option value="medium-dark">Medium-dark</option>
            <option value="dark">Dark</option>
          </Field>
          <FormErrorMessage name="roasting" />
          <Field name="price" type="number" placeholder="Price" />
          <FormErrorMessage name="price" />
          <button type="submit">Submit</button>
          <RenderErrors errors={error} />
        </Form>
      </Formik>
    </div>
  );
};
