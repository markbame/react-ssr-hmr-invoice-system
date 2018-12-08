import {initializeApp} from 'firebase'
var config = {
    apiKey: "AIzaSyAyakI_zte_OoeebQYMEL7rMVULSkxSWFY",
    authDomain: "invoice-9609c.firebaseapp.com",
    databaseURL: "https://invoice-9609c.firebaseio.com",
    projectId: "invoice-9609c",
    storageBucket: "invoice-9609c.appspot.com",
    messagingSenderId: "360610458869"
  };
export default initializeApp(config, "fireapp"+Math.random())
