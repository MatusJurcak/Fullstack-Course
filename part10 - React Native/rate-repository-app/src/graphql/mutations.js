import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS, REVIEW_FIELDS, USER_FIELDS } from './fragments';

export const AUTHORIZE = gql`
    mutation authorize ($credentials: AuthorizeInput!) {
        authorize (credentials: $credentials){
            accessToken
            user {
            ...userFields
            }
        }
    }
    ${USER_FIELDS}
`;

export const CREATE_REVIEW = gql`
    mutation createReview ($review: CreateReviewInput!) {
        createReview (review: $review){
            ...reviewFields
            repository{
                ...repositoryFields
            }
        }
    }
    ${REVIEW_FIELDS}
    ${REPOSITORY_FIELDS}
`;

export const CREATE_USER = gql`
    mutation createUser ($user: CreateUserInput!) {
        createUser (user: $user){
            ...userFields
        }
    }

    ${USER_FIELDS}
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
