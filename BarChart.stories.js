import React from 'react'
import { BarChart } from './BarChart'

let counter = 0
let interval = setInterval(increment, 1000)

export function increment() {
  (counter % 360) + 1
  return counter
}

export default {
  component: BarChart,
  title: 'Bar Chart',
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    orientation: {
      control: {
        type: 'select',
        options: ['vertical', 'horizontal'],
      },
    },
    stacked: {
      control: {
        type: 'boolean',
      },
    },
    dataset: {
      control: {
        type: 'object',
      },
    },
    format: {
      control: {
        type: 'text',
      },
    },
    showLabel: {
      control: {
        type: 'boolean',
      },
    },
    colors: {
      control: {
        type: 'array',
      },
    },
    seriesProps: {
      control: {
        type: 'object'
      }
    },
    tooltipType: {
      control: {
        type: 'select',
        options: ['axis', 'item'],
      }
    },
    axisLabelRotation: {
      control: {
        type: 'number',
      },
    },
  },
}

const Template = ({ ...args }) => {
  return (
    <div style={{ height: '85vh' }}>
      <BarChart key={counter} {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'My Chart',
  orientation: 'vertical',
  stacked: false,
  dataset: {
    dimensions: ['Row1', 'Col1', 'Col2', 'Col3', 'Col4'],
    source: [
      ['Element1', 25, 32, 45, 42],
      ['Element2', 30, 28, 45, 32],
      ['Element3', 23, 34, 26, 23],
      ['Element4', 28, 21, 45, 32],
      ['Element4', 35, 23, 43, 28],
      ['Element4', 47, 33, 22, 45],
    ],
  },
  tooltipType: 'axis',
  seriesProps: [
    {
      name: 'Col3',
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: 'AVG' },
        ]
      }
    },
  ],
  format: '0',
  showLabel: false,
  showLoading: false,
  colors: ['#33b5e6', '#3367ce', '#acd4ef', '#4d6496', '#0041c2', '#4d7ad4', '#98caec'],
  axisLabelRotation: 0,
}
