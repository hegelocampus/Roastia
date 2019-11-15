import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import RenderErrors from '../../util/RenderErrors';
import { ShopSchema } from './CoffeeShopSchema.js';
import './CoffeeShopForm.scss';

import Queries from '../../../graphql/queries';
import Mutations from '../../../graphql/mutations';
const { FETCH_SHOP } = Queries;
const { ADD_SHOP, UPDATE_SHOP } = Mutations;

export default ({ formType, shop }) => {
  const { shopId } = useParams();

  let mutation;
  if (shopId) {
    mutation = UPDATE_SHOP;
    shop = shop || useQuery(FETCH_SHOP).then(data => data['coffeeShop']);
  } else {
    mutation = ADD_SHOP;
    shop = {
      name: '',
      founded: '',
      baristaSatisfaction: '',
      type: '',
      description: '',
      url: '',
      imageURL: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    };
  }

  const history = useHistory();
  const [createShop, { error }] = useMutation(mutation, {
    onCompleted: ({ updateCoffeeShop, newCoffeeShop }) => {
      console.log(updateCoffeeShop);
      console.log(newCoffeeShop);
      history.push(
        `/shop/${newCoffeeShop ? newCoffeeShop.id : updateCoffeeShop.id}`
      );
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <div className="shop-form-container">
      <Formik
        initialValues={shop}
        validationSchema={ShopSchema}
        onSubmit={values =>
          ShopSchema.validate(values).then(val => {
            console.log(val);
            createShop({ variables: val });
          })
        }
      >
        <Form className="shop-form">
          <Field name="id" type="hidden" />
          <h1 className="modal-header-title">
            {formType === 'edit' ? 'Edit Coffee Shop' : 'Add New Coffee Shop'}
          </h1>
          <Field name="name" type="text" placeholder="Cafe Name" />
          <ErrorMessage name="name" />
          <Field
            name="description"
            as="textarea"
            placeholder="Write a brief description of the cafe"
          />
          <ErrorMessage name="description" />
          <Field name="founded" type="text" placeholder="Year Founded" />
          <ErrorMessage name="founded" />
          <Field
            name="baristaSatisfaction"
            type="number"
            placeholder="Barista Satisfaction Rating"
          />
          <ErrorMessage name="baristaSatisfaction" />
          <Field name="url" type="url" placeholder="Cafe URL" />
          <ErrorMessage name="url" />
          <Field name="imageURL" type="url" placeholder="Cafe Image URL" />
          <ErrorMessage name="imageURL" />
          <label htmlFor="type">Cafe type:</label>
          <Field name="type" as="select">
            <option value="roaster">Roaster</option>
            <option value="coffee bar">Coffee Bar</option>
            <option value="coffee bar">Espresso Bar</option>
            <option value="brewer">Coffee Stand</option>
          </Field>
          <ErrorMessage name="type" />
          <Field
            name="address.street"
            type="text"
            placeholder="Street Address"
          />
          <ErrorMessage name="address.street" />
          <Field name="address.city" type="text" placeholder="City" />
          <ErrorMessage name="address.city" />
          <Field name="address.state" type="text" placeholder="State" />
          <ErrorMessage name="address.state" />
          <Field name="address.zip" type="text" placeholder="ZIP" />
          <ErrorMessage name="address.zip" />
          <button type="submit">Submit</button>
          <RenderErrors errors={error} />
        </Form>
      </Formik>
    </div>
  );
};
