import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import '../screens/HomeScreen.dart';
import '../utils/utils.dart';
import 'package:fluttertoast/fluttertoast.dart';

class AuthMethods {
  //Auth Methods can be also refered as an auth repository
  //This is where the current state of a user is stored.
  //In this call, multiple methods of sign in are intergrated for authentication options

  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  //We create a stream of type user
  //A stream is ideal for a user state as a stream is a set of continous values
  //We do this by returning a User by getting the current auth state
  Stream<User?> get authChanges => _auth.authStateChanges();

  //We set the user to the currentUser
  User get user => _auth.currentUser!;

  //With the sign in with google package added
  //we can use it's built in methods to control the authentication flow


  //Login Function added to auth_methods
  //11-05-2022
  //Sign in With email and password is operational

  Future<bool> signInWithEmail(
      BuildContext context, String email, String password) async {
    bool res = false;
    try {
      await FirebaseAuth.instance
          .signInWithEmailAndPassword(email: email, password: password)
          .then((uid) => {
        res = true,
        Fluttertoast.showToast(msg: "Login Success"),
        Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => HomeScreen()))
      });
    } on FirebaseAuthException catch (e) {
      if (e.code == 'user-not-found') {
        Fluttertoast.showToast(msg: e.code);
      } else if (e.code == 'wrong-password') {
        print('Wrong password provided for that user.');
      }
      res = false;
    }
    return res;
  }

//Register Email Function
//Returns TRUE if user has been registered
  Future<bool> registerWithEmailAndPassword(
      BuildContext context, String email, String password) async {
    /*
    TODO:
    Finish Register page UI:
    - Add Back button -> DONE
    - Add Register button -> DONE
    -Create form validation for both Login and Registration screen
    - Create verification page and functionality
     */
    bool res = false;
    try {
      await FirebaseAuth.instance
          .createUserWithEmailAndPassword(email: email, password: password)
          .then((uid) => {
        res = true,
        Fluttertoast.showToast(msg: "User Created \n Welcome to Zymee"),
        Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => HomeScreen()))
      });
    } on FirebaseAuthException catch (e) {
      if (e.code == 'user-not-found') {
        Fluttertoast.showToast(msg: e.code);
      } else if (e.code == 'wrong-password') {
        print('Wrong password provided for that user.');
      }
      res = false;
    }
    return res;
  }

  void signOut() async {
    try {
      _auth.signOut();
    } catch (e) {
      print(e);
    }
  }
}