import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./DashCisl.react.css";

const CIRCLE = 360;

const CislViewBox = "-250 -250 500 500";
const CislRadius = 175;
/* The start of the circle is at the top, not to the left.
   This corresponds to an initial rotation of 90deg */
const CislInitialRotation = CIRCLE / 4;

/**
 * Implement the modulo operation
 *
 * @return The modulo, not the usual remainder that javascript has.
 */
Math.mod = function (x, y) {
  if ((x >= 0 && y >= 0) || (x < 0 && y < 0)) {
    return x % y;
  } else {
    return (x % y) + y;
  }
};

/**
 * Given an angle, return the closest admissible value, considering the  step
 */
function angle2value(angle, min, max, step) {
  angle = Math.mod(angle, CIRCLE);
  const value = min + (angle * (max - min)) / CIRCLE;
  return sanitize_value(value, min, max, step);
}
/**
 * Given a value, return the corresponding angle
 *
 * When moving with the arrow keys, it may happen that one keypress
 * moves the value to something bigger than the maximum value (even
 * more than twice as big). Thus, its necessary to bring the value
 * within the acceptable range first.
 */
function value2angle(value, min, max, step) {
  const angle = CIRCLE * (sanitize_value(value, min, max, step) - min) / (max - min);
  return Math.mod(angle, CIRCLE);
}

/**
 * Make sure that the angle is safe and sound
 *
 * First, when dragging the bar it may happen that angle < 0 or
 * angle > 2pi because of the slice, so we correct this. Second, if
 * we have a step, we make sure that the angle is allowed.
 */
function sanitize_angle(angle, min, max, step) {
  return value2angle(angle2value(angle, min, max, step), min, max, step);
}

/**
 * Make sure that the value is safe and sound
 *
 * Check that it's within the (min, max) range and that, if step > 0,
 * the value respects the step.
 */
function sanitize_value(value, min, max, step) {
  value = Math.mod(value - min, max - min) + min;
  if (!step) {
    return value;
  }
  return step * Math.round(value / step);
}

/**
 * Increment a value by weight
 *
 * If step > 0, increment by weight steps, otherwise increment by weight%.
 */
function increment_value(value, weight, min, max, step) {
  var new_value;
  if (step) {
    new_value = value + weight * step;
  } else {
    new_value = value + (weight * (max - min)) / 100;
  }
  return sanitize_value(new_value, min, max, step);
}

/**
 * Given the angle, get the coordinates on the circumference
 */
function angle2tangent(angle) {
  return [
    CislRadius *
      Math.cos(((angle - CislInitialRotation) / CIRCLE) * 2 * Math.PI),
    CislRadius *
      Math.sin(((angle - CislInitialRotation) / CIRCLE) * 2 * Math.PI),
  ];
}

/**
 * Given the coordinates of an external point, get the angle
 *
 * When the pointer is in a certain position, we want to know the
 * angle at which it lies with respect to the center of the circle.
 */
function external2angle(x, y) {
  return CislInitialRotation + ((Math.atan2(y, x) / Math.PI) * CIRCLE) / 2;
}

/**
 * Compute the distance between two angles
 *
 * @return The distance along the shortest path along the circumference
 * (in any direction).
 */
var angularDist = function (a, b) {
  return Math.min(Math.mod(b - a, CIRCLE), Math.mod(a - b, CIRCLE));
};

/**
 * Format the label
 */
function format_label(n, digits = 0) {
  return n.toFixed(digits);
}

/**
 * Compute the length of an arc
 *
 * @return The length going in the direction from->to.
 */
function arcLength(from, to) {
  return Math.mod(to - from, CIRCLE);
}

/**
 * Generate a unique ID for an html element
 *
 * https://stackoverflow.com/questions/61282153/simplest-way-to-generate-unique-id-onto-a-value-grabbed-from-a-form-react
 */
let uniqueId = (function () {
  let num = 0;
  return function (prefix) {
    prefix = String(prefix) || "";
    num += 1;
    return prefix + num;
  };
})();

/**
 * Cisl
 *
 * A circular slider component. Features and customisation are somewhat limited
 * to what I need for my work. It has two handles which can be moved either
 * independently or at the same time (to shift the whole range). Handes can also
 * be moved with arrow keys, WASD keys, or the mouse wheel.
 */
