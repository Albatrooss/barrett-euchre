import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyD2FY1uEyfzWG2HmPYGsv6HNVJjUmgq8xQ",
	authDomain: "barrett-euchre.firebaseapp.com",
	databaseURL: "https://barrett-euchre.firebaseio.com",
	projectId: "barrett-euchre",
	storageBucket: "barrett-euchre.appspot.com",
	messagingSenderId: "950648681487",
	appId: "1:950648681487:web:e27b38b140847e98911f7a",
	measurementId: "G-M142MGW3Q9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;