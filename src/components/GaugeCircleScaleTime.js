import React, { Component } from 'react';
import {View, Text} from "react-native";
import Svg, {Path, G, Defs, LinearGradient, Stop, Circle, Text as TextSvg} from "react-native-svg";
import moment from "moment";


export class GaugeCircleScaleTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.runTimeVal = 0;
        this.colorSensorName = "#505050"
        this.colorSensorValue = "#505050"
        this.colorScaleLimits = "#505050"
        this.sideMargin = this.props.width / 2 * 0.085
        this.arcCompletePathDict = null
        this.arcCompletePathDictAlternated = null
        this.maxLabelDistanceHr = 3
        this.xTimeEndLabel = 0
        this.yTimeEndLabel = 0

        this.arcWidth = this.props.width / 2 * 0.12
        this.fontSizeSmall = this.props.height * 0.12
    }
  
    polarToCartesian(xCenter, yCenter, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
          x: xCenter + (radius * Math.cos(angleInRadians)),
          y: yCenter + (radius * Math.sin(angleInRadians))
        };
      }
      
    generateArc(x, y, radius, startAngle, endAngle, isLargeArc, isAlternated){
        var start = this.polarToCartesian(x, y, radius, startAngle);
        var end = this.polarToCartesian(x, y, radius, endAngle);
        var path = ["M", end.x, end.y, 
                 "A", radius, radius, 0, isLargeArc, 0, start.x, start.y
                ].join(" ");

        // Update coordinates/parameters of the complete part of the arc OR return only end coordinates
        if (isAlternated){
            this.arcCompletePathDictAlternated = {
                start: start,
                end: end,
                radius: radius,
                isLargeArc: isLargeArc,
                angle:{
                    start: startAngle,
                    end: endAngle
                }
            }
        } else {
            this.arcCompletePathDict = {
                start: start,
                end: end,
                radius: radius,
                isLargeArc: isLargeArc,
                angle:{
                    start: startAngle,
                    end: endAngle
                }
            }
        }
        return path;       
    }

    getArcAngleFromDate(date, isReturnNewEndCooStart, isReturnNewEndCooEnd){
        // Create new arc angle for overlapping start/end points
        if (isReturnNewEndCooStart){
            return (date.getHours() + Math.round(date.getMinutes() / 60) + /* extra hrs*/ this.maxLabelDistanceHr) / 24 * 360
        }
        if (isReturnNewEndCooEnd){
            return (date.getHours() + Math.round(date.getMinutes() / 60) + /* extra hrs*/ (24 - this.maxLabelDistanceHr)) / 24 * 360
        }
        // regular return
        return (date.getHours() + Math.round(date.getMinutes() / 60) ) / 24 * 360
    }

    getEndLabelCoordinates(){
        // Handling start-end point overlapping 
        var endLabel
        if (this.runTimeVal < (24 -this.maxLabelDistanceHr)){
            if (this.runTimeVal >  this.maxLabelDistanceHr){
                endLabel = {    
                                x: this.arcCompletePathDict.end.x + this.arcWidth * 0.55 * Math.cos( (this.arcCompletePathDict.angle.end - 90) * Math.PI / 180.0 ),
                                y: this.arcCompletePathDict.end.y + this.arcWidth * 0.55 * Math.sin( (this.arcCompletePathDict.angle.end - 90) * Math.PI / 180.0 ),
                                angle: this.arcCompletePathDict.angle.end
                            }
                this.arcCompletePathDict.endLabel = endLabel
            } else {
                if (this.arcCompletePathDict.endLabel){
                    endLabel = this.arcCompletePathDict.endLabel
                } else {
                    this.generateArc(
                    /* xCenter */     this.props.width * 0.36, 
                    /* yCenter */     this.props.height * 0.55, 
                    /* radius */      this.props.width / 2 * 0.25, 
                    /* startAngle */  this.getArcAngleFromDate(this.props.lightRunTimeStart), 
                    /* endAngle */    this.getArcAngleFromDate(this.props.lightRunTimeStart, true, false),
                    /* isLargeArc */  this.runTimeVal > 12 ? 1 : 0,
                    /* isAlternated */true) 
                    endLabel = {    
                        x: this.arcCompletePathDictAlternated.end.x + this.arcWidth * 0.55 * Math.cos( (this.arcCompletePathDictAlternated.angle.end - 90) * Math.PI / 180.0 ),
                        y: this.arcCompletePathDictAlternated.end.y + this.arcWidth * 0.55 * Math.sin( (this.arcCompletePathDictAlternated.angle.end - 90) * Math.PI / 180.0 ),
                        angle: this.arcCompletePathDictAlternated.angle.end % 360
                    }
                    this.arcCompletePathDict.endLabel = endLabel
                }
            }
        } else {
            this.generateArc(
                /* xCenter */     this.props.width * 0.36, 
                /* yCenter */     this.props.height * 0.55, 
                /* radius */      this.props.width / 2 * 0.25, 
                /* startAngle */  this.getArcAngleFromDate(this.props.lightRunTimeStart), 
                /* endAngle */    this.getArcAngleFromDate(this.props.lightRunTimeStart, false, true),
                /* isLargeArc */  this.runTimeVal > 12 ? 1 : 0,
                /* isAlternated */true) 
            endLabel = {    
                x: this.arcCompletePathDictAlternated.end.x + this.arcWidth * 0.55 * Math.cos( (this.arcCompletePathDictAlternated.angle.end - 90) * Math.PI / 180.0 ),
                y: this.arcCompletePathDictAlternated.end.y + this.arcWidth * 0.55 * Math.sin( (this.arcCompletePathDictAlternated.angle.end - 90) * Math.PI / 180.0 ),
                angle: this.arcCompletePathDictAlternated.angle.end % 360
            }
            this.arcCompletePathDict.endLabel = endLabel
        }  
        return endLabel 
    }


  
  render() {
    this.runTimeVal = (this.props.lightRunTimeEnd - this.props.lightRunTimeStart) / (1000 * 60 * 60)
    if  ( (this.runTimeVal <= 24) && (this.runTimeVal >= 0) ) {
        return (
        <View>
            <Svg height={this.props.height} width={this.props.width}>
                {/* Sensor name */}
                <TextSvg
                    fill={this.colorSensorName}
                    fontSize={this.fontSizeSmall }
                    x={this.props.width * 0.5}
                    y={this.props.height * 0.16}
                    textAnchor="middle"
                >{this.props.name }</TextSvg>
                {/* Current sensor value text */}
                <TextSvg
                    fill={this.colorSensorValue}
                    fontSize={this.props.height * 0.2}
                    x={this.props.width * 0.8 + this.props.width * 0.05}
                    y={this.props.height * 0.5}
                    textAnchor="end"
                >{Math.round(this.runTimeVal).toString()}</TextSvg>
                <TextSvg
                    fill={this.colorSensorValue }
                    fontSize={this.props.height * 0.15}
                    x={this.props.width * 0.8 + this.props.width * 0.05}
                    y={this.props.height * 0.5}
                    textAnchor="start"
                >{this.props.unit}</TextSvg>
                {/* Incomplete progress circle */} 
                <Circle
                    cx={this.props.width * 0.36}
                    cy={this.props.height * 0.55}
                    r={this.props.width / 2 * 0.25}
                    stroke={this.props.colorIncompleteArc}
                    strokeWidth={this.arcWidth}
                    fill="none"
                />
                {/* Complete progress arc */}             
                <Path
                    d={this.generateArc(
                        /* xCenter */     this.props.width * 0.36, 
                        /* yCenter */     this.props.height * 0.55, 
                        /* radius */      this.props.width / 2 * 0.25, 
                        /* startAngle */  this.getArcAngleFromDate(this.props.lightRunTimeStart), 
                        /* endAngle */    this.getArcAngleFromDate(this.props.lightRunTimeEnd),
                        /* isLargeArc */  this.runTimeVal > 12 ? 1 : 0,
                        /* isAlternated */false
                    )}
                    stroke={this.props.colorCompleteArc}
                    strokeWidth={this.arcWidth}
                    fill="none"
                />
                {/* Complete progress circle -- covers the case when the completion arc has the same start-end point*/} 
                <Circle
                    cx={this.props.width * 0.36}
                    cy={this.props.height * 0.55}
                    r={this.props.width / 2 * 0.25}
                    stroke={this.arcCompletePathDict != null ?
                                (this.arcCompletePathDict.start.x == this.arcCompletePathDict.end.x) && (this.arcCompletePathDict.start.y == this.arcCompletePathDict.end.y) && (this.runTimeVal >= 23) ? this.props.colorCompleteArc : "none"
                            : 
                                "none"}
                    strokeWidth={this.arcWidth}
                    fill="none"
                />
                {/* Time start */}                 
                <TextSvg
                    fill={this.colorScaleLimits}
                    fontSize={this.fontSizeSmall}
                    x={this.arcCompletePathDict.start.x + this.arcWidth * 0.55 * Math.cos( (this.arcCompletePathDict.angle.start - 90) * Math.PI / 180.0 )}
                    y={this.arcCompletePathDict.start.y + this.arcWidth * 0.55  * Math.sin( (this.arcCompletePathDict.angle.start - 90) * Math.PI / 180.0 )}
                    textAnchor={ (this.arcCompletePathDict.angle.start > 0 ) && (this.arcCompletePathDict.angle.start <= 180 ) ? 
                                    "start"
                                : 
                                    "end"}
                    dy={(this.arcCompletePathDict.angle.start > 90 ) && (this.arcCompletePathDict.angle.start < 270 ) ? 
                            this.fontSizeSmall * 0.7
                        :
                            0}
                >{ (this.props.lightRunTimeStart.getHours() + Math.round(this.props.lightRunTimeStart.getMinutes() / 60)) < 12 ? 
                    (this.props.lightRunTimeStart.getHours() + Math.round(this.props.lightRunTimeStart.getMinutes() / 60)).toString() + "am"
                  :
                    (this.props.lightRunTimeStart.getHours() + Math.round(this.props.lightRunTimeStart.getMinutes() / 60)) == 12 ?
                        "12pm" 
                    :
                        (this.props.lightRunTimeStart.getHours() + Math.round(this.props.lightRunTimeStart.getMinutes() / 60) - 12).toString() + "pm" 
                 }
                </TextSvg> 
                {/* Time end */}  
                <TextSvg
                    fill={this.colorScaleLimits}
                    fontSize={this.fontSizeSmall}
                    // this.runTimeVal check handls end-start time label overlapping cases; this.xTimeEndLabel and this.yTimeEndLabel store last appropriate label coordinates
                    x={this.getEndLabelCoordinates().x}
                    y={this.getEndLabelCoordinates().y}
                    textAnchor={this.arcCompletePathDict.endLabel ? 
                                    (this.arcCompletePathDict.endLabel.angle > 0 ) && (this.arcCompletePathDict.endLabel.angle <= 180 ) ? 
                                        "start"
                                    : 
                                        "end"
                                :
                                    (this.arcCompletePathDict.angle.end > 0 ) && (this.arcCompletePathDict.angle.end <= 180 ) ? 
                                        "start"
                                    : 
                                        "end"}
                    dy={this.arcCompletePathDict.endLabel ? 
                        (this.arcCompletePathDict.endLabel.angle > 90 ) && (this.arcCompletePathDict.endLabel.angle < 270 ) ? 
                                this.fontSizeSmall * 0.7
                            :
                                0
                        :
                            (this.arcCompletePathDict.angle.end > 90 ) && (this.arcCompletePathDict.angle.end < 270 ) ? 
                                this.fontSizeSmall * 0.7
                            :
                                0}
                >{this.runTimeVal > 0 ? 
                    (this.props.lightRunTimeEnd.getHours() + Math.round(this.props.lightRunTimeEnd.getMinutes() / 60)) < 12 ? 
                        (this.props.lightRunTimeEnd.getHours() + Math.round(this.props.lightRunTimeEnd.getMinutes() / 60)).toString() + "am"
                    :
                        (this.props.lightRunTimeEnd.getHours() + Math.round(this.props.lightRunTimeEnd.getMinutes() / 60)) == 12 ?
                            "12pm" 
                        :
                            (this.props.lightRunTimeEnd.getHours() + Math.round(this.props.lightRunTimeEnd.getMinutes() / 60) - 12).toString() + "pm" 
                 :
                    ""
                 }
                </TextSvg> 
            </Svg>
        </View>
        );
    } else {
        console.log("! Error occured while trying to construct GaugeCircleScaleTime: unexpected date interval")
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{ fontSize: this.fontSizeSmall, margin: 0, color: "red",}}>{ "Module" }</Text>
                <Text style={{ fontSize: this.fontSizeSmall, margin: 0, color: "red",}}>{ "Error" }</Text>
            </View>
        );
    }
  }
}

export default GaugeCircleScaleTime;