export default function DashCisl(props) {
  // Validate step size
  if (props.max <= props.min) {
    throw Error("Invalid range. Please make sure that min < max.");
  } else if (props.step && (props.max - props.min) / props.step < 3) {
    throw Error(
      "Not enough steps: at least three are required; " +
        "either increase the range of the slider or decrease the step size.",
    );
  } else if (
    props.step != null &&
    (props.max - props.min) / props.step < props.breaks_n
  ) {
    throw Error(
      "Step size too big or not enough breaks; " +
        "you can decrease the range of the slider, increase `step', or decrease `breaks_n.",
    );
  }

  const { id = uniqueId("cisl-"), setProps, value, min, max, step } = props;
  const svg = useRef();
  const [moving, setMoving] = useState({ handle: null, offset: 0 });

  useEffect(() => {
    /* The `wheel` event is *passive* by default. This means that
       preventDefault() is useless and the page will be scrolled
       anyway. We want to avoid scrolling the page, so the event must
       be active. However, react doesn't allow us to do so. F! We have
       to add the event listener with addEventListener().
       https://github.com/facebook/react/issues/14856 */
    if (svg && svg.current) {
      svg.current.addEventListener(
        "wheel",
        (e) => {
          // zoom in/out 1 percent
          e.preventDefault();
          const current_value = e.currentTarget.dataset.value.split(",");
          const weight = 0.3 * e.deltaY;
          const new_value_from = increment_value(
            parseFloat(current_value[0]),
            -weight,
            min,
            max,
            step,
          );
          const new_value_to = increment_value(
            parseFloat(current_value[1]),
            weight,
            min,
            max,
            step,
          );
          setProps({ ...props, value: [new_value_from, new_value_to] });
        },
        { capture: false, passive: false },
      );
    }
  }, []);

  const handle_mousedown = (e) => {
    for (let cls of ["cisl-from", "cisl-to"]) {
      if (e.target.classList.contains(cls)) {
        setMoving({ handle: cls, offset: 0 });
        break;
      }
    }
    if (e.target.classList.contains("cisl-from-to")) {
      const { clientX, clientY } = e;
      const { x, y, width, height } = svg.current.getBoundingClientRect();
      const cx = x + width / 2;
      const cy = y + height / 2;
      const mouse_angle = external2angle(clientX - cx, clientY - cy);
      const offset = angularDist(
        value2angle(value[0], min, max, step),
        mouse_angle,
      );
      setMoving({ handle: "cisl-from-to", offset: offset });
    }
  };
  const handle_mouseup = () => {
    if (moving.handle) {
      setMoving({ handle: null, offset: 0 });
    }
  };
  const handle_mousemove = (e) => {
    if (!moving.handle) {
      return;
    }
    // We convert the coordinates from viewport to SVG viewbox
    // TODO: precompute this
    const { x, y, width, height } = svg.current.getBoundingClientRect();
    const cx = x + width / 2;
    const cy = y + height / 2;
    // Now we need the angle made by the mouse and the center
    const { clientX, clientY } = e;
    const mouse_angle = external2angle(clientX - cx, clientY - cy);
    if (moving.handle === "cisl-from") {
      const new_value = angle2value(mouse_angle, min, max, step);
      setProps({ ...props, value: [new_value, value[1]] });
    } else if (moving.handle === "cisl-to") {
      const new_value = angle2value(mouse_angle, min, max, step);
      setProps({ ...props, value: [value[0], new_value] });
    } else if (moving.handle === "cisl-from-to") {
      const new_value_from = angle2value(
        mouse_angle - moving.offset,
        min,
        max,
        step,
      );
      const new_value_to = sanitize_value(
        new_value_from + value[1] - value[0],
        min,
        max,
        step,
      );
      setProps({ ...props, value: [new_value_from, new_value_to] });
    } else {
      console.error("This event shouldn't exist.");
    }
  };
  const handle_keydown = (e) => {
    var scale, weight;
    switch (e.which) {
      // up
      case 38: // up arrow
      case 87: // W
        scale = true;
        weight = -1;
        break;
      // left
      case 37: // left arrow
      case 65: // A
        scale = false;
        weight = -1;
        break;
      // down
      case 40: // down arrow
      case 83: // S
        scale = true;
        weight = 1;
        break;
      // right
      case 39: // right arrow
      case 68: // D
        scale = false;
        weight = 1;
        break;
      default:
        return;
    }
    if (scale) {
      let new_value_from = increment_value(value[0], -weight, min, max, step);
      let new_value_to = increment_value(value[1], weight, min, max, step);
      setProps({ ...props, value: [new_value_from, new_value_to] });
    } else {
      if (e.target.classList.contains("cisl-from")) {
        let new_value = increment_value(value[0], weight, min, max, step);
        setProps({ ...props, value: [new_value, value[1]] });
      } else if (e.target.classList.contains("cisl-to")) {
        let new_value = increment_value(value[1], weight, min, max, step);
        setProps({ ...props, value: [value[0], new_value] });
      } else if (e.target.classList.contains("cisl-from-to")) {
        let new_value_from = increment_value(value[0], weight, min, max, step);
        let new_value_to = sanitize_value(
          new_value_from + value[1] - value[0],
          min,
          max,
          step,
        );
        setProps({ ...props, value: [new_value_from, new_value_to] });
      }
    }
  };
  return (
    <svg
      ref={svg}
      id={id}
      viewBox={CislViewBox}
      xmlns="http://www.w3.org/2000/svg"
      className="cisl-container"
      data-value={value}
      onMouseDown={handle_mousedown}
      onMouseMove={handle_mousemove}
      onMouseUp={handle_mouseup}
      onKeyDown={handle_keydown}
    >
      <defs>
        <rect
          id="cisl-tick-major"
          className="cisl-tick-major cisl--style"
          x="0"
          y="0"
          style={{
            transformBox: "fill-box",
            transform: "translate(-50%)",
          }}
        />
        <rect
          id="cisl-tick-minor"
          className="cisl-tick-minor cisl--style"
          x="0"
          y="0"
          style={{
            transformBox: "fill-box",
            transform: "translate(-50%)",
          }}
        />
        <rect
          id="cisl-handle-from"
          className="cisl-handle cisl-from cisl--style"
          tabIndex="0"
          x="0"
          y="0"
          width={props.rails_width + 2 * props.rails_border_width}
          height={props.rails_width + 2 * props.rails_border_width}
          style={{
            transformBox: "fill-box",
            transform: "translate(-50%, -50%)",
          }}
        />
        <rect
          id="cisl-handle-to"
          className="cisl-handle cisl-to cisl--style"
          tabIndex="0"
          x="0"
          y="0"
          width={props.rails_width + 2 * props.rails_border_width}
          height={props.rails_width + 2 * props.rails_border_width}
          style={{
            transformBox: "fill-box",
            transform: "translate(-50%, -50%)",
          }}
        />
      </defs>
      <CislFixedParts {...props} />
      <CislMovingParts {...props} />
    </svg>
  );
}

