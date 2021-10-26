import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from './SingIn';
import Repository from './Repository';
import CreateReview from './CreateReview';
import SignUp from './SingUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "#e1e4e8"
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Route path="/singIn" exact>
                    <SignIn />
                </Route>
                <Route path="/repositories/:id" exact>
                    <Repository />
                </Route>
                <Route path="/createReview" exact>
                    <CreateReview />
                </Route>
                <Route path="/signUp" exact>
                    <SignUp />
                </Route>
                <Route path="/myReviews" exact>
                    <MyReviews />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;