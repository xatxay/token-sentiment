import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { PieChartData, PieChartState } from "../utils/interface";
import { white } from "../color/color";

class PieChart extends Component<PieChartData, PieChartState> {
  constructor(props: PieChartData) {
    super(props);

    this.state = {
      series: props.series,
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: props.labels,
        stroke: {
          width: 0,
        },
        legend: {
          labels: {
            colors: white,
          },
        },
        theme: {
          palette: "palette3",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  componentDidUpdate(
    prevProps: Readonly<PieChartData>,
    prevState: Readonly<PieChartState>,
    snapshot?: any
  ): void {
    if (this.props !== prevProps) {
      this.setState({
        series: this.props.series,
        chartOptions: {
          labels: this.props.labels,
        },
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.series}
          type="pie"
          width={400}
        />
      </div>
    );
  }
}

export default PieChart;
