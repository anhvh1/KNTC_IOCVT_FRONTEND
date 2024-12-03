import {useState, useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';

function BarChart(props) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [dataChart, setDataChart] = useState([]);
  const chartRef = useRef(null);
  const {data, options, optionsY} = props;

  useEffect(() => {
    if (JSON.stringify(dataChart) !== JSON.stringify(data)) {
      setDataChart(data);
    }
  }, [data]);

  useEffect(() => {
    let myChart = null;
    const chartCtx = chartRef.current.getContext('2d');

    if (windowSize < 991) {
      // Tạo biểu đồ với indexAxis là 'y' nếu kích thước màn hình nhỏ hơn 991px
      myChart = new Chart(chartCtx, {
        type: 'bar',
        data: data,
        options: {
          indexAxis: 'y',
          responsive: true,
          scales: {
            x: {
              ticks: {
                color: 'rgba(0, 0, 0, 0)',
              },
              grid: {
                display: false,
              },
            },
            y: {
              ticks: {
                color: '#666',
              },
              grid: {
                color: '#ccc',
              },
            },
          },
          ...optionsY,
        },
      });
    } else {
      // Tạo biểu đồ với indexAxis là 'x' nếu kích thước màn hình lớn hơn hoặc bằng 991px
      myChart = new Chart(chartCtx, {
        type: 'bar',
        data: data,
        plugins: {
          // title: {
          //   display: true,
          //   position: 'top',
          //   align: 'start',
          //   font: {
          //     size: 16,
          //     style: 'normal',
          //     weight: 'bold',
          //   },
          //   padding: {
          //     top: 10,
          //     left: 10,
          //     right: 10,
          //     bottom: 10,
          //   },
          // },
          afterDraw: function (chart) {
            var chartTitle = chart.options.plugins.title;
            if (chartTitle.display) {
              var ctx = chart.ctx;
              var xOffset =
                chartTitle.position === 'top'
                  ? chartTitle.padding.left
                  : chart.width - chartTitle.padding.right;
              var yOffset = chartTitle.padding.top;
              var x = xOffset;
              var y = yOffset;
              var lineHeight = chartTitle.font.size;
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(-Math.PI / 2);
              ctx.textAlign = chartTitle.align;
              ctx.textBaseline = 'top';
              ctx.font =
                chartTitle.font.weight +
                ' ' +
                chartTitle.font.size +
                'px ' +
                chartTitle.font.family;
              ctx.fillText(chartTitle.text, 0, 0);
              ctx.restore();
            }
          },
        },
        // plugins : {
        //   legend : {
        //     display :
        //   }
        // },
        options: {
          indexAxis: 'x',
          responsive: true,

          scales: {
            x: {
              // padding: {
              //   // Thêm khoảng cách trên cùng cho trục x
              //   bottom: 50,
              // },
            },
          },
          ...options,
        },
      });
    }

    return () => {
      if (myChart) {
        // Hủy bỏ biểu đồ trên canvas element trước khi component unmount
        myChart.destroy();
      }
    };
  }, [windowSize, dataChart]);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="400" />
    </div>
  );
}

export default BarChart;
