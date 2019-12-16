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
/*
    componentDidMount() {
        var apigClient = apigClientFactory.newClient({
            apiKey: "hp3cPqP6Ml9jTtt579YcH7qzQkDtBUUJ4QdQlq7A"
          });
          var params = {
            phone: phone,
            password: password
          };
          apigClient
            .signinGet(params)
            .then(function(result) {
              // This is executed if get a 200 response
              if (result.data) {
                // Check to make sure that log in was successful
                reset();
                setLoggedIn(true);
              } else {
                reset();
                setError("Invalid login");
              }
            })
            .catch(function(result) {
              setError("Invalid response");
              console.log(result);
            });
          }
*/
    getWeek() {
        return weeks[this.props.week+1]
    }

    getCircle(day, num) {
        const time = this.getTime(num);
        return (
            <View style={{ flex: 1, flexGrow: 1, alignItems: "center"}} key={day}>
                <View style={{ alignItems: "center", justifyContent: "center",width: circSize, height: circSize, borderRadius: circSize/2, backgroundColor: 'gray'}}>
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
}

ScheduleRow.defaultProps = {
    week: 0
};

export default ScheduleRow;