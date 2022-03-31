(()=>{
    const expression = prompt("Enter polynomial (i.e. (x - 3) * (x + 4) ) make sure to put spacing between operators");
    /*error when (x - 0)*/
    const regex = / \+ | \- /;
    let split = expression.split(" * ");
    if(split.length==1){return expression}
    let standard = split[0].split(")")[0].split("(")[1];
    if(standard.split(" - ").length==2){
        const s_split = standard.split(" - ");
        standard = s_split[0] +" + "+ (-Number(s_split[1]));
    }
    for(let i=1;i<split.length;i++){
        let negative = split[i].split(" - ").length==2;
        const n1 = Number(split[i].split(regex)[1].split(")")[0])*(1-negative*2);
        const left = standard.split(regex)[0];
        let products = {};
        const standard_split = standard.split(regex);
        for(let j=0;j<standard_split.length;j++){
            const term = standard_split[j];
            if(term.split("x^").length!=1){
                products[term.split("x^")[1]] = n1*Number(term.split("x^")[0]) || n1;
            }
            else if(term.split("x").length!=1){
                products[1] = n1*Number(term.split("x")[0]) || n1;
            }
            else{products[0] = n1*Number(term) || n1}
        }
        for(let j=0;j<standard_split.length;j++){
            const term = standard_split[j];
            let product=0;
            let index = 0;
            if(term.split("x^").length!=1){
                index = Number(term.split("x^")[1])+1;
                product = Number(term.split("x^")[0]);
            }
            else if(term.split("x").length!=1){
                index = 2;
                product = Number(term.split("x")[0]) || 1;
            }
            else{index = 1;product = Number(term) || 0}
            if(products[index]){products[index]+=product}
            else{products[index]=product}
        }
        standard = "";
        let start = true;
        for(j in products){
            if(start){start=false}
            else{standard+=" + "}
            if(j==0){standard+=String(products[j])}
            else if(j==1){standard+=String(products[j])+"x"}
            else{standard += products[j]+"x^"+j}
        }
    }
    alert(standard);
})();
