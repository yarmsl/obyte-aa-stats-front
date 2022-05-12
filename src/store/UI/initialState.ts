const mdSmHomeLt = [
  {
    i: 'widget-1',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    isResizable: false,
    moved: false,
    static: false,
  },
  {
    i: 'widget-2',
    x: 1,
    y: 0,
    w: 1,
    h: 1,
    isResizable: false,
    moved: false,
    static: false,
  },
  {
    i: 'widget-3',
    x: 2,
    y: 0,
    w: 1,
    h: 1,
    isResizable: false,
    moved: false,
    static: false,
  },
  {
    i: 'widget-chart',
    x: 0,
    y: 1,
    w: 3,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 3,
    moved: false,
    static: false,
  },
  {
    i: 'widget-table',
    x: 0,
    y: 3,
    w: 3,
    h: 2,
    moved: false,
    static: false,
  },
];

const mdSmAgentLt = [
  {
    i: 'widget-1',
    x: 0,
    y: 0,
    w: 1,
    h: 2,
    isResizable: false,
    moved: false,
    static: false,
  },
  {
    i: 'widget-chart',
    x: 1,
    y: 0,
    w: 2,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 3,
    moved: false,
    static: false,
  },
  {
    i: 'widget-table',
    x: 0,
    y: 2,
    w: 3,
    h: 2,
    minW: 2,
    minH: 2,
    moved: false,
    static: false,
  },
];

export const initialState: UIState = {
  darkMode: false,
  homeLayouts: {
    md: mdSmHomeLt,
    sm: mdSmHomeLt,
    xs: [
      {
        i: 'widget-1',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        isResizable: true,
        maxW: 2,
        maxH: 1,
        moved: false,
        static: false,
      },
      {
        i: 'widget-2',
        x: 1,
        y: 0,
        w: 1,
        h: 1,
        isResizable: true,
        maxW: 2,
        maxH: 1,
        moved: false,
        static: false,
      },
      {
        i: 'widget-3',
        x: 0,
        y: 1,
        w: 2,
        h: 1,
        isResizable: true,
        maxW: 2,
        maxH: 1,
        moved: false,
        static: false,
      },
      {
        i: 'widget-chart',
        x: 0,
        y: 2,
        w: 2,
        h: 2,
        minW: 2,
        maxW: 2,
        moved: false,
        static: false,
      },
      {
        i: 'widget-table',
        x: 0,
        y: 4,
        w: 2,
        h: 2,
        maxW: 2,
        moved: false,
        static: false,
      },
    ],
    xxs: [
      {
        i: 'widget-1',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        isResizable: false,
        moved: false,
        static: false,
      },
      {
        i: 'widget-2',
        x: 0,
        y: 1,
        w: 1,
        h: 1,
        isResizable: false,
        moved: false,
        static: false,
      },
      {
        i: 'widget-3',
        x: 0,
        y: 2,
        w: 1,
        h: 1,
        isResizable: false,
        moved: false,
        static: false,
      },
      {
        i: 'widget-chart',
        x: 0,
        y: 3,
        w: 1,
        h: 2,
        maxW: 1,
        moved: false,
        static: false,
      },
      {
        i: 'widget-table',
        x: 0,
        y: 5,
        w: 1,
        h: 2,
        maxW: 1,
        moved: false,
        static: false,
      },
    ],
  },
  agentLayouts: {
    md: mdSmAgentLt,
    sm: mdSmAgentLt,
    xs: [
      {
        i: 'widget-1',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        isResizable: true,
        maxW: 2,
        maxH: 1,
        moved: false,
        static: false,
      },
      {
        i: 'widget-chart',
        x: 0,
        y: 2,
        w: 2,
        h: 2,
        minW: 2,
        maxW: 2,
        moved: false,
        static: false,
      },
      {
        i: 'widget-table',
        x: 0,
        y: 4,
        w: 2,
        h: 2,
        maxW: 2,
        moved: false,
        static: false,
      },
    ],
    xxs: [
      {
        i: 'widget-1',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        isResizable: false,
        moved: false,
        static: false,
      },
      {
        i: 'widget-chart',
        x: 0,
        y: 3,
        w: 1,
        h: 2,
        maxW: 1,
        moved: false,
        static: false,
      },
      {
        i: 'widget-table',
        x: 0,
        y: 5,
        w: 1,
        h: 2,
        maxW: 1,
        moved: false,
        static: false,
      },
    ],
  },
  homeLayoutsCache: {},
  agentLayoutsCache: {},
  totalGraphPeriodControls: { label: '30 days', value: 30 },
  totalGraphActivitiesControls: [
    { label: 'USD in', value: 'usd_amount_in', color: '#ffa16f' },
  ],
  asset: null,
  aaTopTableSortType: 'usd_amount_in',
};
