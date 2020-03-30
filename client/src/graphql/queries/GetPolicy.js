import gql from 'graphql-tag';

export const GET_POLICY = gql `
    query getCostByEmployee{
        __typename
        getCostByEmployee{
            withPolicy{
            age
            childs
            coverageHealth
            coverageDental
            }
            withoutPolicy{
            age
            childs
            coverageHealth
            coverageDental
            }
            percentage
            isDental
        }
    }
`;