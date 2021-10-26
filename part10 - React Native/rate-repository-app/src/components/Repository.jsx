import React from 'react';
import { useParams } from 'react-router';
import RepositoryItem from "./RepositoryItem";
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryTop = ({ repository }) => {
    return (
        <>
            <RepositoryItem item={repository} gitHub />
            <ItemSeparator />
        </>
    );
};

const Repository = () => {
    const { id } = useParams();

    const { data } = useQuery(GET_SINGLE_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id },
    });

    const repository = data ? data.repository : undefined;

    const reviews = repository ? repository.reviews.edges.map(({ node }) => node) : [];

    return (
        <FlatList
            data={reviews}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ListHeaderComponent={() => repository ? <RepositoryTop repository={repository} /> : null}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default Repository;