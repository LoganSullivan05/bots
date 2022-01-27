const URL = window.location.href;
const answer_page = URL.split("test")[0];
let l0_terms = {},l1_terms = {};
function answer(){
    //16 articles; 1 contains 5 questions (matching)
    const question_containers = document.getElementsByTagName("article");
    for(let i=0;i<question_containers.length;i++){
        const container = question_containers[i];
        if(i<5){
            const terms = container.getElementsByClassName("FormattedText notranslate");
            const sections = container.getElementsByTagName("section");
            if(l0_terms[terms[0].textContent]==l1_terms[terms[1].textContent]
            || l1_terms[terms[0].textContent]==l0_terms[terms[1].textContent]){
                sections[sections.length-1].click();
            }else{sections[sections.length-2].click()}
        }else if(i<10){
            const sections = container.getElementsByTagName("section");
            const question = document.getElementsByClassName("FormattedText notranslate")[0].textContent;
            for(let i=0;i<sections.length;i++){
                if(l0_terms[question]==sections[i].textContent){sections[i].click()}
                if(l1_terms[question]==sections[i].textContent){sections[i].click()}
            }
        }
        if(i==11){
            /*5 Matching terms*/
        }
        if(i>11){
            //write the answer
        }
    }
}
const xhr = new XMLHttpRequest();
xhr.open("GET", answer_page);
xhr.onreadystatechange = e=>{
    if(xhr.readyState==4){
        const doc = document.createElement("div");
        doc.innerHTML = xhr.responseText;
        const elements = doc.getElementsByClassName("SetPageTerm-content").length;
        for(let i=0;i<elements.length;i++){
            const terms = elements.getElementsByClassName("TermText notranslate");
            l0_terms[terms[0].textContent] = terms[1].textContent;
            l1_terms[terms[1].textContent] = terms[0].textContent;
        }
        answer();
    }
}
xhr.send();
