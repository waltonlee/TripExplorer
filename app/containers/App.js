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
  }
  componentDidMount(){
    fetch(`https://api.tripadvisor.com/api/partner/2.0/map/42.33141,-71.099396?key=89DE2CFC0C1C43978B484B55F9A514EC`)
    .then(r => r.json())
    .then(({data}) => {
      this.setState({
        locations: data
      });
    });

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
