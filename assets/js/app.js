var config = {
apiKey: "AIzaSyAwuI8qkXM8dgUoRsmMmia0Da0t2ZZXq6A",
authDomain: "foroboso-rps.firebaseapp.com",
databaseURL: "https://foroboso-rps.firebaseio.com",
projectId: "foroboso-rps",
storageBucket: "",
messagingSenderId: "929295080763"
};
firebase.initializeApp(config);

let db = firebase.database();
let viewsRef = db.ref('views');

// views++ when the page loads (one time)
viewsRef.once('value', function(snapshot) {
    if (snapshot.val() == null){
        viewsRef.set({views: 0});
    }
    let vws = snapshot.val().views;
    vws++;
    viewsRef.update({views: vws});
    console.log(snapshot.val());
});
// keep view counter updated (ongoing)
viewsRef.on('value', function(snapshot) {
$('#views').text(`${snapshot.val().views} views`);
});

// fancy google log in
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    console.log('token', token);
    // The signed-in user info.
    var user = result.user;
    console.log('user', user);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log('error.code', errorCode);
    var errorMessage = error.message;
    console.log('error.message', errorMessage);
    // The email of the user's account used.
    var email = error.email;
    console.log('error.email', email);
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log('error.credential', credential);
    // ...
  });