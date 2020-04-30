import World from "./World";

// interface IEntityAttributes {
//   name: string;
//   ascii: string;
//   health?: number;
//   armor?: number;
//   damage?: number;
//   color?: string;
//   offset?: {
//     x: number;
//     y: number;
//   }
// };

class Entity {

  constructor(
    public x = 0,
    public y = 0,
    public size = 0,
    public attributes: any = {}
  ) {
    this.attributes = { ...attributes };
  };

  action(verb: string, world: World) {
    console.log(`Verb: ${verb}`);
  };

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.attributes.color || 'white';
    context.textBaseline = "hanging";
    context.font = "16px Helvetica";
    context.fillText(
      this.attributes.ascii,
      this.x * this.size + (this.attributes.offset ? this.attributes.offset.x : 0),
      this.y * this.size + (this.attributes.offset ? this.attributes.offset.y : 0),
    );
  };
};

export default Entity;