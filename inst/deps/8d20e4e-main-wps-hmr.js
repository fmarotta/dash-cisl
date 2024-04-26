webpackHotUpdatedash_cisl("main",{

/***/ "./src/lib/components/DashCisl.react.js":
/*!**********************************************!*\
  !*** ./src/lib/components/DashCisl.react.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cisl; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DashCisl_react_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DashCisl.react.css */ "./src/lib/components/DashCisl.react.css");
/* harmony import */ var _DashCisl_react_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_DashCisl_react_css__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }




/**
 * Implement the modulo operation
 *
 * @return The modulo, not the usual remainder that javascript has.
 */

Math.mod = function (x, y) {
  if (x >= 0 && y >= 0 || x < 0 && y < 0) return x % y;else return x % y + y;
};
/**
 * Compute the distance between two angles
 *
 * @return The distance along the shortest path along the circumference 
 * (in any direction).
 */


var angularDist = function angularDist(a, b) {
  return Math.min(Math.mod(b - a, 2 * Math.PI), Math.mod(a - b, 2 * Math.PI));
};
/**
 * Compute the length of an arc
 *
 * @return The length going in the direction from->to.
 */


var arcLength = function arcLength(from, to) {
  return Math.mod(to - from, 2 * Math.PI);
};
/**
 * Convert a CSS length to px
 *
 * Based on the following documents:
 * https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width
 * https://www.w3.org/TR/SVG2/coords.html
 *
 * @note for percentages, the stroke-width should computed with respect 
 * to the normalised diagonal length of the viewport. The normalised 
 * diagonal is the diagonal divided by sqrt(2). The user is responsible 
 * for computing it.
 */


var parseLength = function parseLength(length, viewport_size) {
  if (typeof length == 'number') return length;else if (typeof length != 'string') {
    console.warn('The length should be either a number or a string, not a' + _typeof(length));
    return undefined;
  }
  var value = parseFloat(length);
  var unit = length.replace(value, '');
  if (unit == '') // assume it's already in px
    return value;
  var px = 0.0;

  switch (unit) {
    case 'cm':
      px = value / 37.8;
      break;

    case 'mm':
      px = value / 3.78;
      break;

    case 'Q':
      px = value / 0.945;
      break;

    case 'in':
      px = value / 96.012;
      break;

    case 'pc':
      px = value / 16.002;
      break;

    case 'pt':
      px = value / 1.3335;
      break;

    case 'px':
      px = value;
      break;

    case '%':
      /*
      if (viewport === undefined) {
          console.warn('You have to provide the viewport as an argument when the length is a percentage.')
          break
      }
      px = value / 100 * Math.sqrt(viewport.getBBox().width**2 + viewport.getBBox().height**2) / Math.sqrt(2)
      */
      if (viewport_size === undefined) {
        console.warn('You have to provide the viewport as an argument when the length is a percentage.');
        break;
      }

      px = value * parseLength(viewport_size) / 100;
      break;

    default:
      console.warn('The unit "' + unit + '" could not be recognised.');
  }

  return px;
};
/**
 * Generate a unique ID for an html element
 *
 * https://stackoverflow.com/questions/61282153/simplest-way-to-generate-unique-id-onto-a-value-grabbed-from-a-form-react
 */


var uniqueId = function () {
  var num = 0;
  return function (prefix) {
    prefix = String(prefix) || '';
    num += 1;
    return prefix + num;
  };
}();
/**
 * Cisl
 *
 * A circular slider component. Features and customisation are somewhat limited
 * to what I need for my work. It has two handles which can be moved either
 * independently or at the same time (to shift the whole range). Handes can also
 * be moved with arrow keys, WASD keys, or the mouse wheel.
 */


