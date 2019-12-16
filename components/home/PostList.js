import React, { Component, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import apigClientFactory from "../../apig/apigClient";

import PostItem from "./PostItem";

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postDataList: []
    };
  }

  componentDidMount() {
    this.get_log(this.props.uid);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => item.uid + item.time}
          data={this.state.postDataList}
          renderItem={itemData => (
            <View style={styles.listItem}>
              <PostItem postData={itemData} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  get_log(query) {
    var apigClient = apigClientFactory.newClient({
      apiKey: "hp3cPqP6Ml9jTtt579YcH7qzQkDtBUUJ4QdQlq7A"
    });
    var params = {
      uid: query
    };
    apigClient
      .searchlogGet(params)
      .then(function(result) {
        //returned a list of json
        // {
        //     "uid": "3106223581",
        //     "content": "new log yayyyyyyyyyyyyyyy",
        //     "post_pic": "post1.png",
        //     "time": "12/15/2019-00:39:53",
        //     "name": "Ashley",
        //     "username": "ashleywu",
        //     "profilepic": "default.png"
        // }
        this.setState({
          postDataList: result.data
        });
      })
      .catch(function(result) {
        console.log(result);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#eee"
  },
  listItem: {}
});