function CislFixedParts(props) {
  const {
    rails_width,
    rails_border_width,
    breaks_n,
    major_breaks_every,
    breaks_altitude,
    min,
    max,
    step,
    digits,
  } = props;
  const inner_radius = CislRadius - (rails_width + rails_border_width) / 2;
  const ticks = [];
  const breaks = [];
  for (let i = 0; i < breaks_n; ++i) {
    const angle = sanitize_angle((i * CIRCLE) / breaks_n, min, max, step);
    if (i % major_breaks_every === 0) {
      ticks.push(
        <use
          href="#cisl-tick-major"
          key={i}
          transform={`rotate(${angle}) translate(0, -${inner_radius})`}
        />,
      );
      breaks.push(
        <text
          key={i}
          className="cisl-text cisl-break-major cisl--style"
          x="0"
          y="0"
          transform={`rotate(${angle}) translate(0, -${inner_radius - breaks_altitude})`}
        >
          {format_label(angle2value(angle, min, max, step), digits)}
        </text>,
      );
    } else {
      ticks.push(
        <use
          href="#cisl-tick-minor"
          key={i}
          transform={`rotate(${angle}) translate(0, -${inner_radius})`}
        />,
      );
    }
  }
  return (
    <>
      <circle
        className="cisl-rails-border cisl--style"
        cx="0"
        cy="0"
        r={CislRadius}
        fill="transparent"
        strokeWidth={rails_width + rails_border_width}
      />
      <circle
        className="cisl-rails cisl--style"
        cx="0"
        cy="0"
        r={CislRadius}
        fill="transparent"
        strokeWidth={rails_width}
      />
      {ticks}
      {breaks}
    </>
  );
}

