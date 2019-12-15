import React from "react";
import { View, Text, Dimensions } from "react-native";
import _ from "lodash"

const circSize = Dimensions.get('window').width/10;
const daysInWeek = 7
const millisInDay = 86400000
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const weeks = ["Last week", "This week", "Next week"]

class ScheduleRow extends React.Component {
    render() {
        return (
        <View style={{ flex: 0, height: 2*circSize, margin: circSize/4, justifyContent: "space-between" }}>
            <Text style={{fontWeight: "bold"}}>{this.getWeek()}</Text>
            <View style={{ flex: 1, flexGrow: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>
                {_.map(days, this.getCircle.bind(this))}
            </View>
        </View>);
    }

    getWeek() {
        return weeks[this.props.week+1]
    }

    getCircle(day, num) {
        return (    
            <View style={{ flex: 1, flexGrow: 1, alignItems: "center"}} key={day}>
                <View style={{ alignItems: "center", justifyContent: "center",width: circSize, height: circSize, borderRadius: circSize/2, backgroundColor: 'green'}}>
                    <Text>{day[0]}</Text>
                </View>
                <Text>{this.getDay(num)}</Text>
            </View>
        )
    }

    getDay(num) {
        const now = new Date(Date.now() + millisInDay*(num+daysInWeek*this.props.week))
        const date = now.getDate();
        if (num == 0 || date == 1) {
            return months[now.getMonth()] + " " + date;
        }
        return date;
    }
}

ScheduleRow.defaultProps = {
    week: 0
};

export default ScheduleRow;