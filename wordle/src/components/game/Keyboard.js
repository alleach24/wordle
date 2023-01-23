import React from 'react'

export default function Keyboard({ usedKeys }) {
  return (
    <div>
        <div id="keyboard-container">
            <div className="keyboard-row">
                <button className={`keyboard-button ${usedKeys['q']}`}>q</button>
                <button className={`keyboard-button ${usedKeys['w']}`}>w</button>
                <button className={`keyboard-button ${usedKeys['e']}`}>e</button>
                <button className={`keyboard-button ${usedKeys['r']}`}>r</button>
                <button className={`keyboard-button ${usedKeys['t']}`}>t</button>
                <button className={`keyboard-button ${usedKeys['y']}`}>y</button>
                <button className={`keyboard-button ${usedKeys['u']}`}>u</button>
                <button className={`keyboard-button ${usedKeys['i']}`}>i</button>
                <button className={`keyboard-button ${usedKeys['o']}`}>o</button>
                <button className={`keyboard-button ${usedKeys['p']}`}>p</button>
            </div>
            <div className="keyboard-row">
                <button className={`keyboard-button ${usedKeys['a']}`}>a</button>
                <button className={`keyboard-button ${usedKeys['s']}`}>s</button>
                <button className={`keyboard-button ${usedKeys['d']}`}>d</button>
                <button className={`keyboard-button ${usedKeys['f']}`}>f</button>
                <button className={`keyboard-button ${usedKeys['g']}`}>g</button>
                <button className={`keyboard-button ${usedKeys['h']}`}>h</button>
                <button className={`keyboard-button ${usedKeys['j']}`}>j</button>
                <button className={`keyboard-button ${usedKeys['k']}`}>k</button>
                <button className={`keyboard-button ${usedKeys['l']}`}>l</button>
            </div>
            <div className="keyboard-row">
                <button className="keyboard-button">Enter</button>
                <button className={`keyboard-button ${usedKeys['z']}`}>z</button>
                <button className={`keyboard-button ${usedKeys['x']}`}>x</button>
                <button className={`keyboard-button ${usedKeys['c']}`}>c</button>
                <button className={`keyboard-button ${usedKeys['v']}`}>v</button>
                <button className={`keyboard-button ${usedKeys['b']}`}>b</button>
                <button className={`keyboard-button ${usedKeys['n']}`}>n</button>
                <button className={`keyboard-button ${usedKeys['m']}`}>m</button>
                <button className="keyboard-button">Del</button>
            </div>
        </div>
    </div>
  )
}
