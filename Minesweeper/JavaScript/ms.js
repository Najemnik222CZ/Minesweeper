
var tiles;
var flaggin = false;
var tilesIMG = new Array();
var tilesObj = new Array();

for(let i = 0;i<400;i++){
    let obj = {left: false,right: false,up: false,down: false,upperleft: false,upperright: false,downright: false,downleft: false};
    tilesObj.push(obj);
}
// nastavení obrázku každého políčka
window.onload = () => {
tiles = document.getElementsByTagName("TD");
for(var i = 0;i<tiles.length;i++){
    var tileIMG = document.createElement("img");
    tileIMG.src = "SVG/minesweeper/tile.jpg";
    tileIMG.style.width = "100%";
    tileIMG.style.height = "33px";
    tilesIMG.push(tileIMG);
    tiles[i].append(tileIMG);
    
}}

var difficulty; // obtížnost určuje počet min
difficulty = prompt("Choose your difficulty : \nEasy\t[1]\nMedium\t[2]\nHard\t[3]");
var bombnum;
switch(difficulty){
    case "1": bombnum=40;        
    break;
    case "2": bombnum=70;
    break;
    case "3": bombnum=100;
    break;
    default: bombnum=70;
    break;
}
var mines = new Array();
var rand;
var currentPos;
do{
    rand = Math.floor(Math.random() * 399); // 0 - 399 (pozice v herním poli)  Math.floor(Math.random() * (max - min) + min)
    for(let p = 0;p<mines.length;p++){
        if(mines[p]==rand){
            rand = Math.floor(Math.random() * 399);
            p=0;  // prohledej pole pozic min pro duplikáty a nahrad je nepakujícím se číslem
        }
    }
    mines.push(rand);
}while(mines.length!=bombnum); // opakujeme dokud máme array plný indexů min bez duplikátů

var lost = (_this) => { // kontroluje zda vybraná pozice není mina
    for(let i = 0;i<400;i++){
        if(_this==tiles[i]){
            currentPos = i;
            for(let y = 0;y<mines.length;y++){
                if(mines[y]==i){    // pokud pozice na kterou jsme klikli je pozice určená náhodně pro minu, tak metoda vrací true (prohra = pravda)
                    return true;
                }
            }
        }
    }
}
function reveal(except){ // pokud jsme prohráli, tak zobrazíme všechny miny až na tu kterou jsme rozklikli (protože ta má jiný obrázek)
                for(let wm = 0;wm<bombnum;wm++){
                    if(tilesIMG[mines[wm]]!=except){ // tato mina nebyla rozkliknuta
                    tilesIMG[mines[wm]].src = "SVG/minesweeper/bomb.png";
                }
            }
}
// proměnné boolean pro zjištění zda rozkliknutá pozice není zed či roh
function soused(pozice){     // metoda na zjištění kde máme sousedy od pozice pos (objekt)
    
    if(pozice==0||pozice%20==0){
        tilesObj[pozice].right = true;
        tilesObj[pozice]
        if(pozice==0){
            tilesObj[pozice].down = true;
            tilesObj[pozice].downright = true;
        } 
     
        if(pozice==380){
            tilesObj[pozice].upperright = true;
            tilesObj[pozice].up = true;
        }
        if(pozice!=0&&pozice!=380){
            tilesObj[pozice].upperright = true;
            tilesObj[pozice].downright = true;
            tilesObj[pozice].up = true;
            tilesObj[pozice].down = true;
        }
    } 
        if(pozice>0&&pozice<20){
            tilesObj[pozice].down = true;
            tilesObj[pozice].left = true;
            tilesObj[pozice].downleft = true;
            if(pozice!=19){
                tilesObj[pozice].right=true;
                tilesObj[pozice].downright = true;
            }
        }
        if(pozice>380){
            tilesObj[pozice].up = true;
            tilesObj[pozice].upperleft=true;
            tilesObj[pozice].left = true;
            if(pozice!=399){
                tilesObj[pozice].upperright = true;
                tilesObj[pozice].right = true;
            }
            
        }
        if((pozice+1)%20==0&&pozice!=19&&pozice!=399){
            tilesObj[pozice].left = true;
            tilesObj[pozice].up = true;
            tilesObj[pozice].down = true;
            tilesObj[pozice].upperleft = true;
            tilesObj[pozice].downleft = true;
            
        }
        if(tilesObj[pozice].left==false&&tilesObj[pozice].right==false&&tilesObj[pozice].up==false&&tilesObj[pozice].down==false&&tilesObj[pozice].upperleft==false
            &&tilesObj[pozice].upperright==false&&tilesObj[pozice].downleft==false&&tilesObj[pozice].downright==false){
            tilesObj[pozice].left = true;
            tilesObj[pozice].up = true;
            tilesObj[pozice].down = true;
            tilesObj[pozice].right = true;
            tilesObj[pozice].upperleft = true;
            tilesObj[pozice].downleft = true;
            tilesObj[pozice].upperright = true;
            tilesObj[pozice].downright = true;
        }
}
for(let i = 0;i<400;i++){
    soused(i);
}

