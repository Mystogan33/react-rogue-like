import { Map } from 'rot-js';
import Player from './Player';
import Entity from './Entity';

class World {
  public worldmap: number[][];
  public entities: any[];
  public history: string[] = ['You entered the dungeon !', '---'];

  constructor(public width = 0, public height = 0, public tilesize = 0) {
    this.entities = [new Player(0, 0, 16)];

    this.worldmap = new Array(this.width);
    for(let x= 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    };
  };

  get player(): Player {
    return this.entities[0];
  };

  add(item: Entity) {
    this.entities.push(item);
  };

  remove(item: Entity) {
    this.entities = this.entities.filter(entity => entity !== item);
  };

  moveToSpace(entity: Entity) {
    for(let x = entity.x; x < this.width; x++) {
      for(let y = entity.y; y < this.height; y++) {
        if(this.worldmap[x][y] === 0 && !this.getEntityAtLocation(x, y)) {
          entity.x = x;
          entity.y = y;
          return;
        }
      }
    }
  };

  isWall(x: number, y: number) {
    return (
      this.worldmap[x] === undefined ||
      this.worldmap[y] === undefined ||
      this.worldmap[x][y] === 1
    );
  };

  getEntityAtLocation(x: number, y: number) {
    return this.entities.find(entity => entity.x === x && entity.y === y);
  };

  movePlayer(dx: number, dy: number) {
    let tempPlayer = this.player.copyPlayer();
    tempPlayer.move(dx, dy);

    let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);
    if(entity) {
      entity.action('bump', this);
      return;
    };

    if(this.isWall(tempPlayer.x, tempPlayer.y)) {
      console.log("Way blocked !")
    } else {
      this.player.move(dx, dy);
    }
  };

  createCellularMap() {
    let map = new Map.Cellular(this.width, this.height);
    map.randomize(0.5);
    let userCallback = (x: number, y: number, value: number) => {
      if(x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.worldmap[x][y] = 1;
        return;
      }
      this.worldmap[x][y] = (value === 0) ? 1 : 0;
    };

    map.create(userCallback);
    map.connect(userCallback, 1);
  };

  draw(context: CanvasRenderingContext2D) {
    for(let x = 0; x < this.width; x++) {
      for(let y=0; y < this.height; y++) {
        if(this.worldmap[x][y] === 1) this.drawWall(context, x, y);
      }
    };

    this.entities.forEach(entity => {
      entity.draw(context);
    });
  };

  drawWall(context: CanvasRenderingContext2D, x: number, y: number) {
    context.fillStyle = "#000";
    context.fillRect(
      x * this.tilesize,
      y * this.tilesize,
      this.tilesize,
      this.tilesize
    );
  };

  addToHistory(message: string) {
    this.history.push(message);
  };

};

export default World;