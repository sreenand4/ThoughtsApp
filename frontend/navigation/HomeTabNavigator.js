import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import homeIcon from "../assets/homeIcon.png";

const Tab = createBottomTabNavigator()

const HomeTabNavigator = () => {
    const route = useRoute();
    const { userId, username } = route.params;

    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: "#211F1F" } }}>
            <Tab.Screen name={"Home"} component={Home} initialParams={{ userId, username }} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ size }) => (<Image source={homeIcon} style={{ width: 28, height: 30 }} />)
            }} />
        </Tab.Navigator>
    )
}

export default HomeTabNavigator;