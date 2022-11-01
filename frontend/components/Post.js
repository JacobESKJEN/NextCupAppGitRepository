import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";

function Upload(Title, Description, PastDueDate, Adress) {
    fetch("http://172.20.10.2:3000/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title:Title, description:Description, pastDueDate:PastDueDate, adress:Adress})
    })
    .then((resp)=>resp.json())
    .then((data)=>{props})
}

function Post(props) {
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [pastDueDate, setPastDueDate] = useState("");
  const [adress, setAdress] = useState("");

  const Upload = ()=>{
    fetch("http://172.20.10.2:3000/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({title: titleText, description: descriptionText, pastDueDate: pastDueDate, adress: adress})
    })
        .then((resp)=>resp.json())
        .then((data)=>{
            props.navigation.navigate("Feed");
        })
        .catch((error)=>{
          console.log(error)
          props.navigation.navigate("Feed");
        });
    }
  

  return (
    <View style={styles.screen}>
      <TextInput
        value={titleText}
        placeholder="Set title here"
        style={styles.titleInput}
        onChangeText={setTitleText}
      />
      <TextInput
        value={descriptionText}
        placeholder="Skriv en beskrivelse her"
        style={styles.descriptionInput}
        onChangeText={(text)=>{setDescriptionText(text)}}
      />
      <TextInput
        value={pastDueDate}
        placeholder="Skriv udløbsdato her"
        style={styles.pastDueDateInput}
        onChangeText={(text)=>{setPastDueDate(text)}}
      />
      <TextInput
        value={adress}
        placeholder="Skriv adresse her"
        style={styles.adressInput}
        onChangeText={(text)=>{setAdress(text)}}
      />

      <Pressable onPress={Upload}>
        <View style={styles.postKnap}>
            <Text style={{color:"#ffffff", fontSize:20, alignSelf: "center"}}>Upload til feed</Text>
        </View>
      </Pressable>
      
    </View>
  );
}

export default Post;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#dddddd",
    paddingTop: 10,
    flexDirection: "column",
  },
  titleInput: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 35,
    padding: 15,
    //flex: 0.5
  },
  descriptionInput: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 35,
    padding: 15,
    //flex: 1.5
  },
  pastDueDateInput: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 35,
    padding: 15,
    //flex: 1
  },
  adressInput: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 35,
    padding: 15,
    //flex: 1
    //backgroundColor: "#ffffff",
    //fontSize: 30,
    //color: "#5b8c63"
  },
  postKnap:{
    backgroundColor: "#5b8c63",
    borderRadius: 50,
    marginVertical: 30,
    paddingVertical: 20,
    //flex: 1
  }
});
