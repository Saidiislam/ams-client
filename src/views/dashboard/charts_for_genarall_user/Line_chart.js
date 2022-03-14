/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import axios from 'axios'
// import data from './data.json'

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

const Line_chart = () => {
  const [averageTime, setAverageTime] = useState({
    avgTimeTuesIn: '',
    avgTimeMonIn: '', 
    avgTimeSunIn: '',
    avgTimeWedIn: '',
    avgTimeThusIn: '',
    avgTimeTuesOut: '',
    avgTimeMonOut: '', 
    avgTimeSunOut: '',
    avgTimeWedOut: '',
    avgTimeThusOut: '',
  })
  
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const newSundayArrayIn = []
  const newMondayArrayIn = []
  const newTuesArrayIn = []
  const newWednesArrayIn = []
  const newThusArrayIn = []

  const newSundayArrayOut = []
  const newMondayArrayOut = []
  const newTuesArrayOut = []
  const newWednesArrayOut = []
  const newThusArrayOut = []

  const checkInOutFun = (data, InOutData) => {
    const check = data.filter((data) => {
      const check = data.check.split(' ')[1]
      return check === InOutData
    })
    return check
  }

  const filterFuntion = (checking, days) => {
    const Everyday = checking.filter((data) => {
      return data.days === days
    })
    return Everyday
  }
  const newArrayCreateFun = (Everyday, newDaysArray) => {
    for (let i = 0; i < Everyday.length; i++) {
      const time = Everyday[i].time
      newDaysArray.push(time)
    }
  }
  const averageTimeFun = (newDaysArray) => {
    var timesInSeconds = [];
    const count = newDaysArray.length
    for (let i = 0; i < count; i++) {
      const time = newDaysArray[i].split(':')
      const hrs = Number(time[0]);
      const mins = Number(time[1]);
        // find value in seconds of time
        var totalSecs = hrs * 60 * 60;
        totalSecs += mins * 60;
        // add to array
        timesInSeconds[i] = totalSecs;
        
      }
    var total = 0;
    // console.log(timesInSeconds);
    for (var j =0; j < count; j++) {
        total = total + Number(timesInSeconds[j]);
    }
    var avg = Math.round(total / count);
    var avgMins = Math.floor(avg/60);
    var avgHrs = Math.floor(avgMins/60);
    avgMins = avgMins - (60 * avgHrs);
    // console.log(avgHrs, avgMins)
    return `${avgHrs}.${avgMins}`
  }
  const loadCheckData = useCallback(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5000/api/attendance/check', config)
    console.log(data)
    const checking = checkInOutFun(data, 'In')
    const checkOut = checkInOutFun(data, 'Out')

    const SundayIn = filterFuntion(checking, 'Sunday')
    const MondayIn = filterFuntion(checking, 'Monday')
    const TuesdayIn = filterFuntion(checking, 'Tuesday')
    const WednesdayIn = filterFuntion(checking, 'Wednesday')
    const ThursdayIn = filterFuntion(checking, 'Thursday')

    const SundayOut = filterFuntion(checkOut, 'Sunday')
    const MondayOut = filterFuntion(checkOut, 'Monday')
    const TuesdayOut = filterFuntion(checkOut, 'Tuesday')
    const WednesdayOut = filterFuntion(checkOut, 'Wednesday')
    const ThursdayOut = filterFuntion(checkOut, 'Thursday')

    newArrayCreateFun(SundayIn, newSundayArrayIn)
    newArrayCreateFun(MondayIn, newMondayArrayIn)
    newArrayCreateFun(TuesdayIn, newTuesArrayIn)
    newArrayCreateFun(WednesdayIn, newWednesArrayIn)
    newArrayCreateFun(ThursdayIn, newThusArrayIn)

    newArrayCreateFun(SundayOut, newSundayArrayOut)
    newArrayCreateFun(MondayOut, newMondayArrayOut)
    newArrayCreateFun(TuesdayOut, newTuesArrayOut)
    newArrayCreateFun(WednesdayOut, newWednesArrayOut)
    newArrayCreateFun(ThursdayOut, newThusArrayOut)
    
    const getAverageSunTimeIn = averageTimeFun(newSundayArrayIn)
    const getAverageMonTimeIn = averageTimeFun(newMondayArrayIn)
    const getAverageTuesTimeIn = averageTimeFun(newTuesArrayIn)
    const getAverageWednesTimeIn = averageTimeFun(newWednesArrayIn)
    const getAverageThusTimeIn = averageTimeFun(newThusArrayIn)

    const getAverageSunTimeOut = averageTimeFun(newSundayArrayOut)
    const getAverageMonTimeOut = averageTimeFun(newMondayArrayOut)
    const getAverageTuesTimeOut = averageTimeFun(newTuesArrayOut)
    const getAverageWednesTimeOut = averageTimeFun(newWednesArrayOut)
    const getAverageThusTimeOut = averageTimeFun(newThusArrayOut)


    setAverageTime({
      avgTimeSunIn: getAverageSunTimeIn,
      avgTimeMonIn: getAverageMonTimeIn,
      avgTimeTuesIn: getAverageTuesTimeIn,
      avgTimeWedIn: getAverageWednesTimeIn,
      avgTimeThusIn: getAverageThusTimeIn,
      avgTimeSunOut: getAverageSunTimeOut,
      avgTimeMonOut: getAverageMonTimeOut,
      avgTimeTuesOut: getAverageTuesTimeOut,
      avgTimeWedOut: getAverageWednesTimeOut,
      avgTimeThusOut: getAverageThusTimeOut,
    })
  }, [userInfoFromLocalStorage.token])
  useEffect(() => {
    loadCheckData()
  }, [loadCheckData])
  const { 
    avgTimeSunIn,
    avgTimeMonIn,
    avgTimeTuesIn,
    avgTimeWedIn,
    avgTimeThusIn,
    avgTimeSunOut,
    avgTimeMonOut,
    avgTimeTuesOut,
    avgTimeWedOut,
    avgTimeThusOut,
    } = averageTime
    const data = [
        {
          "id": "Check In",
          "color": "hsla(166, 100%, 50%)",
          "data": [
            {
              "x": "Sunday",
              "y": avgTimeSunIn
            },
            {
              "x": "Monday",
              "y": avgTimeMonIn
            },
            {
              "x": "Tuesday",
              "y": avgTimeTuesIn
            },
            {
              "x": "Wednesday",
              "y": avgTimeWedIn
            },
            {
              "x": "Thursday",
              "y": avgTimeThusIn
            }
          ]
        },
        {
          "id": "Check Out",
          "color": "hsl(337, 70%, 50%)",
          "data": [
            {
              "x": "Sunday",
              "y": avgTimeSunOut
            },
            {
              "x": "Monday",
              "y": avgTimeMonOut
            },
            {
              "x": "Tuesday",
              "y": avgTimeTuesOut
            },
            {
              "x": "Wednesday",
              "y": avgTimeWedOut
            },
            {
              "x": "Thursday",
              "y": avgTimeThusOut
            }
          ]
        }
    ]
 return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: '8',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Week',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Time',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)
}

export default Line_chart;