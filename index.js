import Main from "./capture-module/main.js";

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const getDataButton = document.getElementById("getData");

const mainInstance = new Main();
startButton.onclick = () => mainInstance.start();
stopButton.onclick = () => mainInstance.stop();

getDataButton.onclick = async () => {
  const data = await mainInstance.getAllData();
  console.log(data);
};
