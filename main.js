//nombres
//.*(\S*) ?{ 
///[^\s][^\{]+\}/g

//html
//<(.*)>.*?|<(.*) /> 

document.getElementById("ordena").addEventListener("click", function(e) {
    main();

});
function main(){
const css = document.getElementById("css").value;//fs.readFileSync(path.resolve(__dirname, 'style.css'), 'utf-8');
const selectorscss = css.match(/((.*)\s*:\s*(\S*)\s*\{|.*(\S*) ?{)/g);
for (var i = 0; i < selectorscss.length; i++) {
  //  console.log(selectors[i]);
}

const html = document.getElementById("html").value;//fs.readFileSync(path.resolve(__dirname, 'style.css'), 'utf-8');
const selectorshtml = html.match(/<(.*)>.*?|<(.*) \/>/g);
const clasesYtags=[];
for (var i = 0; i < selectorshtml.length; i++) {
    if (selectorshtml[i].includes("class")){
        if (selectorshtml[i].match(/class="[^"]*"/)[0].includes(" ")){
            clasesYtags.push(selectorshtml[i].match(/class="[^"]*"/)[0].split(" ")[0]);
        }else{
            clasesYtags.push(selectorshtml[i].match(/class="[^"]*"/)[0]);
        }
       
        //console.log(selectorshtml[i].match(/class="[^"]*"/)[0]);
        clasesYtags.push(selectorshtml[i]);
        //console.log(selectorshtml[i].match(/class="[^"]*"/)[0]);
    }else{
        clasesYtags.push(selectorshtml[i]);
    }
}
//console.log(clasesYtags)
let blacklist=[];
let ordenado=[];
for (var _html = 0; _html < selectorshtml.length; _html++) {
    for (var _css = 0; _css < selectorscss.length; _css++) {
    
        // console.log(selectorshtml[_html]);
        // console.log(selectorscss[_css].replace("{","").trim())

        if (selectorscss[_css].includes(".")){
            if (selectorshtml[_html].includes(selectorscss[_css].replace("{","").split(".")[1].trim())){
                let esta = false;
                for (var i = 0; i < blacklist.length; i++) {
                    if (blacklist[i] == _css){
                        esta =true;
                        break;
                    }
                }
                if (esta != true){
                //console.log(selectorshtml[_html] + selectorscss[_css]);
                //console.log(css.match("/(\.?)"+selectorscss[_css].replace("{","").trim()+ "\s*\{([\s\S]*?)\}/"))
                let selector= selectorscss[_css].replace("{","").trim();
                let pattern = new RegExp(`(\\.?)(${selector})\\s*\\{([\\s\\S]*?)\\}`, "i");
                //console.log(pattern);
                //console.log(css.match(pattern)[0])
                ordenado.push(css.match(pattern)[0])
                blacklist.push(_css);
                }
            }
        }
        else{
            if (selectorshtml[_html].includes(selectorscss[_css].replace("{","").trim())){
                let esta = false;
                for (var i = 0; i < blacklist.length; i++) {
                    if (blacklist[i] == _css){
                        esta =true;
                        break;
                    }
                }
                if (esta != true){
                //console.log(selectorshtml[_html] + selectorscss[_css]);
                //console.log(css.match("/(\.?)"+selectorscss[_css].replace("{","").trim()+ "\s*\{([\s\S]*?)\}/"))
                let selector= selectorscss[_css].replace("{","").trim();
                let pattern = new RegExp(`(\\.?)(${selector})\\s*\\{([\\s\\S]*?)\\}`, "i");
                //console.log(pattern);
                //console.log(css.match(pattern)[0])
                ordenado.push(css.match(pattern)[0])
                blacklist.push(_css);
                }
            }
        }    
        if (selectorscss[_css].includes(":")){
            if (selectorscss[_css].includes(".")){
                let temp = selectorscss[_css].split(":")[0].split(".")[1];
                //selectorscss[_css]=selectorscss[_css].split(":")[0]
                if (selectorshtml[_html].includes(temp.replace("{","").trim())){
                    //console.log(selectorshtml[_html] + temp);
                    let esta = false;
                    for (var i = 0; i < blacklist.length; i++) {
                        if (blacklist[i] == _css){
                            esta =true;
                            break;
                        }
                    }
                    if (esta != true){
                        let selector= selectorscss[_css].replace("{","").trim();
                        let pattern = new RegExp(`(\\.?)(${selector})\\s*\\{([\\s\\S]*?)\\}`, "i");
                        //console.log(pattern);
                        //console.log(css.match(pattern)[0])
                        ordenado.push(css.match(pattern)[0])
                        blacklist.push(_css);
                    }
                }
            }else{
                let temp = selectorscss[_css].split(":")[0];
                //selectorscss[_css]=selectorscss[_css].split(":")[0]
                if (selectorshtml[_html].includes(temp.replace("{","").trim())){
                    //console.log(selectorshtml[_html] + temp);
                    let esta = false;
                    for (var i = 0; i < blacklist.length; i++) {
                        if (blacklist[i] == _css){
                            esta =true;
                            break;
                        }
                    }
                    if (esta != true){
                        let selector= selectorscss[_css].replace("{","").trim();
                        let pattern = new RegExp(`(\\.?)(${selector})\\s*\\{([\\s\\S]*?)\\}`, "i");
                        //console.log(pattern);
                        //console.log(css.match(pattern)[0])
                        ordenado.push(css.match(pattern)[0])
                        blacklist.push(_css);
                    }
                }
            }
        }
    }
    
}

for (var i = 0; i < ordenado.length; i++) {
    document.getElementById("resultado").value +=  ordenado[i] + "\n";
   // console.log(ordenado[i]);
}
//
//En esta parte se deberia agregar el codigo faltante que no aparece en el html
//
// for (var _css = 0; _css < selectorscss.length; _css++) {
//     let esta = false;
//     for (var i = 0; i < blacklist.length; i++) {
//         if (blacklist[i] == _css){
//             esta =true;
//             break;
//         }
//     }
//     if (esta != true){
//         if (selectorscss[_css].includes(" ")){
//             let selector= selectorscss[_css].replace("{","").split(" ");
//             for (var i = 0;i<selector.length;i++){
//                 if (selector[i] != ""){
//                     //console.log(selector[i])
//                     let select = selector[i];
//                     let pattern = new RegExp(`(\\.?)(${select})\\s*\\{([\\s\\S]*?)\\}`, "i");
//                     document.getElementById("resultado").value += css.match(pattern);
//                     break;
//                 }
//             }
            
//             //let pattern = new RegExp(`(\\.?)(${selector})\\s*\\{([\\s\\S]*?)\\}`, "i");
//             //console.log(pattern);
//             //console.log(css.match(pattern)[0])
//             //console.log(css.match(pattern))
//             //document.getElementById("resultado").value += css.match(pattern)
//         }

//     }
// }
}