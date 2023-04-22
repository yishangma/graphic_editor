export default function (enableMaterials) {
  const shapeControl = {
    // 控制器
    controllers: [
      [0, 0, 'nwse-resize'],
      [0, 0.5, 'ew-resize'],
      [0, 1, 'nesw-resize'],
      [0.5, 0, 'ns-resize'],
      [0.5, 1, 'ns-resize'],
      [1, 0, 'nesw-resize'],
      [1, 0.5, 'ew-resize'],
      [1, 1, 'nwse-resize']
    ],
    // 旋转
    rotate: true
  }

  // 锚点坐标
  const anchorPoints = [
    [0, 0],
    [0.25, 0],
    [0.5, 0],
    [0.75, 0],
    [1, 0],
    [1, 0.25],
    [1, 0.5],
    [1, 0.75],
    [1, 1],
    [0.75, 1],
    [0.5, 1],
    [0.25, 1],
    [0, 1],
    [0, 0.75],
    [0, 0.5],
    [0, 0.25]
  ]
  const defMaterials = [{
      name: 'general',
      label: 'General',
      lang: 'L10301',
      icon: '',
      enable: true,
      children: [{
          type: 'rectangle',
          label: 'Rectangle',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 40,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>'
        },
        {
          type: 'rounded-rectangle',
          label: 'Rounded Rectangle',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 40,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" rx="2.16" ry="2.16" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>'
        },
        {
          type: 'ellipse',
          label: 'Ellipse',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 40,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.84" cy="14.88" rx="14.399999999999999" ry="9.6" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse></g></g><g></g><g></g></g>'
        },
        {
          type: 'square',
          label: 'Square',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="2.38" y="1.36" width="27.2" height="27.2" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>'
        },
        {
          type: 'circle',
          label: 'Circle',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.98" cy="14.96" rx="13.600000000000001" ry="13.600000000000001" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse></g></g><g></g><g></g></g>'
        },
        {
          type: 'process',
          label: 'Process',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 40,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect><path d="M 4.32 7.68 L 4.32 22.08 M 27.36 7.68 L 27.36 22.08" fill="none" stroke="white" stroke-width="9.3" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 4.32 7.68 L 4.32 22.08 M 27.36 7.68 L 27.36 22.08" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'diamond',
          label: 'Diamond',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 15.98 1.36 L 29.58 14.96 L 15.98 28.56 L 2.38 14.96 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'parallelogram',
          label: 'Parallelogram',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 40,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 22.08 L 7.2 7.68 L 30.24 7.68 L 24.48 22.08 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'hexagon',
          label: 'Hexagon',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 40,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 8.64 5.28 L 23.04 5.28 L 30.24 14.88 L 23.04 24.48 L 8.64 24.48 L 1.44 14.88 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        }, {
          type: 'triangle',
          label: 'Triangle',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 1.36 L 26.18 14.96 L 5.78 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'cylinder',
          label: 'Cylinder',
          defaultLabel: '',
          enable: true,
          width: 40,
          height: 80,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 6.8 C 5.78 -0.45 26.18 -0.45 26.18 6.8 L 26.18 23.12 C 26.18 30.37 5.78 30.37 5.78 23.12 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><path d="M 5.78 6.8 C 5.78 12.24 26.18 12.24 26.18 6.8" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'cube',
          label: 'Cube',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 60,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 5.28 L 25.44 5.28 L 30.24 10.08 L 30.24 24.48 L 6.24 24.48 L 1.44 19.68 L 1.44 5.28 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><path d="M 1.44 5.28 L 25.44 5.28 L 30.24 10.08 L 6.24 10.08 Z" fill-opacity="0.05" fill="#000000" stroke="none" pointer-events="all"></path><path d="M 1.44 5.28 L 6.24 10.08 L 6.24 24.48 L 1.44 19.68 Z" fill-opacity="0.1" fill="#000000" stroke="none" pointer-events="all"></path><path d="M 6.24 24.48 L 6.24 10.08 L 1.44 5.28 M 6.24 10.08 L 30.24 10.08" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        }, {
          type: 'step',
          label: 'Step',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 60,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 5.28 L 25.44 5.28 L 30.24 14.88 L 25.44 24.48 L 1.44 24.48 L 6.24 14.88 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'tape',
          label: 'Tape',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 7.68 Q 8.64 16.32 15.84 7.68 Q 23.04 -0.96 30.24 7.68 L 30.24 22.08 Q 23.04 13.44 15.84 22.08 Q 8.64 30.72 1.44 22.08 L 1.44 7.68 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'card',
          label: 'Card',
          defaultLabel: '',
          enable: true,
          width: 60,
          height: 80,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.23 1.35 L 26.73 1.35 L 26.73 28.35 L 5.13 28.35 L 5.13 9.45 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'and',
          label: 'And',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 1.36 Q 26.18 1.36 26.18 14.96 Q 26.18 28.56 5.78 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        }
      ]
    },
    {
      name: 'arrow',
      label: 'Arrow',
      lang: 'L10305',
      icon: '',
      enable: true,
      children: [{
          type: 'arrow-down',
          label: 'Arrow Down',
          defaultLabel: '',
          enable: true,
          width: 60,
          height: 80,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.76 1.4 L 11.76 17.84 L 6.16 17.84 L 15.96 28.56 L 25.76 17.84 L 20.16 17.84 L 20.16 1.4 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'arrow-left',
          label: 'Arrow Left',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 60,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 10.5 L 12.69 10.5 L 12.69 4.5 L 1.2 15 L 12.69 25.5 L 12.69 19.5 L 30.3 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'arrow-right',
          label: 'Arrow Right',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 60,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 10.5 L 18.81 10.5 L 18.81 4.5 L 30.3 15 L 18.81 25.5 L 18.81 19.5 L 1.2 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'arrow-up',
          label: 'Arrow Up',
          defaultLabel: '',
          enable: true,
          width: 60,
          height: 80,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.76 28.56 L 11.76 12.12 L 6.16 12.12 L 15.96 1.4 L 25.76 12.12 L 20.16 12.12 L 20.16 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'bent-left-arrow',
          label: 'Bent Left Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 21.28 28.56 L 21.28 14.84 C 21.28 14.07 20.65 13.44 19.88 13.44 L 12.88 13.44 L 12.88 17.08 L 2.24 9.24 L 12.88 1.4 L 12.88 5.04 L 19.88 5.04 C 25.18 5.19 29.4 9.54 29.4 14.84 L 29.4 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'bent-right-arrow',
          label: 'Bent Right Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 10.36 28.56 L 10.36 14.84 C 10.36 14.07 10.99 13.44 11.76 13.44 L 18.76 13.44 L 18.76 17.08 L 29.4 9.24 L 18.76 1.4 L 18.76 5.04 L 11.76 5.04 C 6.46 5.19 2.24 9.54 2.24 14.84 L 2.24 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'bent-up-arrow',
          label: 'Bent Up Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 18.35 L 17.4 18.35 L 17.4 9.41 L 13.8 9.41 L 21.9 2.4 L 30.3 9.41 L 26.4 9.41 L 26.4 27.3 L 1.2 27.3 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'chevron-arrow',
          label: 'Chevron Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 40,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 10.5 15 L 1.5 6 L 21.3 6 L 30.3 15 L 21.3 24 L 1.5 24 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'circular-arrow',
          label: 'Circular Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 60,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 17.75 C 1.2 10.43 7.18 4.5 14.55 4.5 C 21.92 4.5 27.9 10.43 27.9 17.75 L 30.3 17.75 L 24.3 25.2 L 18.3 17.75 L 20.7 17.75 C 20.7 14.38 17.95 11.65 14.55 11.65 C 11.15 11.65 8.4 14.38 8.4 17.75 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'jump-in-right-arrow',
          label: 'Jump-in Right Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.07 17.86 L 15.93 17.86 C 15.83 10.28 10.43 3.78 2.97 2.27 C 12.88 1.62 21.8 8.23 24.03 17.86 L 28.89 17.86 L 19.98 28.35 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'jump-in-left-arrow',
          label: 'Jump-in Left Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 20.79 17.86 L 15.93 17.86 C 16.03 10.28 21.43 3.78 28.89 2.27 C 18.98 1.62 10.06 8.23 7.83 17.86 L 2.97 17.86 L 11.88 28.35 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'left-and-up-arrow',
          label: 'Left and Up Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 9.07 16.3 L 17.42 16.3 L 17.42 7.95 L 14.08 7.95 L 21.6 1.4 L 29.4 7.95 L 25.78 7.95 L 25.78 24.66 L 9.07 24.66 L 9.07 28.28 L 2.52 20.48 L 9.07 12.96 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'notched-signal-in-arrow',
          label: 'Notched Signal-in Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 20,
          minWidth: 40,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.5 10.5 L 26.27 10.5 L 30.3 15 L 26.27 19.5 L 1.5 19.5 L 5.38 15 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'quad-arrow',
          label: 'Quad Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 80,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.1 12.26 L 13.1 6.69 L 10.6 6.69 L 15.89 1.4 L 21.18 6.69 L 18.68 6.69 L 18.68 12.26 L 24.25 12.26 L 24.25 9.76 L 29.4 15.05 L 24.25 20.34 L 24.25 17.84 L 18.68 17.84 L 18.68 23.41 L 21.18 23.41 L 15.89 28.56 L 10.6 23.41 L 13.1 23.41 L 13.1 17.84 L 7.53 17.84 L 7.53 20.34 L 2.24 15.05 L 7.53 9.76 L 7.53 12.26 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'signal-in-arrow',
          label: 'Signal-in Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 20,
          minWidth: 40,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 10.5 L 26.27 10.5 L 30.3 15 L 26.27 19.5 L 1.2 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        },
        {
          type: 'slender-left-arrow',
          label: 'Slender Left Arrow',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 60,
          minWidth: 40,
          minHeight: 40,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          icon: '<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 12 L 6.72 12 L 6.72 6 L 1.2 15 L 6.72 24 L 6.72 18 L 30.3 18 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>'
        }
      ]
    }
  ]
  let materials = []
  if (enableMaterials && enableMaterials instanceof Object && Object.keys(enableMaterials).length) {
    Object.entries(enableMaterials).forEach(item => {
      const [name, types] = item
      if (defMaterials.find(target => target.name === name)) {
        const materialItem = defMaterials[name]
        materialItem.children = materialItem.children.filter(child => types.includes(child.name))
        materials.push(materialItem)
      }
    })
  } else {
    materials = defMaterials
  }

  return materials
}
