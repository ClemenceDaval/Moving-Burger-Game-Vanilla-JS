var game = {
    init: function(){
       
    },
    cellWidth: 50,
    tableau: document.querySelector('.terrain_de_jeu'),
    types: {
        'x': 'classic',
        '*': 'wall',
        'o': 'burger',
        '-': 'goal'
    },
};


document.addEventListener('DOMContentLoaded', game.init);

var model = [
    'xxxxxxxxx**xx',
    'x********xx-x',
    'xxxxxxxx*x**x',
    'xx*****xxx*x*',
    'xxxxxx*x***x*',
    '****xx*x*xxx*',
    'xxx*xx*x*xxxx',
    'x*o*xx**xx*xx',
    'x***xxxxxx*xx',
    'xxxxxx*****xx',
];
// on a affiché la grille vierge dans le HTML
// on cherche maintenant à afficher les murs, le burger et le smiley

// pour celà on va parcourir chaque ligne de notre tableau, et dans chaque ligne, chaque caractère
// si le caractère est un x, rien ne change (la case est déjà affichée comme il faut)
// si le caractère est un *, on ajoute la classe .wall à la case (on garde square)
// si le caractère est un -, on ajoute la classe .smiley
// si le caractère est un o, on ajoute la classe .burger

for (let i = 0 ; i < (model.length) ; i++){
    let ligne = model[i];
    let y = 'y' + i ;
    //console.log(y);
    //console.log('la ligne ' + i + ' est : ' + ligne);
    for (let i = 0 ; i < 13 ; i++){
       lettre = ligne.charAt(i);
       let x = 'x' + i ;
       let classeXY = y + x ;
       //on cible la case concernée
       let cellXY = document.getElementById(classeXY);
       // on en profite pour ajouter un écouteur d'évènement sur cette case
       //console.log(classeXY);
       //console.log(x);
       //console.log('la lettre ' + i + ' est : ' + lettre);
       if (lettre === '*' ){
            cellXY.classList.add('wall');
       }
       if (lettre === 'o'){
            cellXY.classList.add('burger');
       }
       if (lettre === '-'){
            cellXY.classList.add('goal');
   }
   } 
}

let burgerLocationX = 2 ;
let burgerLocationY = 7 ;

let targetedCellX ;
let targetedCellY ;

//cette fonction détermine si la case visée en argument est un mur, le goal ou un chemin
let isTargetedCellAccessible = function (targetedCellClass){
    let targetedCell = document.getElementById(targetedCellClass);
    if (targetedCell.classList.value == 'square wall'){
        console.log('Vous ne pouvez pas aller dans un mur !');
        return false ;
    }
    console.log(targetedCell.classList.value);
    if (targetedCell.classList.value == 'square goal'){
        setTimeout(bravo, 500);
        return true;
    }
    if (targetedCell.classList.value == 'square'){
        return true ;
    }
}