function CislMovingParts(props) {
  const {
    rails_width,
    value,
    min,
    max,
    step,
    labels_altitude,
    prefix,
    postfix,
    values_sep,
    digits,
  } = props;
  const angle_from = value2angle(value[0], min, max, step);
  const angle_to = value2angle(value[1], min, max, step);
  const circle_coord_from = angle2tangent(angle_from);
  const circle_coord_to = angle2tangent(angle_to);
  var labels;
  if (angularDist(angle_from, angle_to) > CIRCLE / 20) {
    labels = (
      <>
        <CislLabel
          angle={angle_from}
          radius={CislRadius + labels_altitude}
          text={`${prefix}${format_label(value[0], digits)}${postfix}`}
          cls="cisl-text cisl-label cisl-from cisl--style"
        />
        <CislLabel
          angle={angle_to}
          radius={CislRadius + labels_altitude}
          text={`${prefix}${format_label(value[1], digits)}${postfix}`}
          cls="cisl-text cisl-label cisl-to cisl--style"
        />
      </>
    );
  } else {
    labels = (
      <>
        <CislLabel
          angle={angle_from + arcLength(angle_from, angle_to) / 2}
          radius={CislRadius + labels_altitude}
          text={`${prefix}${format_label(value[0], digits)}${values_sep}${format_label(value[1], digits)}${postfix}`}
          cls="cisl-text cisl-label cisl-from-to cisl--style"
        />
      </>
    );
  }
  return (
    <>
      {labels}
      <path
        className="cisl-bar cisl-from-to cisl--style"
        fill="transparent"
        tabIndex="0"
        strokeWidth={rails_width}
        style={{ outline: "none" }}
        d={`
            M ${circle_coord_from[0]} ${circle_coord_from[1]}
            A ${CislRadius} ${CislRadius} 0 ${arcLength(angle_from, angle_to) < CIRCLE / 2 ? 0 : 1} 1 ${circle_coord_to[0]} ${circle_coord_to[1]}
          `}
      />
      {/* The class attribute on <use> elements doesn't change the style, but it's needed for event handling */}
      <use
        xlinkHref="#cisl-handle-from"
        className="cisl-handle cisl-from"
        transform={`rotate(${angle_from}) translate(0, -${CislRadius})`}
      />
      <use
        xlinkHref="#cisl-handle-to"
        className="cisl-handle cisl-to"
        transform={`rotate(${angle_to}) translate(0, -${CislRadius})`}
      />
    </>
  );
}

function CislLabel({ angle, radius, text, cls }) {
  /* width and height of the foreign must be > 0, otherwise the element is not displayed in some browsers */
  return (
    <foreignObject
      x="0"
      y="0"
      width="1"
      height="1"
      transform={`rotate(${angle}) translate(0, -${radius})`}
      style={{ overflow: "visible" }}
    >
      <div
        className={cls}
        tabIndex="0"
        style={{ position: "fixed", transform: "translate(-50%, -50%)" }}
      >
        {text}
      </div>
    </foreignObject>
  );
}

DashCisl.propTypes = {
  /**
   * The id of the circular slider.
   */
  id: PropTypes.string,
  /**
   * Minimum value taken by the slider.
   */
  min: PropTypes.number,
  /**
   * Maximum value taken by the slider.
   */
  max: PropTypes.number,
  /**
   * The initial value of the 'from' handle.
   */
  step: PropTypes.number,
  /**
   * The total number of breaks in the 'ruler'.
   */
  breaks_n: PropTypes.number,
  /**
   * Put a major break every ... breaks.
   */
  major_breaks_every: PropTypes.number,
  /**
   * The width of the rails.
   */
  rails_width: PropTypes.number,
  /**
   * The thickness of the border of the rails.
   */
  rails_border_width: PropTypes.number,
  /**
   * The height of the breaks.
   */
  breaks_altitude: PropTypes.number,
  /**
   * The height of the labels.
   */
  labels_altitude: PropTypes.number,
  /**
   * The number of digits in the labels.
   */
  digits: PropTypes.number,
  /**
   * The prefix for the labels.
   */
  prefix: PropTypes.string,
  /**
   * The postfix for the labels.
   */
  postfix: PropTypes.string,
  /**
   * The separator for the labels.
   */
  values_sep: PropTypes.string,
  /**
   * Dash-assigned callback that should be called to report property changes
   * to Dash, to make them available for callbacks.
   */
  setProps: PropTypes.func,
  /**
   * Internal state, used by Dash.
   */
  value: PropTypes.arrayOf(PropTypes.number),
};

DashCisl.defaultProps = {
  min: 0,
  max: 100,
  value: [0, 25],
  step: 0, // DOC: if 0, we've got a continuous slider
  breaks_n: 50,
  major_breaks_every: 5, // put a major break (and a label) every x minor breaks
  rails_width: 10,
  rails_border_width: 2,
  breaks_altitude: 25,
  labels_altitude: 25,
  digits: 2, // how many digits should labels and breaks have
  prefix: "",
  postfix: "",
  values_sep: ":",
};
