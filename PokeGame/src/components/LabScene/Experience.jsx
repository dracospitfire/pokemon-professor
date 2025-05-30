import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { useRef, useState } from "react";
import { CharacterController } from "../Controller/CharacterController";
import { Map } from "./Map";
import { Chest } from "../Objects/Chest";

import citySceneTokyoModel from '../../assets/Models/city_scene_tokyo.glb';
import medievalFantasyBookModel from '../../assets/Models/medieval_fantasy_book.glb';
import castleOnHills from '../../assets/Models/castle_on_hills.glb';
import animalCrossingModel from '../../assets/Models/animal_crossing_map.glb';
import deDust2WithRealLightModel from '../../assets/Models/de_dust_2_with_real_light.glb';

const maps = {
  castle_on_hills: {
    scale: 3,
    position: [-6, -7, 0],            // Spawning location on the map
    model: castleOnHills,
  },
  animal_crossing_map: {
    scale: 20,
    position: [-15, -1, 10],          // Spawning location on the map
    model: animalCrossingModel,
  },
  city_scene_tokyo: {
    scale: 0.72,
    position: [-.5, -1, -8.1],        // Spawning location on the map
    model: citySceneTokyoModel,
  },
  de_dust_2_with_real_light: {
    scale: 0.3,
    position: [-5, -3, 13],           // Spawning location on the map
    model: deDust2WithRealLightModel,
  },
  medieval_fantasy_book: {
    scale: 0.4,
    position: [-4, 0, -6],            // Spawning location on the map
    model: medievalFantasyBookModel,
  },
};

export const Experience = () => {

  const shadowCameraRef = useRef();
  const chestRef = useRef();

  const [chestOpened, setChestOpened] = useState(false);


  const handleChestOpen = () => {
    if (!chestOpened) {
      setChestOpened(true);
      console.log("✨ Chest opened!");
    }
  };

  const { map } = useControls("Map", {
    map: {
      value: "city_scene_tokyo",        // default selected map
      options: Object.keys(maps),
    }
  });

  return (
    <>
      <Environment files="./HDRI/venice_sunset_1k.hdr" background />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      <Physics key={map}>
        <Map
          scale={maps[map].scale}
          position={maps[map].position}
          model={maps[map].model}
        />
        <CharacterController
          chestRef={chestRef}
          onChestOpen={handleChestOpen}
        />
        <group ref={chestRef} position={[0, -0.9, -2]} scale={0.15}>
          <Chest opened={chestOpened} />
        </group>
      </Physics>
    </>
  );
};
