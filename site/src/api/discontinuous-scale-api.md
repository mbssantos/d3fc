---
name: discontinuous-scale-api
structure:
  - title: d3fc-discontinuous-scale
    level: 1
    content: "A D3 scale that supports domains that are not continuous, creating gaps, or discontinuities. For example, this can be used to create a linear scale that has certain ranges removed, creating discontinuities in the rendered axis, or it can be used in conjunction with a time scale, in order to 'skip' weekends.\r\n\r\n"
    children:
      - title: API Reference
        level: 2
        content: "* [scaleDiscontinuous](#scaleDiscontinuous)\r\n* [discontinuityIdentity](#discontinuityIdentity)\r\n* [discontinuityRange](#discontinuityRange)\r\n* [discontinuitySkipWeekends](#discontinuitySkipWeekends)\r\n* [Discontinuity provider interface](#discontinuity-provider-interface)\r\n\r\nThe discontinuous scale adapts a D3 scale, with an associated discontinuity provider supplying the information relating to any 'gaps' in the scale. The following example shows an adapted linear scale, with a discontinuity which removes the domain range `[50, 75]`:\r\n\r\n```javascript\r\nimport { scaleDiscontinuous, discontinuityRange } from 'd3fc-discontinuous-scale';\r\nimport { scaleLinear, axisBottom } from 'd3-scale';\r\n\r\nvar scale = scaleDiscontinuous(scaleLinear())\r\n    .discontinuityProvider(discontinuityRange([50, 75]))\r\n    .domain([0, 100])\r\n    .range([0, 550]);\r\n\r\nvar axis = axisBottom()\r\n    .scale(scale);\r\n```\r\n\r\nWhich renders as follows:\r\n\r\n![](discontinuous-scale.png)\r\n\r\nThere are various different discontinuity providers which can be used with the discontinuous scale. It is also possible to write your own.\r\n\r\n"
        children:
          - title: scaleDiscontinuous
            level: 3
            content: "<a name=\"scaleDiscontinuous\" href=\"#scaleDiscontinuous\">#</a> fc.**scaleDiscontinuous**(*scale*)\r\n\r\nConstructs a new discontinuous scale, adapting the given scale. If a *scale* is not specified, a D3 identity scale is used.\r\n\r\n<a name=\"scaleDiscontinuous_\" href=\"#scaleDiscontinuous_\">#</a> *scaleDiscontinuous*(*value*)\r\n<a name=\"scaleDiscontinuous_invert\" href=\"#scaleDiscontinuous_invert\">#</a> *scaleDiscontinuous*.**invert**(*value*)\r\n\r\nThe underlying scale method, and the **invert** method are adapted to remove discontinuous. For example, a regular D3 linear scale performs as follows:\r\n\r\n```javascript\r\nconst linear = scaleLinear()\r\n    .domain([10, 110])\r\n    .range([0, 960]);\r\n\r\nlinear(20); // 96\r\nlinear(50); // 384\r\n```\r\n\r\nWhereas a discontinuous scale (that adapts a linear), with a discontinuity that removes the domain range `[50, 80]`, gives a different output:\r\n\r\n```javascript\r\nconst discontinuous = scaleDiscontinuous(scaleLinear())\r\n    .discontinuityProvider(discontinuityRange([50, 70]))\r\n    .domain([10, 110])\r\n    .range([0, 960]);\r\n\r\ndiscontinuous(20); // 120\r\ndiscontinuous(50); // 480\r\n```\r\n\r\nThe same behaviour is observed via **invert** also.\r\n\r\nAll of the adapted scale methods are re-exposed by the discontinuous scale. The discontinuous scale API documentation details where the scale behaviour differs from the adapted scale. For all other methods, you can assume that their behaviour is unchanged.\r\n\r\n<a name=\"scaleDiscontinuous_domain\" href=\"#scaleDiscontinuous_domain\">#</a> *scaleDiscontinuous*.**domain**([*provider*])\r\n\r\nAdapts the underlying scale's **domain** method, clamping the upper and lower domain bounds to ensure that they do not fall within a discontinuity.\r\n\r\n<a name=\"scaleDiscontinuous_nice\" href=\"#scaleDiscontinuous_nice\">#</a> *scaleDiscontinuous*.**nice**()\r\n\r\nAdapts the underlying scale's **nice** method, clamping the resulting domain to ensure that the upper and lower bounds do not fall within a discontinuity.\r\n\r\n<a name=\"scaleDiscontinuous_ticks\" href=\"#scaleDiscontinuous_ticks\">#</a> *scaleDiscontinuous*.**ticks**([*count*])\r\n\r\nAdapts the underlying scale's **ticks** method, removing any ticks that fall within discontinuities.\r\n\r\n<a name=\"scaleDiscontinuous_discontinuityProvider\" href=\"#scaleDiscontinuous_discontinuityProvider\">#</a> *scaleDiscontinuous*.**discontinuityProvider**(*provider*)\r\n\r\nIf *provider* is specified, sets the discontinuity provider for the scale. The discontinuity provider exposes an API that is used to create gaps within the domain. This package includes a number of different types of discontinuity provider, however you can also create your own.\r\n\r"
          - title: discontinuityIdentity
            level: 3
            content: "<a name=\"discontinuityIdentity\" href=\"#discontinuityIdentity\">#</a> fc.**discontinuityIdentity**()\r\n\r\nThe identity discontinuity provider does not define any discontinuities, and as a result, when associated with a discontinuities scale, the scale will perform in exactly the same way as the adapted scale.\r\n\r"
          - title: discontinuityRange
            level: 3
            content: "<a name=\"discontinuityRange\" href=\"#discontinuityRange\">#</a> fc.**discontinuityRange**(*ranges*)\r\n\r\nThis discontinuity provider defines one or more domain *ranges* which should be excluded from the scale. These ranges are supplied as tuples, for example, `discontinuityRange([0, 10], [20, 30])`. Both numeric and date ranges are supported, for example to create a range that skips a day, you can do the following:\r\n\r\n```javascript\r\nconst start = new Date(2015, 0, 9);\r\nconst end = new Date(2015, 0, 10);\r\nconst range = discontinuityRange([start, end]);\r\n```\r\n\r"
          - title: discontinuitySkipWeekends
            level: 3
            content: "<a name=\"discontinuitySkipWeekends\" href=\"#discontinuitySkipWeekends\">#</a> fc.**discontinuitySkipWeekends**()\r\n\r\nThis discontinuity provider is intended to be used with a time scale. This provider will remove all weekends from the domain, a feature which is particularly useful for financial time-series charts.\r\n\r"
          - title: Discontinuity provider interface
            level: 3
            content: "You can create your own discontinuity provider by providing an object that exposes the following methods:\r\n\r\n + `clampUp` - When given a value, if it falls within a discontinuity (i.e. an excluded domain range) it should be shifted forwards to the discontinuity boundary. Otherwise, it should be returned unchanged.\r\n + `clampDown` - When given a value, if it falls within a discontinuity it should be shifted backwards to the discontinuity boundary. Otherwise, it should be returned unchanged.\r\n + `distance` - When given a pair of values, this function returns the distance between the, in domain units, minus any discontinuities.\r\n discontinuities.\r\n + `offset` - When given a value and an offset, the value should be advanced by the offset value, skipping any discontinuities, to return the final value.\r\n + `copy` - Creates a copy of the discontinuity provider.\r\n"
sidebarContents:
  - title: scaleDiscontinuous
    id: scale-discontinuous
  - title: discontinuityIdentity
    id: discontinuity-identity
  - title: discontinuityRange
    id: discontinuity-range
  - title: discontinuitySkipWeekends
    id: discontinuity-skip-weekends
  - title: Discontinuity provider interface
    id: discontinuity-provider-interface
layout: api
section: api
title: Discontinuous Scale

---