var countMines = (pos) => {  // počítá kolik sousedních min má pozice pos
    var numOfMines = 0;
        for(let iy = 0;iy<bombnum;iy++){
           if(tilesObj[pos].upperleft){
               if(pos-21==mines[iy]){
                   numOfMines+=1;
               }
            }
            if(tilesObj[pos].up){
                if(pos-20==mines[iy]){
                    numOfMines+=1;
                }
            }
            if(tilesObj[pos].upperright){
                if(pos-19==mines[iy]){
                    numOfMines+=1;
                }
            }
            if(tilesObj[pos].right){
                if(pos+1==mines[iy]){
                    numOfMines+=1;
                }
            }
            if(tilesObj[pos].downright){
                if(pos+21==mines[iy]){
                    numOfMines+=1;
                }
            }
            if(tilesObj[pos].down){
                if(pos+20==mines[iy]){
                    numOfMines+=1;
                }
            }
            if(tilesObj[pos].downleft){
                if(pos+19==mines[iy]){
                    numOfMines+=1;
                }
            }
            if(tilesObj[pos].left){
                if(pos-1==mines[iy]){
                    numOfMines+=1;
                }
            }
    }
    return numOfMines;
}
var qp;                        // získáme cestu k obrázku abychom potom v ifech mohli porovnávat src obrázků
var pathTILE = "file://"+window.location.pathname.substring(0,window.location.pathname.length-16)+"SVG/minesweeper/tile.jpg";
var pathFLAG = "file://"+window.location.pathname.substring(0,window.location.pathname.length-16)+"SVG/minesweeper/flag.png";

var flag = () => {
    flaggin = true;
    qp = document.getElementById("f");
    qp.src = "SVG/minesweeper/usedFlag.png";
}
var playing = true; // boolean hodnota pro povolení hrát
var autoClear = (index) => {                           
    //funkce na čištění sousedů volné pozice              *
    // if pozice na indexu index je číslo
    if(countMines(index)>0){
        tilesIMG[index].src = "SVG/minesweeper/"+countMines(index)+".png";
    }else{
    // pozice na indexu index je prázdná pozice
    tilesIMG[index].src = ""; 
    
    if((tilesObj[index].right == true)&&(tilesIMG[index+1].src!=pathTILE)){           
        tilesObj[index].right = false;
    }
    if((tilesObj[index].left == true)&&(tilesIMG[index-1].src!=pathTILE)){            
        tilesObj[index].left = false;
    }
    if((tilesObj[index].upperright == true)&&(tilesIMG[index-19].src!=pathTILE)){     
        tilesObj[index].upperright = false;
    }
    if((tilesObj[index].up == true)&&(tilesIMG[index-20].src!=pathTILE)){             
        tilesObj[index].up = false;
    }
    if((tilesObj[index].upperleft == true)&&(tilesIMG[index-21].src!=pathTILE)){      
        tilesObj[index].upperleft = false;
    }
    if((tilesObj[index].down == true)&&(tilesIMG[index+20].src!=pathTILE)){           
        tilesObj[index].down = false; 
    }
    if((tilesObj[index].downright == true)&&(tilesIMG[index+21].src!=pathTILE)){      
        tilesObj[index].downright = false;
    }
    if((tilesObj[index].downleft == true)&&(tilesIMG[index+19].src!=pathTILE)){       
        tilesObj[index].downleft = false;
    }
    clearCloseby(index);
}
    
}  
function clearCloseby(p){                       //      * 
    // pokud exzistuje tento soused tak ho odhal
    if(tilesObj[p].right&&tilesObj[p].left&&tilesObj[p].up&&tilesObj[p].down&&tilesObj[p].upperleft&&tilesObj[p].upperright&&tilesObj[p].downleft&&tilesObj[p].downright){
        autoClear(p+1);
        autoClear(p-1);
        autoClear(p-20);
        autoClear(p-21);
        autoClear(p-19);
        autoClear(p+20);
        autoClear(p+21);
        autoClear(p+19);
    }else{
    if(tilesObj[p].right){
        autoClear(p+1);
    }
    if(tilesObj[p].left){
        autoClear(p-1);
    }
    
    if(tilesObj[p].up){
        autoClear(p-20);
    }
    if(tilesObj[p].upperleft){
        autoClear(p-21);
    }
    if(tilesObj[p].upperright){
        autoClear(p-19);
    }
    if(tilesObj[p].down){
        autoClear(p+20);
    }
    if(tilesObj[p].downright){
        autoClear(p+21);
    }
    if(tilesObj[p].downleft){
        autoClear(p+19);
    }
    }
}

var display = (_this) => {
    var q = _this.getElementsByTagName("IMG");

if(playing){

    if(flaggin){
        q[0].src = "SVG/minesweeper/flag.png";
        flaggin = false;
        qp.src = "SVG/minesweeper/flag.png";

    }else{
    var source = q[0].src;                                        
    if(source==pathFLAG){    // rozkliknutí vlajky na poli vede k jejímu vymazání, ne k aktivování rozklidnutého políčka                      
        q[0].src = "SVG/minesweeper/tile.jpg";

        }else{

    if(lost(_this)){
    q[0].src="SVG/minesweeper/boom.jfif";
    var status = document.getElementById("guy");
    status.src = "SVG/minesweeper/lose.png";
    reveal(q[0]);
    playing = false;
    }else{
        
        if(countMines(currentPos)==0){
            q[0].src= "";
            clearCloseby(currentPos);                  
        }else{
            tilesIMG[currentPos].src = "SVG/minesweeper/"+countMines(currentPos)+".png";
            
        }
        var neodhaleny = 0;
        for(let i = 0;i<400;i++){ // if(počet min == počet neodhalených pozic) => player vyhrál
            if(tilesIMG[i].src==pathTILE||tilesIMG[i].src==pathFLAG){      
                neodhaleny++; 
            }
        }
        if(neodhaleny==bombnum){
            document.getElementById("guy").src = "SVG/minesweeper/win.png";
            playing = false;
        }
    }   
    }
}
}
}