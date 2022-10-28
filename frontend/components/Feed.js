import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, FlatList, Pressable, Image } from "react-native";

import pencil from "../assets/pencil.png";

const renderData = (item) => {
  return (
    <Pressable
      onPress={() => {
        console.log("Pressed");
      }}
    >
      <View style={style.item}>
        <Text style={style.title}>{item.item.title}</Text>
        <Text>{item.item.description}</Text>
        <Text>{item.item.date}</Text>
        <Text>{item.item.pastDueDate}</Text>
        <Text>{item.item.adress}</Text>
      </View>
    </Pressable>
  );
};

function Feed(props) {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadData = ()=>{
    fetch("http://192.168.137.31:3000/get", {
        method: "GET",
    })
    .then((resp=>resp.json()))
    .then((article)=>{
        setFeed(article);
    })
    .catch((error)=>console.log(error))
  }

  useEffect(()=>{
    loadData();
  },[])

  return (
    <View style={style.FeedColoner}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={feed}
        renderItem={(item) => renderData(item)}
      />
      <Pressable onPress={()=>{props.navigation.navigate("Post")}}>
        <View style={style.PostButton}>
          <Image  
          source={pencil}
          />
        </View>
      </Pressable>
    </View>
  );
}

export default Feed;

const style = StyleSheet.create({
  FeedColoner: {
    flex: 1,
    backgroundColor: "#dddddd",
    paddingTop: 10,
  },
  item: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 35,
    padding: 15,
  },
  title: {
    color: "#000000",
    fontSize: 20,
  },
  PostButton: {
    borderRadius: 90,
    backgroundColor: "#5b8c63",
    marginTop: "5%",
    marginLeft: "65%",
    marginRight: "8%",
    marginBottom: "10%",
    paddingVertical: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
});
