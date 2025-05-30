import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import professorOak from "../../assets/Models/pokemon_professor_oak.glb";

useGLTF.preload(professorOak)

export const ProfessorOak = ({ position = [0, 0, 0], scale = 1, ...props }) => {
  const group = useRef();
  const { scene } = useGLTF(professorOak)
  //NOTES: GLTF files contain the following options for future additons. 
    //scene,        The root THREE.Group containing the entire model
    //nodes,        For optional ictionary of nodes aka character section from the GLTF file
    //materials,    For optional directory of materials the could be referenced 
    //animations    For animation to be added in the future.

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);
  
  return (
    <group ref={group } {...props} dispose={null}>
      <group name="Scene">
        <primitive
          object={scene}
          scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
          rotation={[0, 0, 0]} 
        />
      </group>
    </group>
  );
};