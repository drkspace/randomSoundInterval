

var timer;

function normal(mean=0, std=1)
{
    do {
        val = normalHelper(mean=mean, std=std);
    }while(val < 0)
    return val;
}

function normalHelper(mean=60, std=1)
{
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0*Math.PI * v);

    return z * std + mean;
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function handleFileDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
}

function handleFile(file) {
    const reader = new FileReader();

    reader.onload = function(event) {
        const fileContent = event.target.result;
        // audio = new Audio(fileContent);
        aud = document.getElementById("audio");
        aud.src = fileContent;
        document.getElementById("audiodiv").style.display = 'block'
        // console.log('File type:', event.target.type);
        // Here, you can call other functions or process the file content
    };

    reader.readAsDataURL(file); // Use `readAsBinaryString` for binary files or other options as needed
}


function start(mean=null, std=null)
{

    try {
        clearTimeout(timer);
        timer = 0;
    } catch (error) {
        
    }

    if (mean==null)
    {
        mean = Number(document.getElementById("mean").value);
    }
    if (std==null)
    {
        std = Number(document.getElementById("std").value);
    }

    startHelper(mean, std);

}

function startHelper(mean, std)
{
    var delay = normal(mean=mean, std=std);
    console.log("Now delaying with "+delay+" s.");
    timer = setTimeout("document.getElementById('audio').play();startHelper("+mean+","+std+")", 1000*delay);
}

function stop()
{
    try {
        clearTimeout(timer);
        timer = 0;
    } catch (error) {
        
    }
}
