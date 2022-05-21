import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(

            appBar: AppBar(
              elevation: 3.0,
              title: Text("Home Screen"),
            ),
            body: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Center(child:
              Container(
                child: Text("Feature tester"),
              )),
            )
        ));
  }
}
