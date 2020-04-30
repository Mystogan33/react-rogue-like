import React, { useEffect, useRef, useState } from 'react';
import InputManager from '../helpers/InputManager';
import World from '../helpers/World';
import Spawner from '../helpers/Spawner';

import './ReactRogue.css';

interface ReactRogueProps {
  width: number;
  height: number;
  borderColor: string;
  tilesize: number;
};

const ReactRogue = ({ width, height, borderColor, tilesize }: ReactRogueProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  let inputManager = new InputManager();
  const [world, setWorld] = useState(new World(width, height, tilesize));

  const handleInput = (action: any, data: any) => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  };

  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(4);
    spawner.spawnMonster(10);
    spawner.spawnStairs();
    setWorld(newWorld);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);

    return () => {
      inputManager.unbindKey();
      inputManager.unsubscribe(handleInput);
    }
  });

  useEffect(() => {
    if(canvasRef && canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      if(canvas) {
        const ctx = canvas.getContext('2d');
        if(ctx) {
          ctx.clearRect(0, 0, width * tilesize, height * tilesize);
          world.draw(ctx);
        };
      }
    }
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width * tilesize}
        height={height * tilesize}
        style={{ border: `1px solid ${borderColor}`, background: 'DimGray' }}
      ></canvas>
      <div className="inventory">
        <h2>Inventory</h2>
        <ul>
          { world.player.inventory.map((item, index) => (
              <li key={index} style={{ color: item.attributes.color, fontWeight: "bold" }}>{item.attributes.name}</li>
            ))
          }
        </ul>
      </div>
      <div className="history">
        <h2>History</h2>
        <ul>
          { world.history.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          }
        </ul>
      </div>
    </>
  )
};

export default ReactRogue;