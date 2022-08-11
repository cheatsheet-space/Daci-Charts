import React from 'react'
import * as echarts from 'echarts'
import renderer from 'react-test-renderer'
import { Default } from './AreaChart.stories'



let spy

beforeAll(() => {
  spy = jest.spyOn(echarts, 'getInstanceByDom').mockImplementation(() => {
    return {
      hideLoading: jest.fn(),
      setOption: jest.fn(),
      showLoading: jest.fn(),
    }
  })
})

afterAll(() => {
  spy.mockReset()
})

describe('Area Chart Tests', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Default {...Default.args} />).toJSON()
    expect(tree).toMatchSnapshot()
  })



  it('allows us to set all props', () => {
    const wrapper = mount(<Default {...Default.args} />)
    expect(wrapper.props().title).toEqual(Default.args.title)
    expect(wrapper.props().showLoading).toEqual(Default.args.showLoading)
    expect(wrapper.props().dataset).toEqual(Default.args.dataset)
    expect(wrapper.props().format).toEqual(Default.args.format)
    expect(wrapper.props().colors).toEqual(Default.args.colors)
    expect(wrapper.props().seriesProps).toEqual(Default.args.seriesProps)
    expect(wrapper.props().tooltipType).toEqual(Default.args.tooltipType)
  })

})
