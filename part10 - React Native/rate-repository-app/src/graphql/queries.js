import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS, REVIEW_FIELDS, USER_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query getRepositories (
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $searchKeyword: String
        $first: Int
        $after: String
    ){
    repositories (
        orderBy: $orderBy
        orderDirection: $orderDirection
        searchKeyword: $searchKeyword
        first: $first
        after: $after
        ){
        totalCount
        edges{
          node{
              ...repositoryFields
            }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage   
        }
    }
  }

  ${REPOSITORY_FIELDS}
`;

export const GET_SINGLE_REPOSITORY = gql`
  query repository($id: ID!){
      repository (id: $id){
          ...repositoryFields
          reviews {
            edges {
              node {
                ...reviewFields
              }
            }
          }      
      }
  }
  ${REVIEW_FIELDS}
  ${REPOSITORY_FIELDS}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser(
      $includeReviews: Boolean = false
    ){
      authorizedUser {
        ...userFields
        reviews @include (if: $includeReviews) {
          totalCount
          edges{
            node{
              ...reviewFields
              repository{
                ...repositoryFields
              }
            }
            cursor
          }
          pageInfo{
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
    }
  }
  ${REVIEW_FIELDS}
  ${USER_FIELDS}
  ${REPOSITORY_FIELDS}
`;
