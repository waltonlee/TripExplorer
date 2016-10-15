import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimesions,
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
    Text as SvgText,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import {connect} from 'react-redux';
const width = 350;
const height = 500;
import D3 from 'd3';
var Graph = React.createClass({
  componentWillMount() {
    this.props.force.on('tick', () => {
      // after force calculation starts, call
      // forceUpdate on the React component on each tick
      this.forceUpdate()
    });
  },

  componentWillReceiveProps(nextProps) {
    // we should actually clone the nodes and links
    // since we're not supposed to directly mutate
    // props passed in from parent, and d3's force function
    // mutates the nodes and links array directly
    // we're bypassing that here for sake of brevity in example
    this.props.force.nodes(nextProps.nodes).links(nextProps.links);

    this.props.force.start();
  },

  localUpdateData(node) {
    this.props.nodes.map(function(n,x) {
      if (n.key === node.key) {
        n.selected = true;
      } else {
        n.selected = false;
      }
    });
    this.props.parentApp.updateData();
  },

  render() {
    // use React to draw all the nodes, d3 calculates the x and y
    var nodes = this.props.nodes.map((node) => {
      var transform = 'translate(' + node.x + ',' + node.y + ')';
      var boundClick = this.localUpdateData.bind(this, node);
      //
      return (
        <G className='node' key={node.key} translateX={node.x} translateY={node.y} >
        <Circle r={node.size} key={node.key+"c"} onPress={boundClick}  />
           <SvgText x={node.size + 5} dy='.35em'>{node.name}</SvgText>
         </G>
      );
    });
    // use React to draw all the nodes, d3 calculates the x and y
    var links = this.props.links.map( (link) => {
      return (
        <Line stroke="red" key={link.key} strokeWidth={link.size}
          x1={link.source.x} x2={link.target.x} y1={link.source.y} y2={link.target.y} />
      );
    });



    return (
      <View>
        <Svg width={width} height={height}>
          <G>
            {links}
            {nodes}
          </G>
        </Svg>
      </View>
    );
  }
});

export default connect(
  state => {
    return {
    }
  }
)(Graph);
