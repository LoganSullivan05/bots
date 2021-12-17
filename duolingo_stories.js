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
    /*
  const continue_el = getElementByXpath("//*[text() = 'Continue']");
  if(continue_el!=null){
    continue_el.parentElement.click();
    test();return
  }
  */
  const btns = document.getElementsByTagName("button");
  for(let i=1;i<btns.length;i++){
    btns[i].click();
    await sleep(25)
  }
  test();
  return
}
test();
