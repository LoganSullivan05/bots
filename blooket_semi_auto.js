(()=>{
function addCSS(el,css){for(key in css){el.style[key]=css[key]}}
let questions = {};
let paused = false;
const pause_button = document.createElement("button");
addCSS(pause_button,{
    position:"fixed",
    left:"5%",
    top:"5%",
    width:"200px",
    height:"50px"
});
pause_button.textContent = "Press to Stop";
pause_button.onclick = ()=>{
    paused = !paused;
    if(paused){pause_button.textContent = "Press to Start";}
    else{pause_button.textContent = "Press to Stop";main()}
};
document.body.appendChild(pause_button);
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))};
function clickReactElement(element){
    for(key in element){
        if(key.includes("__reactEventHandlers")){
            element[key].children.props.onClick();
            return true;
        }
    }
    console.log("failure; didn't find __reactEventHandlers");
    return false;
}
async function wait(condition){
    while(!condition()){await sleep(10);}
    return
}
async function waitForAnswers(){
    await wait(()=>{
        const feedbackButton = document.getElementById("feedbackButton");
        if(feedbackButton) feedbackButton.click();
        if(document.getElementById("answer0")){return true;}
        else{return false}
    });
    return
}
async function getQuestionAnswer(q){
    await sleep(50);
    const e = document.getElementById("answer0");
    const clicked_answer_text = e.textContent;
    console.log("clicked: "+ clickReactElement(e));
    console.log("waiting for feedback...");
    await wait(()=>{
        const answer_el = document.getElementById("answer0");
        if(answer_el) clickReactElement(answer_el);
        if(getElementByXpath('//*[text()="Click Anywhere to Go Next"]')){return true;}
        else{return false}
    });
    const feedbackButton = document.getElementById("feedbackButton");
    const text = feedbackButton.textContent;
    console.log("text: "+text);
    await sleep(20);
    if(!text.includes("Correct Answer: ")){
        questions[q] = clicked_answer_text;
        feedbackButton.click();
        return
    }
    const a = text.split("Correct Answer: ")[1].split("Click Anywhere to Go Next")[0];
    questions[q] = a;
    feedbackButton.click();
    return
}
async function answerQuestion(q){
    console.log("answer found!");
    const answer = questions[q];
    for(let i=0;i<4;i++){
        const e = document.getElementById("answer"+i);
        if(e.textContent == answer){
            clickReactElement(e);break
        }
    }
}
async function main(){
    if(paused){return}
    console.log("waiting...");
    await waitForAnswers();
    await sleep(50);
    console.log("on answer");
    const q = document.getElementsByClassName("styles__questionText___2MlSZ-camelCase")[0].textContent;
    const a = questions[q];
    if(!a){
        await getQuestionAnswer(q);
        main();return
    }
    await answerQuestion(q);
    main();
}
main();
})();
