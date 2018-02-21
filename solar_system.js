/*
    scripts for solar system animation
    Eli Pandolfo

    to ensure accuracy, all diameters, distances, rotational periods, and orbital periods
    are all accurate, and are scaled to the size of the model when they are rendered.

    The only exception to this is the sun, because if the sun were small enough
    that the other planets were displayed in the window, they would all be less
    than 1 pixel in diameter. The sun is smaller than it should be by a factor of
    X, and all planets are closer to the sun than they should be by a factor of Y.

    FILL X AND Y

    file:///Users/Eli/Desktop/coding/js/solar_system.html
*/

// static vars and properties: initial locations and orbits

// unit = the standard unit of distance
// all widths and distances are in terms of unit
var unit = .001

// time is the rate at which time passes in this universe.
// in our world, time moves at roughly one second per second
var time = 10

// eventually, unit and time will be controlled by sliders.

// each body is an object with features
// diameter is in terms of unit, and is 
// a multiple of the planet's actual diameter in km

// top and left are always the exact center of the window
// adjusted so that the center of the planet is centered
// instead of the top left corner

// eq is an array of 3 elements:
// the orbital's major axis in km,
// the orbital's minor axis in km,
// and the orbital period in earth days
// distances from the sun are scaled by a factor of .001
var sun = 
{
    diameter: 100000.0 * unit, //this is not accurate
    top: window.innerHeight/2.0 - (100000.0/2.0 * unit),
    left: window.innerWidth/2.0 - (100000.0/2.0 * unit),
    eq: null,
    rot_period: -3000,
    id: 'sun'
}
var mercury = 
{
    diameter: 4789.0 * unit,
    top: window.innerHeight/2.0 - (4789.0/2.0 * unit),
    left: window.innerWidth/2.0 - (4789.0/2.0 * unit),
    eq: [57.9 * 10**3 * unit, 57.9 * 10**3 * unit, 88.0],
    rot_period: 1407.6,
    id: 'mercury'
}
var venus =
{   
    diameter: 12104.0 * unit,
    top: window.innerHeight/2.0 - (12104.0/2.0 * unit),
    left: window.innerWidth/2.0 - (12104.0/2.0 * unit),
    eq: [108.2 * 10**3 * unit, 108.2 * 10**3 * unit, 224.7],
    rot_period: -5832.5,
    id: 'venus'
}
var earth = 
{
    diameter: 12756.0 * unit,
    top: window.innerHeight/2.0 - (12756.0/2.0 * unit),
    left: window.innerWidth/2.0 - (12756.0/2.0 * unit),
    eq: [149.6 * 10**3 * unit, 149.6 * 10**3 * unit, 365.2],
    rot_period: 23.9,
    id: 'earth'
}
var mars = 
{
    diameter: 6792.0 * unit,
    top: window.innerHeight/2.0 - (6792.0/2.0 * unit),
    left: window.innerWidth/2.0 - (6792.0/2.0 * unit),
    eq: [227.9 * 10**3 * unit, 227.9 * 10**3 * unit, 687.0],
    rot_period: 24.6,
    id: 'mars'
}
var jupiter = 
{
    diameter: 142984.0 * unit,
    top: window.innerHeight/2.0 - (142984.0/2.0 * unit),
    left: window.innerWidth/2.0 - (142984.0/2.0 * unit),
    eq: [778.6 * 10**3 * unit, 778.6 * 10**3 * unit, 4331.0],
    rot_period: 9.9,
    id: 'jupiter'
}
var saturn =
{
    diameter: 120536.0 * unit,
    top: window.innerHeight/2.0 - (120536.0/2.0 * unit),
    left: window.innerWidth/2.0 - (120536.0/2.0 * unit),
    eq: [1433.5 * 10**3 * unit, 1433.5 * 10**3 * unit, 10747.0],
    rot_period: 10.7,
    id: 'saturn'
}
var uranus = 
{
    diameter: 51118.0 * unit,
    top: window.innerHeight/2.0 - (51118.0/2 * unit),
    left: window.innerWidth/2.0 - (51118.0/2 * unit),
    eq: [2782.5 * 10**3 * unit, 2782.5 * 10**3 * unit, 30589.0],
    rot_period: 17.2,
    id: 'uranus'
}
var neptune =
{
    diameter: 49528.0 * unit,
    top: window.innerHeight/2.0 - (49528.0/2 * unit),
    left: window.innerWidth/2.0 - (49582.0/2 * unit),
    eq: [4495.1 * 10**3 * unit, 4495.1 * 10**3 * unit, 59800.0],
    rot_period: 16.1,
    id: 'neptune'
}

//planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune]

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
            var x = planet.eq[0] * Math.cos(angle)
            var y = planet.eq[1] * Math.sin(angle)

            // d stands for displayed
            var d = document.getElementById(planet.id)
            d.style.top = y + planet.top + 'px'
            d.style.left = x + planet.left + 'px'
            d.style.width = planet.diameter + 'px'
            d.style.height = planet.diameter + 'px'
            angle += 360 / planet.eq[2] * time * .001
        }
    }
}

function init_sun()
{
    var d_sun = document.getElementById(sun.id)
    d_sun.style.top = sun.top + 'px'
    d_sun.style.left = sun.left + 'px'
    d_sun.style.width = sun.diameter + 'px'
    d_sun.style.height = sun.diameter + 'px'
    rotate(sun)
}
