import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabNavigator from "./HomeTabNavigator";
import Signin from "../screens/Signin";
import ThoughtForum from "../screens/ThoughtForum";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Signin">
                <Stack.Screen name={"Signin"} component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name={"Main"} component={HomeTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name={"ThoughtForum"} component={ThoughtForum} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router;
