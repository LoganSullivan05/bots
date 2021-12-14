function getElementByXpath(xpath){
    return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//question:answer
let questions = {};
async function test(){
    console.log("testing");
    await sleep(1000);
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
    question_el.focus();
    await sleep(500);
    console.log(question_el.textContent);
    if(getElementByXpath("//*[text() = 'Use keyboard']")!=null){
        getElementByXpath("//*[text() = 'Use keyboard']").click()
    }
    await sleep(50);
    let in_field = getElementByXpath("//*[@placeholder='Type in English']");
    if(in_field==null){in_field=getElementByXpath("//*[@placeholder='Type in German']")}
    const check_btn = getElementByXpath("//*[text() = 'Check']");
    if(questions[question_el.textContent]!=undefined){
        in_field.value = questions[question_el.textContent];
        await sleep(50);
        check_btn.click();
    }else{
        in_field.value = "no clue";
        const rem_classes = "LhRk3 _3HhhB _2NolF _275sd _1ZefG _2orIw".split(" ");
        const add_classes = "_3HhhB _2NolF _275sd _1ZefG _2orIw _39N6z _9C_ii".split(" ");
        for(let i=0;i<rem_classes.length;i++){
            check_btn.classList.remove(rem_classes[i]);
        }
        for(let i=0;i<add_classes.length;i++){
            check_btn.classList.add(add_classes[i]);
        }
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
