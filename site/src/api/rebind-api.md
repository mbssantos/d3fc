---
name: rebind-api
structure:
  - title: d3fc-rebind
    level: 1
    content: "Utilities for copying methods from one d3 component to another in a configurable way\r\n\r\n"
    children:
      - title: API Reference
        level: 2
        content: "* [Functions](#functions)\r\n* [Transform Functions](#transform-functions)\r\n\r\n### Functions\r\n\r\n<a name=\"rebind\" href=\"#rebind\">#</a> fc.**rebind**(*target*, *source*, *...names*)\r\n\r\nProvides the same functionality as [`d3.rebind`](https://github.com/mbostock/d3/wiki/Internals#rebind) -\r\n\r\n> Copies the methods with the specified `names` from `source` to `target`, and returns `target`. Calling one of the named methods on the target object invokes the same-named method on the source object, passing any arguments passed to the target method, and using the source object as the this context. If the source method returns the source object, the target method returns the target object (“setter” method); otherwise, the target method returns the return value of the source method (“getter” mode). The rebind operator allows inherited methods (mix-ins) to be rebound to a subclass on a different object.\r\n\r\n<a name=\"rebindAll\" href=\"#rebindAll\">#</a> fc.**rebindAll**(*target*, *source*, *[...transforms]*)\r\n\r\nProvides the same functionality as `rebind` but copies **all** properties found on `source` to `target`. Optionally, property name transforms can be specified. These receive a source property name and return either the target property name or a falsey value to indicate the property should not be copied.\r\n\r\nN.B. This method does not work with properties found on the source object's prototype e.g. `d3.dispatch().on`. If you need this functionality use `rebind`.\r\n\r\n### Transform functions\r\n\r\nAs well as creating transforms manually, the following may be useful (especially if you're not able to use ES2015 features) -\r\n\r\n<a name=\"exclude\" href=\"#exclude\">#</a> fc.**exclude**(*...names*)\r\n\r\nExclude a set of property `names`. Names can be specified as a `string` or `RegExp`.\r\n\r\n<a name=\"include\" href=\"#include\">#</a> fc.**include**(*...names*)\r\n\r\nInclude only the set of property `names`. Names can be specified as a `string` or `RegExp`.\r\n\r\n<a name=\"includeMap\" href=\"#includeMap\">#</a> fc.**includeMap**(*mappings*)\r\n\r\nInclude only the set of properties specified by the keys of `mappings` using their corresponding values as the target property name e.g. `{ 'sourceName': 'targetName' }`.\r\n\r\n<a name=\"prefix\" href=\"#prefix\">#</a> fc.**prefix**(*str*)\r\n\r\nPrefix all property names with `str`.\r\n"
layout: api
section: api
title: Rebind

---
