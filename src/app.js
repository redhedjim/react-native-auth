import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = {
        loggedIn: null,

    }
    componentWillMount() {
         firebase.initializeApp({
            apiKey: 'AIzaSyDowUCHrXiUKrMPgSmzSznZIOiQpYOatuc',
            authDomain: 'auth-e7cc3.firebaseapp.com',
            databaseURL: 'https://auth-e7cc3.firebaseio.com',
            projectId: 'auth-e7cc3',
            storageBucket: 'auth-e7cc3.appspot.com',
            messagingSenderId: '901448682568'
        });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                <Button onPress={() => firebase.auth().signOut()}>
                    Logout
                </Button>
                );
            case false:
                return <LoginForm />;
            default: 
                return <View style={styles.spinner}><Spinner /></View>;
        }
    }
    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    spinner: {
        marginTop: '50%'
    }
};

export default App;
