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
$('#views').html(`<h3>${snapshot.val().views} views toal</h3>`);
});

$('#login-google').on("click", function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    console.log(firebase.auth().getRedirectResult());
    firebase.auth().getRedirectResult().then(function(result) {
        console.log(">>>", result);
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log('error.code', errorCode);
        console.log('error.message', errorMessage);
        console.log('error.email', email);
        console.log('error.credential', credential);
    });
});

$('#logout').on("click", function(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        $('#login-info').html(`Not signed in or nothing`);
    }).catch(function(error) {
        // An error happened.
        console.log('thar be an error signin out');
      });
});

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(providerData);
      // ...
      $('#login-info').html(`
        <img src="${photoURL}">
        <br>display name: ${displayName}
        <br>email: ${email}
        <br>email verified: ${emailVerified}
        <br>photo: ${photoURL}
        <br>is anonymous: ${isAnonymous}
        <br>user id: ${uid}
        <br><button onclick="openEdit()">Change Name/Avatar</button>
      `);
    } else {
      // User is signed out.
      $('#login-info').html(`Not signed in or nothing`);
      // ...
    }
  });

  function openEdit() {
    $('#user-edit').show();
    $('#photo-edit').val(firebase.auth().currentUser.photoURL);
  }

  function submitEdit() {
    var user = firebase.auth().currentUser;
    var displayNameVal = $('#name-edit').val().trim();
    var photoURLVal = $('#photo-edit').val().trim();
    user.updateProfile({
      displayName: displayNameVal,
      photoURL: photoURLVal
    }).then(function() {
      // Update successful.
      $('#user-edit').hide();
      location.reload();
    }).catch(function(error) {
      // An error happened.
      console.log("thar be an error updating user deets");
    });
  }

