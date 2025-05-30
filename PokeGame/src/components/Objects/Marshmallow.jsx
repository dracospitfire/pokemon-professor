import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useLoader } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import marshmallow from '../../assets/Models/character.glb';

useGLTF.preload(marshmallow, false)

export function Marshmallow({ animation, ...props }) {
  const group = useRef();

  const GLTF = useLoader(GLTFLoader, marshmallow, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/DRACO/');
    loader.setDRACOLoader(dracoLoader);
  });

  const { nodes, materials, animations } = GLTF;

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24);
  }, [animation]);
  
  return (
    <group ref={group } {...props} dispose={null}>
      <group name="Scene">
        <group name="fall_guys">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="body"
            geometry={nodes.body.geometry}
            material={materials.Material}
            skeleton={nodes.body.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="eye"
            geometry={nodes.eye.geometry}
            material={materials.Material}
            skeleton={nodes.eye.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="hand-"
            geometry={nodes["hand-"].geometry}
            material={materials.Material}
            skeleton={nodes["hand-"].skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="leg"
            geometry={nodes.leg.geometry}
            material={materials.Material}
            skeleton={nodes.leg.skeleton}
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  );
}

