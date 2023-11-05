"use client";
import { usePlayerDataContext } from "@/context/PlayerDataContext";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { DateTime } from "luxon";
import BarChart from "@/components/Charts/BarChart";
import Heatmap from "@/components/Charts/HeatMap";

const maxModesToShow = 5;

const ProfileOverview = () => {
  const { data, customGameModesTime, defaultGameModesTime } = usePlayerDataContext(null);
  const [totalTimePlayed, setTotalTimePlayed] = useState();
  const [timePlayedHeatmap, setTimePlayedHeatmap] = useState([]);
  const [heatmapLabels, setHeatmapLabels] = useState([]);
  const [gameModes, setGameModes] = useState();
  const [customGameModes, setCustomGameModes] = useState();
  const [gameModeSpecificTimePlayed, setGameModeSpecificTimePlayed] = useState([]);
  const [customGameModeSpecificTimePlayed, setCustomGameModeSpecificTimePlayed] = useState([]);

  const [mostPlayedGameMode, setMostPlayedGameMode] = useState();
  const [mostPlayedCustomGameMode, setMostPlayedCustomGameMode] = useState();
  const [mostPlayedGameModeHours, setMostPlayedGameModeHours] = useState();
  const [mostPlayedCustomGameModeHours, setMostPlayedCustomGameModeHours] = useState();
  const [statsSubtitle, setStatsSubtitle] = useState("");

  // initialize data for page
  useEffect(() => {
    try {
      async function AsyncInitPageWrapper(data) {
        await initPage(data);
      }
      if (data && customGameModesTime && defaultGameModesTime) {
        AsyncInitPageWrapper(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [data, customGameModesTime, defaultGameModesTime, initPage]);


  // main function to display everything on page called inside UseEffect
  const initPage = useCallback(async (data) => {
    const defaultTimes = defaultGameModesTime.map(item => item.TotalTime);
    const customTimes = customGameModesTime.map(item => item.TotalTime);
    const defaultNames = defaultGameModesTime.map(item => item.baseGameMode);
    const customNames = customGameModesTime.map(item => item.customGameModeName);

    const totalTimeList = defaultTimes.concat(customTimes);
    const sumTotalTime = Math.round((totalTimeList.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/ 60 / 60) * 100) / 100;
    setTotalTimePlayed(sumTotalTime);

    setGameModes(defaultNames.slice(0, maxModesToShow));
    setGameModeSpecificTimePlayed(defaultTimes.slice(0, maxModesToShow));
    setMostPlayedGameMode(defaultNames[0] || "");
    setMostPlayedGameModeHours(Math.round((defaultTimes[0] / 60 / 60) * 100) / 100);

    setCustomGameModes(customNames.slice(0, maxModesToShow));
    setCustomGameModeSpecificTimePlayed(customTimes.slice(0, maxModesToShow));
    setMostPlayedCustomGameMode(customNames[0] || "");
    setMostPlayedCustomGameModeHours(Math.round((customTimes[0] / 60 / 60) * 100) / 100);

    await generateHeatMap(data);

    if (data && data.length > 0) {
      setStatsSubtitle("");
    } else if (data && data.length === 0) {
      setStatsSubtitle("No scores yet. Play the game!");
    }
  }, [customGameModesTime, defaultGameModesTime, generateHeatMap]);

  // sets the data for the HeatMap
  const generateHeatMap = useCallback(async (data) => {
    const calendar = await generateCalendar(data);
    const labels = {
      label: [...calendar.map((value) => value.x)],
      value: [...calendar.map((value) => value)],
    };
    setHeatmapLabels(labels);
    setTimePlayedHeatmap(calendar);
  }, []);

  // returns a calendar based on user activity data
  const generateCalendar = async (data) => {
    const dateArr = [];
    const dataByDate = {};
  
    // Preprocess data to group entries by date
    for (const object of data) {
      const date = DateTime.fromISO(object.time).startOf("day").toISO();
      dataByDate[date] = dataByDate[date] || 0;
      dataByDate[date] += object.songLength;
    }
  
    let dt = DateTime.now().startOf("day").minus({ days: 364 });
    const end = DateTime.now().startOf("day");
  
    while (dt <= end) {
      const dateISO = dt.toISO();
      const v = dataByDate[dateISO] || 0;
  
      dateArr.push({
        x: dateISO,
        y: dt.weekday,
        d: dt,
        v: v,
      });
      dt = dt.plus({ day: 1 });
    }
    return dateArr;
  };

  const gameModeTimePlayedOptions = {
    title: "Most Played Game Modes",
    xAxisTitle: "Game Mode",
    yAxisTitle: "Time Played (hrs)",
    category: "timePlayed",
    bDisplayPercentage: true,
  };

  const customGameModeTimePlayedOptions = {
    title: "Most Played Custom Game Modes",
    xAxisTitle: "Custom Game Mode",
    yAxisTitle: "Time Played (hrs)",
    category: "timePlayed",
    bDisplayPercentage: true,
  };
  
  return (
    <>
      <div className="stats-header">
        <h2 className="stats-title">Overview</h2>
        {statsSubtitle !== "" ? <h5 className="stats-subtitle">{statsSubtitle}</h5> : <></>}
      </div>
      {!data || data.length === 0 ? (
        <></>
      ) : (
        <>
          <div className="responsive-centered-container">
            <div>
              <ul className="best-list">
                <li className="table-header">
                  <h2 className="fs-300 text-light">Time Statistics</h2>
                </li>
                <li className="table-row">
                  <div className="col col-1">Total Time In Game:</div>
                  <div className="col col-2">{totalTimePlayed || "0"}&nbsp;hrs</div>
                </li>
                <li className="table-row">
                  <div className="col col-1">Most Played Mode:</div>
                  <div className="col col-2">{mostPlayedGameMode}</div>
                </li>
                <li className="table-row">
                  <div className="col col-1">Time for Most Played:</div>
                  <div className="col col-2">{mostPlayedGameModeHours || "0"}&nbsp;hrs</div>
                </li>
                <li className="table-row">
                  <div className="col col-1">Most Played Custom Mode:</div>
                  <div className="col col-2">{mostPlayedCustomGameMode}</div>
                </li>
                <li className="table-row">
                  <div className="col col-1">Time Played for Custom:</div>
                  <div className="col col-2">{mostPlayedCustomGameModeHours || "0"}&nbsp;hrs</div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <BarChart labels={gameModes} data={gameModeSpecificTimePlayed} myOptions={gameModeTimePlayedOptions} />
          </div>
          <div>
            <BarChart
              labels={customGameModes}
              data={customGameModeSpecificTimePlayed}
              myOptions={customGameModeTimePlayedOptions}
            />
          </div>
          <div>
            <Heatmap labels={heatmapLabels} data={timePlayedHeatmap} />
          </div>
        </>
      )}
    </>
  );
}

export default ProfileOverview;
