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
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

import { useRecoilState } from "recoil";
import { OneDaysState } from "../../recoil/atom";

const now = new Date(Date.now() + 1000 * 60 * 60).getHours();
const labels = [];
for (let i = 0; i < 12; i++) {
  const nextHour = (now + i) % 24;
  if (nextHour === 0) labels.push("내일");
  else {
    labels.push((nextHour < 10 ? "0" : "") + nextHour + "시");
  }
}

export const TmpChart = () => {
  const [oneDayData] = useRecoilState(OneDaysState);
  const tmpValue = oneDayData?.tmp;
  const maxMin = [Math.max(...tmpValue) + 1, Math.min(...tmpValue) - 1];

  const tmpData = {
    labels: labels,
    datasets: [
      {
        data: tmpValue,
        fill: false,
        borderColor: "rgba(239, 210, 161, 0.808)",
        backgroundColor: "rgba(239, 210, 161, 0.808)",
        borderWidth: 2,
      },
    ],
  };
  const tmpOptions = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        padding: {
          right: 2,
        },
        labels: {
          padding: { top: 10 },
          title: {
            font: {
              weight: "bold",
            },
          },
          value: {
            color: "green",
          },
        },
        formatter: function (value) {
          return value + "°";
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        max: tmpValue ? maxMin[0] : 20,
        min: tmpValue ? maxMin[1] : -20,
        ticks: {
          stepSize: 1,
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    height: "10rem",
  };

  return (
    <div className="h-[10rem]">
      <Line data={tmpData} options={tmpOptions} />
    </div>
  );
};

export const PopChart = () => {
  const [oneDayData] = useRecoilState(OneDaysState);
  const popValue = oneDayData?.pop;
  const popData = {
    labels: labels,
    datasets: [
      {
        data: popValue,
        fill: false,
        borderColor: "rgb(142, 205, 239)",
        backgroundColor: "rgb(142, 205, 239)",
        datalabels: {
          align: "end",
          anchor: "center",
        },
      },
    ],
  };

  const popOptions = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        padding: {
          right: 2,
        },
        labels: {
          padding: { top: 10 },
          title: {
            font: {
              weight: "bold",
            },
          },
          value: {
            color: "green",
          },
        },
        formatter: function (value) {
          return value + "%";
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 5,
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    height: "10rem",
  };
  return (
    <div className="h-[10rem]">
      <Line data={popData} options={popOptions} />
    </div>
  );
};

export const RehChart = () => {
  const [oneDayData] = useRecoilState(OneDaysState);
  const rehValue = oneDayData?.reh;
  const rehData = {
    labels: labels,
    datasets: [
      {
        data: rehValue,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
        datalabels: {
          align: "end",
          anchor: "center",
        },
      },
    ],
  };
  const rehOptions = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "black",
        align: "end",
        padding: {
          right: 2,
        },
        labels: {
          padding: { top: 10 },
          title: {
            font: {
              weight: "bold",
            },
          },
          value: {
            color: "green",
          },
        },
        formatter: function (value) {
          return value + "%";
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 5,
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    height: "10rem",
  };

  return (
    <div className="h-[10rem]">
      <Line data={rehData} options={rehOptions} />
    </div>
  );
};
