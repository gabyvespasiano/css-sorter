//todos los tags del css
let csstags=[];
//las clases del css
let Lclass=[];
//los tags del css
let Ltags=[];
//id del css
let Lid=[];
// css ya ordenado (solo tags)
let Lorder=[];

//media query
let Lmediaquery=[];

//tags html
let Lhtml = [];

//presunt order css
let Porder=[];

let css;
let html1;


document.getElementById("ordena").addEventListener("click", function(e) {
    css = document.getElementById("css").value;
    html1 = document.getElementById("html").value;
    first();
    html();
    sort();
    regenerate();
});
//
//QUITARIA EL BLOQUE ENTERO DE @media DEL CSS A FILTRAR PARA QUE NO SE ROMPA
//
// function media(){//function media(css){
//     let regex = /@media\s*[^{]+\{([\s\S]+?)\}/gm;
    
//     let css = `
//     body {
//       background-color: white;
//     }
    
//     @media (min-width: 600px) {
//       body {
//         font-size: 1.2em;
//       }
//       header {
//         font-size: 1.2em;
//       }
//     }
    
//     @media (min-width: 6500px) {
//       body {
//         font-size: 1.2em;
//       }
 
//     }
    
//     .example-class p {
//       color: black;
//     }
//     `;
//     let newCss = css.replace(/@media[^{]*\{[\s\S]+?\}/gm, "");
//     console.log(newCss.trim());
// let matches = newCss.match(regex);
// // for (var i = 0; i < matches.length; i++) {
// //     newCss = newCss.replace(/@media\s*[^{]+\{([\s\S]+?)\}/gm,"")
// //  }
// console.log(matches);
// console.log(newCss);
// // Output: ['@media (min-width: 600px) {\n  body {\n    font-size: 1.2em;\n  }\n}']
// return css;
// }

function first(){
    let regex = /^.*?{/gm;

    csstags = css.match(regex);
    for (let i = 0; i < csstags.length; i++) {
        csstags[i] = csstags[i].trimStart();

        switch (csstags[i].charAt(0)) {
            case ".":
              Lclass.push(csstags[i]);
              break;
            case "#":
              Lid.push(csstags[i]);
              break;
            case ":":
              Lorder.push(csstags[i]);
              break;
            case "*":
              Lorder.push(csstags[i]);
              break;
            default:
                if (!csstags[i].includes("@media")){
                    Lid.push(csstags[i]);
                }
              
              break;
          }

     }
    // console.log(csstags);
    // console.log(Lclass);
    // console.log(Lid);
    // console.log(Lorder);
}
function html(){
    let regex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    //document.html
    let html =  document.documentElement.innerHTML;
    let tags = html.match(regex);
    let body = false;

    for (let i = 0; i < tags.length; i++) {
        tags[i] = tags[i].trimStart();
        //detecta si llegamos a la seccion del body
        if (tags[i].includes("body")){
            body = true;
        }//si es la seccion del body , y no es una etiqueta de cierre y no es la inclucion de un script
        if (body && tags[i].charAt(1) != "/" && !tags[i].includes("<script")){
            Lhtml.push(tags[i]);
        }
    }
    
    //console.log(Lhtml);

    
}
//guarda los valores ya agregados para crear una "blacklist"
let ptemp=[];

let ttemp=[];
let ctemp=[];
let itemp=[];
function sort(){

    for (let i = 0; i < Lhtml.length; i++) {
        Porder.push(limpia(Lhtml[i].match(/<+\S*/gi)[0],["<",">"]));        
        //console.log(test)
         if (Lhtml[i].includes("class=")){
            Porder.push(limpia(Lhtml[i].match(/class="+\S*/gi)[0],['class="','"']));
         }
         if (Lhtml[i].includes("id=")){
            Porder.push(limpia(Lhtml[i].match(/id="+\S*/gi)[0],['id="','"','>']));
         }
        // console.log(Lhtml[i]);
    }
    //elimina duplicados
    Porder = Array.from(new Set(Porder))
    //console.log(Porder)
    
    for (let po = 0; po < Porder.length; po++) {
        for (let lt = 0; lt < Ltags.length; lt++) {
            if (Ltags[lt].includes(Porder[po])){
                if (!check(ptemp,po) && !check(ttemp,lt)){
                    Lorder.push(Ltags[lt])
                }
            }
        }

        for (let lc = 0; lc < Lclass.length; lc++) {
            if (Lclass[lc].includes(Porder[po])){
                if (!check(ptemp,po) && !check(ctemp,lc)){
                    Lorder.push(Lclass[lc])
                }
            }
        }
        for (let li = 0; li < Lid.length; li++) {
            if (Lid[li].includes(Porder[po])){
                if (!check(ptemp,po) && !check(itemp,li)){
                    Lorder.push(Lid[li])
                    
                }
            }
        }

        
 
    }
    // agrega los que quedaron afuera al final del archivo
    //console.log(Lorder)
    for (let lt = 0; lt < Ltags.length; lt++) { 
        if (!check(ttemp,lt)){
            Lorder.push(Ltags[lt])
        }        
    }

    for (let lc = 0; lc < Lclass.length; lc++) {
        if (!check(ctemp,lc)){
            Lorder.push(Lclass[lc])
        }        
    }
    for (let li = 0; li < Lid.length; li++) {
        if (!check(itemp,li)){
            Lorder.push(Lid[li])
                       
        }
    }

    //console.log(Lorder)
}

function check(list,str){
    let esta = false;
    for (let i = 0; i < list.length; i++) {
        if (list[i]==str){
            esta = true;
        }
    }
    if (esta){
        return true;
    }else{
        list.push(str)
        return false;
    }
    
}
function limpia(str,limpiador){
    for (let i = 0; i < limpiador.length; i++) {
        str = str.replace(limpiador[i],"")
    }
    return str;
}
let ordenado = [];
function regenerate(){
    for (let i = 0; i < Lorder.length; i++) {
        
        
        let selector= Lorder[i].replace("{","").trim();
        let pattern = new RegExp(`(\\.?)(${selector})\\s*\\{([\\s\\S]*?)\\}`, "i");
        //console.log(pattern);
        //console.log(css.match(pattern)[0])
        ordenado.push(css.match(pattern)[0])
    }
    for (var i = 0; i < ordenado.length; i++) {
        document.getElementById("resultado").value +=  ordenado[i] + "\n";
       // console.log(ordenado[i]);
    }
}
