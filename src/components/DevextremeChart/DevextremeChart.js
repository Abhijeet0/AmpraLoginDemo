import React from 'react';
import PropTypes from 'prop-types';
import styles from './DevextremeChart.module.css';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import Chart, {
  ArgumentAxis,
  CommonSeriesSettings,
  Legend,
  Series,
  Tooltip,
  ValueAxis,
  ConstantLine,
  Label
} from 'devextreme-react/chart';

import { complaintsData } from './../../data';

const data = complaintsData.sort(function(a, b) {
  return b.count - a.count;
});

const totalCount = data.reduce(function(prevValue, item) {
  return prevValue + item.count;
}, 0);

let cumulativeCount = 0;

const dataArray = data.map(function(item) {
  cumulativeCount += item.count;
  return {
    complaint: item.complaint,
    count: item.count,
    cumulativePercentage: Math.round(cumulativeCount * 100 / totalCount)
  };
});
const DevextremeChart = props => {
  return (
    <Chart
        title="Pizza Shop Complaints"
        dataSource={dataArray}
        palette="Harmony Light"
        id="chart"
      >
        <CommonSeriesSettings argumentField="complaint" />
        <Series
          name="Complaint frequency"
          valueField="count"
          axis="frequency"
          type="bar"
          color="#fac29a"
        />
        <Series
          name="Cumulative percentage"
          valueField="cumulativePercentage"
          axis="percentage"
          type="spline"
          color="#6b71c3"
        />

        <ArgumentAxis>
          <Label overlappingBehavior="stagger" />
        </ArgumentAxis>

        <ValueAxis
          name="frequency"
          position="left"
          tickInterval={300}
        />
        <ValueAxis
          name="percentage"
          position="right"
          tickInterval={20}
          showZero={true}
          valueMarginsEnabled={false}
        >
          <Label customizeText={customizePercentageText} />
          <ConstantLine
            value={80}
            width={2}
            color="#fc3535"
            dashStyle="dash"
          >
            <Label visible={false} />
          </ConstantLine>
        </ValueAxis>

        <Tooltip
          enabled={true}
          shared={true}
          customizeTooltip={customizeTooltip}
        />

        <Legend
          verticalAlignment="top"
          horizontalAlignment="center"
        />
      </Chart>
    );
  }


function customizeTooltip(pointInfo) {
  return {
    html: `<div><div class="tooltip-header">${
      pointInfo.argumentText
    }</div><div class="tooltip-body"><div class="series-name">${
      pointInfo.points[0].seriesName
    }: </div><div class="value-text">${
      pointInfo.points[0].valueText
    }</div><div class="series-name">${
      pointInfo.points[1].seriesName
    }: </div><div class="value-text">${
      pointInfo.points[1].valueText
    }% </div></div></div>`
  };
}

function customizePercentageText({ valueText }) {
  return `${valueText}%`;
}

DevextremeChart.defaultProps = {

};

DevextremeChart.propTypes = {

};

export default DevextremeChart;
