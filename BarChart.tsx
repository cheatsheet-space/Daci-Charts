import ReactEcharts from 'echarts-for-react'
import React from 'react'
import BarChartBase from './styles/BarChartBase'
import { getOption } from './common/BarChartUtilities'

interface BarChartProps {
  title?: string
  stacked?: boolean
  orientation?: string
  dataset: any
  format?: string
  showLabel?: boolean
  showLoading?: boolean
  colors?: string[]
  seriesProps?: any[]
  tooltipType?: string
  axisLabelRotation?: number
  onClick?: (params: any) => void
  onDblClick?: (params: any) => void
  onMouseMove?: (params: any) => void
  onMouseOver?: (params: any) => void
  onMouseOut?: (params: any) => void
}


const BarChart: React.FC<BarChartProps> = ({
  title = '',
  stacked = false,
  orientation = 'vertical',
  dataset,
  format = '',
  showLabel = false,
  showLoading = true,
  colors = [],
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
    stacked,
    orientation,
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
        <BarChartBase>
          <ReactEcharts
            option={optionJS}
            style={{
              height: '100%',
              width: '100%',
            }}
            showLoading={showLoading}
          />
        </BarChartBase>
      )
    }

    return (
      <BarChartBase>
        <div>
          There is not enough information to display the chart. Please check your input.
        </div>
      </BarChartBase>
    )
  }
  return (
    <BarChartBase>
      <ReactEcharts
        option={optionJson}
        onEvents={onEvents}
        style={{
          height: '100%',
          width: '100%',
        }}
        showLoading={showLoading}
      />
    </BarChartBase>
  )
}

export { BarChart }

export type { BarChartProps }

export default BarChart
