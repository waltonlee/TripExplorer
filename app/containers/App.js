import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
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
class App extends Component {
  static propTypes = {};
  static contextTypes = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    var fetchTripAdvisor = function (lat,long,_this) {
      // 42.33141,-71.099396
      console.log(`https://api.tripadvisor.com/api/partner/2.0/map/${lat},${long}?key=89DE2CFC0C1C43978B484B55F9A514EC`)
      fetch(`https://api.tripadvisor.com/api/partner/2.0/map/${lat},${long}?key=89DE2CFC0C1C43978B484B55F9A514EC`)
      .then(r => r.json())
      .then(({data}) => {
        _this.setState({
          locations: data
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
      <View style={styles.app}>
      {this.state.locations && this.state.locations.map(function(location) {
        return (
          <View style={{backgroundColor: 'grey'}}>
            <Text style={{color: 'white'}}>{location.name}</Text>
            <Text style={{color: 'white'}}>{location.string}</Text>
          </View>
        );
      })}
      </View>
    );
  }
}

export default connect(
  state => {
    return {
      propName: state.myDataGoesHere
    }
  }
)(App);
