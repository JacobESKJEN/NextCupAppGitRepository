import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, FlatList, Pressable, Image } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import pencil from "../assets/pencil.png";



function Feed(props) {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const renderData = (item) => {
    return (
      <Pressable
        onPress={() => {
          const sendItem = item.item
          props.navigation.navigate("Details", {sendItem});
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
  const tryAgain = ()=>{
    fetch("http://172.20.10.2:3000/get", {
        method: "GET",
    })
    .then((resp=>resp.json()))
    .then((article)=>{
        setFeed(article);
        setIsLoading(false);
    })
    .catch((error)=>{console.log(error); setIsLoading(false);})
  }

  const loadData = ()=>{
    console.log("Loading")
    fetch("http://172.20.10.2:3000/get", {
        method: "GET",
    })
    .then((resp=>resp.json()))
    .then((article)=>{
        setFeed(article);
        setIsLoading(false);
    })
    .catch((error)=>{console.log(error); tryAgain();})
  }

  useEffect(()=>{
    loadData();
  },[])

  useFocusEffect(
    React.useCallback(()=>{
      setIsLoading(true);
      loadData();
    }, [])
  )

  return (
    <View style={style.FeedColoner}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={feed}
        renderItem={(item) => renderData(item)}
        onRefresh={()=>{loadData()}}
        refreshing={isLoading}
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
