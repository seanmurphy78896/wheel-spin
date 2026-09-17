const htmlNameSpace = "http://www.w3.org/2000/svg";
const svgNamespace = "http://www.w3.org/2000/svg";

const addButton = document.getElementById('elemButton');
const elementSpace = document.getElementById('emptyElement');

console.log("Button Found: ", addButton);

addButton.addEventListener('click', () => {
    console.log("Button Was Clciked!");
    const uniqueId = Date.now();
    addNode(uniqueId);
    const newElement = `
    <div class="elemField" id="elem-${uniqueId}">
        <input type="text" class="textBox" id="text-${uniqueId}" placehodler="New Element" />
        <input type="number" class="numBox" id="num-${uniqueId}" placeholder="0" min="0" />
        <button class="xButton" id="butt-${uniqueId}" onclick="document.getElementById('elem-${uniqueId}').remove()">X</button>
    </div>
    `;
    elementSpace.insertAdjacentHTML('beforeend', newElement);

    const textListener = document.getElementById(`text-${uniqueId}`);
    textListener.addEventListener("input", (event) =>{
        const inputText = event.target.value;
        updateText(uniqueId, inputText);
    });

    const numListener = document.getElementById(`num-${uniqueId}`);
    numListener.addEventListener("input", (event) =>{
        const inputNum = event.target.value;
        updateOccurences(uniqueId, inputNum);
    });

    const buttListener = document.getElementById(`butt-${uniqueId}`);
    buttListener.addEventListener("click", () => {
        removeNode(uniqueId);
    });

});

let totalSlices = 0;

class Node {
    constructor(nodeId){
        this.id = nodeId;
        this.occurences = 0;
        this.text = "";
        this.nodeStart = 0;
        this.nodeEnd = 0;
    }
}

class LinkedList{
    constructor() {
        this.head = null;
        this.size = 0;
    }
}

let elementArray = [];
/*
addNode(1);
addNode(2);
addNode(3);
addNode(4);
addNode(5);

console.log(elementArray[0]);
console.log(elementArray[1]);
console.log(elementArray[2]);
console.log(elementArray[3]);
console.log(elementArray[4]);

removeNode(3);

console.log(elementArray[0]);
console.log(elementArray[1]);
console.log(elementArray[2]);
console.log(elementArray[3]);
console.log(elementArray[4]);

updateOccurences(1, 3);
console.log(totalSlices);
updateOccurences(2, 5);
console.log(totalSlices);
updateOccurences(2, 7);
console.log(totalSlices);
updateOccurences(4, 4);
console.log(totalSlices);
updateOccurences(4, 2);
console.log(totalSlices);

updateText(1, "text ID 1");
updateText(2, "text ID 2");
updateText(4, "text ID 4");
updateText(5, "text ID 5");
*/
function addNode(nodeId){
    const newNode = new Node(nodeId);
    elementArray.push(newNode);
    return;
}

function removeNode(nodeId){
    for (let i = 0; i < elementArray.length; i++){
        if (elementArray[i].id == nodeId){
            totalSlices = totalSlices - elementArray[i].occurences;
            elementArray.splice(i, 1);
            drawCircle();
        }
    }
    return;
}

function updateOccurences(nodeId, num){
    for (let i = 0; i < elementArray.length; i++){
        if (elementArray[i].id == nodeId){
            const oldNum = elementArray[i].occurences;
            elementArray[i].occurences = num;
            totalSlices = totalSlices + (num - oldNum);
            drawCircle();
        }
    }
    return;
}

function updateText(nodeId, textString){
    for (let i = 0; i < elementArray.length; i++){
        if (elementArray[i].id == nodeId){
            elementArray[i].text = textString;
            drawCircle();
        }
    }
}


