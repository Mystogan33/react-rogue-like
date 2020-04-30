import Entity from "./Entity";
import World from "./World";

class Monster extends Entity {
  action(verb: string, world: World) {
    const {damage, armor} = world.player.attributes;

    switch (verb) {
      case "bump":
        if(this.attributes && this.attributes.health) {
          world.addToHistory(`Player attacks ${this.attributes.name} !`);
          this.attributes.health = this.attributes.health - damage;

          if(this.attributes.health <= 0) {
            world.addToHistory(`${this.attributes.name} dies !`);
            world.remove(this);
            
            const monsters = world.entities.filter(entity => entity instanceof Monster === true);
            if(monsters.length === 0) world.addToHistory(`You have win!`);
          } else {
            world.addToHistory(`${this.attributes.name}'s health is now ${this.attributes.health}hp !`);
            world.player.attributes.health = world.player.attributes.health - (1 / armor);

            if(world.player.attributes.health <= 0) world.addToHistory(`You have died!`);
            else world.addToHistory(`You have ${world.player.attributes.health} hp !`);
          }
        }
        break;
      default:
        break;
    }
  };
};

export default Monster;