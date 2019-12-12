import { object, string, number } from 'yup';

const ShopSchema = object({
  id: string(),
  name: string().required('Please enter the name of the cafe'),
  founded: string()
    .required('Please enter a year')
    .matches(/^\d{4}$/, 'Please enter a valid year'),
  type: string().required('Please enter the shop type'),
  description: string().required('Please enter description of the cafe'),
  baristaSatisfaction: number().required(
    "Barista satisfaction score is required (it's OK to guess)"
  ),
  url: string()
    .required()
    .label('Cafe URL'),
  imageURL: string()
    .required()
    .label('Image URL'),
  address: object({
    street: string().required('Please enter a street address'),
    city: string().required('Please enter a city'),
    state: string().required('Please enter a state'),
    zip: string()
      .required('Please enter a ZIP code')
      .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Please enter a valid ZIP code'),
  })
    .required()
    .noUnknown(),
}).noUnknown();

export { ShopSchema };
