import { object, string, number } from 'yup';

const CoffeeSchema = object({
  name: string().required('Please enter the name of the coffee'),
  origin: string().required(
    "Please enter the origin of beans, for blends enter 'Blend'"
  ),
  processing: string().required('Please select a processing method'),
  roasting: string().required('Please select a roast'),
  price: number().required(
    'Please enter price of a standard size bag of this coffee'
  ),
});

export { CoffeeSchema };
