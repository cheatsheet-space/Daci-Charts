import React from 'react'
import * as echarts from 'echarts'
import renderer from 'react-test-renderer'
import { Default, increment} from './BarChart.stories'
import  { BarChart }  from "./BarChart"
import { shallow } from 'enzyme'


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

describe('Bar Chart Tests', () => {
    it('matches snapshot', () => {
        const tree = renderer.create(<Default {...Default.args} />).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("testing func increment", () => {
        expect(increment((0 % 360) + 1)).toEqual(0)
    })

    it("Show Loading ", () => {
        const wrapper = shallow(<BarChart />)
        const divElement = <div>There is not enough information to display the chart. Please check your input.</div>
        expect(wrapper.contains(divElement)).toBeTruthy()
    })


    it('allows us to set all props', () => {
        const wrapper = mount(<Default {...Default.args} />)
        expect(wrapper.props().title).toEqual(Default.args.title)
        expect(wrapper.props().orientation).toEqual(Default.args.orientation)
        expect(wrapper.props().stacked).toEqual(Default.args.stacked)
        expect(wrapper.props().dataset).toEqual(Default.args.dataset)
        expect(wrapper.props().format).toEqual(Default.args.format)
        expect(wrapper.props().showLabel).toEqual(Default.args.showLabel)
        expect(wrapper.props().showLoading).toEqual(Default.args.showLoading)
        expect(wrapper.props().colors).toEqual(Default.args.colors)
        expect(wrapper.props().tooltipType).toEqual(Default.args.tooltipType)
        expect(wrapper.props().seriesProps).toEqual(Default.args.seriesProps)
    })
})
