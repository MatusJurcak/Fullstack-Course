import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import Theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
    basic: {
        padding: 20,
        backgroundColor: 'white',
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
    }
});

const ReviewItem = ({ review, ...props }) => {
    return (
        <View style={styles.basic} {...props}>
            <View style={styles.rating}>
                <View style={styles.ratingBorder}>
                    <Text style={styles.ratingText}>{review.rating}</Text>
                </View>
            </View>
            <View style={styles.idk}>
                <Text style={{ marginBottom: 2 }}fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
                <Text style={{ marginBottom: 5, color: Theme.colors.textSecondary }}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                {review.text ? <Text>{review.text}</Text> : null}
            </View>
        </View>
    );
};

export default ReviewItem;