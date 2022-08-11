import numeral from 'numeral'

export const getSeriesInfo = (seriesName, seriesProps) => {
  let markPointVal = {}
  let markLineVal = {}
  if (seriesProps !== undefined && seriesProps.length > 0) {
    for (let i = 0; i < seriesProps.length; i += 1) {
      if (seriesProps[i].name === seriesName) {
        markPointVal = seriesProps[i].markPoint
        markLineVal = seriesProps[i].markLine
        break
      }
    }
  }
  const seriesProp = {
    markPoint: markPointVal,
    markLine: markLineVal,
  }
  return seriesProp
}

export const markLineFormat = (value, format) => {
  let value1 = value.value
  if (format !== undefined && format.length > 0) {
    value1 = numeral(value1).format(format)
  }
  return value1
}

export const markPointFormat = (value, format) => {
  let value1 = value.value
  if (format !== undefined && format.length > 0) {
    value1 = numeral(value1).format(format)
  }
  return value1
}

export const showLabelFormat = (params, format) => {
  let { value } = params
  if (format !== undefined && format.length > 0) {
    value = numeral(value).format(format)
  }
  return value
}


export const axisLabelFormat = (value, format) => {
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
  let format = ""
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

export const getOption = (
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
) => {
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

  const axis = []
  for (let i = 0; i < dataset.source.length; i += 1) {
    axis.push(dataset.source[i][0])
  }

  const seriesObj = []
  let colorIndex = 0
  let stackName = 'stack'
  for (let i = 1; i < dataset.source[0].length; i += 1) {
    const data = []
    for (let j = 0; j < dataset.source.length; j += 1) {
      data.push(dataset.source[j][i])
    }
    if (!stacked) {
      stackName = `${stackName}_${i}`
    }

    const seriesInfo = getSeriesInfo(dataset.dimensions[i], seriesProps)

    const object = {
      name: dataset.dimensions[i],
      type: 'bar',
      stack: stackName,
      label: {
        show: showLabel,
        formatter: showLabelFormat,
      },
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: colorsArray[colorIndex],
      },

      data,
      markPoint: seriesInfo.markPoint,
      markLine: seriesInfo.markLine,
    }
    colorIndex += 1
    if (colorIndex >= colorsArray.length) {
      colorIndex = 0
    }
    if (object.markPoint !== undefined) {
      object.markPoint.label = {
        formatter: markPointFormat
      }
    }
    if (object.markLine !== undefined) {
      object.markLine.label = {
        formatter: markLineFormat
      }
    }
    seriesObj.push(object)
  }

  const optionJson = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: tooltipType,
      axisPointer: {
        type: 'shadow',
      },
      formatter: tooltipParams
    },
    legend: {
      data: legend,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    series: seriesObj,
    xAxis: undefined,
    yAxis: undefined,
  }
  if (orientation === 'horizontal') {
    optionJson.xAxis = {
      type: 'value',
      axisLabel: {
        formatter: axisLabelFormat,
      },
    }
    optionJson.yAxis = {
      type: 'category',
      data: axis,
      axisLabel: { rotate: axisLabelRotation },
    }
  } else {
    optionJson.yAxis = {
      type: 'value',
      axisLabel: {
        formatter: axisLabelFormat,
      },
    }
    optionJson.xAxis = {
      type: 'category',
      data: axis,
      axisLabel: { rotate: axisLabelRotation },
    }
  }

  return optionJson
}
