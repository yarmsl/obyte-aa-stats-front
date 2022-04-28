export const initialState: UIState = {
  darkMode: false,
  homeLayouts: {
    md: [
      { i: 'widget-1', x: 0, y: 0, w: 1, h: 1, isResizable: false },
      { i: 'widget-2', x: 1, y: 0, w: 1, h: 1, isResizable: false },
      { i: 'widget-3', x: 2, y: 0, w: 1, h: 1, isResizable: false },
      { i: 'widget-chart', x: 0, y: 1, w: 3, h: 2, minW: 2, maxW: 3 },
      { i: 'widget-table', x: 0, y: 3, w: 3, h: 2 },
    ],
    sm: [
      { i: 'widget-1', x: 0, y: 0, w: 1, h: 1, isResizable: false },
      { i: 'widget-2', x: 1, y: 0, w: 1, h: 1, isResizable: false },
      { i: 'widget-3', x: 2, y: 0, w: 1, h: 1, isResizable: false },
      { i: 'widget-chart', x: 0, y: 1, w: 3, h: 2, minW: 2, maxW: 3 },
      { i: 'widget-table', x: 0, y: 3, w: 3, h: 2 },
    ],
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
      },
      {
        i: 'widget-2',
        x: 1,
        y: 1,
        w: 1,
        h: 1,
        isResizable: true,
        maxW: 2,
        maxH: 1,
      },
      {
        i: 'widget-3',
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        isResizable: true,
        maxW: 2,
        maxH: 1,
      },
      {
        i: 'widget-chart',
        x: 0,
        y: 3,
        w: 2,
        h: 2,
        minW: 2,
        maxW: 2,
      },
      { i: 'widget-table', x: 0, y: 5, w: 2, h: 2, maxW: 2 },
    ],
    xxs: [
      {
        i: 'widget-1',
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        isResizable: false,
      },
      {
        i: 'widget-2',
        x: 0,
        y: 1,
        w: 1,
        h: 1,
        isResizable: false,
      },
      {
        i: 'widget-3',
        x: 0,
        y: 2,
        w: 1,
        h: 1,
        isResizable: false,
      },
      {
        i: 'widget-chart',
        x: 0,
        y: 3,
        w: 1,
        h: 2,
        maxW: 1,
      },
      { i: 'widget-table', x: 0, y: 5, w: 1, h: 2, maxW: 1 },
    ],
  },
  homeLayoutsCache: {},
};
