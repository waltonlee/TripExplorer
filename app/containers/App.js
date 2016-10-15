import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Navigator,
  TouchableHighlight

} from "react-native";
import {connect} from 'react-redux';
const styles = StyleSheet.create({
  app: {
    paddingTop: 40
  }
});



/**
 * @desc Your app's content goes here mothafucka
 */
/*class App extends Component {
  static propTypes = {};
  static contextTypes = {};
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };

  }*/
export default class NavAllDay extends Component {
  render() {
     const routes = [
    {title: 'First Scene', index: 0},
    {title: 'Second Scene', index: 1},
  ];
    return (
       <Navigator
      initialRoute={routes[0]}
      initialRouteStack={routes}
      renderScene={(route, navigator) =>
        <TouchableHighlight onPress={() => {
          if (route.index === 0) {
            navigator.push(routes[1]);
          } else {
            navigator.pop();
          }
        }}>
        <Text>Hello {route.title}!</Text>
        </TouchableHighlight>
      }
      style={{padding: 100}}
    />
     
      
    );
  }
}

/*
  componentDidMount(){
    var fetchTripAdvisor = function (lat,long,_this) {
      // 42.33141,-71.099396
      console.log(`https://api.tripadvisor.com/api/partner/2.0/map/${lat},${long}?key=89DE2CFC0C1C43978B484B55F9A514EC`)
      fetch(`https://api.tripadvisor.com/api/partner/2.0/map/${lat},${long}?key=89DE2CFC0C1C43978B484B55F9A514EC`)
      .then(r => r.json())
      .then(({data}) => {
        console.log(data)
        _this.setState({
          locations: data,
          text: ''
        });
      });
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition =position;
        this.setState({initialPosition});
        fetchTripAdvisor(position.coords.latitude, position.coords.longitude, this);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    console.log(this.state);

  }
  render() {
    console.log(this.state, "IN RENDER FUNCTION");
    return (
      <View style={styles.app} >
      
      {this.state.locations && this.state.locations.map(function(location) {
        return (
          <View key={location.location_id} style={{backgroundColor: 'black'}}>
            <Text style={{color: 'white'}}>{location.name}</Text>
            <Text style={{color: 'white'}}>{location.string}</Text>

          </View>

        );
      })}
      </View>
    );
  }
}*/

/*export default connect(
  state => {
    return {
      propName: state.myDataGoesHere
    }
  }
)(NavAllDay);*/

/*AppRegistry.registerComponent('navi', () => Navi);*/
