import { object, string, number } from 'yup';

const CoffeeSchema = object({
  name: string().required('Please enter the name of the coffee'),
  origin: string().required(
    "Please enter the origin of beans, for blends enter 'Blend'"
  ),
  processing: string().required('Please enter the processing type'),
  roasting: string().required('Please select the roast of the coffee'),
  price: number().required(
    'Please enter price of a standard size bag of this coffee'
  ),
});

export { CoffeeSchema };
