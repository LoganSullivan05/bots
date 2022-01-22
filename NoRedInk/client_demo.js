function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
function getElementByXpath(xpath){
    return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
}
//for https://www.noredink.com/learn/quiz/837099871
async function setInterests(){
    const interests = ["Never Have I Ever","JoJo's Bizarre Adventure","Moxie","Black-ish","Riverdale","Runaways"];
    const interest_win = window.open("https://www.noredink.com/learn/interests");
    while(interest_win.document.getElementsByClassName("_5a0df8a").length==0){
        console.log(interest_win.document);
        await sleep(500);
    }
    const selected_els = interest_win.document.getElementsByClassName("_5a0df8a")[0].children
    console.log(selected_els);
    let topics_correct = false;
    if(selected_els.length==interests.length){
        for(let i=0;i<selected_els.length;i++){
            let acceptable = false;
            for(let j=0;j<interests.length;j++){
                if(selected_els[i].textContent==interests[j]){acceptable=true}
            }
            if(!acceptable){break}
            if(i==selected_els.length-1){topics_correct=true}
        }
    }
    function i_getElementByXpath(xpath){
        return interest_win.document.evaluate(xpath,interest_win.document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
    }
    console.log(topics_correct);
    if(!topics_correct){
        console.log("Removing old interests...");
        while(interest_win.document.getElementsByClassName("_50635f19").length!=0){
            interest_win.document.getElementsByClassName("_50635f19")[0].click();
            await sleep(50);
        }
        console.log("Setting new interests...");
        for(let i=0;i<interests.length;i++){
            const xpath = '//*[text() = "'+interests[i]+'"]';
            i_getElementByXpath(xpath).click();
            await sleep(50);
        }
    }
    i_getElementByXpath('//*[text() = "Continue"]').click()
    await sleep(50);
    console.log("Interests set");
    interest_win.close();
}
setInterests();
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
