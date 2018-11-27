// import './../configs/globalVariables'
import { Navigation } from "react-native-navigation";
// Import screens
import MenuScreen from "./src/screens/MenuScreen";
import AlertsScreen from "./src/screens/AlertsScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import HarvestLogScreen from "./src/screens/HarvestLogScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import StrategiesScreen from "./src/screens/StrategiesScreen";
import SupportScreen from "./src/screens/SupportScreen";
import TasksScreen from "./src/screens/TasksScreen";
import YieldScreen from "./src/screens/YieldScreen";

// Register screens
Navigation.registerComponent("navigation.playground.MenuScreen", () => MenuScreen);
Navigation.registerComponent("navigation.playground.AlertsScreen", () => AlertsScreen);

Navigation.registerComponent("navigation.playground.DashboardScreen", () => DashboardScreen);

Navigation.registerComponent("navigation.playground.HarvestLogScreen", () => HarvestLogScreen);
Navigation.registerComponent("navigation.playground.SettingsScreen", () => SettingsScreen);
Navigation.registerComponent("navigation.playground.StrategiesScreen", () => StrategiesScreen);
Navigation.registerComponent("navigation.playground.SupportScreen", () => SupportScreen);
Navigation.registerComponent("navigation.playground.TasksScreen", () => TasksScreen);
Navigation.registerComponent("navigation.playground.YieldScreen", () => YieldScreen);

import MaterialIcons from "react-native-vector-icons/MaterialIcons";



class templateApp {
  constructor(props) {
    this.currentStackRootScreenId = "DashboardScreen"
    this.homeIcon = null
  }

  startApp(){
    Navigation.events().registerAppLaunchedListener(() => {
        // Loading icons
        MaterialIcons.getImageSource("menu", 32, "black").then(src => {
            this.homeIcon = src;
            Navigation.setRoot({
                root: {
                    sideMenu: {
                        left: {
                            component: {
                                id: "MenuScreen",
                                name: "navigation.playground.MenuScreen",
                                passProps: {
                                    changeScreenCallback: this.changeScreen,
                                    currentScreenId: this.currentStackRootScreenId,
                                }
                            },
                        },
                        // 
                        center: {
                            stack: {
                                id: "mainStackRoot",
                                children: [{
                                    component: {
                                        id: this.currentStackRootScreenId ,
                                        name: "navigation.playground." + this.currentStackRootScreenId,
                                        options: {
                                            topBar: {
                                                title: {
                                                    text: "Dashboard",
                                                },
                                                leftButtons: [{
                                                    id: "menuButton",
                                                    icon: this.homeIcon
                                                }, ],
                                            },
                                        },
                                    },
                                }, ],
                            },
                        },
                        // 
                    }
                }
            });
        
        })
    })


    // Button press listener
    Navigation.events().registerNavigationButtonPressedListener((event) => {
        // launching menu
        if (event.buttonId == "menuButton"){
            Navigation.mergeOptions("MenuScreen", {
                sideMenu: {
                    left: {
                        visible: true,
                    },
                }
            });   
        }
    })

  }


  changeScreen = function(newScreenId, newScreenTitle){
    if (this.currentStackRootScreenId != newScreenId) {
        this.currentStackRootScreenId = newScreenId
        Navigation.setStackRoot("mainStackRoot", {
            component: {
                id: this.currentStackRootScreenId,
                name: "navigation.playground." + this.currentStackRootScreenId,
                options: {
                    animations: {
                        setStackRoot: {
                          enable: true
                        }
                    },
                    topBar: {
                        title: {
                            text: newScreenTitle,
                        },
                        leftButtons: [{
                            id: "menuButton",
                            icon: this.homeIcon
                        }, ],
                    },
                },
            },
        }) 
    }
    Navigation.mergeOptions("MenuScreen", {
        sideMenu: {
            left: {
                visible: false,
            },
        }
    });   

  }.bind(this)
}

const app = new templateApp()
app.startApp()


export default templateApp
