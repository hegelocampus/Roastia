import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import { object, string, number } from "yup";
import RenderErrors from "../../util/RenderErrors";
import './CoffeeShopForm.scss'

import Mutations from "../../../graphql/mutations";
const { ADD_SHOP } = Mutations;

let ShopSchema = object({
  name: string()
    .required("Please enter the name of the cafe"),
  founded: string()
    .required("Please enter a year")
    .matches(/^\d{4}$/ ,"Please enter a valid year"),
  type: string()
    .required("Please enter the shop type"),
  description: string()
    .required("Please enter description of the cafe"),
  baristaSatisfaction: number()
    .required("Barista satisfaction score is required (it's OK to guess)"),
  address: object({
    street: string().required("Please enter a street address"),
    city: string().required("Please enter a city"),
    state: string().required("Please enter a state"),
    zip: string()
      .required("Please enter a ZIP code")
      .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Please enter a valid ZIP code")
  }).required()
});

export default (props) => {
  const history = useHistory();
  const [createShop, { error }] = useMutation(ADD_SHOP, {
    onCompleted: data => {
      console.log(data);
      history.push(`/shop/${ data.newCoffeeShop.id }`);
    },
    onError: error => {
      console.log(error);
    }
  });

  return (
    <Formik
      initialValues={{
        name: "",
        founded: "",
        baristaSatisfaction: "",
        type: "",
        description: "",
        url: "",
        imageURL: "",
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
        <Field name="name" type="text" placeholder="Cafe Name"/>
        <ErrorMessage name="name"/>
        <Field name="description" as="textarea" placeholder="Write a brief description of the cafe"/>
        <ErrorMessage name="description"/>
        <Field name="founded" type="text" placeholder="Year Founded"/>
        <ErrorMessage name="founded"/>
        <Field
          name="baristaSatisfaction"
          type="number"
          placeholder="Barista Satisfaction Rating"
        />
        <ErrorMessage name="baristaSatisfaction"/>
        <Field name="url" type="url" placeholder="Cafe URL"/>
        <ErrorMessage name="url"/>
        <Field name="imageURL" type="url" placeholder="Cafe Image URL"/>
        <ErrorMessage name="imageURL"/>
        <label htmlFor="type">Cafe type:</label>
        <Field name="type" as="select">
          <option value="roaster">Roaster</option>
          <option value="coffee bar">Coffee Bar</option>
          <option value="coffee bar">Espresso Bar</option>
          <option value="brewer">Coffee Stand</option>
        </Field>
        <ErrorMessage name="type"/>
        <Field name="address.street" type="text" placeholder="Street Address"/>
        <ErrorMessage name="address.street"/>
        <Field name="address.city" type="text" placeholder="City"/>
        <ErrorMessage name="address.city"/>
        <Field name="address.state" type="text" placeholder="State"/>
        <ErrorMessage name="address.state"/>
        <Field name="address.zip" type="text" placeholder="ZIP"/>
        <ErrorMessage name="address.zip"/>
        <button type="submit">Submit</button>
        <RenderErrors errors={ error }/>
      </Form>
    </Formik>
  );
};

