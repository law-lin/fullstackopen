import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
  return <button onClick={() => handleClick()}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ stats }) => {
  const all = stats[0] + stats[1] + stats[2];
  const average = (stats[0] + -1 * stats[2]) / all;
  const positivePercentage = (stats[0] / all) * 100;
  return (
    <table>
      <tbody>
        <Statistic text='good' value={stats[0]} />
        <Statistic text='neutral' value={stats[1]} />
        <Statistic text='bad' value={stats[2]} />
        <Statistic text='all' value={all} />
        <Statistic text='average' value={average} />
        <Statistic text='positive' value={positivePercentage + ' %'} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stats = [good, neutral, bad];

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      {good === 0 && neutral === 0 && bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics stats={stats} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
