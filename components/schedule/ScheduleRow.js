import React from "react";
import { View, Text, Dimensions } from "react-native";
import _ from "lodash"
import apigClientFactory from "../../apig/apigClient"

const circSize = Dimensions.get('window').width/10;
const daysInWeek = 7
const millisInDay = 86400000
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const weeks = ["Last week", "This week", "Next week"]

class ScheduleRow extends React.Component {
    state = {
        schedule: []
    }

    render() {
        return (
        <View style={{ flex: 0, height: 2*circSize, margin: circSize/4, justifyContent: "space-between" }}>
            <Text style={{fontWeight: "bold"}}>{this.getWeek()}</Text>
            <View style={{ flex: 1, flexGrow: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>
                {_.map(days, this.getCircle.bind(this))}
            </View>
        </View>);
    }

    componentDidMount() {
        var apigClient = apigClientFactory.newClient({
            apiKey: "hp3cPqP6Ml9jTtt579YcH7qzQkDtBUUJ4QdQlq7A"
          });
        var params = {
            uid: this.props.uid
        };
        apigClient
        .getscheduleGet(params)
        .then(function(result) {
            console.log(result.data);
            this.setState({
                schedule: result.data
            });
        }.bind(this))
        .catch(function(result) {
            console.log(result);
        });
        }

    getWeek() {
        return weeks[this.props.week+1]
    }

    getCircle(day, num) {
        const time = this.getTime(num);
        return (
            <View style={{ flex: 1, flexGrow: 1, alignItems: "center"}} key={day}>
                <View style={{ alignItems: "center", justifyContent: "center",width: circSize, height: circSize, borderRadius: circSize/2, backgroundColor: this.getColor(time)}}>
                    <Text>{day[0]}</Text>
                </View>
                <Text>{this.getText(time, num)}</Text>
            </View>
        )
    }

    getTime(num) {
        const now = Date.now()
        const offset = new Date(now).getDay()
        return new Date(now + millisInDay*(num-offset+daysInWeek*this.props.week))
    }

    getText(time, num) {
        const date = time.getDate()
        if (num == 0 || date == 1) {
            return months[time.getMonth()] + " " + date;
        }
        return date;
    }

    getColor(time) {
        if (this.state.schedule.length == 0) {
            return 'grey'
        }
        var month = time.getMonth() + 1
        month = month < 10 ? "" + 0 + month : "" + month
        var date = time.getDate()
        date = date < 10 ? "" + 0 + date : "" + date
        var year = time.getYear()
        year += 1900
        const stamp = month + "/" + date + "/" + year
        for (var i = 0; i < this.state.schedule.length; i++) {
            const sched = this.state.schedule[i]['date']
            if (sched == stamp) {
                if (this.state.schedule[i]['fullfilled']) {
                    return 'green'
                } else if (Date.now() > new Date(sched).getTime()) {
                    return 'red'
                } else {
                    return 'blue'
                }
            }
        }
        return 'gray'
    }
}

ScheduleRow.defaultProps = {
    week: 0
};

export default ScheduleRow;