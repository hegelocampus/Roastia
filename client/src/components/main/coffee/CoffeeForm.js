import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import RenderErrors from "../../util/RenderErrors";
import { CoffeeSchema } from "./CoffeeSchema.js";
//import "./CoffeeForm.scss"

import Mutations from "../../../graphql/mutations";
const { ADD_COFFEE } = Mutations;

export default (props) => {
  const history = useHistory();
  const [create, { error }] = useMutation(ADD_COFFEE, {
    onCompleted: data => {
      history.push(`/coffee/${ data.addCoffee.id }`);
    },
    onError: error => {
      console.log(error);
    }
  });

  return (
    <Formik
      initialValues={{
        name: "",
        origin: "",
        processing: "",
        roasting: "",
        price: ""
      }}
      validationSchema={CoffeeSchema}
      onSubmit={values => create({ variables: values })}
    >
      <Form className="shop-form" >
        <Field name="name" type="text" placeholder="Coffee Name" />
        <ErrorMessage name="name" />
        <Field name="origin" type="text" placeholder='Origin or "Blend"' />
        <ErrorMessage name="origin" />
        <Field name="processing" as="select" placeholder="Processing Method">
          <option value="Processing Method" disabled>Processing Method</option>
          <option value="unknown">Unknown/Blend</option>
          <option value="washed/wet">Washed/Wet</option>
          <option value="honey">Honey/Semi-washed</option>
          <option value="natural">Natural/Dry</option>
        </Field>
        <ErrorMessage name="processing" />
        <Field name="roasting" as="select" placeholder="Roast">
          <option value="Roast" disabled>Roast</option>
          <option value="unknown">Unknown/Blend</option>
          <option value="light">Light</option>
          <option value="medium-light">Medium-light</option>
          <option value="medium">Medium</option>
          <option value="medium-dark">Medium-dark</option>
          <option value="dark">Dark</option>
        </Field>
        <ErrorMessage name="roasting" />
        <Field name="price" type="number" placeholder="Price" />
        <ErrorMessage name="price" />
        <button type="submit">Submit</button>
        <RenderErrors errors={ error } />
      </Form>
    </Formik>
  );
};

