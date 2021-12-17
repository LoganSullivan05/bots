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
    const btns = document.getElementsByTagName("button");
    if(getElementByXpath("//*[text() = 'Select the matching pairs']")!=null){
        for(let i=0;i<btns.length;i++){
            for(let j=0;i<btns.length;j++){
                btns[i].click();
                btns[j].click();
                alert(1);
                await sleep(25)
            }
        }
    }
    for(let i=0;i<btns.length;i++){
        btns[i].click();
        await sleep(25)
    }
    const continue_el = getElementByXpath("//*[text() = 'Continue']");
    if(continue_el!=null){continue_el.parentElement.click()}
    test();
    return
}
test();
