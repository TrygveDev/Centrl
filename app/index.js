const { ipcRenderer, app } = require('electron')
const shell = require('electron').shell;
const ipc = ipcRenderer
const si = require('systeminformation');


document.querySelectorAll('.category').forEach(item => {
    item.style.display = 'none'
})


// STARTING PAGE
var startPage = 'home'
document.getElementById(startPage).style.backgroundColor = '#000000'
document.getElementById(startPage + '-category').style.display = 'flex'

// Menu events
document.getElementById('xmark').addEventListener('click', () => {
    ipc.send('closeApp')
})
document.getElementById('minimize').addEventListener('click', () => {
    ipc.send('minimizeApp')
})
document.getElementById('settings').addEventListener('click', () => {

})

// Functions
function popup(t, c) {
    var template = document.getElementById('popup-template');
    var clone = template.content.cloneNode(true);
    clone.getElementById('popup-text').textContent = t;
    clone.getElementById('popup').style.backgroundColor = c;
    document.getElementById('popup-feed').appendChild(clone);


    setTimeout(() => {
        document.getElementById('popup').style.animation = 'none';
        document.getElementById('popup').style.animation = 'faderout 0.25s linear';
        setTimeout(() => {
            document.getElementById('popup-feed').removeChild(document.getElementById('popup'))
        }, 250)
    }, 4750)
}


// General elements
const specs = document.getElementById('specs')
const usage = document.getElementById('usage')
const home = document.getElementById('home')
const cooling = document.getElementById('cooling')
const power = document.getElementById('power')
const processes = document.getElementById('processes')
const settings = document.getElementById('settings')

// Navbar
document.querySelectorAll('.navitem').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.navitem').forEach(item => {
            if (item.id != 'settings') item.style.backgroundColor = '#121516'
        })
        if (button.id != 'settings') button.style.backgroundColor = '#000000'

        document.querySelectorAll('.category').forEach(item => {
            item.style.display = 'none'
        })
    })
})



var currentPage = startPage;

specs.addEventListener('click', () => {
    document.getElementById('specs-category').style.display = 'flex'
    currentPage = 'specs';
})
usage.addEventListener('click', () => {
    document.getElementById('usage-category').style.display = 'block'
    if (currentPage != 'usage') {
        currentPage = 'usage';
        updateCPU();
        updateGra();
        updateMem();
        updatePro();
        updateNet();
        updateDis();
    }
})
home.addEventListener('click', () => {
    document.getElementById('home-category').style.display = 'block'
    if (currentPage != 'home') {
        currentPage = 'home';
    }

})
cooling.addEventListener('click', () => {
    document.getElementById('cooling-category').style.display = 'block'
    if (currentPage != 'cooling') {
        currentPage = 'cooling';
        popup('CPU temp is inaccurate!', 'orange')
        updateCPUTemp()
        updateGPUTemp()
    }
})
power.addEventListener('click', () => {
    document.getElementById('power-category').style.display = 'block'
    if (currentPage != 'power') {
        currentPage = 'power';
        popup("Power is under development.", "orange")
    }

})
processes.addEventListener('click', () => {
    document.getElementById('processes-category').style.display = 'block'
    if (currentPage != 'processes') {
        currentPage = 'processes';
        popup("Processes is under development.", "orange")
    }

})
settings.addEventListener('click', () => {
    document.getElementById('settings-category').style.display = 'flex'
    currentPage = 'settings';
    document.querySelectorAll('.settings-menu-item').forEach(item => {
        item.style.backgroundColor = "rgb(18, 21, 22)";
    })
    document.getElementById('menu-item-general').style.backgroundColor = "#000"
})

// Settings
document.getElementById('menu-item-general').style.backgroundColor = "#000"
document.querySelectorAll('.settings-menu-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.settings-menu-item').forEach(item => {
            item.style.backgroundColor = "rgb(18, 21, 22)";
        })
        item.style.backgroundColor = "#000";
    })
})

// Home
document.getElementById('reportbug').addEventListener('click', (e) => {
    e.preventDefault();
    shell.openExternal("https://github.com/TrygveDev/Centrl/issues");
})
document.getElementById('requestfeature').addEventListener('click', (e) => {
    e.preventDefault();
    shell.openExternal("https://github.com/TrygveDev/Centrl/issues");
})


