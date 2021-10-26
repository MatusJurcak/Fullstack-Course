import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = (variables) => {
        const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
            variables,
            fetchPolicy: 'cache-and-network',
        });

        const handleFetchMore = () => {
            const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
            
            if (!canFetchMore) {
              return;
            }
        
            fetchMore({
              variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
              },
            });
        };
        

        const repositories = data ? data.repositories : undefined;

    return { repositories, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepositories;