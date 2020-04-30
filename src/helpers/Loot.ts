import Entity from './Entity';
import World from './World';

class Loot extends Entity {
  action(verb: string, world: World) {
    switch (verb) {
      case "bump":
        world.player.add(this, world);
        world.remove(this);
        break;
      case "drop":
        console.log("drop", this);
        break;    
      default:
        break;
    }
  }
};

export default Loot;