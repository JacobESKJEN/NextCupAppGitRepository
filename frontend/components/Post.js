import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";

function Upload(Title, Description, PastDueDate, Adress) {
    fetch("192.168.137.31:3000/add", {
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
    fetch("192.168.137.31:3000/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({title: titleText, description: descriptionText, pastDueDate: pastDueDate, adress: adress})
    })
        .then((resp)=>resp.json())
        .then((data)=>{
            props.navigation.navigate("Home");
        })
        .catch((error)=>console.log(error));
    }
  

  return (
    <View style={styles.screen}>
      <TextInput
        value={titleText}
        placeholder="Set title here"
        style={styles.TitleInput}
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
    fontSize: 30,
    color: "#5b8c63"
  },
  descriptionInput: {

  },
  pastDueDateInput: {

  },
  adressInput: {

  },
  postKnap:{
    backgroundColor: "#5b8c63",
    borderRadius: 30,
    paddingVertical: 10,
  }
});
