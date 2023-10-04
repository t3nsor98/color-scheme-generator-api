// Get color from input
function getInputColor(){
    let color = document.getElementById("color-input").value;
    let colorArray = color.split('');
    // console.log(colorArray);
    colorArray.shift();//remove the "#"
    let hexArray = colorArray.join("");
    return hexArray;
}
// Get the input of color mode..
function modeSelector(){
    let modeOption = document.getElementById("mode").value;
    let mode = modeOption.toLowerCase();
    return mode;
}

// Render colors to the DOM
function renderColor(data){
    let colorData = "";
    let colorHex = "";
    for(let color of data.colors){
        colorData += `
        <div class="scheme-color" style="background-color: ${color.hex.value}"></div>
        `
        colorHex += `<div class='scheme-name'>${color.hex.value}</div>`
    }
    document.getElementById("scheme-container").innerHTML = colorData;
    document.getElementById("scheme-info").innerHTML = colorHex;
    copyHexCode();
}

// API fetch

document.getElementById("getColorBtn").addEventListener("click", function(event){
    fetch(`https://www.thecolorapi.com/scheme?hex=${getInputColor()}&mode=${modeSelector()}`)
        .then(res => res.json())
        .then(data => renderColor(data));
})

// click to copy the color
function copyHexCode() {
    /* Get the text field */
    let hexCodeTextArray = document.querySelectorAll(".scheme-name");
    hexCodeTextArray.forEach(elem => {
       
        elem.onclick = function() {
        document.execCommand("copy");
        }

        elem.addEventListener("copy", function(event) {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", elem.textContent);
            console.log(event.clipboardData.getData("text"))
        }
        });
        
    })
}


