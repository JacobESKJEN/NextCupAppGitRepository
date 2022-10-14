import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";

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

function Feed() {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadData = ()=>{
    fetch("http://192.168.0.100:3000/get", {
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
});
