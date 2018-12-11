import { string, array, object } from 'yup';
import { languageValues, subjectsValues } from '../constants';

// TODO: move it to common
const arrayWithEmptyObjectDefault = array().default([{}]);
const arrayWithNullDefault = array().default([null]);

export default {
  title: string()
    .required()
    .label('Title'),
  language: string()
    .oneOf(languageValues)
    .default(languageValues[0]),
  subjects: array()
    .of(string().oneOf(subjectsValues))
    .min(1)
    .required()
    .label('Subject'),
  authors: arrayWithEmptyObjectDefault
    .of(
      object().shape({
        full_name: string()
          .required()
          .label('Name'),
        affiliation: string(),
      })
    )
    .min(1)
    .label('Author'),
  collaboration: string(),
  experiment: string(),
  abstract: string(),
  report_numbers: arrayWithNullDefault.of(string().nullable()),
};
