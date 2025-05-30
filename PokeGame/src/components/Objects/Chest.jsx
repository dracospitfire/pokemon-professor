import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import chestModel from "../../assets/Models/chest.glb";

useGLTF.preload(chestModel);

export const Chest = ({ position = [0, 0, 0], scale = 1, ...props }) => {
  const { scene } = useGLTF(chestModel);

  return (
    <RigidBody type="fixed" colliders="trimesh" {...props} >
      <primitive
        object={scene}
        position={position}
        scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
        rotation={[0, Math.PI, 0]} 
      />
      <CuboidCollider args={[0.5, 0.5, 0.5]} position={[0, -.9, -2]} scale={0.15}/>
    </RigidBody>
  );
};