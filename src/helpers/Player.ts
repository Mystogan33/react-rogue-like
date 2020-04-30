import Entity from "./Entity";
import World from "./World";
import { workerData } from "worker_threads";

class Player extends Entity {

  inventory: Entity[] = [];

  attributes = {
    name: 'Player',
    ascii: '🧍',
    health: 10,
    damage: 1,
    armor: 1
  };

  move(dx: number, dy: number) {
    if(this.attributes.health <= 0) return;
    this.x += dx;
    this.y += dy;
  };

  add(item: Entity, world: World) {
    this.inventory.push(item);
    let message = "";
    switch (item.attributes.name) {
      case "Long Sword":
        this.attributes.damage += 1;
        message = `You gained 1 more damage. You now have ${this.attributes.damage} damage !`;
        break;
      case "Health Potion":
        this.attributes.health += 1;
        message = `You gained 1 more hp. You now have ${this.attributes.health} hp !`;
        break;
      case "Light Armor":
        this.attributes.armor += 0.5;
        message = `You gained 0.5 more armor. You now have ${this.attributes.armor} armor !`;
        break;
      default:
        break;
    }
    world.addToHistory(`You've got a "${item.attributes.name}"`);
    world.addToHistory(message);
  };

  copyPlayer() {
    let newPlayer = new Player();
    Object.assign(newPlayer, this);
    return newPlayer;
  };
};

export default Player;