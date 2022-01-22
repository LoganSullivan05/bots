function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
function getElementByXpath(xpath){
    return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
}
const url = "https://log-log-log.github.io/bots/NoRedInk/data/773_931.json";
var data,elm_data;
async function main(){
    const xhr = new XMLHttpRequest();
    //let data;
    xhr.onreadystatechange = e=>{
        if(xhr.readyState==4){data = JSON.parse(xhr.response)}
    }
    xhr.open("GET",url);
    xhr.send();
    while(data==undefined){await sleep(50)}
    let question = document.getElementById("nri-highlighterYellow").textContent;
    const container = document.getElementById("nri-highlighterYellow");
    elm_data = JSON.parse(document.getElementById("quiz-elm-data").getAttribute("data-data"));
    console.log(elm_data);
    const directions = elm_data.instructions.directions.slice(0,-1);
    console.log(data[directions]);
    //console.log(data);
    const answer = data[directions][question];
    console.log(answer);
    for(let i=0;i<container.children.length;i++){
        console.log(container.children[i].textContent);
        if(container.children[i].textContent==" "){continue}
        if(container.children[i].textContent==answer.split(" ")[0]){
            const keywords = answer.split(" ");
            for(let j=0;j<keywords.length;j++){
                if(container.children[i+j*2].textContent!=answer.split(" ")[j]){
                    continue
                }
            }
            console.log("answer found (?)");
            for(let j=0;j<keywords.length;j++){
                container.children[i+j*2].style.backgroundColor = "#f0f";
            }
            container.children[i].click();
            break
        }
    }
}
main();
