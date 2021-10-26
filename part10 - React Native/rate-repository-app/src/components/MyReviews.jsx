import React from 'react';
import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import Theme from '../theme';
import { format } from 'date-fns';
import Text from './Text';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
    basic: {
        padding: 20,
        backgroundColor: 'white',
    },
    view: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    rating: {
        flex: 0.17,
        marginRight: 15
    },
    ratingBorder: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Theme.colors.primary,
        borderRadius: 25,
    },
    ratingText: {
        fontWeight: "500",
        textAlign: 'center',
        fontSize: 20,
        color: Theme.colors.primary,
    },
    idk: {
        flex: 1,
    },
    separator: {
        height: 10,
    },
    button: {
        flex: 1,
        padding: 15,
        backgroundColor: Theme.colors.primary,
        borderRadius: 5,
        marginTop: 15,
        marginRight: 5
    },
    deleteButton: {
        flex: 1,
        padding: 15,
        backgroundColor: '#d73a4a',
        borderRadius: 5,
        marginTop: 15,
        marginLeft: 5
    },
});

const ReviewItem = ({ review, onDelete, ...props }) => {
    const history = useHistory();
    const handleViewButton = () => {
        history.push(`/repositories/${review.repository.id}`);
    };

    const handleDeleteButton = () => {
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this review?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => onDelete(),
                }
            ]
        );
    };


    return (
        <View style={styles.basic} {...props}>
            <View style={styles.view} >
                <View style={styles.rating}>
                    <View style={styles.ratingBorder}>
                        <Text style={styles.ratingText}>{review.rating}</Text>
                    </View>
                </View>
                <View style={styles.idk}>
                    <Text style={{ marginBottom: 2 }}fontWeight="bold" fontSize="subheading">{review.repository.fullName}</Text>
                    <Text style={{ marginBottom: 5, color: Theme.colors.textSecondary }}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                    {review.text ? <Text>{review.text}</Text> : null}
                </View>
            </View>
            <View style={styles.view}>
                <Pressable style={styles.button} onPress={handleViewButton}>
                    <Text style={{ color: "white", textAlign: 'center', fontWeight: "700" }}>View repository</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={handleDeleteButton}>
                    <Text style={{ color: "white", textAlign: 'center', fontWeight: "700" }}>Delete review</Text>
                </Pressable>
            </View>
        </View>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { authorizedUser, refetch } = useAuthorizedUser({
        includeReviews: true
    });

    const [deleteReview] = useMutation(DELETE_REVIEW);
    const reviews = authorizedUser ? authorizedUser.reviews.edges.map(({ node }) => node) : [];

    const onDelete = async (id) => {
        await deleteReview({ variables: { id } });
        refetch();
    };

    return (
        <FlatList
            data={reviews}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ReviewItem review={item} onDelete={() => onDelete(item.id)}/>}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};

export default MyReviews;