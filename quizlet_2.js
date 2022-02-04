const URL = window.location.href;
const answer_page = URL.split("test")[0];
let l0_terms = {},l1_terms = {};
function getElementByXpath(xpath){
    return document.evaluate(xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
}
function getQType(article){
    if(getElementByXpath('//*[text() = "True"]')!=null
    && getElementByXpath('//*[text() = "False"]')!=null){
        return "True/False"
    }
    if(article.getElementsByTagName("section").length==6){
        return "Multiple choice"
    }
    if(article.getElementsByTagName("input").length==1){
        return "Writing question"
    }
    return "Matching question"
}
async function answer(){
    //16 articles; 1 contains 5 questions (matching)
    const question_containers = document.getElementsByTagName("article");
    for(let i=0;i<question_containers.length;i++){
        const container = question_containers[i];
        const q_type = getQType(container);
        if(q_type=="True/False"){
            const terms = container.getElementsByClassName("FormattedText notranslate");
            const sections = container.getElementsByTagName("section");
            if(l0_terms[terms[0].textContent]==terms[1].textContent
            || l1_terms[terms[0].textContent]==terms[1].textContent){
                sections[sections.length-2].click();
            }else{sections[sections.length-1].click()}
        }
        if(q_type=="Multiple choice"){
            const sections = container.getElementsByTagName("section");
            const question = container.getElementsByClassName("FormattedText notranslate")[0].textContent;
            for(let i=0;i<sections.length;i++){
                if(l0_terms[question]==sections[i].textContent){sections[i].click()}
                if(l1_terms[question]==sections[i].textContent){sections[i].click()}
            }
        }
        if(q_type=="Matching question"){
            /*5 Matching terms*/
            const terms = container.getElementsByClassName("FormattedText notranslate");
            const questions = [];
            for(let i=0;i<5;i++){questions.push(terms[i].textContent)}
            for(let i=0;i<5;i++){
                const q = questions[i];
                for(let j=5;j<terms.length;j++){
                    if(terms[j].textContent==l0_terms[q]){terms[j].click();break}
                    if(terms[j].textContent==l1_terms[q]){terms[j].click();break}
                }
            }
        }
        if(q_type="Writing question"){
            //write the answer
            const question = container.getElementsByClassName("FormattedText notranslate")[0].textContent;
            const answer = l0_terms[question]!=undefined ? l0_terms[question] : l1_terms[question];
            container.getElementsByClassName("AssemblyInput-input AssemblyInput-placeholder")[0].value = answer;
            try{
                const answer_el = document.createElement("p");
                answer_el.style.backgroundColor = "#000";
                answer_el.style.color = "#FFF";
                answer_el.textContent = answer;
                container.appendChild(answer_el);
            }catch{alert("err")}
        }
    }
}
const xhr = new XMLHttpRequest();
xhr.open("GET", answer_page);
xhr.onreadystatechange = e=>{
    if(xhr.readyState==4){
        const doc = document.createElement("div");
        doc.innerHTML = xhr.responseText;
        const elements = doc.getElementsByClassName("SetPageTerm-content");
        for(let i=0;i<elements.length;i++){
            const terms = elements[i].getElementsByClassName("TermText notranslate");
            l0_terms[terms[0].textContent] = terms[1].textContent;
            l1_terms[terms[1].textContent] = terms[0].textContent;
        }
        answer();
    }
}
xhr.send();