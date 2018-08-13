import { string, object, array, number, boolean } from 'yup';

import {
  fieldOfResearchValues,
  maxYear,
  minYear,
  rankValues,
  authorStatusValues,
  degreeTypeValues,
} from './constants';

const yearSchema = number()
  .min(minYear)
  .max(maxYear);

const arrayWithNullDefault = array().default([null]);
const arrayWithEmptyObject = array().default([{}]);

const authorSchema = object().shape({
  given_name: string().required(),
  family_name: string(),
  display_name: string().required(),
  native_name: string(),
  public_emails: arrayWithNullDefault.of(
    string()
      .nullable()
      .email()
  ),
  status: string()
    .oneOf(authorStatusValues)
    .required()
    .default(authorStatusValues[0]),
  orcid: string(),
  websites: arrayWithNullDefault.of(
    string()
      .nullable()
      .url()
  ),
  blog: string().url(),
  linkedin: string(),
  twitter: string(),
  field_of_research: array().of(string().oneOf(fieldOfResearchValues)),
  institution_history: arrayWithEmptyObject.of(
    object()
      .nullable()
      .shape({
        institution: string().required(),
        rank: string().oneOf(rankValues),
        start_year: yearSchema,
        end_year: yearSchema,
        current: boolean(),
      })
  ),
  experiment_history: arrayWithEmptyObject.of(
    object()
      .nullable()
      .shape({
        experiment: string().required(),
        start_year: yearSchema,
        end_year: yearSchema,
        current: boolean(),
      })
  ),
  advisors: arrayWithEmptyObject.of(
    object()
      .nullable()
      .shape({
        name: string().required(),
        degree_type: string().oneOf(degreeTypeValues),
      })
  ),
  comments: string(),
});

export default authorSchema;
