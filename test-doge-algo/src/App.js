import React, { useState } from "react";
import classnames from "classnames";
import "./App.scss";

const App = () => {
  //==========================
  // State
  //==========================
  const [highlightedRow, setHighlightedRow] = useState("");
  const [totalFunds, setTotalFunds] = useState(100);

  //==========================
  // Variables
  //==========================
  const portfolios = {
    holdToTheMoon: 25,
    "10%": 20,
    "8%": 5,
    "7%": 5,
    "6%": 5,
    "5%": 5,
    "4%": 5,
    "3%": 5,
    "2%": 5,
    "1%": 5,
    "0.75%": 5,
    "0.5%": 5,
    "0.25%": 5,
  };

  const displayTable = () => {
    return Object.keys(portfolios).map((name) => {
      let value = portfolios[name];
      return (
        <tr
          className={classnames({
            app__highlighted: highlightedRow === name,
          })}
        >
          <td>
            <input
              type="checkbox"
              checked={highlightedRow === name}
              onClick={() => {
                // TODO: fix this so that each row can be highlighted
                if (highlightedRow === name) {
                  setHighlightedRow("");
                } else {
                  setHighlightedRow(name);
                }
              }}
            />
          </td>
          <td>{name}</td>
          <td>{`${value}%`}</td>
          <td>{`$${totalFunds * (parseInt(value) / 100)}`}</td>
        </tr>
      );
    });
  };
  //==========================
  // Return
  //==========================
  return (
    <div className="app">
      <div className="app__total-funds-wrapper">
        <h1>{`Total Funds: $${totalFunds}`}</h1>
        <input onChange={(e) => setTotalFunds(e.target.value)}></input>
      </div>

      <table className="app__table">
        <tr>
          <th>Highlight </th>
          <th>Amount of change required to trade </th>
          <th>Percent of total funds</th>
          <th>Amount to Manage</th>
        </tr>
        {displayTable()}
      </table>
    </div>
  );
};

export default App;
