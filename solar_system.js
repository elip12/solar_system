/*
    solar_system.js
    scripts for solar system animation
    Eli Pandolfo

    // the sun is way smaller and closer to the planets than it is in real life, in order
    // to be able to see the sun on the screen along with anything else.
    // Otherwise, all the planets are their correct scaled distances from each other,
    // are the correct size, and rotate and revolve at the correct angular velocities.
*/

// static vars and properties: initial locations and orbits

// unit = the standard unit of distance
// all widths and distances are in terms of unit
var unit
unit = .0001

// time is the rate at which time passes in this universe.
// in our world, time moves at roughly one second per second
var time = 1

// each body is an object with features
// diameter is a multiple of the planet's actual diameter in km

// top and left are always the exact center of the window
// adjusted so that the center of the planet is centered
// instead of the top left corner

// eq is an array of 3 elements:
// the orbital's major axis in km,
// the orbital's minor axis in km,
// and the orbital period in earth days
// distances from the sun are scaled by a factor of .001

// the sun is way smaller and closer to the planets than it is in real life, in order
// to be able to see the sun on the screen along with anything else.
// Otherwise, all the planets are their correct scaled distances from each other,
// are the correct size, and rotate and revolve at the correct angular velocities.
var sun = 
{
    diameter: 100000.0,
    eq: [0, 0, 1],
    rot_period: -3000,
    id: 'sun'
}
var mercury = 
{
    diameter: 4789.0,
    eq: [57.9 * 10**3, 57.9 * 10**3, 88.0],
    rot_period: 1407.6,
    id: 'mercury'
}
var venus =
{   
    diameter: 12104.0,
    eq: [108.2 * 10**3, 108.2 * 10**3, 224.7],
    rot_period: -5832.5,
    id: 'venus'
}
var earth = 
{
    diameter: 12756.0,
    eq: [149.6 * 10**3, 149.6 * 10**3, 365.2],
    rot_period: 23.9,
    id: 'earth'
}
var mars = 
{
    diameter: 6792.0,
    eq: [227.9 * 10**3, 227.9 * 10**3, 687.0],
    rot_period: 24.6,
    id: 'mars'
}
var jupiter = 
{
    diameter: 142984.0,
    eq: [778.6 * 10**3, 778.6 * 10**3, 4331.0],
    rot_period: 9.9,
    id: 'jupiter'
}
var saturn =
{
    diameter: 120536.0,
    eq: [1433.5 * 10**3, 1433.5 * 10**3, 10747.0],
    rot_period: 10.7,
    id: 'saturn'
}
var uranus = 
{
    diameter: 51118.0,
    eq: [2782.5 * 10**3, 2782.5 * 10**3, 30589.0],
    rot_period: 17.2,
    id: 'uranus'
}
var neptune =
{
    diameter: 49528.0,
    eq: [4495.1 * 10**3, 4495.1 * 10**3, 59800.0],
    rot_period: 16.1,
    id: 'neptune'
}

// slider calls this function to resize the dispplay
function resize()
{
    unit = .00001 * document.getElementById('size_slider').value
}

// slider calls this funciton to speed up and slow down time
function retime()
{
    time = 2**(document.getElementById('time_slider').value / 100) - 1
}

// rotates a body about its center
function rotate(body) // can be the sun or planets
{
    var angle = 0
    var interval = setInterval(rotate_element, 10)
    function rotate_element()
    {
        if (angle > 359 || angle < -359)
            angle = 0
        else
        {
            document.getElementById(body.id).style.transform = 'rotate(' + angle + 'deg)'
            angle += 360 / body.rot_period * time
        }
    }
}

// revolves a body about the sun
// the sun uses this function even though it is not a planet
function plot_path(planet)
{
    var angle = 0
    var interval = setInterval(plot_id, 10)

    rotate(planet)
    function plot_id()
    {
        if (angle > 359 || angle < -359)
            angle = 0
        else
        {
            var x = planet.eq[0] * Math.cos(angle) * unit
            var y = planet.eq[1] * Math.sin(angle) * unit

            var d = document.getElementById(planet.id)
            d.style.top = y + window.innerHeight / 2 - (planet.diameter / 2 * unit) + 'px'
            d.style.left = x + window.innerWidth / 2 - (planet.diameter / 2 * unit) + 'px'
            d.style.width = planet.diameter * unit + 'px'
            d.style.height = planet.diameter * unit + 'px'
            angle += 360 / planet.eq[2] * time * .001
        }
    }
}

