import React, {Component} from "react";
import {Dimensions, Platform, StyleSheet, Text, View, ScrollView, Button} from "react-native";
import {VictoryGroup, VictoryAxis, VictoryArea, VictoryLine, VictoryChart, VictoryBar, VictoryPie} from "victory-native";
import Svg, {Path, G, Defs, LinearGradient, Stop, Ellipse, Text as TextSvg} from "react-native-svg";
import moment from "moment";


import GaugeLineScale from "./../components/GaugeLineScale";
import GaugeCircleScaleTime from "./../components/GaugeCircleScaleTime";

// Sensor control
const sensorColorOffsetVal = 0.5;
const sensorColorBeginning = [255, 0, 0];
const sensorColorOffsetPoint = [0, 170, 50];
const sensorColorEnding = [255, 0, 0];

type Props = {};

export default class DashboardScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      heightViewLevel1: Dimensions.get("window").height / 4.5 > 140 ? Dimensions.get("window").height / 4.5 : 140,
      widthViewLevel2: Dimensions.get("window").width/3,
      widthScreen: Dimensions.get("window").width,
   
      // HVAC sensor values
      HVACtempSensorVal: 23,
      HVACtempSensorRange:[21,25],
      HVAChumiditySensorVal: 60,
      HVAChumiditSensoryRange:[55,75],
      HVACco2SensorVal: 900,
      HVACco2SensoryRange:[800,1000],

      // Irrigation sensor values
      irrTempSensorVal: 19.5,
      irrTempSensorRange:[18,21],
      irrPhSensorVal: 6.1,
      irrPhSensoryRange:[5.4,6.2],
      irrEcSensorVal: 15,
      irrEcSensoryRange:[12,18],

      // Lighting sensor values
      lightRunTimeStart: new Date(2018, 11, 9, 6, 10, 0, 0),  
      lightRunTimeEnd: new Date(2018, 11, 9, 22, 15, 0, 0),  
    }
  // One more way to load the icons on the top menu bar
  //   Navigation.events().bindComponent(this);
  //   Icon.getImageSource("menu", 32, "black").then(src =>{
  //     Navigation.mergeOptions(this.props.componentId, {
  //       topBar: {
  //         leftButtons: [
  //           {
  //             id: "settingsButton",
  //             icon: src,
  //           },
  //         ],
  //       },
  //     })
  //   });
  }


  _onPressTestButton(){
    var hr = Math.floor(Math.random() * 24)
    var hr2 = hr + Math.floor(Math.random() * (24 - hr) )

    this.setState({
      // HVAC sensor values
      HVACtempSensorVal: this.state.HVACtempSensorRange[0] + Math.floor(Math.random() * (this.state.HVACtempSensorRange[1] - this.state.HVACtempSensorRange[0]) ),
      HVAChumiditySensorVal: this.state.HVAChumiditSensoryRange[0] + Math.floor(Math.random() * (this.state.HVAChumiditSensoryRange[1] - this.state.HVAChumiditSensoryRange[0]) ),
      HVACco2SensorVal: this.state.HVACco2SensoryRange[0] + Math.floor(Math.random() * (this.state.HVACco2SensoryRange[1] - this.state.HVACco2SensoryRange[0]) ),

      // Irrigation sensor values
      irrTempSensorVal: this.state.irrTempSensorRange[0] + Math.floor(Math.random() * (this.state.irrTempSensorRange[1] - this.state.irrTempSensorRange[0]) * 10 ) / 10,
      irrPhSensorVal: (this.state.irrPhSensoryRange[0] + Math.random() * (this.state.irrPhSensoryRange[1] - this.state.irrPhSensoryRange[0])).toFixed(1) ,
      irrEcSensorVal: this.state.irrEcSensoryRange[0] + Math.floor(Math.random() * (this.state.irrEcSensoryRange[1] - this.state.irrEcSensoryRange[0]) ),

      // Lighting sensor values
      lightRunTimeStart: new Date(2018, 11, 9, hr, 0, 0, 0),  
      lightRunTimeEnd: new Date(2018, 11, 9, hr2, 0, 0, 0),  
    })
    
    // this.setState({lightRunTimeStart: moment(this.state.lightRunTimeStart).add(1, "hour")._d})
    // this.setState({lightRunTimeEnd: moment(this.state.lightRunTimeEnd).add(1, "hour")._d})
  }

  render() {
    console.log("widthViewLevel2: " + this.state.widthViewLevel2 )
    console.log("heightViewLevel1: " + this.state.heightViewLevel1)
    console.log("widthScreen: " + this.state.widthScreen)
    // heightViewLevel1: Dimensions.get("window").height / 4.5 > 140 ? Dimensions.get("window").height / 4.5 : 140,
    // widthViewLevel2: Dimensions.get("window").width/3,
    // widthScreen: Dimensions.get("window").width,

    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.sectionName, {fontSize: this.state.widthViewLevel2 / 100 * 1.5 > 20 ? this.state.widthViewLevel2 / 100 * 1.5 : 20}]}>Sensors</Text>





          <Button
          onPress={() => this._onPressTestButton()}
          title="Test Button"
          color="black"
        />





        <Text style={[styles.sectionSubName]}>HVAC</Text>
        <View style={[styles.viewLevel1, {width: this.state.widthScreen, height: this.state.heightViewLevel1}]}>
          <View style={[styles.viewLevel2, {width: this.state.widthViewLevel2}]}>
            {/* Temperature sensor */}
            <GaugeLineScale 
              height = {this.state.heightViewLevel1}
              width = {this.state.widthViewLevel2}

              name = {"Temperature"}
              value = {this.state.HVACtempSensorVal} 
              range = {this.state.HVACtempSensorRange}
              unit = {"\u2103"}
              
              scaleOffsetVal = {sensorColorOffsetVal}
              scaleColorOffsetPoint = {sensorColorOffsetPoint}
              scaleColorBeginning = {sensorColorBeginning} 
              scaleColorEnding = {sensorColorEnding}
            />
          </View>

          <View style={[styles.viewLevel2, {width: this.state.widthViewLevel2}]}>
            {/* HVAC Humidity Sensor */}
            <GaugeLineScale 
              height = {this.state.heightViewLevel1}
              width = {this.state.widthViewLevel2}

              name = {"Humidity"}
              value = {this.state.HVAChumiditySensorVal} 
              range = {this.state.HVAChumiditSensoryRange}
              unit = {"%"}
              
              scaleOffsetVal = {sensorColorOffsetVal}
              scaleColorOffsetPoint = {sensorColorOffsetPoint}
              scaleColorBeginning = {sensorColorBeginning} 
              scaleColorEnding = {sensorColorEnding}
            />
          </View>

          <View style={[styles.viewLevel2, {width: this.state.widthViewLevel2}]}>
            {/* HVAC CO2 Sensor */}
            <GaugeLineScale 
              height = {this.state.heightViewLevel1}
              width = {this.state.widthViewLevel2}

              name = {"CO"+"\u2082"}
              value = {this.state.HVACco2SensorVal} 
              range = {this.state.HVACco2SensoryRange}
              unit = {"ppm"}
              
              scaleOffsetVal = {sensorColorOffsetVal}
              scaleColorOffsetPoint = {sensorColorOffsetPoint}
              scaleColorBeginning = {sensorColorBeginning} 
              scaleColorEnding = {sensorColorEnding}
            />
          </View>
        </View>





        <Text style={[styles.sectionSubName]}>Irrigation</Text>
        <View style={[styles.viewLevel1, {width: this.state.widthScreen, height: this.state.heightViewLevel1}]}>
          <View style={[styles.viewLevel2, {width: this.state.widthViewLevel2}]}>
            {/* Irrigation Temperature Sensor */}
            <GaugeLineScale 
              height = {this.state.heightViewLevel1}
              width = {this.state.widthViewLevel2}

              name = {"Temperature"}
              value = {this.state.irrTempSensorVal} 
              range = {this.state.irrTempSensorRange}
              unit = {"\u2103"}
              
              scaleOffsetVal = {sensorColorOffsetVal}
              scaleColorOffsetPoint = {sensorColorOffsetPoint}
              scaleColorBeginning = {sensorColorBeginning} 
              scaleColorEnding = {sensorColorEnding}
            />
          </View>

          <View style={[styles.viewLevel2, {width: this.state.widthViewLevel2}]}>
            {/* Irrigation pH Sensor */}
            <GaugeLineScale 
              height = {this.state.heightViewLevel1}
              width = {this.state.widthViewLevel2}

              name = {"pH"}
              value = {this.state.irrPhSensorVal} 
              range = {this.state.irrPhSensoryRange}
              unit = {""}
              
              scaleOffsetVal = {sensorColorOffsetVal}
              scaleColorOffsetPoint = {sensorColorOffsetPoint}
              scaleColorBeginning = {sensorColorBeginning} 
              scaleColorEnding = {sensorColorEnding}
            />
          </View>

          <View style={[styles.viewLevel2, {width: this.state.widthViewLevel2}]}>
            {/* Irrigation EC Sensor */}
            <GaugeLineScale 
              height = {this.state.heightViewLevel1}
              width = {this.state.widthViewLevel2}

              name = {"EC"}
              value = {this.state.irrEcSensorVal} 
              range = {this.state.irrEcSensoryRange}
              unit = {"mS/cm"}
              valueFontSizeDecreasePercent = {0.1} // optional
              
              scaleOffsetVal = {sensorColorOffsetVal}
              scaleColorOffsetPoint = {sensorColorOffsetPoint}
              scaleColorBeginning = {sensorColorBeginning} 
              scaleColorEnding = {sensorColorEnding}
            />
          </View>
        </View>





        <Text style={[styles.sectionSubName]}>Lighting</Text>
        <View style={[styles.viewLevel1, {width: this.state.widthScreen, height: this.state.heightViewLevel1}]}>
          <View style={[styles.viewLevel2, {width: this.state.widthViewLevel2 * 2}]}>
            <GaugeCircleScaleTime
              height = {this.state.heightViewLevel1}
              width = {this.state.widthViewLevel2 * 2}

              name = {"Running Time"}
              lightRunTimeStart = {this.state.lightRunTimeStart}
              lightRunTimeEnd = {this.state.lightRunTimeEnd}
              
              value = {20} 
              // range = {this.state.HVACtempSensorRange}
              unit = {"hr"}

              colorCompleteArc = {"rgb(" + sensorColorOffsetPoint.join(",") + ")"}
              colorIncompleteArc = "#D3D3D3"
              />
          </View>

          <View style={[styles.viewLevel2, {width: this.state.widthViewLevel2}]}>
            {/* Temperature sensor */}
            {/* <GaugeLineScale 
                height = {this.state.heightViewLevel1}
                width = {this.state.widthViewLevel2}

                name = {"Temperature"}
                value = {this.state.HVACtempSensorVal} 
                range = {this.state.HVACtempSensorRange}
                unit = {"\u2103"}
                
                scaleOffsetVal = {sensorColorOffsetVal}
                scaleColorOffsetPoint = {sensorColorOffsetPoint}
                scaleColorBeginning = {sensorColorBeginning} 
                scaleColorEnding = {sensorColorEnding}
              /> */}
          </View>
        </View>





        {/* spacefiller  */}
        <Text style={[styles.sectionName, {fontSize: this.state.widthViewLevel2 / 100 * 1.5 > 20 ? this.state.widthViewLevel2 / 100 * 1.5 : 20}]}>Sensors 2</Text>

                <View style={[styles.viewLevel1, {width: this.state.widthScreen, height: this.state.heightViewLevel1,  alignItems: "center",alignContent: "center", justifyContent: "space-between", }]}>
                  
                  <View>
                  <VictoryPie
                    padding={25}
                        padAngle={0}
                        labels={["",""]}
                        innerRadius={40}
                        width={100} height={100}
                        data={[{"key": "", "y": 45}, {"key": "", "y": (100-45)} ]}
                        colorScale={["#19B3A6", "#EEEEEE" ]}
                  />
                  </View>

                  <View>
                  <VictoryPie
                    padding={25}
                        padAngle={0}
                        labels={["",""]}
                        innerRadius={40}
                        width={100} height={100}
                        data={[{"key": "", "y": 58}, {"key": "", "y": (100-58)} ]}
                        colorScale={["#19B3A6", "#EEEEEE" ]}
                  />
                  </View>

                  <View>
                  <VictoryPie
                    padding={25}
                        padAngle={0}
                        labels={["",""]}
                        innerRadius={40}
                        width={100} height={100}
                        data={[{"key": "", "y": 92}, {"key": "", "y": (100-92)} ]}
                        colorScale={["red", "#EEEEEE" ]}
                  />
                  </View>

                </View>


        <Text style={[styles.sectionName, {fontSize: this.state.widthViewLevel2 / 100 * 1.5 > 20 ? this.state.widthViewLevel2 / 100 * 1.5 : 20}]}>Yeild</Text>

                <View style={[styles.viewLevel1, {width: this.state.widthScreen, height: this.state.heightViewLevel1}]}>
                  <VictoryChart height={200} width={380} color
                    domainPadding={{ x: 50, y: [0, 20] }}
                    scale={{ x: "time" }}
                  >
                  <VictoryBar
                    style={{ data: { fill: "blue" } }}
                    data={[
                      { x: new Date(1986, 1, 1), y: 2 },
                      { x: new Date(1996, 1, 1), y: 3 },
                      { x: new Date(2006, 1, 1), y: 5 },
                      { x: new Date(2016, 1, 1), y: 4 }
                    ]}
                  />
                </VictoryChart>

                </View>


  
        <View style={[styles.viewLevel1, {width: this.state.widthScreen, height: this.state.heightViewLevel1}]}>
          
        </View>



      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flexDirection:"column",
  },
  viewLevel1: {
    // flex: 4,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    flexDirection:"row",
  },
  viewLevel2: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    flexDirection:"column",
  },
  sectionName: {
    textAlign: "center",
    margin: 10,
  },
  sectionSubName: {
    fontSize: 20,
    textAlign: "center",
    margin: 0,
    backgroundColor: "#D3D3D3",
  },

});