function drawCircle(){;
    console.log(totalSlices);
    const wheel = document.getElementById('wheel');
    let angle = 360.0 / totalSlices;
    let large = 0;
    if (totalSlices == 0){
        const baseCircle = document.createElementNS(svgNamespace, "circle");
        baseCircle.setAttribute("cx", "100");
        baseCircle.setAttribute("cy", "100");
        baseCircle.setAttribute("r", "100");
        baseCircle.setAttribute("fill", "rgb(220, 220, 220)");
        wheel.appendChild(baseCircle);
        return;
    }


    let startAngle = 0;
    let colorPicker = 0;
    for(let i = 0; i < elementArray.length; i++){
        elementArray[i].nodeStart = startAngle; 
        for(let j = 0; j < elementArray[i].occurences; j++){
            if (totalSlices == 1){
                const singleCircle = document.createElementNS(svgNamespace, "circle");
                singleCircle.setAttribute("cx", "100");
                singleCircle.setAttribute("cy", "100");
                singleCircle.setAttribute("r", "100");
                singleCircle.setAttribute("fill", "blue");
                wheel.appendChild(singleCircle);
            }

            let endAngle = startAngle + angle;
            //console.log(startAngle);
            //console.log(endAngle);  

            let endX1 = 100 + 100 * Math.cos(startAngle * Math.PI/180);
            let endY1 = 100 + 100 * Math.sin(startAngle * Math.PI/180);
            let endX2 = 100 + 100 * Math.cos(endAngle * Math.PI/180);
            let endY2 = 100 + 100 * Math.sin(endAngle * Math.PI/180);
            const pathData = `M 100 100 L ${endX1} ${endY1} A 100 100 0 ${large} 1 ${endX2} ${endY2} Z`;

            const newPath = document.createElementNS(svgNamespace, "path");
            newPath.setAttribute("d", pathData);

            let remainder = colorPicker % 3;
            colorPicker++;
            //console.log(remainder);

            if (remainder == 0 ){
                newPath.setAttribute("fill", "blue");
            }
            else if (remainder == 1 ){
                newPath.setAttribute("fill", "red");
            }
            else if (remainder == 2 ){
                newPath.setAttribute("fill", "yellow");
            }
            newPath.setAttribute("id", 'path-${i}');

            wheel.appendChild(newPath);

            /*
            const newText = document.createElementNS(svgNamespace, "text");
            newText.setAttribute("x", "100");
            newText.setAttribute("y", "100");
            newText.setAttribute("dx", "20");
            
            newText.setAttribute("dominant-baseline", "central");

            const rotation = (startAngle + endAngle) / 2;
            newText.setAttribute("transform", `rotate(${rotation}, 100, 100)`);
            newText.textContent = elementArray[i].text;

            wheel.appendChild(newText);
            */

            const newObject = document.createElementNS(svgNamespace, "foreignObject");
            newObject.setAttribute("x", "120");
            newObject.setAttribute("y", "90");
            newObject.setAttribute("width", "80");
            newObject.setAttribute("height", "20");
            const rotation = (startAngle + endAngle) / 2;
            newObject.setAttribute("transform", `rotate(${rotation}, 100, 100)`);

            const newDiv = document.createElement("div");
            newDiv.style.display = "flex";
            newDiv.style.alignItems = "center";
            newDiv.style.width = "100%";
            newDiv.style.height = "100%";

            const newText = document.createElement("p");
            newText.textContent = elementArray[i].text;
            newText.classList.add('sliceText');

            if (totalSlices > 8) {
                newText.style.fontSize = `0.5rem`;
            }
            newDiv.appendChild(newText);
            newObject.appendChild(newDiv);
            wheel.appendChild(newObject);


            startAngle = endAngle;
        }
        elementArray[i].nodeEnd = startAngle;
    }
    return;
}

let finalAngle = 0;
const wheelAnim = document.getElementById('wheel');
wheelAnim.addEventListener('click', () => {
        finalAngle = Math.random() * 360 + 3600;
        const animation = document.createElement('style');
        animation.textContent = `
        @keyframes fastSpin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(${finalAngle}deg);
            }
        }
        `;
        document.head.appendChild(animation);
        wheel.classList.remove('slowWheel');
        wheel.classList.add('fastWheel');
        console.log(finalAngle);
    });

let winText = "";
wheelAnim.addEventListener('animationend', () => {
    const winner = document.getElementById('winner');
    for (i = 0; i < elementArray.length; i++){
        //console.log(elementArray[i]);
        let winAngle = finalAngle - 3600;
        //console.log(winAngle);
        if ((elementArray[i].nodeStart < winAngle) && (elementArray[i].nodeEnd >= winAngle)){
            winText = elementArray[i].text;
        }
    }
    //console.log(winText)
    let winHtml = document.createElement("p");
    winHtml.textContent = winText
    winner.append(winHtml);
    winner.showModal();
    winner.addEventListener('click', () => {
        winner.close();
        wheel.classList.add('slowWheel');
        wheel.classList.remove('fastWheel');
        winHtml.remove();
    }) 
}) 