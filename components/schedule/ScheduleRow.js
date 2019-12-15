import React from "react";
import { View, Text, Dimensions } from "react-native";
import _ from "lodash"


const circSize = Dimensions.get('window').width/10;
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

class ScheduleRow extends React.Component {
    render() {
        return (
        <View style={{ flex: 0, height: 2*circSize, margin: circSize/4 }}>
            <Text>Schedule</Text>
            <View style={{ flex: 1, flexGrow: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>
                {_.map(days, this.getCircle)}
            </View>
        </View>);
    }

    getCircle(day, num) {
        return (    
            <View style={{ flex: 1, flexGrow: 1, alignItems: "center"}} key={day}>
                <View style={{ alignItems: "center", justifyContent: "center",width: circSize, height: circSize, borderRadius: circSize/2, backgroundColor: 'green'}}>
                    <Text>{day[0]}</Text>
                </View>
                <Text>{num}</Text>

                
            </View>
        )
    }
}

export default ScheduleRow;