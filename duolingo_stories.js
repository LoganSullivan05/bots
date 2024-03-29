function getElementByXpath(xpath){
    return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
var stop = false;
async function test(){
    if(stop){return}
    await sleep(500);
    try{
        let btns = document.getElementsByTagName("button");
        for(let i=0;i<btns.length;i++){
            for(let j=0;i<btns.length;j++){
                await sleep(200);btns[i].click();
                await sleep(200);btns[j].click();
            }
        }
    }catch{alert("err")}
    const continue_el = getElementByXpath("//*[text() = 'Continue']");
    if(continue_el!=null){continue_el.parentElement.click()}
    test();
    return
}
test();