function Cisl(props) {
  // Validate step size
  if (props.step && (props.max - props.min) / props.step < 3) {
    throw Error("Not enough steps: at least three are required; " + "either increase the range of the slider or decrease the step size.");
  } else if (props.step != null && (props.max - props.min) / props.step < props.breaks_n) {
    throw Error("Step size too big or not enough breaks; " + "you can decrease the range of the slider, increase `step', or decrease `breaks_n.");
  }

  var _props$id = props.id,
      id = _props$id === void 0 ? uniqueId("cisl-id-") : _props$id;
  var cislRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(parseLength(props.width, screen.width)),
      _useState2 = _slicedToArray(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1]; // Respond to resizes


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"])(function () {
    var resizeObserver = new ResizeObserver(function (entries) {
      if (props.width[props.width.length - 1] === "%") {
        var percentWidth = parseFloat(props.width) / 100;
        var absoluteWidth = percentWidth * entries[0].borderBoxSize[0].inlineSize;
        setWidth(absoluteWidth);
      }
    });
    resizeObserver.observe(document.querySelector("#".concat(id)).parentElement);
  }, []);
  /* Computations
   *
   * The following functions are devoted to computing some quantities, 
   * mostly using trigonometry or modular arithmetic. They are here 
   * because they use the props.
   */

  /**
   * Given an angle, return the closest admissible value, considering the  step
   */

  function angle2value(angle) {
    angle = Math.mod(angle, 2 * Math.PI);
    var value = props.min + angle * (props.max - props.min) / (2 * Math.PI);
    if (!props.step) return value;
    return props.step * Math.round(value / props.step);
  }
  /**
   * Given a value, return the corresponding angle
   *
   * When moving with the arrow keys, it may happen that one keypress 
   * moves the value to something bigger than the maximum value (even 
   * more than twice as big). Thus, its necessary to bring the value 
   * within the acceptable range first.
   */


  function value2angle(value) {
    while (value < props.min) {
      value = props.max - (props.min - value);
    }

    if (value > props.max) value %= props.max;
    return 2 * Math.PI * (value - props.min) / (props.max - props.min);
  }
  /**
   * Given the angle, get the coordinates on the rails
   */


  function angle2tangent(angle) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var x = (0.35 * width + offset) * Math.cos(angle - Math.PI / 2) + width / 2;
    var y = (0.35 * width + offset) * Math.sin(angle - Math.PI / 2) + width / 2;
    return [x, y];
  }
  /**
   * Given the coordinates of an external point, get the angle
   *
   * When the pointer is in a certain position, we want to know the 
   * angle at which it lies with respect to the center of the circle.
   */


  function external2angle(x, y) {
    var center_x = cislRef.current.offsetLeft + width / 2;
    var center_y = cislRef.current.offsetTop + width / 2;
    var angle = Math.PI / 2 + Math.atan((y - center_y) / (x - center_x));
    if (x < center_x) angle += Math.PI;
    return angle;
  }
  /**
   * Make sure that the angle is safe and sound
   *
   * First, when dragging the bar it may happen that angle < 0 or 
   * angle > 2pi because of the slice, so we correct this. Second, if 
   * we have a step, we make sure that the angle is allowed.
   */


  function adjust_angle(angle) {
    if (!props.step) return angle;
    return value2angle(angle2value(angle));
  }
  /**
   * Format the label
   */


  function format_label(n) {
    return n.toFixed(props.digits);
  }
  /**
   * CislFixedParts
   *
   * Renders the background of the circular slider. These parts should 
   * not move, except possibly when the viewport is resized.
   */


  function CislFixedParts() {
    /* Subcomponents
     *
     * These functions create additional elements that are part of the 
     * circular slider. These elements have a defined structure, but can 
     * be parametrised.
     */
    function Tick(x, y, angle, cl, key) {
      angle += Math.PI;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", {
        key: key,
        className: cl,
        x: x,
        y: y,
        style: {
          transform: 'translate(-50%,-100%) rotate(' + angle + 'rad)'
        }
      });
    }

    function Break(x, y, angle, cl, text, key) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("text", {
        key: key,
        className: cl,
        x: x,
        y: y,
        style: {
          transform: 'rotate(' + angle + 'rad)'
        }
      }, text);
    }
    /* draw the ruler */


    if (props.breaks_n !== 0) {
      var rails_n_border = parseLength(props.rails_width, width) + parseLength(props.rails_border_width, width);
      var ruler = [];
      var angle_tick = adjust_angle(0);
      var coord_tick = angle2tangent(angle_tick, -rails_n_border / 2);
      ruler.push(Tick(coord_tick[0], coord_tick[1], angle_tick, "cisl-tick-major cisl--style", 0));
      var coord_break = angle2tangent(angle_tick, -parseLength(props.breaks_altitude, width));
      ruler.push(Break(coord_break[0], coord_break[1], angle_tick, "cisl-break-major cisl--style", format_label(angle2value(angle_tick)), 1));
    }

    for (var i = 1; i < props.breaks_n; i++) {
      angle_tick = adjust_angle(i * 2 * Math.PI / props.breaks_n);
      coord_tick = angle2tangent(angle_tick, -rails_n_border / 2);
      coord_break = angle2tangent(angle_tick, -parseLength(props.breaks_altitude, width));

      if (i % props.major_breaks_every == 0) {
        ruler.push(Tick(coord_tick[0], coord_tick[1], angle_tick, "cisl-tick-major cisl--style", 2 * i));
        ruler.push(Break(coord_break[0], coord_break[1], angle_tick, "cisl-break-major cisl--style", format_label(angle2value(angle_tick)), 2 * i + 1));
      } else {
        ruler.push(Tick(coord_tick[0], coord_tick[1], angle_tick, "cisl-tick-minor cisl--style", 2 * i));
      }
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", {
      className: "cisl-rails-border cisl--style",
      cx: "50%",
      cy: "50%",
      r: "35%",
      fill: "transparent",
      strokeWidth: parseLength(props.rails_width, width) + parseLength(props.rails_border_width, width)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", {
      className: "cisl-rails cisl--style",
      cx: "50%",
      cy: "50%",
      r: "35%",
      fill: "transparent",
      strokeWidth: parseLength(props.rails_width, width)
    }), ruler);
  }
  /**
   * CislMovingParts
   *
   * All that can move. It's necessary to have a separate component from 
   * the rest because we don't want to re-render the parts that don't 
   * change every time we move the handles.
   *
   * It's defined here, under the main component, because we want to 
   * use the same props without the overhead of passing them to a 
   * nested component. It doesn't make sense to use the moving parts 
   * without everything else.
   */


  function CislMovingParts() {
    //const [angleState, setAngleState] = useState([0, Math.PI / 4]);
    var angleState = [value2angle(props.value[0]), value2angle(props.value[1])];
    var adjustedState = [adjust_angle(angleState[0]), adjust_angle(angleState[1])];
    var valueState = [angle2value(adjustedState[0]), angle2value(adjustedState[1])];
    var tangentState = [angle2tangent(adjustedState[0]), angle2tangent(adjustedState[1])];
    /* event handlers */

    var handle_mousedown = function handle_mousedown(e_down) {
      e_down.persist();
      e_down.preventDefault();
      e_down.target.focus();
      /*
      if (typeof this.onStart === "function") {
          this.onStart()
      }
      */

      if (["cisl-rails", "cisl-bar", "cisl-label-from-to"].some(function (cl) {
        return e_down.target.classList.contains(cl);
      })) {
        var pageX = e_down.pageX || e_down.touches[0].pageX;
        var pageY = e_down.pageY || e_down.touches[0].pageY;
        var angle_down = external2angle(pageX, pageY);
        var angle_from_down = adjustedState[0];
        var angle_to_down = adjustedState[1]; // bind these properties to the e_down event, so that we 
        // only have to pass the event to the handle_mousemove 
        // listener.

        e_down.cisl_slice_from = arcLength(angle_from_down, angle_down);
        e_down.cisl_slice_to = arcLength(angle_down, angle_to_down);
      }

      var mousemove_wrapper = function mousemove_wrapper(e) {
        return handle_mousemove(e, e_down);
      };

      var mouseup_wrapper = function mouseup_wrapper(e) {
        return handle_mouseup(e, mousemove_wrapper);
      };

      ["mouseup", "touchend"].forEach(function (event_type) {
        return window.addEventListener(event_type, mouseup_wrapper, {
          once: true
        });
      });
      ["mousemove", "touchmove"].forEach(function (event_type) {
        return window.addEventListener(event_type, mousemove_wrapper);
      });
    };

    function handle_mousemove(e_move, e_down) {
      if (e_move.pageX == 0 && e_move.touches === undefined) {
        var pageX = 0;
        var pageY = e_move.pageY || e_move.touches[0].pageY;
      } else {
        var pageX = e_move.pageX || e_move.touches[0].pageX;
        var pageY = e_move.pageY || e_move.touches[0].pageY;
      }

      var new_angle = external2angle(pageX, pageY);

      if (["cisl-handle-to", "cisl-label-to"].some(function (cl) {
        return e_down.target.classList.contains(cl);
      })) {
        // setAngleState([adjustedState[0], new_angle]);
        props.setProps({
          value: [valueState[0], angle2value(new_angle)]
        });
      } else if (["cisl-handle-from", "cisl-label-from"].some(function (cl) {
        return e_down.target.classList.contains(cl);
      })) {
        // setAngleState([new_angle, adjustedState[1]]);
        props.setProps({
          value: [angle2value(new_angle), valueState[1]]
        });
      } else if (["cisl-rails", "cisl-bar", "cisl-label-from-to"].some(function (cl) {
        return e_down.target.classList.contains(cl);
      })) {
        // setAngleState([new_angle - e_down.cisl_slice_from, new_angle + e_down.cisl_slice_to]);
        props.setProps({
          value: [angle2value(new_angle - e_down.cisl_slice_from), angle2value(new_angle + e_down.cisl_slice_to)]
        });
      }
    }

    function handle_mouseup(e_up, move_function) {
      e_up.stopPropagation();
      e_up.stopImmediatePropagation();
      ["mousemove", "touchmove"].forEach(function (event_type) {
        return window.removeEventListener(event_type, move_function);
      });
      /*
      if (typeof this.onFinish === "function") {
          this.onFinish()
      }
      */
    }

    function handle_keydown(e_press) {
      var scale = false; // whether to move (false) or to expand/contract (true)

      switch (e_press.which) {
        // up
        case 38: // up arrow

        case 87:
          // W
          scale = true;
        // left

        case 37: // left arrow

        case 65:
          // A
          var weight = -1;
          break;
        // down

        case 40: // down arrow

        case 83:
          // S
          scale = true;
        // right

        case 39: // right arrow

        case 68:
          // D
          var weight = 1;
          break;

        default:
          return;
      }

      if (e_press.shiftKey) {
        weight *= 10;
      } // TODO: FIXME


      if (props.step !== null && e_press.ctrlKey) {
        weight = arcLength(value2angle(props.min), value2angle(props.min + weight * props.step)); // advance 1 or 10 steps
      } else {
        weight *= Math.PI / 50; // advance 1 or 10 percent
      }
      /*
      if (typeof this.onStart === "function") {
          this.onStart()
      }
      */


      if (scale) {
        // setAngleState([adjustedState[0] + weight / 2, adjustedState[1] - weight / 2]);
        props.setProps({
          value: [angle2value(adjustedState[0] + weight / 2), angle2value(adjustedState[1] - weight / 2)]
        });
      } else if (["cisl-handle-to", "cisl-label-to"].some(function (cl) {
        return e_press.target.classList.contains(cl);
      })) {
        // setAngleState([adjustedState[0], adjustedState[1] + weight]);
        props.setProps({
          value: [angle2value(adjustedState[0]), angle2value(ajudt_angle(adjustedState[1] + weight))]
        });
      } else if (["cisl-handle-from", "cisl-label-from"].some(function (cl) {
        return e_press.target.classList.contains(cl);
      })) {
        // setAngleState([adjustedState[0] + weight, adjustedState[1]]);
        props.setProps({
          value: [angle2value(adjustedState[0] + weight), angle2value(adjustedState[1])]
        });
      } else if (["cisl-bar", "cisl-label-from-to"].some(function (cl) {
        return e_press.target.classList.contains(cl);
      })) {
        // setAngleState([adjustedState[0] + weight, adjustedState[1] + weight]);
        props.setProps({
          value: [angle2value(adjustedState[0] + weight), angle2value(adjustedState[1] + weight)]
        });
      }
      /*
      if (typeof this.onFinish === "function") {
          this.onFinish()
      }
      */

    }

    function handle_wheel(e_wheel) {
      var weight = 0.01 * e_wheel.deltaY;
      /*
      if (typeof this.onStart === "function") {
          this.onStart()
      }
      */
      // setAngleState([adjustedState[0] - weight * Math.PI / 50, adjustedState[1] + weight * Math.PI / 50]); // zoom in/out 1 percent

      props.setProps({
        value: [angle2value(adjustedState[0] - weight * Math.PI / 50), angle2value(adjustedState[1] + weight * Math.PI / 50)]
      }); // zoom in/out 1 percent

      /*
      if (typeof this.onFinish === "function") {
          this.onFinish()
      }
      */
    }
    /**
     * Components to render the labels.
     */


    function Labels() {
      if (angularDist(adjustedState[0], adjustedState[1]) > Math.PI / 10) {
        var coord_from = angle2tangent(adjustedState[0], parseLength(props.labels_altitude, width));
        var coord_to = angle2tangent(adjustedState[1], parseLength(props.labels_altitude, width));
        var labels = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          key: "0",
          className: "cisl-label cisl-label-from cisl--style",
          style: {
            left: coord_from[0],
            top: coord_from[1],
            transform: "translate(-50%,-100%) rotate(" + adjustedState[0] + "rad)"
          },
          tabIndex: "4",
          onMouseDown: handle_mousedown,
          onTouchStart: handle_mousedown,
          onKeyDown: handle_keydown,
          onWheel: handle_wheel
        }, props.prefix + format_label(valueState[0]) + props.postfix), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          key: "1",
          className: "cisl-label cisl-label-to cisl--style",
          style: {
            left: coord_to[0],
            top: coord_to[1],
            transform: "translate(-50%,-100%) rotate(" + adjustedState[1] + "rad)"
          },
          tabIndex: "5",
          onMouseDown: handle_mousedown,
          onTouchStart: handle_mousedown,
          onKeyDown: handle_keydown,
          onWheel: handle_wheel
        }, props.prefix + format_label(valueState[1]) + props.postfix)];
      } else {
        var angle_from_to = adjustedState[0] + arcLength(adjustedState[0], adjustedState[1]) / 2;
        var coord_from_to = angle2tangent(angle_from_to, parseLength(props.labels_altitude, width));
        var labels = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "cisl-label cisl-label-from-to cisl--style",
          style: {
            left: coord_from_to[0],
            top: coord_from_to[1],
            transform: "translate(-50%,-100%) rotate(" + angle_from_to + "rad)"
          },
          tabIndex: "6",
          onMouseDown: handle_mousedown,
          onTouchStart: handle_mousedown,
          onKeyDown: handle_keydown,
          onWheel: handle_wheel
        }, props.prefix + format_label(valueState[0]) + props.values_sep + format_label(valueState[1]) + props.postfix);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("foreignObject", {
        width: "100%",
        height: "100%"
      }, labels);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Labels, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
      className: "cisl-bar cisl--style",
      fill: "transparent",
      tabIndex: "3",
      strokeWidth: parseLength(props.rails_width, width),
      d: "M " + tangentState[0][0] + " " + tangentState[0][1] + " " + "A " + 0.35 * width + " " + 0.35 * width + " " + "0 " + (arcLength(adjustedState[0], adjustedState[1]) <= Math.PI ? "0 " : "1 ") + "1 " + tangentState[1][0] + " " + tangentState[1][1] + " " + "A " + 0.35 * width + " " + 0.35 * width + " " + "0 " + (arcLength(adjustedState[1], adjustedState[0]) <= Math.PI ? "0 " : "1 ") + "1 " + tangentState[0][0] + " " + tangentState[0][1],
      strokeDasharray: arcLength(adjustedState[0], adjustedState[1]) * 0.35 * width + " " + 2 * Math.PI * 0.35 * width,
      onMouseDown: handle_mousedown,
      onTouchStart: handle_mousedown,
      onKeyDown: handle_keydown,
      onWheel: handle_wheel
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", {
      className: "cisl-handle cisl-handle-from cisl--style",
      tabIndex: "1",
      x: tangentState[0][0],
      y: tangentState[0][1],
      style: {
        transform: "translate(-50%,-50%) rotate(" + adjustedState[0] + "rad)"
      },
      onMouseDown: handle_mousedown,
      onTouchStart: handle_mousedown,
      onKeyDown: handle_keydown,
      onWheel: handle_wheel
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("rect", {
      className: "cisl-handle cisl-handle-to cisl--style",
      tabIndex: "2",
      x: tangentState[1][0],
      y: tangentState[1][1],
      style: {
        transform: "translate(-50%,-50%) rotate(" + adjustedState[1] + "rad)"
      },
      onMouseDown: handle_mousedown,
      onTouchStart: handle_mousedown,
      onKeyDown: handle_keydown,
      onWheel: handle_wheel
    }));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: id,
    className: "circularSlider",
    style: {
      height: width,
      width: width
    },
    ref: cislRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    id: 'svg-' + id,
    className: "cisl-container",
    height: "100%",
    width: "100%"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CislFixedParts, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CislMovingParts, null)));
}
/*
 * Send the new value to the parent component.
 * setProps is a prop that is automatically supplied
 * by dash's front-end ("dash-renderer").
 * In a Dash app, this will update the component's
 * props and send the data back to the Python Dash
 * app server if a callback uses the modified prop as
 * Input or State.
 */

