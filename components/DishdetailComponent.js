// redux
import { connect } from "react-redux";
import { postFavorite } from '../redux/ActionCreator';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

import React, { Component } from "react";
import { View, Text, YellowBox, ScrollView, FlatList } from "react-native";
import { Card, Image, Icon } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";

class RenderDish extends Component {
  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card>
          <Image
            source={{ uri: baseUrl + dish.image }}
            style={{
              width: "100%",
              height: 100,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <Icon
            raised
            reverse
            name={this.props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              this.props.favorite
                ? alert("Already favorite")
                : this.props.onPress()
            }
          />
        </Card>
      );
    }
    return <View />;
  }
}

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <FlatList
          data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  }

  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);
  }

  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
