import React, { useState } from "react";
import { View, 
  Text, 
  TextInput, 
  ImageBackground, 
  Image,
  TouchableOpacity, 
  StyleSheet} from "react-native";
import axios from "axios";
import { ScrollView } from "native-base";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  var accessToken = "";
  var finalUsername = "";
  const [disabled, setDisabled] = useState(false);

  function onClick (){
    console.log("onClick called");
    setErrorMsg("");
    setDisabled(true);
    handleLogin();
  }

  async function handleLogin (){
    await axios
      .post(
        "https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/signin",
        JSON.stringify({
          username: username,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
            "X-Amz-Date": new Date().toISOString(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          global.ACCESSTOKEN = res.data.access_token;
          global.USERNAME = res.data.username;
          console.log(global.ACCESSTOKEN,global.USERNAME);

          navigation.navigate("Additional", { screen: "OrganizerScreen"});
        }
      })
      .catch((err) => {
        console.log(err.response);
        setErrorMsg(err.response.data.errormsg);
        setPassword("");
      })
      setDisabled(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/light_blue_new.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Image
          source={require("../assets/dog_logo.png")}
          style={styles.imageHeading}
        />

        <Text style={styles.headingTextBefore}></Text>
        <Text style={styles.headingText}>Organizer Sign In</Text>
        <Text style={styles.headingTextAfter}></Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />

        {(!disabled && username && password) ? 
        <TouchableOpacity style={styles.button} onPress={onClick}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>:
        <TouchableOpacity disabled style={styles.disabledButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        }
        
        <Text
        style={styles.errorText}
        value = {errorMsg}
        >{errorMsg}</Text>


      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  errorText:{
    padding:5,
    flex: 0.3,
    textAlign: "center",
    fontSize: 20,
    color:"#ad1e17"
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  imageHeading: {
    width: 100,
    height: 60,
    marginBottom: 10,
    marginTop: "5%",
    alignSelf: "center",
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 0,
    margin: 40,
    padding:40,
    fontSize:20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    color: "white"
  },
  disabledButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#466357',
    opacity: '50%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#708D81',
    marginBottom: 20, // Default margin between buttons
    width: '85%', // You can adjust the percentage or use a fixed width value
    height: '10%',
    alignSelf: 'center', // This centers the button horizontally in its parent container
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#466357',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#708D81',
    marginBottom: 20, // Default margin between buttons
    width: '85%', // You can adjust the percentage or use a fixed width value
    height: '10%',
    alignSelf: 'center', // This centers the button horizontally in its parent container
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  titleText: {
    flex: 0.4,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  headingText: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  headingTextAfter: {
    content: "{",
  },
  headingTextBefore: {
    content: "{",
  },
});

export default LoginScreen;
