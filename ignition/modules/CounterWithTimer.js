const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JUN_10ST_2024 = 	1717996830;


module.exports = buildModule("CounterModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", JUN_10ST_2024);


  const counter = m.contract("CounterWithTimer", []);
  m.call(counter, "setTimer", [unlockTime] );

  

  return { counter };
});
