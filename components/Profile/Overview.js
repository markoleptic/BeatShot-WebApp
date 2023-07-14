"use client";
import { usePlayerDataContext } from "@/context/PlayerDataContext";
import React, { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";
import BarChart from "@/components/Charts/BarChart";
import Heatmap from "@/components/Charts/HeatMap";

const maxCustomModesToShow = 4;

const checkInvalidNum = (number) => {
  return isNaN(number) || !isFinite(number) || number === "" ? "0" : number;
};

const ProfileOverview = () => {
  const { data } = usePlayerDataContext(null);

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
      if (data) {
        AsyncInitPageWrapper(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [data]);


  // main function to display everything on page called inside UseEffect
  const initPage = async (data) => {
    await getTotalTimePlayed(data).then((number) => setTotalTimePlayed(number));
    const { preset, custom } = await getGameModes(data);

    const sortedPlayTimeMap_Preset = await getSortedPlayTimeMap_Preset(preset);
    setGameModes([...sortedPlayTimeMap_Preset.keys()]);
    setGameModeSpecificTimePlayed([...sortedPlayTimeMap_Preset.values()]);
    setMostPlayedGameMode([...sortedPlayTimeMap_Preset.keys()][0]);
    setMostPlayedGameModeHours(Math.round(([...sortedPlayTimeMap_Preset.values()][0] / 60 / 60) * 100) / 100);

    const sortedPlayTimeMap_Custom = await getSortedPlayTimeMap_Custom(custom);
    setCustomGameModes([...sortedPlayTimeMap_Custom.keys()].slice(0, maxCustomModesToShow));
    setCustomGameModeSpecificTimePlayed([...sortedPlayTimeMap_Custom.values()].slice(0, maxCustomModesToShow));
    setMostPlayedCustomGameMode([...sortedPlayTimeMap_Custom.keys()][0]);
    setMostPlayedCustomGameModeHours(
      Math.round(([...sortedPlayTimeMap_Custom.values()].slice(0, maxCustomModesToShow)[0] / 60 / 60) * 100) / 100
    );

    await generateHeatMap(data);

    if (data && data.length > 0) {
      setStatsSubtitle("");
    } else if (data && data.length === 0) {
      setStatsSubtitle("No scores yet. Play the game!");
    }
  };

  // returns total time played for all game modes
  const getTotalTimePlayed = async (data) => {
    let timePlayed = 0;
    for (let element in data) {
      timePlayed += data[element].songLength;
    }
    return Math.round((timePlayed / 60 / 60) * 100) / 100;
  };

  // returns an object containing all game modes and all custom game modes
  const getGameModes = async (data) => {
    let gameModeArray = [];
    let customGameModeArray = [];
    for (let object in data) {
      if (data[object].customGameModeName === "" && data[object].gameModeType === "Preset") {
        if (!gameModeArray.some((e) => e.label === data[object].baseGameMode)) {
          gameModeArray.push({
            value: data[object].baseGameMode,
            label: data[object].baseGameMode,
          });
        }
      } else {
        if (!customGameModeArray.some((e) => e.label === data[object].customGameModeName)) {
          customGameModeArray.push({
            value: data[object].customGameModeName,
            label: data[object].customGameModeName,
          });
        }
      }
    }
    return { preset: gameModeArray, custom: customGameModeArray };
  };

  // returns a sorted Map containing entries for (preset game mode name, time played)
  const getSortedPlayTimeMap_Preset = async (gameModes) => {
    let playTimeMap = new Map();
    for (let gameMode in gameModes) {
      let gameModePlayTime = 0;
      // find matches for gameMode inside data
      for (let scoreObject in data) {
        if (
          data[scoreObject].gameModeType === "Preset" &&
          data[scoreObject].customGameModeName === "" &&
          data[scoreObject].baseGameMode === gameModes[gameMode].value
        ) {
          gameModePlayTime += data[scoreObject].songLength;
        }
      }
      if (gameModePlayTime !== 0) {
        playTimeMap.set(gameModes[gameMode].value, gameModePlayTime);
      }
    }
    return new Map([...playTimeMap.entries()].sort((a, b) => b[1] - a[1]));
  };

  // returns a sorted Map containing entries for (custom game mode name, time played)
  const getSortedPlayTimeMap_Custom = async (gameModes) => {
    let customPlayTimeMap = new Map();
    for (let gameMode in gameModes) {
      let customGameModePlayTime = 0;
      // find matches for gameMode inside data
      for (let scoreObject in data) {
        if (
          data[scoreObject].gameModeType === "Custom" &&
          data[scoreObject].customGameModeName !== "" &&
          data[scoreObject].customGameModeName === gameModes[gameMode].value
        ) {
          customGameModePlayTime += data[scoreObject].songLength;
        }
      }
      if (customGameModePlayTime !== 0) {
        customPlayTimeMap.set(gameModes[gameMode].value, customGameModePlayTime);
      }
    }
    return new Map([...customPlayTimeMap.entries()].sort((a, b) => b[1] - a[1]));
  };

  // sets the data for the HeatMap
  const generateHeatMap = async (data) => {
    const calendar = await generateCalendar(data);
    const labels = {
      label: [...calendar.map((value) => value.x)],
      value: [...calendar.map((value) => value)],
    };
    setHeatmapLabels(labels);
    setTimePlayedHeatmap(calendar);
  };

  // returns a calendar based on user activity data
  const generateCalendar = async (data) => {
    const dateArr = [];
    let dt = DateTime.now().startOf("day").minus({ days: 364 });
    const end = DateTime.now().startOf("day");
    while (dt <= end) {
      let v = 0;
      for (let object in data) {
        if (dt.equals(DateTime.fromISO(data[object].time).startOf("day"))) {
          v += parseInt(data[object].songLength);
        }
      }
      dateArr.push({
        x: dt.toISO(),
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
                  <div className="col col-2">{checkInvalidNum(totalTimePlayed)}&nbsp;hrs</div>
                </li>
                <li className="table-row">
                  <div className="col col-1">Most Played Mode:</div>
                  <div className="col col-2">{mostPlayedGameMode}</div>
                </li>
                <li className="table-row">
                  <div className="col col-1">Time for Most Played:</div>
                  <div className="col col-2">{checkInvalidNum(mostPlayedGameModeHours)}&nbsp;hrs</div>
                </li>
                <li className="table-row">
                  <div className="col col-1">Most Played Custom Mode:</div>
                  <div className="col col-2">{mostPlayedCustomGameMode}</div>
                </li>
                <li className="table-row">
                  <div className="col col-1">Time Played for Custom:</div>
                  <div className="col col-2">{checkInvalidNum(mostPlayedCustomGameModeHours)}&nbsp;hrs</div>
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
