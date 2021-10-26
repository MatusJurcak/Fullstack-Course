import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import Theme from '../theme';
import * as Linking from 'expo-linking';

const repositoryStyles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    basic: {
        padding: 20,
        backgroundColor: 'white',
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 0
    },
    language: {
        color: "white",
        padding: 5,
    },
    details: {
        textAlign: 'center',
        margin: 2
    },
    button: {
        padding: 15,
        backgroundColor: Theme.colors.primary,
        borderRadius: 5,
        marginTop: 15,
    }
});

const Detail = ({ detail, text, ...props }) => {
    const dtl = detail < 1000 ? String(detail) : String((detail / 1000).toFixed(1) + "k");

    return (
        <View style={{ flexDirection: 'column' }}>
            <Text fontWeight="bold" style={repositoryStyles.details} {...props}>{dtl}</Text>
            <Text color="textSecondary" style={repositoryStyles.details}>{text}</Text>
        </View>
    );
};

const RepositoryItem = ({ item, gitHub = false, ...props }) => {
    return (
        <View style={repositoryStyles.basic} {...props}>
            <View style={{ flexDirection: 'row', }}>
                <View style={{ flex: 0.2 }}>
                    <Image style={repositoryStyles.avatar} source={{ uri: item.ownerAvatarUrl }} />
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 20, flex: 1 }}>
                    <Text testID="repositoryItemFullName" style={{ marginBottom: 3 }} fontWeight="bold">{item.fullName}</Text>
                    <Text testID="repositoryItemDescription" style={{ marginTop: 3, marginBottom: 3, marginRight: 5 }} color="textSecondary">{item.description}</Text>
                    <View style={{ alignSelf: "flex-start", marginTop: 3, marginBottom: 3, backgroundColor: Theme.colors.primary, borderRadius: 4 }}>
                        <Text testID="repositoryItemLanguage" style={repositoryStyles.language}>{item.language}</Text>
                    </View>
                </View>
            </View>
            <View style={repositoryStyles.flexContainer}>
                <Detail testID="repositoryItemStars" detail={item.stargazersCount} text="Stars" />
                <Detail testID="repositoryItemForks" detail={item.forksCount} text="Forks" />
                <Detail testID="repositoryItemReviews" detail={item.reviewCount} text="Reviews" />
                <Detail testID="repositoryItemRating" detail={item.ratingAverage} text="Rating" />
            </View>
            {gitHub && item.url &&
                (<Pressable style={repositoryStyles.button} onPress={() => Linking.openURL(item.url)}>
                    <Text style={{ color: "white", textAlign: 'center', fontWeight: "700" }}>Open in GitHub</Text>
                </Pressable>
                )
            }
        </View>
    );
};

export default RepositoryItem;