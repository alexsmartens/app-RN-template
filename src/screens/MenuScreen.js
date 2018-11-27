import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';

// Icon fonts
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";



type Props = {};

export default class MenuScreen extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = { 
            heightBotton: Dimensions.get("window").height / 13 > 50 ? Dimensions.get("window").height / 13 : 50,
            currentScreenId: this.props.currentScreenId
        }
        this.iconSize = 30
        this.buttonMarkWidth = 5
        this.colorOnButtonSelected = "#D3D3D3"
      }

    _onPressButton(selectedScreenId, selectedScreenTitle){
        this.setState({currentScreenId: selectedScreenId})
        this.props.changeScreenCallback(selectedScreenId, selectedScreenTitle)
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={[styles.touchableContainer, {height: this.state.heightBotton, backgroundColor: this.state.currentScreenId == "DashboardScreen" ? this.colorOnButtonSelected : "#F5FCFF"}]} 
                                  onPress={() => this._onPressButton("DashboardScreen", "Dashboard")}>
                    <View style={styles.buttonView}>
                        <View style={[styles.buttonMark, {height:this.state.heightBotton, width: this.buttonMarkWidth * (this.state.currentScreenId == "DashboardScreen") }]} />
                        <AntDesign style={styles.buttonIcon} name="home" size={this.iconSize} color="black"/>
                        <Text style={styles.buttonText}>Dashboard</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchableContainer, {height: this.state.heightBotton, backgroundColor: this.state.currentScreenId == "TasksScreen" ? this.colorOnButtonSelected : "#F5FCFF"}]} 
                                  onPress={() => this._onPressButton("TasksScreen", "Tasks")}>
                    <View style={styles.buttonView}>
                        <View style={[styles.buttonMark, {height:this.state.heightBotton, width: this.buttonMarkWidth * (this.state.currentScreenId == "TasksScreen") }]} />
                        <AntDesign style={styles.buttonIcon} name="profile" size={this.iconSize} color="black"/>
                        <Text style={styles.buttonText}>Tasks</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchableContainer, {height: this.state.heightBotton, backgroundColor: this.state.currentScreenId == "AlertsScreen" ? this.colorOnButtonSelected : "#F5FCFF"}]} 
                                  onPress={() => this._onPressButton("AlertsScreen", "Alerts")}>
                    <View style={styles.buttonView}>
                        <View style={[styles.buttonMark, {height:this.state.heightBotton, width: this.buttonMarkWidth * (this.state.currentScreenId == "AlertsScreen") }]} />
                        <Feather style={styles.buttonIcon} name="alert-triangle" size={this.iconSize} color="black"/>
                        <Text style={styles.buttonText}>Alerts</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchableContainer, {height: this.state.heightBotton, backgroundColor: this.state.currentScreenId == "YieldScreen" ? this.colorOnButtonSelected : "#F5FCFF"}]} 
                                  onPress={() => this._onPressButton("YieldScreen", "Yield")}>
                    <View style={styles.buttonView}>    
                        <View style={[styles.buttonMark, {height:this.state.heightBotton, width: this.buttonMarkWidth * (this.state.currentScreenId == "YieldScreen") }]} />
                        <MaterialCommunityIcons style={styles.buttonIcon} name="scale" size={this.iconSize} color="black"/>
                        <Text style={styles.buttonText}>Yield</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchableContainer, {height: this.state.heightBotton, backgroundColor: this.state.currentScreenId == "StrategiesScreen" ? this.colorOnButtonSelected : "#F5FCFF"}]} 
                                  onPress={() => this._onPressButton("StrategiesScreen", "Strategies")}>
                    <View style={styles.buttonView}>
                        <View style={[styles.buttonMark, {height:this.state.heightBotton, width: this.buttonMarkWidth * (this.state.currentScreenId == "StrategiesScreen") }]} />
                        <MaterialCommunityIcons style={styles.buttonIcon} name="brain" size={this.iconSize} color="black"/>
                        <Text style={styles.buttonText}>Strategies</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchableContainer, {height: this.state.heightBotton, backgroundColor: this.state.currentScreenId == "HarvestLogScreen" ? this.colorOnButtonSelected : "#F5FCFF"}]} 
                                  onPress={() => this._onPressButton("HarvestLogScreen", "Harvest Log")}>
                    <View style={styles.buttonView}>
                        <View style={[styles.buttonMark, {height:this.state.heightBotton, width: this.buttonMarkWidth * (this.state.currentScreenId == "HarvestLogScreen") }]} />
                        <Feather style={styles.buttonIcon} name="database" size={this.iconSize} color="black"/>
                        <Text style={styles.buttonText}>Harvest Log</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchableContainer, {height: this.state.heightBotton, backgroundColor: this.state.currentScreenId == "SettingsScreen" ? this.colorOnButtonSelected : "#F5FCFF"}]} 
                                  onPress={() => this._onPressButton("SettingsScreen", "Settings")}>
                    <View style={styles.buttonView}>
                        <View style={[styles.buttonMark, {height:this.state.heightBotton, width: this.buttonMarkWidth * (this.state.currentScreenId == "SettingsScreen") }]} />
                        <AntDesign style={styles.buttonIcon} name="setting" size={this.iconSize} color="black"/>
                        <Text style={styles.buttonText}>Settings</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touchableContainer, {height: this.state.heightBotton, backgroundColor: this.state.currentScreenId == "SupportScreen" ? this.colorOnButtonSelected : "#F5FCFF"}]} 
                                  onPress={() => this._onPressButton("SupportScreen", "Support")}>
                    <View style={styles.buttonView}>
                        <View style={[styles.buttonMark, {height:this.state.heightBotton, width: this.buttonMarkWidth * (this.state.currentScreenId == "SupportScreen") }]} />
                        <FontAwesome5 style={styles.buttonIcon} name="rocketchat" size={this.iconSize} color="black"/>
                        <Text style={styles.buttonText}>Support</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 65,
    backgroundColor: "#F5FCFF",
    flexDirection:"column",
  },
  touchableContainer: {
  },
  buttonView:{
    flexDirection:"row", 
    alignItems: "center",
    marginRight:80,
  },
  buttonText: {
    fontSize: 20,
    marginLeft: 13,
  },
  buttonIcon: {
    marginLeft:15,
  },
  buttonMark: {
    width: 0,
    backgroundColor: "red"
  },
});
