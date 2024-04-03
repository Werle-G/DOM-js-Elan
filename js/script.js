function shuffleChildren(parent){
    let children = parent.children;
    let i = children.length, k, temp;

    while(--i > -1){                              //tant que 1 - i  > -1
        k = Math.floor(Math.random() * (i+1));    //k nb aleatoire basé sur i
        temp = children[k];                       //temp pointe temporairement la position k
        children[k] = children[i];                //remplace element position k à position i
        parent.appendChild(temp);                 //place element k pointé tempor. à la fin du contenu parent
    }
}
                 
const board = document.querySelector("#board");
const box = document.createElement("div"); 
box.classList.add("box"); 


// ------------------------Timer-------------------------------------------

let temps = 59;

const timerElement = document.getElementById("timer");

var interval = setInterval(() => {

let secondes = parseInt(temps % 60, 10); //analyse chaîne de caractère fournie en argument et renvoie un entier exprimé dans une base donnée
secondes = secondes < 10 ? "0" + secondes : secondes;
timerElement.innerText = secondes;  
temps = temps <= 0 ? 0 : temps - 1;

}, 1000)

// ---------------Durée box color !== succes---------Local storage------------------


const highScore = document.getElementById("highScore");


function showReaction(type, clickedBox){
    clickedBox.classList.add(type);

    if(type !== "success"){
        setTimeout(function(){
            clickedBox.classList.remove(type);
        }, 800);
    }
    else{

        clearInterval(interval);
        var element = document.getElementById("timer");

        var valeur = element.textContent;
        var depart = 60;
        var resultat = depart - valeur;
        
        var last = localStorage.getItem('resultat');
    
        if (resultat < last) {
            localStorage.setItem('resultat', resultat);
            result.innerText = "Resultat : " + resultat + " secondes";
            highScore.innerText = "Meilleur score : " + resultat + " secondes";
        }

        else if(resultat == last){
            highScore.innerText = "Vous avez obtenu le meilleur score !!! " + resultat + " secondes";
        }

        else{
            result.innerText = "Resultat : " + resultat + " secondes";
            highScore.innerText = "Meilleur score : " + last + " secondes";
        }
    }
}




// ----------------------------clone box------------------

let nb = 1;

for(let i = 1; i <= 10; i++){
    const newbox = box.cloneNode();  //copie d'un nœud, retourne le clone.  
    newbox.innerText = i;
    board.appendChild(newbox);  //place en enfant div#board avec méthode appendChild || (dans le dom tree)

    newbox.addEventListener("click",() =>{    // addEvenLinstener (ajoute evenènement)
            
        if(i == nb){
 
            newbox.classList.add("box-valid");
            if(nb == board.children.length){
                board.querySelectorAll(".box").forEach(function(box){
                    showReaction("success", box);
                    
                })
            }
            shuffleChildren(board);
            nb++;
        }

        else if(i > nb){

            showReaction("error", newbox);
            
            nb = 1;
            board.querySelectorAll(".box-valid").forEach(function(validBox){
                validBox.classList.remove("box-valid");
                
            })
            shuffleChildren(board)
        }
        else{

            const t = setInterval(() => {
                console.log('1');
            }, 1000)
            console.log(t);

            showReaction("notice", newbox);
        }
    })
}

shuffleChildren(board);



// -----------------Boite de dialogue-----(prompt())-------------------------


let numberBox = prompt("Combien y a-t-il de boites ?");

if(numberBox === '10') {
    alert('Bonne partie')
}



