// let player = new Object();
let player = {
    name: 'Your Name', 
    energy: 100, 
    lives: 2, 
    x: 19, 
    y: 100, 
    color: 'blue'};

console.log(player);
console.log(player.name);
console.log(player['color']);

player.name = 'some other name';
console.log(player.name);

player.friend = {name: 'Pablo'};
player.weapon = 'sword';
