import React, { useState } from "react";
import "./styles.css";

const radians = (deg: number) => (deg * Math.PI) / 180;
const toFixed = (num: number, dec = 2) => parseFloat(num.toFixed(dec));

export default function App() {
  const [angle, setAngle] = useState<number>(0);
  const rad = radians(angle);

  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.abs(cos) < 0.0001 ? Infinity : Math.tan(rad);
  const cot = Math.abs(sin) < 0.0001 ? Infinity : cos / sin;
  const sec = Math.abs(cos) < 0.0001 ? Infinity : 1 / cos;
  const csc = Math.abs(sin) < 0.0001 ? Infinity : 1 / sin;

  const quadrant = angle < 90 ? 1 : angle < 180 ? 2 : angle < 270 ? 3 : 4;

  return (
    <div className="App">
      <h1>TrigMaster Visualizer v2</h1>
      <input
        type="range"
        min="0"
        max="360"
        value={angle}
        onChange={(e) => setAngle(Number(e.target.value))}
      />
      <p>
        <strong>Angle: {angle}°</strong>
      </p>
      <p>
        sin: {toFixed(sin)}, cos: {toFixed(cos)}, tan:{" "}
        {tan === Infinity ? "∞" : toFixed(tan)}
      </p>
      <p>
        cosec: {csc === Infinity ? "∞" : toFixed(csc)}, sec:{" "}
        {sec === Infinity ? "∞" : toFixed(sec)}, cot:{" "}
        {cot === Infinity ? "∞" : toFixed(cot)}
      </p>

      <h3>Quadrant: {quadrant}</h3>

      <div className="graph-section">
        {/* Sine Graph */}
        <svg width="360" height="100">
          <path
            d={Array.from(
              { length: 361 },
              (_, deg) =>
                `${deg === 0 ? "M" : "L"} ${deg} ${
                  50 - Math.sin(radians(deg)) * 40
                }`
            ).join(" ")}
            stroke="blue"
            strokeWidth="2"
            fill="none"
          />
          <circle cx={angle} cy={50 - sin * 40} r="3" fill="blue" />
          <text x="5" y="15" fontSize="12" fill="blue">
            sin
          </text>
        </svg>

        {/* Cosine Graph */}
        <svg width="360" height="100">
          <path
            d={Array.from(
              { length: 361 },
              (_, deg) =>
                `${deg === 0 ? "M" : "L"} ${deg} ${
                  50 - Math.cos(radians(deg)) * 40
                }`
            ).join(" ")}
            stroke="green"
            strokeWidth="2"
            fill="none"
          />
          <circle cx={angle} cy={50 - cos * 40} r="3" fill="green" />
          <text x="5" y="15" fontSize="12" fill="green">
            cos
          </text>
        </svg>

        {/* Tangent Graph */}
        <svg width="360" height="100">
          <path
            d={Array.from({ length: 361 }, (_, deg) => {
              const c = Math.cos(radians(deg));
              const t = Math.abs(c) < 0.0001 ? null : Math.tan(radians(deg));
              const y =
                t !== null ? 50 - Math.max(-2, Math.min(2, t)) * 20 : null;
              return y !== null ? `${deg === 0 ? "M" : "L"} ${deg} ${y}` : "";
            }).join(" ")}
            stroke="orange"
            strokeWidth="2"
            fill="none"
          />
          {Math.abs(cos) > 0.0001 && (
            <circle
              cx={angle}
              cy={50 - Math.max(-2, Math.min(2, tan)) * 20}
              r="3"
              fill="orange"
            />
          )}
          <text x="5" y="15" fontSize="12" fill="orange">
            tan
          </text>
        </svg>

        {/* Secant Graph */}
        <svg width="360" height="100">
          <path
            d={Array.from({ length: 361 }, (_, deg) => {
              const c = Math.cos(radians(deg));
              const s = Math.abs(c) < 0.0001 ? null : 1 / c;
              const y =
                s !== null ? 50 - Math.max(-2, Math.min(2, s)) * 20 : null;
              return y !== null ? `${deg === 0 ? "M" : "L"} ${deg} ${y}` : "";
            }).join(" ")}
            stroke="purple"
            strokeWidth="2"
            fill="none"
          />
          {Math.abs(cos) > 0.0001 && (
            <circle
              cx={angle}
              cy={50 - Math.max(-2, Math.min(2, sec)) * 20}
              r="3"
              fill="purple"
            />
          )}
          <text x="5" y="15" fontSize="12" fill="purple">
            sec
          </text>
        </svg>

        {/* Cosecant Graph */}
        <svg width="360" height="100">
          <path
            d={Array.from({ length: 361 }, (_, deg) => {
              const s = Math.sin(radians(deg));
              const y =
                Math.abs(s) < 0.0001
                  ? null
                  : 50 - Math.max(-2, Math.min(2, 1 / s)) * 20;
              return y !== null ? `${deg === 0 ? "M" : "L"} ${deg} ${y}` : "";
            }).join(" ")}
            stroke="teal"
            strokeWidth="2"
            fill="none"
          />
          {Math.abs(sin) > 0.0001 && (
            <circle
              cx={angle}
              cy={50 - Math.max(-2, Math.min(2, csc)) * 20}
              r="3"
              fill="teal"
            />
          )}
          <text x="5" y="15" fontSize="12" fill="teal">
            cosec
          </text>
        </svg>

        {/* Cotangent Graph */}
        <svg width="360" height="100">
          <path
            d={Array.from({ length: 361 }, (_, deg) => {
              const s = Math.sin(radians(deg));
              const y =
                Math.abs(s) < 0.0001
                  ? null
                  : 50 -
                    Math.max(-2, Math.min(2, Math.cos(radians(deg)) / s)) * 20;
              return y !== null ? `${deg === 0 ? "M" : "L"} ${deg} ${y}` : "";
            }).join(" ")}
            stroke="red"
            strokeWidth="2"
            fill="none"
          />
          {Math.abs(sin) > 0.0001 && (
            <circle
              cx={angle}
              cy={50 - Math.max(-2, Math.min(2, cot)) * 20}
              r="3"
              fill="red"
            />
          )}
          <text x="5" y="15" fontSize="12" fill="red">
            cot
          </text>
        </svg>
      </div>

      <hr />
      <h2>🧠 Quick Quiz: Signs of Trig Functions</h2>
      <p>
        At angle <strong>{angle}°</strong>, which of these is positive?
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {["sin", "cos", "tan", "sec", "cosec", "cot"].map((fn) => {
          const isCorrect =
            (quadrant === 1 &&
              ["sin", "cos", "tan", "sec", "cosec", "cot"].includes(fn)) ||
            (quadrant === 2 && ["sin", "cosec"].includes(fn)) ||
            (quadrant === 3 && ["tan", "cot"].includes(fn)) ||
            (quadrant === 4 && ["cos", "sec"].includes(fn));

          return (
            <button
              key={fn}
              onClick={() =>
                alert(
                  isCorrect
                    ? `✅ Yes! ${fn} is positive in Quadrant ${quadrant}.`
                    : `❌ Nope! ${fn} is not positive in Quadrant ${quadrant}.`
                )
              }
              style={{ padding: "8px 12px", fontSize: "14px" }}
            >
              {fn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
