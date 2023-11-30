import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { useRecoilState } from "recoil";
import { OneDaysState } from "../../recoil/atom";

const TmpChart = () => {
  const [oneDayData, setOneDayData] = useRecoilState(OneDaysState);

  const now = new Date(Date.now() + 1000 * 60 * 60).getHours();
  const labels = [];
  for (let i = 0; i < 12; i++) {
    const nextHour = (now + i) % 24;
    if (nextHour === 0) labels.push("내일");
    labels.push((nextHour < 10 ? "0" : "") + nextHour + "시");
  }
  const tmpData = oneDayData.tmp;
  const data = {
    labels: labels,
    datasets: [
      {
        data: tmpData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top,",
      },
      title: {
        display: true,
        text: "기온",
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};
export default TmpChart;
