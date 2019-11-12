import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, number } from "yup";
import RenderErrors from "../../util/RenderErrors";
import './CoffeeShopForm.scss'

import Mutations from "../../../graphql/mutations";
const { ADD_SHOP } = Mutations;

let ShopSchema = object({
  name: string()
    .required(),
  founded: string()
    .required()
    .length(4,"Please enter a valid year"),
  baristaSatisfaction: number()
    .required("Barista satisfaction score is required (it's OK to guess)"),
  address: object({
    street: string().required(),
    city: string().required(),
    state: string().required(),
    zip: number().required()
  }).required()
});

export default (props) => {
  const [createShop, { error }] = useMutation(ADD_SHOP);

  return (
    <Formik
      initialValues={{
        name: "",
        founded: "",
        baristaSatisfaction: "",
        address: {
          street: "",
          city: "",
          state: "",
          zip: ""
        },
      }}
      validationSchema={ShopSchema}
      onSubmit={values => createShop({ variables: values })}
    >
      <Form className="shop-form">
        <label htmlFor="Name">Name:</label>
        <Field name="name" type="text"/>
        <ErrorMessage name="name"/>
        <label htmlFor="founded">Year Founded:</label>
        <Field name="founded" type="text"/>
        <ErrorMessage name="founded"/>
        <label htmlFor="baristaSatisfaction">Barista Satisfaction Rating:</label>
        <Field name="baristaSatisfaction" type="number"/>
        <ErrorMessage name="baristaSatisfaction"/>
        <label htmlFor="address.street">Street:</label>
        <Field name="address.street" type="text"/>
        <ErrorMessage name="address.street"/>
        <label htmlFor="address.city">City:</label>
        <Field name="address.city" type="text"/>
        <ErrorMessage name="address.city"/>
        <label htmlFor="address.state">State:</label>
        <Field name="address.state" type="text"/>
        <ErrorMessage name="address.state"/>
        <label htmlFor="address.zip">Zip:</label>
        <Field name="address.zip" type="text"/>
        <ErrorMessage name="address.zip"/>
        <button type="submit">Submit</button>
        <RenderErrors errors={ error }/>
      </Form>
    </Formik>
  );
};

