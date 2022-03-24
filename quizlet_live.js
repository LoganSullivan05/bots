function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
(async ()=>{
    const code = prompt("Enter Game code: ");
    const url = 'https://quizlet.com/webapi/3.2/game-instances?filters={"gameCode":'+code+',"isInProgress":true,"isDeleted":false}&perPage=500';
    console.log(url);
    let data = await fetch(url);
    data = await data.text();
    const list_id = JSON.parse(data).responses[0].models.gameInstance[0].itemId;
    console.log("list id: "+list_id);
    const window2 = window.open("/"+list_id);
    await sleep(1000);
    const terms = window2.document.getElementsByClassName("SetPageTerm-content");
    let answers = {};
    for(let i=0;i<terms.length;i++){
        const term = terms[i].children[0].textContent;
        const def = terms[i].children[1].textContent;
        console.log(term);
        console.log(def);
        answers[term] = def;
        answers[def] = term;
    }
    window2.close();
    console.log(answers);
    while(!document.getElementsByClassName("StudentAnswerOptions").length){
        await sleep(20);
    }
    let game_finsished = false;
    while(!game_finsished){
        const question = document.getElementsByClassName("StudentPrompt has-text")[0].textContent;
        if(!answers[question]){console.log("couldn't find answer for question '"+question+"'")}
        const answer = answers[question];
        const options = document.getElementsByClassName("StudentAnswerOptions")[0].children;
        for(let i=0;i<options.length;i++){
            if(options[i].textContent==answer){
                options[i].style.setProperty("border","#0f0 solid 5px")
                options[i].style.setProperty("border-radius","10px");
            }
        }
        await sleep(100);
    }
})();
