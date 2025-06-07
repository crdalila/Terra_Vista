import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ project }) => {
  if (!project || !project.tasks || project.tasks.length === 0) {
    return <p>There are no tasks.</p>;
  }

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(task => task.done).length;
  const percentage = Math.round((completedTasks / totalTasks) * 100);
  const pendingTasks = totalTasks - completedTasks;

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.restore();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = ${ fontSize }em sans - serif;
      ctx.textBaseline = 'middle';
      const text = `${percentage}%`;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };

  const data = {
    labels: ['Done', 'Pending'],
    datasets: [
      {
        label: 'Tasks',
        data: [completedTasks, pendingTasks],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: { display: 'false' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />;
};

export default DoughnutChart;
