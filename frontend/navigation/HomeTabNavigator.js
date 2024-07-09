import React, { useState, useEffect } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Activity from "../screens/Activity";
import NewThought from "../components/NewThought";
import Account from "../screens/Account";
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import homeIcon from "../assets/homeIcon.png";
import activityIcon from "../assets/activityIcon.png";
import pencilIcon from "../assets/pencil-create.png";
import accountIcon from "../assets/accountIcon.png"
import homeFocused from "../assets/home-focused.png"
import pencilFocused from "../assets/pencil-create-focused.png"
import activityFocused from "../assets/heart-focused.png";
import accountFocused from "../assets/person-focused.png"

const Tab = createBottomTabNavigator()

const HomeTabNavigator = () => {
    const route = useRoute();
    const { userId, username } = route.params;

    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: "#211F1F", paddingVertical: 15 } }}>
            <Tab.Screen name={"Home"} component={Home} initialParams={{ userId, username }} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? homeFocused : homeIcon} style={{ width: 28, height: 26 }} />)
            }} />
            <Tab.Screen name={"Activity"} component={Activity} initialParams={{ userId, username }} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? activityFocused : activityIcon} style={{ width: 32, height: 40 }} />)
            }} />
            <Tab.Screen name={"NewThought"} component={NewThought} initialParams={{ userId, username }} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? pencilFocused : pencilIcon} style={[focused ? { width: 27, height: 34 } : { width: 27, height: 34 }]} />)
            }} />
            <Tab.Screen name={"Account"} component={Account} initialParams={{ userId, username }} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? accountFocused : accountIcon} style={{ width: 27, height: 30 }} />)
            }} />
        </Tab.Navigator>
    )
}

export default HomeTabNavigator;