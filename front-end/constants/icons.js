import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export const icons = {
    home: (props) => <Entypo name="home" size={26} color="black" {...props} />,
    profile: (props) => <AntDesign name="user" size={26} color="black" {...props} />,
    favorite: (props) => <AntDesign name="heart" size={26} color="black" {...props} />,
    notification: (props) => <Ionicons name="notifications" size={26} color="black" {...props}/>,
    order: (props) => <Ionicons name="receipt" size={26} color="black" {...props}/>
}