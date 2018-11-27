import React, { Component } from 'react';
import {View} from "react-native";
import Svg, {Rect, Path, G, Defs, LinearGradient, Stop, Ellipse, Text as TextSvg} from "react-native-svg";


export class GaugeLineScale extends Component {
    constructor(props) {
        super(props);
        this.colorSensorName = "#505050"
        this.colorValueMark = "#505050"
        this.colorScaleLimits = "#505050"
        this.sideMargin = this.props.width * 0.085
    }
  
    getColorAtGradientPoint(value, range, offsetVal, colorOffsetPoint, colorBeginning, colorEnding){

      // Check length of all expected arrays
      if ( (range.length == 2) && (colorOffsetPoint.length == 3) && (colorBeginning.length == 3) && (colorEnding.length == 3)) {
          var percentage = (value - range[0]) / (range[1] - range[0]) 
          if ( percentage < offsetVal){
            var rgbR = Math.floor(colorOffsetPoint[0] * percentage / offsetVal + colorBeginning[0] * (offsetVal - percentage) / offsetVal)
            var rgbG = Math.floor(colorOffsetPoint[1] * percentage / offsetVal + colorBeginning[1] * (offsetVal - percentage) / offsetVal)
            var rgbB = Math.floor(colorOffsetPoint[2] * percentage / offsetVal + colorBeginning[2] * (offsetVal - percentage) / offsetVal) 
          } else {
            var rgbR = Math.floor((colorEnding[0]) * (percentage - offsetVal) / (1 - offsetVal) + colorOffsetPoint[0] * (1 - percentage) / (1 - offsetVal)) 
            var rgbG = Math.floor((colorEnding[1]) * (percentage - offsetVal) / (1 - offsetVal) + colorOffsetPoint[1] * (1 - percentage) / (1 - offsetVal))
            var rgbB = Math.floor((colorEnding[2]) * (percentage - offsetVal) / (1 - offsetVal) + colorOffsetPoint[2] * (1 - percentage) / (1 - offsetVal))
          }
          var rgb = ["rgb(", rgbR, ",", rgbG, ",", rgbB, ")"].join("")
          return rgb
      } else {
          console.log("! Error occurred in getColorAtGradientPoint() from GaugeLineScale")
          return null
      }               
  }
  
  render() {
    return (
      <View>
            <Svg height={this.props.height} width={this.props.width}>
                {/* Creating gradient color fill */}
                <Defs>
                    <LinearGradient id="gradientScale" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0" stopColor={"rgb(" + this.props.scaleColorBeginning[0].toString() + "," + this.props.scaleColorBeginning[1].toString() + "," + this.props.scaleColorBeginning[2].toString() + ")"} />
                        <Stop offset={this.props.scaleOffsetVal.toString()} stopColor={"rgb(" + this.props.scaleColorOffsetPoint[0].toString() + "," + this.props.scaleColorOffsetPoint[1].toString() + "," + this.props.scaleColorOffsetPoint[2].toString() + ")"} />
                        <Stop offset="1" stopColor={"rgb(" + this.props.scaleColorEnding[0].toString() + "," + this.props.scaleColorEnding[1].toString() + "," + this.props.scaleColorEnding[2].toString() + ")"} />
                    </LinearGradient>
                </Defs>
                {/* Sensor name */}
                <TextSvg
                    fill={this.colorSensorName}
                    fontSize={this.props.height * 0.12}
                    x={this.props.width * 0.5}
                    y={this.props.height * 0.16}
                    textAnchor="middle"
                >{this.props.name }</TextSvg>
                {/* Current sensor value text */}
                <TextSvg
                    fill={this.getColorAtGradientPoint(this.props.value, this.props.range, this.props.scaleOffsetVal, this.props.scaleColorOffsetPoint, this.props.scaleColorBeginning, this.props.scaleColorEnding)}
                    fontSize={ typeof this.props.valueFontSizeDecreasePercent == 'undefined' ? this.props.height * 0.2 : this.props.height * 0.19 * (1 - this.props.valueFontSizeDecreasePercent)}
                    x={this.props.width * 0.5}
                    y={this.props.height * 0.50} 
                    textAnchor="middle"
                >{this.props.value.toString() + this.props.unit}</TextSvg>
                {/* Color scale */}             
                <Rect 
                    fill="url(#gradientScale)"
                    x={this.sideMargin} 
                    y={this.props.height * 0.72 - 1/2 * this.props.height * 0.12} // y - 1/2 of the height
                    width={this.props.width - 2 * this.sideMargin} 
                    height={this.props.height * 0.12}

                    rx={this.props.height * 0.12 * 0.5}
                    ry={this.props.height * 0.12 * 0.5}
                />
                {/* Current sensor value mark */}
                <Path
                    d={"M" + ((this.props.value - this.props.range[0]) / (this.props.range[1] - this.props.range[0]) * (this.props.width - 2 * this.sideMargin) + this.sideMargin).toString() + " " + (this.props.height * 0.625).toString() + " L " + 
                    ((this.props.value - this.props.range[0]) / (this.props.range[1] - this.props.range[0]) * (this.props.width - 2 * this.sideMargin) + this.sideMargin).toString() + " " + (this.props.height * 0.815).toString()}              
                    fill="none"
                    stroke={this.colorValueMark}
                    strokeWidth={this.props.height * 0.015}
                />
                {/* Scale Limits */}
                <TextSvg
                    fill={this.colorScaleLimits}
                    fontSize={this.props.height * 0.12}
                    x={this.sideMargin / 2}
                    y={this.props.height * 0.93}
                    textAnchor="start"
                >{this.props.range[0]}</TextSvg>
                <TextSvg
                    fill={this.colorScaleLimits}
                    fontSize={this.props.height * 0.12}
                    x={this.props.width - this.sideMargin / 2}
                    y={this.props.height * 0.93}
                    textAnchor="end"
                >{this.props.range[1]}</TextSvg> 
            </Svg>
      </View>
    );
  }
}

export default GaugeLineScale;