// Specs
const cpuDiv = document.getElementById('cpuDiv')
const motherboardDiv = document.getElementById('motherboardDiv')
const ramDiv = document.getElementById('ramDiv')
const gpuDiv = document.getElementById('gpuDiv')
const storageDiv = document.getElementById('storageDiv');

cpuDiv.style.backgroundColor = 'black'

document.getElementById('details-cpu').style.display = "block";

si.cpu()
    .then(data => {
        document.getElementById('apiloader-cpu').style.display = "none";
        document.getElementById('apiloader-details-cpu').style.display = "none";
        document.getElementById('details-data-loading-cpu').style.display = "block";

        document.getElementById('specs-cpu').textContent = data.brand

        document.getElementById('cpu-model').textContent = data.brand
        document.getElementById('cpu-manufacturer').textContent = data.manufacturer
        document.getElementById('cpu-socket').textContent = data.socket
        document.getElementById('cpu-speed').textContent = data.speed + " GHz"
        document.getElementById('cpu-cores').textContent = data.cores
        document.getElementById('cpu-physicalcores').textContent = data.physicalCores
        document.getElementById('cpu-modelnumber').textContent = data.model
        document.getElementById('cpu-family').textContent = data.family

        cpuDiv.addEventListener('click', () => {
            document.querySelectorAll('.item-details-container').forEach(item => {
                item.style.display = 'none'
            })
            document.getElementById('details-cpu').style.display = 'block';
            document.querySelectorAll('.specs-item').forEach(item => {
                item.style.backgroundColor = '#121516'
            })
            document.getElementById('cpuDiv').style.backgroundColor = 'black'
        })
    })

si.baseboard()
    .then(data => {
        document.getElementById('apiloader-motherboard').style.display = "none";
        document.getElementById('apiloader-details-motherboard').style.display = "none";
        document.getElementById('details-data-loading-motherboard').style.display = "block";
        document.getElementById('specs-motherboard').textContent = data.model

        document.getElementById('motherboard-model').textContent = data.model
        document.getElementById('motherboard-manufacturer').textContent = data.manufacturer
        document.getElementById('motherboard-memoryslots').textContent = data.memSlots
        document.getElementById('motherboard-serial').textContent = data.serial
        document.getElementById('motherboard-version').textContent = data.version

        motherboardDiv.addEventListener('click', () => {
            document.querySelectorAll('.item-details-container').forEach(item => {
                item.style.display = 'none'
            })
            document.getElementById('details-motherboard').style.display = 'block';
            document.querySelectorAll('.specs-item').forEach(item => {
                item.style.backgroundColor = '#121516'
            })
            document.getElementById('motherboardDiv').style.backgroundColor = 'black'
        })
    })

si.memLayout()
    .then(data => {
        document.getElementById('apiloader-ram').style.display = "none";
        document.getElementById('apiloader-details-ram').style.display = "none";
        document.getElementById('details-data-loading-ram').style.display = "block";
        var size = (data[0].size / 1024 / 1024 / 1024).toFixed(0)
        document.getElementById('specs-ram').textContent = data.length + "x " + size + "GB " + data[0].type + " " + data[0].clockSpeed + "Mhz"

        data.forEach((item) => {
            var template = document.getElementById('details-ram-template');
            var clone = template.content.cloneNode(true);
            clone.getElementById('ram-number').textContent = "RAM Stick " + (data.indexOf(item) + 1)
            clone.getElementById('ram-speed').textContent = item.clockSpeed + "GHz"
            clone.getElementById('ram-size').textContent = (item.size / 1024 / 1024 / 1024).toFixed(0) + "GB"
            clone.getElementById('ram-type').textContent = item.formFactor + " " + item.type
            clone.getElementById('ram-manufacturer').textContent = item.manufacturer
            clone.getElementById('ram-partnumber').textContent = item.partNum
            clone.getElementById('ram-serialnumber').textContent = item.serialNum
            document.getElementById('details-ram').appendChild(clone);

            ramDiv.addEventListener('click', () => {
                document.querySelectorAll('.item-details-container').forEach(item => {
                    item.style.display = 'none'
                })
                document.getElementById('details-ram').style.display = 'block';
                document.querySelectorAll('.specs-item').forEach(item => {
                    item.style.backgroundColor = '#121516'
                })
                document.getElementById('ramDiv').style.backgroundColor = 'black'
            })
            refreshSelectables()
        })
    })

