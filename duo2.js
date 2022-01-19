function getElementByXpath(xpath){
    return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
//*use "var" to evade "this variable has already been defined"
var questions = {};
var stop = false;
async function test(){
    if(stop){return}
    await sleep(500);
    const continue_el = getElementByXpath("//*[text() = 'Continue']");
    if(continue_el!=null){
        continue_el.parentElement.click();
        test();
        return
    }
    const skip_btn = getElementByXpath("//*[text() = 'Skip']");
    //!crashes if its a mandatory typing question
    if(getElementByXpath("//*[@data-test='challenge challenge-select']")!=null){
        //TODO: (test this part)
        const question_el = getElementByXpath("//*[@data-test='challenge-header']");
        const options_el = getElementByXpath("//*[text() = '1']").parentElement.parentElement.parentElement.children;
        if(questions[question_el.textContent]!=undefined){
            for(let i=0;i<options_el.length;i++){
                let splt = "1";
                switch(i){
                    case 1:splt="2";break;
                    case 2:splt="3";break;
                    case 3:splt="4";break;
                }
                const option = options_el[i].textContent.split(splt)[0];
                if(option==questions[question_el.textContent]){
                    options_el[i].click();
                    await sleep(100);
                    getElementByXpath("//*[text() = 'Check']").parentElement.click();
                    await sleep(200);
                    getElementByXpath("//*[text() = 'Continue']").parentElement.click();
                    test();
                    return
                }
            }
        }
        options_el[0].click();
        await sleep(100);
        getElementByXpath("//*[text() = 'Check']").parentElement.click();
        await sleep(100);
        const continue_el = getElementByXpath("//*[text() = 'Continue']").parentElement;
        if(document.getElementsByClassName("_1UqAr _1sqiF")[0]==undefined){
            const answer = options_el[0].textContent.split("1")[0];
            questions[question_el.textContent] = answer;
            continue_el.click();
            test();
            return
        }else{
            const answer = document.getElementsByClassName("_1UqAr _1sqiF")[0].textContent;
            questions[question_el.textContent] = answer;
            continue_el.click();
            test();
            return
        }
    }
    if(getElementByXpath("//*[@data-test='challenge challenge-assist']")!=null){
        const question_el = getElementByXpath("//*[@data-test='challenge-header']");
        const options_el = getElementByXpath("//*[text() = '1']").parentElement.parentElement.children;
        if(questions[question_el.textContent]!=undefined){
            for(let i=0;i<options_el.length;i++){
                let splt = "1";
                switch(i){
                    case 1:splt="2";break;
                    case 2:splt="3";break;
                    case 3:splt="4";break;
                }
                const option = options_el[i]
                textContent.split(splt)[1];
                if(option==questions[question_el.textContent]){
                    options_el[i].click();
                    await sleep(100);
                    getElementByXpath("//*[text() = 'Check']").parentElement.click();
                    await sleep(100);
                    getElementByXpath("//*[text() = 'Continue']").parentElement.click();
                    test();
                    return
                }
            }
        }
        options_el[0].click();
        await sleep(100);
        getElementByXpath("//*[text() = 'Check']").parentElement.click();
        await sleep(100);
        const continue_el = getElementByXpath("//*[text() = 'Continue']").parentElement;
        if(document.getElementsByClassName("_1UqAr _1sqiF")[0]==undefined){
            const answer = options_el[0].textContent.split("1")[1];
            questions[question_el.textContent] = answer;
            continue_el.click();
            test();
            return
        }else{
            const answer = document.getElementsByClassName("_1UqAr _1sqiF")[0].textContent;
            questions[question_el.textContent] = answer;
            continue_el.click();
            test();
            return
        }
    }
    if(getElementByXpath("//*[text() = 'Select the missing word']")!=null){
        const question_el = document.getElementsByClassName("_2SfAl _2Hg6H")[0];
        const options_el = getElementByXpath("//*[text() = '1']").parentElement.parentElement.children;
        if(questions[question_el.textContent]!=undefined){
            for(let i=0;i<options_el.length;i++){
                let splt = "1";
                switch(i){
                    case 1:splt="2";break;
                    case 2:splt="3";break;
                    case 3:splt="4";break;
                }
                const option = options_el[i].textContent.split(splt)[1];
                if(option==questions[question_el.textContent]){
                    options_el[i].click();
                    getElementByXpath("//*[text() = 'Check']").parentElement.click();
                    await sleep(100);
                    getElementByXpath("//*[text() = 'Continue']").parentElement.click();
                    test();
                    return
                }
            }
        }
        else{
            options_el[0].click();
            await sleep(100);
            getElementByXpath("//*[text() = 'Check']").parentElement.click();
            await sleep(100);
            const continue_el = getElementByXpath("//*[text() = 'Continue']").parentElement;
            if(document.getElementsByClassName("_1UqAr _1sqiF")[0]==undefined){
                const answer = options_el[0].textContent.split("1")[1];
                questions[question_el.textContent] = answer;
                continue_el.click();
                test();
                return
            }else{
                const answer = document.getElementsByClassName("_1UqAr _1sqiF")[0].textContent;
                questions[question_el.textContent] = answer;
                continue_el.click();
                test();
                return
            }
        }
    }
    if(getElementByXpath("//*[text() = 'Mark the correct meaning']")!=null){
        //TODO
        const question_el = getElementByXpath("//*[text() = '1']").parentElement.parentElement.parentElement.children[0];
        const options_el = getElementByXpath("//*[text() = '1']").parentElement.parentElement.children;
        if(questions[question_el.textContent]!=undefined){
            for(let i=0;i<options_el.length;i++){
                let splt = "1";
                switch(i){
                    case 1:splt="2";break;
                    case 2:splt="3";break;
                    case 3:splt="4";break;
                }
                const option = options_el[i].textContent.split(splt)[1];
                if(option==questions[question_el.textContent]){
                    options_el[i].click();
                    getElementByXpath("//*[text() = 'Check']").parentElement.click();
                    await sleep(100);
                    getElementByXpath("//*[text() = 'Continue']").parentElement.click();
                    test();
                    return
                }
            }
        }
        else{
            options_el[0].click();
            await sleep(100);
            getElementByXpath("//*[text() = 'Check']").parentElement.click();
            await sleep(100);
            const continue_el = getElementByXpath("//*[text() = 'Continue']").parentElement;
            if(document.getElementsByClassName("_1UqAr _1sqiF")[0]==undefined){
                const answer = options_el[0].textContent.split("1")[1];
                questions[question_el.textContent] = answer;
                continue_el.click();
                test();
                return
            }else{
                const answer = document.getElementsByClassName("_1UqAr _1sqiF")[0].textContent;
                questions[question_el.textContent] = answer;
                continue_el.click();
                test();
                return
            }
        }
        
    }
    if(getElementByXpath("//*[text() = 'Select the matching pairs']")!=null || getElementByXpath("//*[text() = 'Match the pairs']")!=null){
        const btns = document.getElementsByTagName("button");
        for(let i=1;i<btns.length-2;i++){
            for(let j=1;j<btns.length-2;j++){
                btns[i].click();
                btns[j].click();
                await sleep(25)
            }
        }
        const continue_el = getElementByXpath("//*[text() = 'Continue']");
        continue_el.parentElement.click();
        test();
        return
    }
    if(getElementByXpath("//*[@placeholder = 'Type in English']")!=null){
      alert("type in english");
      //guessing this is the input el
      const input_el = getElementByXpath("//*[@placeholder = 'Type in English']");
      const question_el = getElementByXpath("//*[text() = '1']").parentElement.parentElement.parentElement.children[0];
      if(questions[question_el.textContent]!=undefined){
        const answer = questions[question_el.textContent];
        getElementByXpath("//*[@placeholder = 'Type in English']").value = answer;
        await sleep(100);
        getElementByXpath("//*[text() = 'Continue']").parentElement.click();
        test();return
      }
      else{
        getElementByXpath("//*[text() = 'Skip']").parentElement.click();
        await sleep(50);
        const answer = document.getElementsByClassName("_1UqAr _1sqiF")[0].textContent;
        questions[question_el.textContent] = answer;
        getElementByXpath("//*[text() = 'Continue']").parentElement.click();
        test();return
        
      }
    }
    if(getElementByXpath("//*[@data-test='challenge challenge-translate']")==null){
        if(skip_btn==null){
            const skip_btn2 = getElementByXpath('//*[text() = \"Can\'t speak now\"]');
            if(skip_btn2==null){
                const skip_btn3 = getElementByXpath('//*[text() = \"Can\'t listen now\"]');
                skip_btn3.click();
                await sleep(200);
                const continue_el = getElementByXpath("//*[text() = 'Continue']");
                continue_el.parentElement.click();
                test();
                return
            }
            skip_btn2.click();
            await sleep(200);
            const continue_el = getElementByXpath("//*[text() = 'Continue']");
            continue_el.parentElement.click();
            test();
            return
        }
        skip_btn.click();
        await sleep(200);
        const continue_el = getElementByXpath("//*[text() = 'Continue']");
        continue_el.parentElement.click();
        test();
        return
    }
    const question_el = document.getElementsByClassName("_34k_q _3Lg1h _13doy")[0].parentElement;
    const word_bank = getElementByXpath('//*[@data-test="word-bank"]').children;
    const check_btn = getElementByXpath("//*[text() = 'Check']").parentElement;
    if(questions[question_el.textContent]!=undefined){
        await sleep(100);
        let answer_word_bank = questions[question_el.textContent].split(" ");
        let clicked_key = [];
        for(let i=0;i<word_bank.length;i++){clicked_key.push(false)}
        for(let i=0;i<answer_word_bank.length;i++){
            if(answer_word_bank[i].split(",").length==2){answer_word_bank[i]=answer_word_bank[i].split(",")[0]}
            if(answer_word_bank[i].split("!").length==2){answer_word_bank[i]=answer_word_bank[i].split("!")[0]}
            if(answer_word_bank[i].split("?").length==2){answer_word_bank[i]=answer_word_bank[i].split("?")[0]}
            if(answer_word_bank[i].split(".").length==2){answer_word_bank[i]=answer_word_bank[i].split(".")[0]}
            if(answer_word_bank[i].split("'").length==2 && answer_word_bank[i]!="don't" && answer_word_bank[i]!="Don't"){
                const other_half = "'"+answer_word_bank[i].split("'")[1];
                answer_word_bank[i]=answer_word_bank[i].split("'")[0];
                let new_wb = [];
                //!untested
                for(let j=0;j<answer_word_bank.length;j++){
                    new_wb.push(answer_word_bank[j]);
                    if(j==i){new_wb.push(other_half)}
                }
                answer_word_bank=new_wb;
                i++;
            }
            if(answer_word_bank[i].split("-").length==2){
                const other_half = answer_word_bank[i].split("-")[1];
                answer_word_bank[i]=answer_word_bank[i].split("-")[0];
                let new_wb = [];
                //!untested
                for(let j=0;j<answer_word_bank.length;j++){
                    new_wb.push(answer_word_bank[j]);
                    if(j==i){new_wb.push(other_half)}
                }
                answer_word_bank=new_wb;
                i++;
            }
        }
        for(let i=0;i<answer_word_bank.length;i++){
            for(let j=0;j<word_bank.length;j++){
                if(answer_word_bank[i]==word_bank[j].textContent && !clicked_key[j]){
                    word_bank[j].children[0].click();
                    clicked_key[j]=true;
                    await sleep(300);
                    break
                }
            }
        }
        await sleep(100);
        check_btn.click();
    }else{
        word_bank[0].children[0].click();
        await sleep(200);
        check_btn.click();
        await sleep(200);
        const continue_el = getElementByXpath("//*[text() = 'Continue']").parentElement;
        if(continue_el.style.backgroundColor=="#58CC02"){
            questions[question_el.textContent] = word_bank[0].textContent;
            continue_el.click();
            test();
            return
        }
        let answer = document.getElementsByClassName("_1UqAr _1sqiF")[0].textContent;
        if(answer.split(".").length==2){answer=answer.split(".")[0]}
        if(answer.split("?").length==2){answer=answer.split("?")[0]}
        if(answer.split("!").length==2){answer=answer.split("!")[0]}
        questions[question_el.textContent] = answer;
    }
    test();
    return
}
test();
