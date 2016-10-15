import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image
} from "react-native";
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import Graph from './Graph';
import {Text as SvgText} from 'react-native-svg';
import {connect} from 'react-redux';
import D3 from 'd3';
const styles = StyleSheet.create({
  app: {
    paddingTop: 40
  }
});

    var width = 350;
    var height = 500;

/**
 */
class App extends Component {
  static propTypes = {};
  static contextTypes = {};
  constructor(props) {
    super(props);
    var force = D3.layout.force()
      .charge(-300)
      .linkDistance(150)
      .size([width, height]);
    this.state = { text: 'Your Current Location',
    nodes: [],
    links: [],
    force: force };

  }

  componentDidMount(){
    this.firstData();
    var fetchTripAdvisor = function (lat,long,_this) {
      // 42.33141,-71.099396
      console.log(`https://api.tripadvisor.com/api/partner/2.0/map/${lat},${long}?key=89DE2CFC0C1C43978B484B55F9A514EC`)
      fetch(`https://api.tripadvisor.com/api/partner/2.0/map/${lat},${long}?key=89DE2CFC0C1C43978B484B55F9A514EC`)
      .then(r => r.json())
      .then(({data}) => {
        console.log(data)
        _this.setState({
          locations: data,
          text: 'Your Current Location'
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
        <TextInput
        style={{height: 40, textAlign: 'center',borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
            <View>
          <Graph nodes={this.state.nodes} links={this.state.links} force={this.state.force} parentApp={this}/>
        </View>
      </View>
    );
  }
  firstData() {
    // <View className="update" onClick={this.updateData}>update</div>
    // randomData is loaded in from external file generate_data.js
    // and returns an object with nodes and links
    var newState = {nodes: [{
                x: width / 2,
                y: height / 2,
                key: 0,
                size: 10,
                name: ' '
            }, {
                x: width / 2,
                y: height / 2,
                key: 1,
                size: 20,
                name: 'Eat'
            }, {
                x: width / 2,
                y: height / 2,
                key: 2,
                size: 18,
                name: 'Play'
            }, {
                x: width / 2,
                y: height / 2,
                key: 3,
                size: 15,
                name: 'Sleep'
            }

        ], links: [{
                key: "0,1",
                size: 3,
                source: 0,
                target: 1
            }, {
                key: "0,2",
                size: 2,
                source: 0,
                target: 2
            }, {
                key: "0,3",
                size: 1,
                source: 0,
                target: 3
            }]};
    this.setState(newState);
  }
  updateData() {
    console.log(this.state.nodes);
    // randomData is loaded in from external file generate_data.js
    // and returns an object with nodes and links
    var distances = new Array();
    var i = 0;
    var nodes = new Array();
    var links = new Array();

    var locationsFromApi = this.state.locations && this.state.locations.map(function(location) {
      console.log(location)
      distances.push(parseFloat(location.distance, 10))
      nodes.push({
          x: width / 2,
          y: height / 2,
          key: i,
          size: 15,
          name: '' || location.name
      });
      if(i > 0) {
          links.push({
              key: ("0,"+i),
              size: Math.pow((13*distances[i]),2),
              source: 0,
              target: i

          });
      };
      i = i+1;
    });
    if(nodes.length > 0 && links.length > 0) {
        var newState2 = {nodes, links}
    }
    if(newState2) {
        //console.log(newState2);
        this.setState(newState2);

    }
  }

};



export default connect(
  state => {
    return {
      propName: state.myDataGoesHere
    }
  }
)(App);
