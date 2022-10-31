import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Pressable, Image } from "react-native";

function Details(props){
    const data = props.route.params.sendItem;

    const removePost = (data)=>{
        console.log("Deleting");
        fetch(`http://192.168.137.31:3000/delete/${data.id}/`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((resp)=>{
            props.navigation.navigate("Feed");
        })
        .catch((error)=>{
            console.log(error);
            props.navigation.navigate("Feed");
        })
    }

    return(
        <View style={styles.screenStyle}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.description}>
                <Text style={{fontSize: 16}}>{data.description}</Text>
                <Text style={{fontSize: 16}}>Adresse: {data.adress}</Text>
                <Text style={{fontSize: 14, color: "#4b4b4b"}}>Udløbsdato: {data.pastDueDate}</Text>
                <Text style={{fontSize: 14, color: "#4b4b4b"}}>Uploaddato: {data.date}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={()=>{removePost(data)}}>
                    <View style={styles.button}>
                        <Text style={{fontSize: 28, color: "#fff"}}>Afhent</Text>
                    </View>
                </Pressable>
            </View>
           
        </View>
    );
    
}

export default Details;

const styles = StyleSheet.create({
    screenStyle: { 
        marginTop: 10,
        flex: 1
    },
    title: {
        fontSize: 30,
        alignSelf: "center",
        flex:0.3,
    },
    description: {
        marginVertical: 10,
        borderRadius: 30,
        paddingVertical: 20,
        backgroundColor: "#fff",
        flex: 3
    },
    buttonContainer: {
        flex: 1,
        marginVertical: 20,
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#5b8c63",
        borderRadius: 30,
        height: "75%",
        width: "75%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    }
})