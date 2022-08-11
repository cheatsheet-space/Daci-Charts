import numeral from 'numeral'


export const isSeriesSmooth = (seriesName, seriesProps) => {
  let val = false
  if (seriesProps !== undefined && seriesProps.length > 0) {
    for (let i = 0; i < seriesProps.length; i += 1) {
      if (seriesProps[i].name === seriesName) {
        val = seriesProps[i].smooth
        break
      }
    }
  }
  return val
}


export const getSeriesInfo = (seriesName, seriesProps) => {
  let smoothVal = false
  let markPointVal = {}
  let markLineVal = {}
  if (seriesProps !== undefined && seriesProps.length > 0) {
    for (let i = 0; i < seriesProps.length; i += 1) {
      if (seriesProps[i].name === seriesName) {
        smoothVal = seriesProps[i].smooth
        markPointVal = seriesProps[i].markPoint
        markLineVal = seriesProps[i].markLine
        break
      }
    }
  }
  const seriesProp = {
    smooth: smoothVal,
    markPoint: markPointVal,
    markLine: markLineVal
  }
  return seriesProp
}


export const getFormatParams = (params, format) => {
  let { value } = params
  if (format !== undefined && format.length > 0) {
    value = numeral(value).format(format)
  }
  return value
}


export const getFormatValue = (value, format) => {
  let value1 = value
  if (format !== undefined && format.length > 0) {
    value1 = numeral(value1).format(format)
  }
  return value1
}


export const tooltipParams = (params, format) => {
  let output = `${params[0].name}<br/>`
  for (let i = 0; i < params.length; i += 1) {
    let { value } = params[i]
    const { seriesName } = params[i]
    if (format !== undefined && format.length > 0) {
      value = numeral(value).format(format)
    }
    output += `${params[i].marker} ${seriesName}: ${value}<br/>`
  }

  return output
}



export const tooltipFormat = (params, tooltipType) => {
  let format = ''
  if (tooltipType === 'item') {
    let output = `${params.name}<br/>`
    let { value } = params
    let { seriesName } = params
    if (params.componentType === "markPoint" || params.componentType === "markLine") {
      seriesName = dataset.dimensions[params.seriesIndex + 1]
    }

    if (format !== undefined && format.length > 0) {
      value = numeral(value).format(format)
    }
    output += `${params.marker} ${seriesName}: ${value}<br/>`
    return output
  }

}


export const getOption = (title, dataset, colors, showLabel, seriesProps, tooltipType, axisLabelRotation) => {
  // if we don't have the dataset populated, return with an empty json.
  if (
    dataset === undefined ||
    dataset.source === undefined ||
    dataset.dimensions === undefined ||
    dataset.dimensions.length === 0 ||
    dataset.source.length === 0
  ) {
    return {}
  }

  const defColors = ['#33b5e6', '#3367ce', '#acd4ef', '#4d6496', '#0041c2', '#4d7ad4', '#98caec']
  const colorsArray = colors.concat(defColors)

  const legend = []
  for (let i = 1; i < dataset.dimensions.length; i += 1) {
    legend.push(dataset.dimensions[i])
  }

  const xAxis = []
  for (let i = 0; i < dataset.source.length; i += 1) {
    xAxis.push(dataset.source[i][0])
  }

  const seriesObj = []
  let colorIndex = 0
  for (let i = 1; i < dataset.source[0].length; i += 1) {
    const data = []
    for (let j = 0; j < dataset.source.length; j += 1) {
      data.push(dataset.source[j][i])
    }

    const seriesInfo = getSeriesInfo(dataset.dimensions[i], seriesProps)

    const object = {
      name: dataset.dimensions[i],
      type: 'line',
      smooth: seriesInfo.smooth,
      stack: 'stack',
      lineStyle: {
        width: 0,
      },
      showSymbol: true,
      label: {
        show: showLabel,
        position: 'top',
        textStyle: {
          fontWeight: 'bold',
        },
        formatter: getFormatParams,
      },
      areaStyle: {
        opacity: 0.8,
        color: colorsArray[colorIndex],
      },
      emphasis: {
        focus: 'series',
      },
      data,
      markPoint: seriesInfo.markPoint,
      markLine: seriesInfo.markLine
    }

    colorIndex += 1
    if (colorIndex >= colorsArray.length) {
      colorIndex = 0
    }

    if (object.markPoint !== undefined) {
      object.markPoint.label = {
        formatter: getFormatValue,
      }
    }

    if (object.markLine !== undefined) {
      object.markLine.label = {
        formatter: getFormatValue,
      }
    }
    seriesObj.push(object)
  }

  const optionJson = {
    color: colors,
    title: {
      text: title,
    },
    tooltip: {
      trigger: tooltipType,
      formatter: tooltipFormat, tooltipParams
    },
    legend: {
      data: legend,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xAxis,
        axisLabel: { rotate: axisLabelRotation, },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: getFormatValue,
        },
      },
    ],
    series: seriesObj,
  }
  return optionJson
}