si.graphics()
    .then(data => {
        document.getElementById('apiloader-gpu').style.display = "none";
        document.getElementById('apiloader-details-gpu').style.display = "none";
        document.getElementById('details-data-loading-gpu').style.display = "block";
        data.controllers.forEach((item) => {
            var gpu = document.createElement('p')
            gpu.id = item.model
            document.getElementById('specs-gpu').appendChild(gpu)
            document.getElementById(item.model).textContent = item.model

            var template = document.getElementById('details-gpu-template');
            var clone = template.content.cloneNode(true);
            clone.getElementById('gpu-number').textContent = "GPU " + (data.controllers.indexOf(item) + 1)
            if (item.model != null || item.model != undefined) {
                clone.getElementById('gpu-model').textContent = item.model
            } else { clone.getElementById('gpu-model').textContent = '-' }
            if (item.vendor != null || item.vendor != undefined) {
                clone.getElementById('gpu-vendor').textContent = item.vendor
            } else { clone.getElementById('gpu-vendor').textContent = '-' }
            if (item.clockCore != null || item.clockCore != undefined) {
                clone.getElementById('gpu-clockcore').textContent = item.clockCore + " MHz"
            } else { clone.getElementById('gpu-clockcore').textContent = '-' }
            if (item.clockMemory != null || item.clockMemory != undefined) {
                clone.getElementById('gpu-clockmemory').textContent = item.clockMemory + " MHz"
            } else { clone.getElementById('gpu-clockmemory').textContent = '-' }
            if (item.vram != null || item.vram != undefined) {
                clone.getElementById('gpu-vram').textContent = item.vram + " MB"
            } else { clone.getElementById('gpu-vram').textContent = '-' }
            if (item.bus != null || item.bus != undefined) {
                clone.getElementById('gpu-bus').textContent = item.bus
            } else { clone.getElementById('gpu-bus').textContent = '-' }
            if (item.driverVersion != null || item.driverVersion != undefined) {
                clone.getElementById('gpu-driver').textContent = item.driverVersion
            } else { clone.getElementById('gpu-driver').textContent = '-' }



            document.getElementById('details-gpu').appendChild(clone);
        })
        gpuDiv.addEventListener('click', () => {
            document.querySelectorAll('.item-details-container').forEach(item => {
                item.style.display = 'none'
            })
            document.getElementById('details-gpu').style.display = 'block';
            document.querySelectorAll('.specs-item').forEach(item => {
                item.style.backgroundColor = '#121516'
            })
            document.getElementById('gpuDiv').style.backgroundColor = 'black'
        })
    })

si.diskLayout()
    .then(data => {
        document.getElementById('apiloader-storage').style.display = "none";
        document.getElementById('apiloader-details-storage').style.display = "none";
        document.getElementById('details-data-loading-storage').style.display = "block";
        data.forEach(item => {
            var size = (item.size / 1024 / 1024 / 1024)
            var disk = document.createElement('p')
            disk.id = item.name
            document.getElementById('specs-storage').appendChild(disk)
            document.getElementById(item.name).textContent = item.name

            var template = document.getElementById('details-storage-template');
            var clone = template.content.cloneNode(true);
            clone.getElementById('storage-disk-number').textContent = "Disk " + (data.indexOf(item) + 1)
            clone.getElementById('storage-name').textContent = item.name;
            clone.getElementById('storage-size').textContent = size.toFixed(0) + "GB";
            clone.getElementById('storage-type').textContent = item.type;
            clone.getElementById('storage-vendor').textContent = item.vendor;
            document.getElementById('details-storage').appendChild(clone);

            storageDiv.addEventListener('click', () => {
                document.querySelectorAll('.item-details-container').forEach(item => {
                    item.style.display = 'none'
                })
                document.getElementById('details-storage').style.display = "block"
                document.querySelectorAll('.specs-item').forEach(item => {
                    item.style.backgroundColor = '#121516'
                })
                document.getElementById('storageDiv').style.backgroundColor = 'black'
            })

            refreshSelectables()
        })

    })