// fonction bravo
let bravo = function(){
    alert('Bravo, vous avez réussi !!');

}
// je créé ma fonction qui fait bouger mon burger
let handleMoveBurger = function(event){

    // je récupère la touche qui a été appuyée avec la propriété de event which
    let pressedKey = event.which ;
    console.log(pressedKey);

    if (pressedKey == 37 || pressedKey == 39){
        // on cherche à aller à gauche ou à droite, on modifie burgerLocationX

        if (pressedKey == 37){
            // on enlève 1 à la valeur de burgerLocationX
            // seulement burgerLocationX n'est pas égal à 0 (sinon on sort de la grille)
            if (burgerLocationX != 0){
                targetedCellX = burgerLocationX - 1 ;
            }
            else{
                console.log("Vous ne pouvez pas sortir de la grille");
            }
        }

        if (pressedKey == 39){
            // on ajoute 1 à la valeur de burgerLocationX
            // seulement si burgerLocationX n'est pas égal à 12
            if (burgerLocationY != 12){
                targetedCellX = burgerLocationX + 1 ;
            }
            else{
                console.log("Vous ne pouvez pas sortir de la grille");
            }
        }

        targetedCellClass = 'y' + burgerLocationY + 'x' + targetedCellX ;
        console.log(targetedCellClass);

        // on appelle la fonction isTargetedCellAccessible
        if (isTargetedCellAccessible(targetedCellClass)){
            // on enlève le burger de sa case actuelle 
            document.getElementById('y'+burgerLocationY + 'x' + burgerLocationX).classList.remove('burger');
            // on met à jour burgerLocationX
            burgerLocationX = targetedCellX ;
            // on ajoute la classe burger à cette nouvelle cellule
            document.getElementById(targetedCellClass).classList.add('burger');
            // on efface l'éventuelle class goal
            document.getElementById(targetedCellClass).classList.remove('goal');
            
        }
    }

    else if (pressedKey == 38 || pressedKey == 40){
        // on cherche à aller en haut ou en bas, on modifie burgerLocationY

        if (pressedKey == 38){
            // on retire 1 à la valeur de burgerLocationY (on va vers le haut)
            // seulement si burgerLocationY n'est pas égal à 0
            if (burgerLocationY != 0){
                targetedCellY = burgerLocationY - 1 ;   
            }
            else{
                console.log("Vous ne pouvez pas sortir de la grille");
            }
        }

        if (pressedKey == 40){
            // on ajoute 1 à la valeur de burgerLocationY (on va vers le bas)
            // seulement si burgerLocationY n'est pas égal à 9
            if (burgerLocationY != 9){
                targetedCellY = burgerLocationY+ 1 ;
            }
            else{
                console.log("Vous ne pouvez pas sortir de la grille");
            }
        }

        targetedCellClass = 'y' + targetedCellY + 'x' + burgerLocationX ;
        console.log(targetedCellClass);
        
        // on appelle la fonction isTargetedCellAccessible
        if (isTargetedCellAccessible(targetedCellClass)){
            // on enlève le burger de sa case actuelle 
            document.getElementById('y'+burgerLocationY + 'x' + burgerLocationX).classList.remove('burger');
            // on met à jour burgerLocationY
            burgerLocationY = targetedCellY ;
            // on ajoute la classe burger à cette nouvelle cellule
            document.getElementById(targetedCellClass).classList.add('burger');
            // on efface l'éventuelle class goal
            document.getElementById(targetedCellClass).classList.remove('goal');
        }
    }
    else{
        console.log('La touche sélectionée n\'est pas valide');
    }

}




//     switch (pressedKey){
//         case 37 :
//         // on cible la case à gauche de burgerLocation
//         // on enlève un à la valeur de burgerLocationX
//         // seulement burgerLocationX n'est pas égal à 0 (sinon on sort de la grille)
//             if (burgerLocationX != 0){
//                 targetedCellX = burgerLocationX - 1 ;
//                 targetedCellClass = 'y' + burgerLocationY + 'x' + targetedCellX ;
//                 console.log(targetedCellClass);
                
//             }
//             else{
//                 console.log("Vous ne pouvez pas sortir de la grille");
//             }
//             break;
        
//         case 38 :
//             // on cible la case en haut de burgerLocation
//             // on retire 1 à la valeur de burgerLocationY
//             // seulement si burgerLocationY n'est pas égal à 0
//             if (burgerLocationY != 0){
//                 targetedCellY = burgerLocationY - 1 ;
//                 targetedCellClass = 'y' + targetedCellY + 'x' + burgerLocationX ;
//                 console.log(targetedCellClass);
//             }
//             else{
//                 console.log("Vous ne pouvez pas sortir de la grille");
//             }
//             break;

//         case 39 :
//             // on cible la case à droite de burgerLocation
//             // on ajoute 1 à la valeur de burgerLocationX
//             // seulement si burgerLocationX n'est pas égal à 12
//             if (burgerLocationY != 12){
//                 targetedCellX = burgerLocationX + 1 ;
//                 targetedCellClass = 'y' + burgerLocationY + 'x' + targetedCellX ;
//                 console.log(targetedCellClass);
//             }
//             else{
//                 console.log("Vous ne pouvez pas sortir de la grille");
//             }
//             break;

//         case 40 :
//         // on cible la case en bas de burgerLocation
//         // on ajoute 1 à la valeur de burgerLocationY
//         // seulement si burgerLocationY n'est pas égal à 9
//         if (burgerLocationY != 9){
//             targetedCellY = burgerLocationY+ 1 ;
//             targetedCellClass = 'y' + targetedCellY + 'x' + burgerLocationX ;
//             console.log(targetedCellClass);
//         }
//         else{
//             console.log("Vous ne pouvez pas sortir de la grille");
//         }
//         break;
//     }

//     // si la cellule est accessible, isTargetedCellAccessible renvoie true
//     if (isTargetedCellAccessible(targetedCellClass)){

                    
//     }

    
// }



// code des touches
// flèche de gauche : 37
// flèche du haut : 38
// flèche de droite : 39
// flèche du bas : 40




// j'ajoute un écouteur d'évènement de type keydown sur mon document 
document.addEventListener('keydown', handleMoveBurger);
