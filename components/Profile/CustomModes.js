"use client";
import React, { useState, useEffect, useRef } from "react";
import LineChart from "@/components/Charts/LineChart";
import SelectBox from "@/components/SelectBox";
import { usePlayerDataContext } from "@/context/PlayerDataContext";
import LocationAccuracyHeatmap from "@/components/Charts/LocationAccuracyMap";
import {
  getGameModes,
  getScores,
  getMatchingSongOptions,
  findMostRecentGameModeOption,
  findMostRecentSongOption,
  checkInvalidNum,
} from "./statFunctions";

const CustomModes = () => {
  // Select box options
  const [gameModeOptions, setGameModeOptions] = useState([]);
  const [songOptions, setSongOptions] = useState([]);

  // Data passed to Line Chart
  const [scores, setScores] = useState();
  const [dates, setDates] = useState();

  // Best/Average Text Box values
  const [bestScore, setBestScore] = useState();
  const [bestAccuracy, setBestAccuracy] = useState();
  const [bestStreak, setBestStreak] = useState();
  const [bestCompletion, setBestCompletion] = useState();
  const [bestTimeOffset, setBestTimeOffset] = useState();
  const [avgScore, setAvgScore] = useState();
  const [avgAccuracy, setAvgAccuracy] = useState();
  const [avgStreak, setAvgStreak] = useState();
  const [avgCompletion, setAvgCompletion] = useState();
  const [avgTimeOffset, setAvgTimeOffset] = useState();

  // Tracks currently selected options from Select boxes
  const [selectedGameMode, setSelectedGameMode] = useState("");
  const [selectedSong, setSelectedSong] = useState("");

  // Hooks
  // const errRef = useRef();
  const { data, errMsg, setErrMsg } = usePlayerDataContext();
  const [statsSubtitle, setStatsSubtitle] = useState("");

  // clear error message when Select box option changed
  useEffect(() => {
    setErrMsg("");
  }, [gameModeOptions, songOptions]);

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
      setErrMsg(err.message);
    }
  }, [data]);

  // auto select most recently played game mode when game mode options refresh
  useEffect(() => {
    findMostRecentGameModeOption(data, gameModeOptions, true).then((option) => setSelectedGameMode(option));
  }, [gameModeOptions]);

  // auto select most recently played song when song options refresh
  useEffect(() => {
    findMostRecentSongOption(data, songOptions, true).then((option) => setSelectedSong(option));
  }, [songOptions]);

  // update songs on game mode change
  useEffect(() => {
    getMatchingSongOptions(data, selectedGameMode, true).then((options) => setSongOptions(options));
  }, [selectedGameMode]);

  // executed when selected gamemode or song changes
  useEffect(() => {
    async function AsyncWrapper(data, selectedGameMode, selectedSong) {
      await updateSelection(data, selectedGameMode, selectedSong);
    }
    AsyncWrapper(data, selectedGameMode, selectedSong);
  }, [selectedGameMode, selectedSong]);

  // initial render
  const initPage = async (data) => {
    // game modes are the only thing that will always be the same
    const modes = await getGameModes(data, true);
    setGameModeOptions(modes);
    const recent = await findMostRecentGameModeOption(data, modes, true);
    setSelectedGameMode(recent);

    if (data && data.length > 0) {
      setStatsSubtitle("Select a game mode to repopulate song options.");
    } else if (data && data.length === 0) {
      setStatsSubtitle("No scores yet. Play the game!");
    }
  };

  // updates the charts and info boxes
  const updateSelection = async (data, selectedGameMode, selectedSong) => {
    const { values, keys } = await getScores(data, true, selectedGameMode, selectedSong);

    setScores(values);
    setDates(keys);

    await updateBests(values);
    await updateAvgs(values);
  };

  const updateBests = async (scores) => {
    setBestScore(checkInvalidNum(Math.round((Math.max(...scores.map((value) => value.highScore)) * 10) / 10)));
    setBestAccuracy(checkInvalidNum(Math.round(Math.max(...scores.map((value) => value.accuracy)) * 1000) / 10) + "%");
    setBestCompletion(
      checkInvalidNum(Math.round(Math.max(...scores.map((value) => value.completion)) * 1000) / 10) + "%"
    );
    setBestTimeOffset(checkInvalidNum(Math.round(Math.min(...scores.map((value) => value.timeOffset)) * 1000)) + " ms");
    setBestStreak(checkInvalidNum(Math.max(...scores.map((value) => value.streak))));
  };

  const updateAvgs = async (scores) => {
    setAvgScore(
      checkInvalidNum(Math.round(scores.map((value) => value.score).reduce((p, c, i, a) => p + c / a.length, 0)))
    );
    setAvgAccuracy(
      checkInvalidNum(
        Math.round(scores.map((value) => value.accuracy).reduce((p, c, i, a) => p + c / a.length, 0) * 1000) / 10
      ) + "%"
    );
    setAvgStreak(
      checkInvalidNum(Math.round(scores.map((value) => value.streak).reduce((p, c, i, a) => p + c / a.length, 0)))
    );
    setAvgCompletion(
      checkInvalidNum(
        Math.round(scores.map((value) => value.completion).reduce((p, c, i, a) => p + c / a.length, 0) * 1000) / 10
      ) + "%"
    );
    setAvgTimeOffset(
      checkInvalidNum(
        Math.round(scores.map((value) => value.timeOffset).reduce((p, c, i, a) => p + c / a.length, 0) * 1000)
      ) + " ms"
    );
  };

  const scoreOptions = {
    title: "Score vs Time",
    xAxisTitle: "Date",
    yAxisTitle: "Score (thousands)",
    category: "score",
    bDisplayPercentage: true,
  };
  const accuracyOptions = {
    title: "Accuracy vs Time",
    xAxisTitle: "Date",
    yAxisTitle: "Hit Rate (%)",
    category: "accuracy",
    bDisplayPercentage: false,
  };
  const streakOptions = {
    title: "Streak vs Time",
    xAxisTitle: "Date",
    yAxisTitle: "Consecutive Targets Hit",
    category: "streak",
    bDisplayPercentage: false,
  };
  const completionOptions = {
    title: "Average Targets Destroyed",
    xAxisTitle: "Date",
    yAxisTitle: "Completion (%)",
    category: "completion",
    bDisplayPercentage: false,
  };
  const avgTimeOffsetOptions = {
    title: "Average Reaction Time",
    xAxisTitle: "Date",
    yAxisTitle: "Time (ms)",
    category: "avgTimeOffset",
    bDisplayPercentage: false,
  };
  const locationAccuracyOptions = {
    title: "Location Accuracy Heatmap",
    xAxisTitle: "",
    yAxisTitle: "",
    type: "locationAccuracy",
  };

  return (
    <>
      <div className="stats-header">
        <h2 className="stats-title">Custom Game Modes</h2>
        {statsSubtitle !== "" ? <h5 className="stats-subtitle">{statsSubtitle}</h5> : <></>}
      </div>
      {/* <div className={errMsg && errMsg !== "" ? "responsive-centered-container" : "offscreen"}>
        <p ref={errRef} className={errMsg && errMsg !== "" ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
      </div> */}
      {!data || data.length === 0 ? (
        <></>
      ) : (
        <>
          <div className="responsive-centered-container">
            <div className="select-container">
              <div className="select-wrapper">
                <p className="select-caption fs-200">GameMode:</p>
                <div className="select-wrapper">
                  <SelectBox
                    id="game-mode-select"
                    onChange={(value) => setSelectedGameMode(value.value)}
                    placeholder={"Filter by game mode"}
                    options={gameModeOptions}
                    value={{ label: selectedGameMode, value: selectedGameMode }}
                  />
                </div>
              </div>
              <div className="select-wrapper">
                <p className="select-caption fs-200">Song:</p>
                <div className="select-wrapper">
                  <SelectBox
                    id="song-select"
                    onChange={(value) => setSelectedSong(value.value)}
                    placeholder={"Filter by song"}
                    options={songOptions}
                    value={{ label: selectedSong, value: selectedSong }}
                  />
                </div>
              </div>
            </div>
            <div className={"best-avg-container"}>
              <div className="best-container">
                <ul className="best-list">
                  <li className="table-header">
                    <h2 className="fs-300 text-light">Best</h2>
                  </li>
                  <li className="table-row">
                    <div className="col col-1">Score:</div>
                    <div className="col col-2">{bestScore}</div>
                  </li>
                  <li className="table-row">
                    <div className="col col-1">Accuracy:</div>
                    <div className="col col-2">{bestAccuracy || ""}</div>
                  </li>
                  <li className="table-row">
                    <div className="col col-1">Streak:</div>
                    <div className="col col-2">{bestStreak || ""}</div>
                  </li>
                  <li className="table-row">
                    <div className="col col-1">Reaction Time:</div>
                    <div className="col col-2">{bestTimeOffset || ""}</div>
                  </li>
                  <li className="table-row">
                    <div className="col col-1">Targets Destroyed:</div>
                    <div className="col col-2">{bestCompletion || ""}</div>
                  </li>
                </ul>
              </div>
              <div className="best-container">
                <ul className="best-list">
                  <li className="table-header">
                    <h2 className="fs-300 text-light">Average</h2>
                  </li>
                  <li className="table-row">
                    <div className="col col-1">Score:</div>
                    <div className="col col-2">{avgScore || ""}</div>
                  </li>
                  <li className="table-row">
                    <div className="col col-1">Accuracy:</div>
                    <div className="col col-2">{avgAccuracy || ""}</div>
                  </li>
                  <li className="table-row">
                    <div className="col col-1">Streak:</div>
                    <div className="col col-2">{avgStreak || ""}</div>
                  </li>
                  <li className="table-row">
                    <div className="col col-1">Reaction Time:</div>
                    <div className="col col-2">{avgTimeOffset || ""}</div>
                  </li>
                  <li className="table-row">
                    <div className="col col-1">Targets Destroyed:</div>
                    <div className="col col-2">{avgCompletion || ""}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={"content-main"}>
            <div>
              <LineChart
                labels={dates}
                data={scores ? scores.map((value) => value.score) : ""}
                myOptions={scoreOptions}
              />
            </div>
            <div>
              <LineChart
                labels={dates}
                data={scores ? scores.map((value) => value.accuracy) : ""}
                myOptions={accuracyOptions}
              />
            </div>
            <div>
              <LineChart
                labels={dates}
                data={scores ? scores.map((value) => value.completion) : ""}
                myOptions={completionOptions}
              />
            </div>
            <div>
              <LineChart
                labels={dates}
                data={scores ? scores.map((value) => value.streak) : ""}
                myOptions={streakOptions}
              />
            </div>
            <div>
              <LineChart
                labels={dates}
                data={scores ? scores.map((value) => value.timeOffset) : ""}
                myOptions={avgTimeOffsetOptions}
              />
            </div>
            <div>
              <LocationAccuracyHeatmap
                labels={null}
                data={scores ? scores.map((value) => value.locationAccuracy) : ""}
                myOptions={locationAccuracyOptions}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CustomModes;