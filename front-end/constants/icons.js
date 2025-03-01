import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const icons = {
    home: (props) => <Entypo name="home" size={26} color="black" {...props} />,
    dashboard: (props) => <MaterialCommunityIcons name="view-dashboard" size={24} color="black" {...props}/>,
    profile: (props) => <AntDesign name="user" size={26} color="black" {...props} />,
    favorite: (props) => <AntDesign name="heart" size={26} color="black" {...props} />,
    notification: (props) => <Ionicons name="notifications" size={26} color="black" {...props}/>,
    order: (props) => <Ionicons name="receipt" size={26} color="black" {...props}/>
}