function refreshSelectables() {
    document.querySelectorAll('.selectable').forEach(item => {
        item.replaceWith(item.cloneNode(true));
    })
    document.querySelectorAll('.selectable').forEach(item => {
        item.addEventListener('click', () => {
            navigator.clipboard.writeText(item.textContent)
            window.getSelection().removeAllRanges()
            popup("Copied to clipboard", "gray")
        })
    })
}
refreshSelectables()

function updateCPU() {
    si.currentLoad()
        .then((data) => {
            document.getElementById('apiloader-usecpu').style.display = "none";
            var cpuUsage = data.currentLoad.toFixed(0)
            document.getElementById('usage-cpu').textContent = cpuUsage + '%'
            document.getElementById('useagebar-cpu').style.width = cpuUsage + '%'
            if (cpuUsage <= 60) {
                document.getElementById('useagebar-cpu').style.backgroundColor = 'yellowgreen'
            } else if (cpuUsage > 60 && cpuUsage <= 80) {
                document.getElementById('useagebar-cpu').style.backgroundColor = 'yellow'
            } else if (cpuUsage > 80) {
                document.getElementById('useagebar-cpu').style.backgroundColor = 'red'
            }
            if (currentPage == 'usage') {
                setTimeout(() => { updateCPU(); }, 2000)
            }
        })
}


function updateGra() {
    si.graphics()
        .then(data => {
            document.getElementById('apiloader-usegpu').style.display = "none";
            if (data.controllers[0].memoryUsed != undefined) {
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
                if (currentPage == 'usage') { setTimeout(() => { updateGra(); }, 2000) }
            } else {
                document.getElementById('usage-gpu').textContent = 'Unsupported'
                document.getElementById('usage-gpu').style.color = 'gray'
                document.getElementById('usage-gpu').style.fontSize = '1rem'
                document.getElementById('item-usagebar-gpu').style.display = 'none'
            }


        })

}

function updateMem() {
    si.mem()
        .then(data => {
            document.getElementById('apiloader-useram').style.display = "none";
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
            if (currentPage == 'usage') { setTimeout(() => { updateMem(); }, 2000) }

        })

}

function updatePro() {
    si.processes()
        .then(data => {
            var list = [];
            data.list.forEach(process => {
                if (process.name != 'System Idle Process') {
                    if (process.cpu > 0) {

                        if (process.name.endsWith(".exe")) {
                            var processName = process.name.substring(0, process.name.length - 4);
                        } else {
                            var processName = process.name
                        }
                        let obj = {
                            name: processName,
                            cpu: process.cpu,
                            mem: process.mem
                        };
                        list.push(obj);
                    }
                }
            })
            // list.sort((a, b) => b.cpu - a.cpu) DOES NOT WORK PROPERLY
            list.sort((a, b) => b.mem - a.mem)
            list.length = 4;
            document.getElementById('processes-container').innerHTML = "";
            list.forEach(process => {
                var container = document.createElement("div")
                container.className = "process-item"
                container.id = list.indexOf(process)
                document.getElementById('processes-container').appendChild(container)

                var name = document.createElement("div")
                name.className = "process-item-name"
                container.appendChild(name)
                var usage = document.createElement("div")
                usage.className = "process-item-usage"
                container.appendChild(usage)

                name.textContent = process.name
                usage.textContent = process.mem.toFixed(1) + "%"
            })
            if (currentPage == 'usage') { setTimeout(() => { updatePro(); }, 2000) }

        })
}

function updateNet() {
    si.networkStats()
        .then(data => {
            document.getElementById('apiloader-usenetup').style.display = "none";
            document.getElementById('apiloader-usenetdown').style.display = "none";
            document.getElementById('usage-netdown').textContent = Math.round(data[0].rx_sec / 1024)
            document.getElementById('usage-netup').textContent = Math.round(data[0].tx_sec / 1024)
            if (currentPage == 'usage') { setTimeout(() => { updateNet(); }, 2000) }

        })

}

