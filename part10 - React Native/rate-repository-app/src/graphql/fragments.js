import { gql } from '@apollo/client';

export const REPOSITORY_FIELDS = gql`
  fragment repositoryFields on Repository {
    id
    name
    ownerName
    fullName
    stargazersCount
    forksCount
    url
    ownerAvatarUrl
    description
    language
    createdAt
    ratingAverage
    reviewCount
  }
`;

export const USER_FIELDS = gql`
  fragment userFields on User {
    id
    username
    createdAt
  }
`;

export const REVIEW_FIELDS = gql`
  fragment reviewFields on Review {
      id
      createdAt
      rating
      text
      user{
          id
          username
          createdAt
      }
      repositoryId
  }
`;