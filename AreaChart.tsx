import React from 'react';
import ReactEcharts from 'echarts-for-react';
import AreaChartBase from './styles/AreaChartBase';
import { getOption } from './common/AreaChartUtilities';


interface AreaChartProps {
  title?: string
  showLoading?: boolean
  dataset: any
  colors?: string[]
  format?: string
  showLabel?: boolean
  seriesProps?: any[]
  tooltipType?: string
  axisLabelRotation?: number
  onClick?: (params: any) => void
  onDblClick?: (params: any) => void
  onMouseMove?: (params: any) => void
  onMouseOver?: (params: any) => void
  onMouseOut?: (params: any) => void
}


const AreaChart: React.FC<AreaChartProps> = ({
  title = '',
  showLoading = true,
  dataset,
  format = '',
  colors = [],
  showLabel = false,
  seriesProps = [],
  tooltipType = 'axis',
  axisLabelRotation = 0,
  ...args
}) => {
  const onEvents = {
    click: args.onClick,
    dblclick: args.onDblClick,
    mousemove: args.onMouseMove,
    mouseover: args.onMouseOver,
    mouseout: args.onMouseOut,
  }

  const optionJson = getOption(
    title,
    dataset,
    colors,
    format,
    showLabel,
    seriesProps,
    tooltipType,
    axisLabelRotation,
  )

  if (
    dataset === undefined ||
    dataset.source === undefined ||
    dataset.dimensions === undefined ||
    dataset.dimensions.length === 0 ||
    dataset.source.length === 0
  ) {

    if (showLoading) {
      const optionJS = {
        title: {
          text: title,
        },
      }
      return (
        <AreaChartBase>
          <ReactEcharts
            option={optionJS}
            style={{
              height: '100%',
              width: '100%',
            }}
            showLoading={showLoading}
          />
        </AreaChartBase>
      )
    }

    return (
      <AreaChartBase>
        <div role="are-line__Chart">
          There is not enough information to display the chart. Please check your input.
        </div>
      </AreaChartBase>
    )

  }
  return (
    <AreaChartBase>
      <ReactEcharts
        option={optionJson}
        onEvents={onEvents}
        style={{
          height: '100%',
          width: '100%',
        }}
        showLoading={showLoading}
      />
    </AreaChartBase>
  )
}
export { AreaChart }

export type { AreaChartProps }

export default AreaChart
