import React from 'react'
import { AreaChart } from './AreaChart'

let counter = 0
let interval = setInterval(increment, 1000)

export function increment() {
  (counter % 360) + 1
  return counter
}

export default {
  component: AreaChart,
  title: 'Area Chart',
  argTypes: {
    title: {
      control: {
        type: 'text',
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
      }
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
      <AreaChart key={counter} {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'My Chart',
  showLoading: false,
  dataset: {
    dimensions: ['Attribute', 'Metric', 'Metric2', 'Metric3', 'Metric4'],
    source: [
      ['Element1', 25, 32, 45, 42],
      ['Element2', 30, 5, 45, 32],
      ['Element3', 23, 44, 26, 23],
      ['Element4', 28, 21, 45, 32],
      ['Element5', 35, 23, 43, 28],
      ['Element6', 47, 33, 22, 45],
    ],
  },
  format: '0',
  showLabel: false,
  colors: ['#33b5e6', '#3367ce', '#acd4ef', '#4d6496', '#0041c2', '#4d7ad4', '#98caec'],
  seriesProps: [
    { name: 'Metric', smooth: true },
    {
      name: 'Metric2', smooth: false,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      }
    }
  ],
  tooltipType: 'axis',
  axisLabelRotation: 0,
}
