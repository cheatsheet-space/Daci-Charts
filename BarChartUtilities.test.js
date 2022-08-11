import React from 'react'
import { cleanup } from '@testing-library/react'
import { tooltipFormat, tooltipParams, getSeriesInfo, markLineFormat, markPointFormat, showLabelFormat, axisLabelFormat, getOption } from './BarChartUtilities'
import numeral from 'numeral'


afterEach(() => {
  cleanup()
})

describe("renders Area Chart ", () => {

  it("Getting series info test for Area chart", () => {
    const seriesName = {
      name: 'Metric', name: "Metric1"
    }


    const seriesProps = [
      {
        name: 'Metric',
        markPointVal: {},
        markLineVal: {}
      },
    ]



    expect(getSeriesInfo(seriesName, seriesProps)).not.toEqual(
      seriesProps !== undefined && seriesProps.length > 0) ?
      seriesProps.map(item =>
        expect(getSeriesInfo(item)).toEqual(item.name === seriesName ?
          item.markPointVal && item.markLineVal : false)
      ) : false
  }),


    it("Testing mark line Format value", () => {
      let value = "0"

      const mockMapData = {
        format: "0"
      };
      expect(markLineFormat(mockMapData, value)).toEqual(
        mockMapData.format !== undefined && mockMapData.format.length > 0
          ? numeral(value).format(mockMapData.format) : value
      )
    })


  it("Testing mark point Format ", () => {
    let value = "0"

    const mockMapData = {
      format: "0"
    };
    expect(markPointFormat(mockMapData, value)).toEqual(
      mockMapData.format !== undefined && mockMapData.format.length > 0
        ? numeral(value).format(mockMapData.format) : value
    )
  })


  it("Testing show label Format ", () => {
    let value = "0"

    const mockMapData = {
      format: "0"
    };
    expect(showLabelFormat(mockMapData, value)).toEqual(
      mockMapData.format !== undefined && mockMapData.format.length > 0
        ? numeral(value).format(mockMapData.format) : value
    )
  })


  it("Testing show label Format ", () => {
    let value = "0"

    const mockMapData = {
      format: "0"
    };
    expect(axisLabelFormat(mockMapData, value)).toEqual(
      mockMapData.format !== undefined && mockMapData.format.length > 0
        ? numeral(value).format(mockMapData.format) : value
    )
  })


  it("Testing tooltip params for Area chart", () => {
    const output = [
      {
        name: "",
      }
    ]

    const params = [
      {
        componentType: ["markPoint", "markLine"],
        name: 'item',
        value: 1,
        seriesIndex: 0,
        marker: "",
        seriesName: 'Attribute',
        dataset: {
          dimensions: ['Attribute', 'Metric']
        },
        format: "0"
      },
    ]

    expect(tooltipParams(output, params[0].name)).toBeTruthy();
    params.forEach(item => item.value && item.seriesName ?

      item.format !== undefined && item.format.length > 0 ?
        numeral(item.value).format(item.format) :

        output += `${item.marker} ${item.seriesName}: ${item.value}` :
      output
    )
  })



  it("Testing Format value for Area chart", () => {
    const output = [
      {
        name: "",
      }
    ]

    const params = {
      componentType: ["markPoint", "markLine"],
      name: 'item',
      value: "1",
      seriesIndex: 0,
      marker: "",
      seriesName: 'Attribute',
      dataset: {
        dimensions: ['Attribute', 'Metric']
      },
      format: "0"
    }


    expect(tooltipFormat(output, params.name)).toBeTruthy();


  }),



    it("Getting option test for Area chart", () => {
      let dataset
      expect(getOption(dataset === undefined)).toEqual({})
    })


})