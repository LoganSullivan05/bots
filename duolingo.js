function getElementByXpath(xpath){
    return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
let questions = {};
async function test(){
    console.log("testing");
    await sleep(1000);
    const continue_el = getElementByXpath("//*[text() = 'Continue']");
    if(continue_el!=null){continue_el.click();await sleep(500)}
    const skip_btn = getElementByXpath("//*[text() = 'Skip']");
    if(getElementByXpath("//*[@data-test='challenge challenge-translate']")==null){
        console.log("wrong question type");
        if(skip_btn==null){
            const skip_btn2 = getElementByXpath('//*[text() = \"Can\'t speak now\"]');
            if(skip_btn2==null){
                const skip_btn3 = getElementByXpath('//*[text() = \"Can\'t listen now\"]');
                skip_btn3.click();
                await sleep(200);
                const continue_el = getElementByXpath("//*[text() = 'Continue']");
                continue_el.click();
                test();
                return
            }
            skip_btn2.click();
            await sleep(200);
            const continue_el = getElementByXpath("//*[text() = 'Continue']");
            continue_el.click();
            test();
            return
        }
        skip_btn.click();
        await sleep(200);
        const continue_el = getElementByXpath("//*[text() = 'Continue']");
        continue_el.click();
        test();
        return
    }
    const question_el = document.getElementsByClassName("_34k_q _3Lg1h _13doy")[0];
    const word_bank = getElementByXpath('//*[@data-test="word-bank"]').children;
    const check_btn = document.getElementsByClassName("LhRk3 _3HhhB _2NolF _275sd _1ZefG _2orIw")[0];
    if(questions[question_el.textContent]!=undefined){
        await sleep(50);
        const answer_word_bank = questions[question_el.textContent].split(" ");
        for(let i=0;i<answer_word_bank.length;i++){
            for(let j=0;j<word_bank.length;j++){
                if(answer_word_bank[i]==word_bank[j].textContent){
                    getElementByXpath('//*[text() = "'+word_bank[j].textContent+'"]').click();
                    await sleep(50);
                }
            }
        }
        await sleep(100);
        check_btn.click();
    }else{
        getElementByXpath('//*[text() = "'+word_bank[0].textContent+'"]').click();
        await sleep(100);
        check_btn.click();
        await sleep(200);
        const answer = document.getElementsByClassName("_1UqAr _1sqiF")[0].textContent;
        questions[question_el] = answer;
        getElementByXpath("//*[text() = 'Continue']").click();
    }
    test();
    return
}
test();
