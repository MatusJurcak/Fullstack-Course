import React from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';
import useAuthorizedUser from '../hooks/useAuthorizedUser';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    color: 'white',
  },
  text: {
    color: 'white',
    padding: 20,
    fontWeight: '700'
  }
});

const AppBarTab = ({ text, url }) => {
  return (
    <Pressable>
      <Link to={url}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const history = useHistory();

  const { authorizedUser } = useAuthorizedUser();

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };


  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" url='/' />
        {authorizedUser
          ? (<>
            <AppBarTab text="Create a review" url='/createReview' />
            <AppBarTab text="My reviews" url='/myReviews' />
            <Pressable onPress={onSignOut}><Text style={styles.text}>Sign out</Text></Pressable>
          </>
          )
          : (<>
            <AppBarTab text="Sing in" url='/singIn' />
            <AppBarTab text="Sign up" url='/signUp' />
          </>
          )
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