Cisl.propTypes = {
  /**
   * The id of the circular slider.
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * The width (and height); if it's a percentage, it will be relative to the parent element.
   */
  width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * Minimum value taken by the slider.
   */
  min: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,

  /**
   * Maximum value taken by the slider.
   */
  max: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,

  /**
   * The initial value of the 'from' handle.
   */
  step: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,

  /**
   * The total number of breaks in the 'ruler'.
   */
  breaks_n: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,

  /**
   * Put a major break every ... breaks.
   */
  major_breaks_every: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,

  /**
   * The width of the rails.
   */
  rails_width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * The width of the internal bar between the handles.
   */
  bar_width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * The thickness of the border of the rails.
   */
  rails_border_width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * The height of the breaks.
   */
  breaks_altitude: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * The height of the labels.
   */
  labels_altitude: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * The number of digits in the labels.
   */
  digits: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,

  /**
   * The prefix for the labels.
   */
  prefix: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * The postfix for the labels.
   */
  postfix: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * The separator for the labels.
   */
  values_sep: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * Dash-assigned callback that should be called to report property changes
   * to Dash, to make them available for callbacks.
   */
  setProps: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,

  /**
   * Internal state, used by Dash.
   */
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number)
};
Cisl.defaultProps = {
  width: '500px',
  min: 0,
  max: 100,
  value: [0, 25],
  step: 0,
  // DOC: if 0, we've got a continuous slider
  breaks_n: 50,
  major_breaks_every: 5,
  // put a major break (and a label) every x minor breaks
  rails_width: '2%',
  rails_border_width: '0.2%',
  breaks_altitude: '5%',
  labels_altitude: '3.5%',
  digits: 2,
  // how many digits should labels and breaks have
  prefix: '',
  postfix: '',
  values_sep: ':'
};

/***/ })

})
//# sourceMappingURL=8d20e4e-main-wps-hmr.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiI4ZDIwZTRlLW1haW4td3BzLWhtci5qcyIsInNvdXJjZVJvb3QiOiIifQ==