function updateDis() {
    si.fsSize()
        .then(data => {
            document.getElementById('disk-container').innerHTML = "";
            data.forEach(disk => {
                var container = document.createElement('div')
                container.className = 'usagedata-disk'
                container.id = 'disk-' + (data.indexOf(disk) + 1)
                document.getElementById('disk-container').appendChild(container)

                var diskname = document.createElement('div')
                diskname.className = 'diskname'
                container.appendChild(diskname)
                diskname.textContent = disk.fs

                var usagebar = document.createElement('div')
                usagebar.className = 'item-usagebar disk-usage-resizsed'
                container.appendChild(usagebar)

                var usagePercent = document.createElement('p')
                usagePercent.className = 'usagePercent'
                container.appendChild(usagePercent)
                usagePercent.textContent = (disk.used / 1000000000000).toFixed(3) + "/" + (disk.size / 1000000000000).toFixed(1) + "TB"

                var usage = document.createElement('div')
                usage.className = 'useagebar-usage'
                usage.id = 'useagebar-disk-' + (data.indexOf(disk) + 1)
                usagebar.appendChild(usage)

                var diskUsage = disk.use.toFixed(1)
                usage.style.width = diskUsage + "%"
                if (diskUsage <= 75) {
                    usage.style.backgroundColor = 'yellowgreen'
                } else if (diskUsage > 75 && diskUsage <= 90) {
                    usage.style.backgroundColor = 'yellow'
                } else if (diskUsage > 90) {
                    usage.style.backgroundColor = 'red'
                }
            })

            if (currentPage == 'usage') { setTimeout(() => { updateDis(); }, 10000) }
        })
}



// TEMPERATURE
function updateCPUTemp() {
    si.cpuTemperature()
        .then(data => {
            document.getElementById('apiloader-tempcpu').style.display = "none";
            var cpuTemp = data.main
            if (cpuTemp != null) {
                document.getElementById('temp-cpu').textContent = cpuTemp + '°C'
                document.getElementById('tempbar-cpu').style.width = cpuTemp + '%'
                if (cpuTemp <= 60) {
                    document.getElementById('tempbar-cpu').style.backgroundColor = 'yellowgreen'
                } else if (cpuTemp > 60 && cpuTemp <= 80) {
                    document.getElementById('tempbar-cpu').style.backgroundColor = 'yellow'
                } else if (cpuTemp > 80) {
                    document.getElementById('tempbar-cpu').style.backgroundColor = 'red'
                }
                if (currentPage == 'cooling') { setTimeout(() => { updateCPUTemp(); }, 2000) }

            } else {
                document.getElementById('temp-cpu').textContent = 'Unsupported'
                document.getElementById('temp-cpu').style.color = 'gray'
                document.getElementById('temp-cpu').style.fontSize = '1.5rem'
                document.getElementById('item-tempbarcpu').style.display = 'none'
            }


        })
}

function updateGPUTemp() {
    si.graphics()
        .then(data => {
            document.getElementById('apiloader-tempgpu').style.display = "none";
            var gpuTemp = data.controllers[0].temperatureGpu
            if (gpuTemp != null) {
                document.getElementById('temp-gpu').textContent = gpuTemp + '°C'
                document.getElementById('tempbar-gpu').style.width = gpuTemp + '%'
                if (gpuTemp <= 60) {
                    document.getElementById('tempbar-gpu').style.backgroundColor = 'yellowgreen'
                } else if (gpuTemp > 60 && gpuTemp <= 80) {
                    document.getElementById('tempbar-gpu').style.backgroundColor = 'yellow'
                } else if (gpuTemp > 80) {
                    document.getElementById('tempbar-gpu').style.backgroundColor = 'red'
                }
                if (currentPage == 'cooling') { setTimeout(() => { updateGPUTemp(); }, 2000) }

            } else {
                document.getElementById('temp-gpu').textContent = 'GPU Unsupported'
                document.getElementById('temp-gpu').style.fontSize = '1rem'
                document.getElementById('temp-gpu').style.margin = '6px 0 6px 0'
                document.getElementById('item-tempbargpu').style.display = 'none'
            }


        })
}


document.getElementById('loader').style.display = 'none';