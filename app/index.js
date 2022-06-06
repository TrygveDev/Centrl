const { ipcRenderer, app } = require('electron')
const ipc = ipcRenderer
const si = require('systeminformation');
var osu = require('node-os-utils')
var cpu = osu.cpu


document.querySelectorAll('.category').forEach(item => {
    item.style.display = 'none'
})


// STARTING PAGE
var startPage = 'home'
document.getElementById(startPage).style.backgroundColor = '#000000'
document.getElementById(startPage + '-category').style.display = 'block'

// Set window title

// Menu events
document.getElementById('xmark').addEventListener('click', () => {
    ipc.send('closeApp')
})
document.getElementById('minimize').addEventListener('click', () => {
    ipc.send('minimizeApp')
})

// General elements
const specs = document.getElementById('specs')
const usage = document.getElementById('usage')
const home = document.getElementById('home')

// Navbar
document.querySelectorAll('.navitem').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.navitem').forEach(item => {
            item.style.backgroundColor = '#121516'
        })
        button.style.backgroundColor = '#000000'

        document.querySelectorAll('.category').forEach(item => {
            item.style.display = 'none'
        })
    })
})
specs.addEventListener('click', () => {
    document.getElementById('specs-category').style.display = 'block'
})
usage.addEventListener('click', () => {
    document.getElementById('usage-category').style.display = 'block'
})
home.addEventListener('click', () => {
    document.getElementById('home-category').style.display = 'block'
})




// Specs
si.cpu()
    .then(data => {
        document.getElementById('specs-cpu').textContent = data.brand
    })

si.baseboard()
    .then(data => {
        document.getElementById('specs-motherboard').textContent = data.model
    })

si.memLayout()
    .then(data => {
        var size = parseInt(data[0].size / 1000000000)
        document.getElementById('specs-ram').textContent = data.length + "x " + size + "GB " + data[0].type + " " + data[0].clockSpeed + "Mhz"
    })

si.graphics()
    .then(data => {
        document.getElementById('specs-gpu').textContent = data.controllers[0].model
    })

si.diskLayout()
    .then(data => {
        // var disk = [];
        data.forEach(item => {
            var size = item.size / 1000000000000
            // disk.push(" " + item.name + " " + item.type + " " + size.toFixed(1) + "TB")

            var disk = document.createElement('p')
            disk.id = item.name
            disk.className = "selectable"
            document.getElementById('specs-storage').appendChild(disk)
            document.getElementById(item.name).textContent = "Disk " + parseInt(data.indexOf(item) + 1) + ": " + item.name + " " + item.type + " " + size.toFixed(1) + "TB\n"
        })
    })
    .catch(error => console.error(error));

document.querySelectorAll('.selectable').forEach(item => {
    item.addEventListener('click', () => {
        navigator.clipboard.writeText(item.textContent)
        window.getSelection().removeAllRanges()
    })
})



// Usage
function loop() {
    setTimeout(function () {

        // Usage
        cpu.usage()
            .then(data => {
                var cpuUsage = data.toFixed(0)
                document.getElementById('usage-cpu').textContent = cpuUsage + '%'
                document.getElementById('useagebar-cpu').style.width = cpuUsage + '%'
                if (cpuUsage <= 60) {
                    document.getElementById('useagebar-cpu').style.backgroundColor = 'yellowgreen'
                } else if (cpuUsage > 60 && cpuUsage <= 80) {
                    document.getElementById('useagebar-cpu').style.backgroundColor = 'yellow'
                } else if (cpuUsage > 80) {
                    document.getElementById('useagebar-cpu').style.backgroundColor = 'red'
                }
            })

        si.graphics()
            .then(data => {
                var gpuUsage = data.controllers[0].memoryUsed / data.controllers[0].memoryTotal * 100
                document.getElementById('usage-gpu').textContent = gpuUsage.toFixed(0) + '%'
                document.getElementById('useagebar-gpu').style.width = gpuUsage.toFixed(0) + '%'
                if (gpuUsage.toFixed(0) <= 60) {
                    document.getElementById('useagebar-gpu').style.backgroundColor = 'yellowgreen'
                } else if (gpuUsage.toFixed(0) > 60 && gpuUsage.toFixed(0) <= 80) {
                    document.getElementById('useagebar-gpu').style.backgroundColor = 'yellow'
                } else if (gpuUsage.toFixed(0) > 80) {
                    document.getElementById('useagebar-gpu').style.backgroundColor = 'red'
                }
            })

        si.mem()
            .then(data => {
                var usedram = data.used / 1000000000
                var usedtotal = data.total / 1000000000
                var ramUsage = usedram / usedtotal * 100

                document.getElementById('usage-ram').textContent = ramUsage.toFixed(0) + '%'
                document.getElementById('useagebar-ram').style.width = ramUsage.toFixed(0) + '%'
                if (ramUsage.toFixed(0) <= 60) {
                    document.getElementById('useagebar-ram').style.backgroundColor = 'yellowgreen'
                } else if (ramUsage.toFixed(0) > 60 && ramUsage.toFixed(0) <= 80) {
                    document.getElementById('useagebar-ram').style.backgroundColor = 'yellow'
                } else if (ramUsage.toFixed(0) > 80) {
                    document.getElementById('useagebar-ram').style.backgroundColor = 'red'
                }
            })

        loop();
    }, 1500)
}
loop();