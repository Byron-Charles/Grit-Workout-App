import React, { useState } from "react";
import data from "./data";

function App() {
  const [add, setAdd] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [lifts, setLifts] = useState([]);
  const [workout, setWorkout] = useState([]);
  function toggleAdd() {
    setAdd((prevState) => !prevState);
  }

  function handleAddLift(lift) {
    setLifts((lifts) => [...lifts, lift]);
    setShowInputs(true);
  }

  return (
    <div className="app">
      <Header />;{add && <LiftList onAddLift={handleAddLift} />}
      <Button onClick={toggleAdd}>{add ? "Close" : "Add Workout"}</Button>
      {showInputs && (
        <Workout
          add={add}
          setAdd={setAdd}
          lifts={lifts}
          setLifts={setLifts}
          workout={workout}
          setWorkout={setWorkout}
          showInputs={showInputs}
          setShowInputs={setShowInputs}
        />
      )}
      <Completed workout={workout} />
    </div>
  );
}

function Header() {
  return (
    <div className="grit-header">
      <h1>GRIT</h1>
    </div>
  );
}

function LiftList({ onAddLift }) {
  return (
    <div className="lift-list">
      {data.map((lift) => (
        <div onClick={() => onAddLift(lift.name)} className="lift-card">
          <span>{lift.name}</span>
          <img
            className="lift-icon"
            src={require(`${lift.img}`)}
            alt={lift.name}
          />
        </div>
      ))}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <div className="btn-div">
      <button onClick={onClick} className="btn">
        {children}
      </button>
    </div>
  );
}

function Workout({
  setLifts,
  lifts,
  workout,
  setWorkout,
  add,
  setAdd,
  showInputs,
  setShowInputs,
}) {
  function finishWorkout() {
    setAdd(false);
    setShowInputs(false);
  }

  return (
    <div>
      {lifts.length > 0 &&
        lifts.map((lift) => (
          <Lift name={lift} workout={workout} setWorkout={setWorkout} />
        ))}
      ;<Button onClick={finishWorkout}>Finish</Button>
    </div>
  );
}

function Lift({ name, workout, setWorkout }) {
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  function handleOK() {
    const liftStats = {
      name: name,
      sets: sets,
      reps: reps,
      weight: weight,
    };
    setWorkout((workout) => [...workout, liftStats]);
  }

  return (
    <div className="workout-div">
      <p>{name}</p>
      <div className="inputs">
        <label htmlFor="sets">Sets</label>
        <input
          className="workout-input"
          type="text"
          id="sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <label htmlFor="reps">Reps</label>
        <input
          className="workout-input"
          type="text"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <label htmlFor="weight">Weight</label>
        <input
          className="workout-input"
          type="text"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <Button onClick={handleOK}>OK</Button>
    </div>
  );
}

function Completed({ workout }) {
  return (
    <div>
      {workout.map((workout) => (
        <div className="completed-workout-div">
          <p>Lift: {workout.name}</p>
          <p>Sets: {workout.sets}</p>
          <p>Reps: {workout.reps}</p>
          <p>Weight: {workout.weight}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

//loop over each completed workout at end
