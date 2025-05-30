import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { Marshmallow } from "../Objects/Marshmallow";
import { ProfessorOak } from "../Objects/Professor";
import { Html } from "@react-three/drei";
import { useMemo } from "react";

import Pikachu from "../../assets/Images/pokemon/Pikachu.png"

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export const CharacterController = ({ chestRef, onChestOpen }) => {
  const navigate = useNavigate();

  const { WALK_SPEED, RUN_SPEED, JUMP_FORCE, ROTATION_SPEED } = useControls(
    "Character Control",
    {
      WALK_SPEED: { value: 0.8, min: 0.1, max: 4, step: 0.1 },
      RUN_SPEED: { value: 1.6, min: 0.2, max: 12, step: 0.1 },
      JUMP_FORCE: { value: 4, min: 1, max: 20, step: 1 },
      ROTATION_SPEED: {
        value: degToRad(0.5),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1),
      },
    }
  );

  const rb = useRef();
  const container = useRef();
  const character = useRef();

  const [isGrounded, setIsGrounded] = useState(false);
  const [isNearChest, setIsNearChest] = useState(false);
  const [animation, setAnimation] = useState("idle");
  const [falling, setFalling] = useState(false);
  const [hasFallen, setHasFallen] = useState(false);
  const [chestOpened, setChestOpened] = useState(false); 

  const characterRotationTarget = useRef(Math.PI);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const lastTap = useRef(0);
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);


  //ChestOpening effects
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isNearChest && e.key.toLowerCase() === "r" && !chestOpened) {
        if (onChestOpen) {
          setChestOpened(true);
          onChestOpen();
        }
      }
    };

    const handleDoubleTap = () => {
      const now = Date.now();
      const doubleTap = now - lastTap.current;
      if (isNearChest && doubleTap < 300 && !chestOpened) {
        setChestOpened(true);
        onChestOpen();
        }
        lastTap.current = now;
      }

    const handleDoubleClick = () => {
      if (isNearChest && !chestOpened) {
        setChestOpened(true);
        onChestOpen();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);            // Keyboard Input
    document.addEventListener("touchend", handleDoubleTap);       // Mobile Touch
    document.addEventListener("dblclick", handleDoubleClick);     // Mouse Click
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);        // Keyboard Input
      document.removeEventListener("touchend", handleDoubleTap);   // Mobile Touch
      document.removeEventListener("dblclick", handleDoubleClick); //Mouse Click
    };

  }, [isNearChest, onChestOpen, chestOpened]);

  useEffect(() => {
    const onMouseDown = (e) => {
      const canvas = document.querySelector('canvas');
      if (canvas && canvas.contains(e.target)) {
        isClicking.current = true;
      } else {
        isClicking.current = false;
      }
    };

    const onMouseUp = (e) => {
      isClicking.current = false;
    };

    document.addEventListener("mousedown", onMouseDown);  // Mouse Click
    document.addEventListener("mouseup", onMouseUp);
  
    document.addEventListener("touchstart", onMouseDown); // Mobile Touch
    document.addEventListener("touchend", onMouseUp);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);

      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
    };

  }, []);

  const FALL_THRESHOLD = useMemo(() => -7, []);
  const rotationLerpSpeed = falling ? 0.01 : 0.1;
  const cameraLerpSpeed = falling ? 0.01 : 0.1;

  useFrame(({ camera, mouse }) => {
    if (rb.current) {
      const vel = rb.current.linvel();
      setFalling(vel.y < -1);
      setIsGrounded(Math.abs(vel.y) < 0.05);

      const pos = rb.current.translation();
      if (pos.y < FALL_THRESHOLD) {
        setHasFallen(true);

        rb.current.setTranslation({ x: 0, y: 1, z: 0 }, true);
        rb.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        rb.current.setAngvel({ x: 0, y: 0, z: 0 }, true);

        rotationTarget.current = 0;
        characterRotationTarget.current = Math.PI;

        if (cameraPosition.current && cameraTarget.current) {
          cameraPosition.current.position.set(0, 2, 4);
          cameraTarget.current.position.set(0, 1, 0);
          cameraLookAt.current.set(0, 1, 0);
        }
        setAnimation("idle");
        setTimeout(() => {
          setHasFallen(false);
        }, 2000);
      }

      const movement = {
        x: 0,
        z: 0,
      };

      if (get().forward) {
        movement.z = 1;
      }
      if (get().backward) {
        movement.z = -1;
      }

      let speed = get().run ? RUN_SPEED : WALK_SPEED;

      if (isClicking.current) {
        //console.log("clicking", mouse.x, mouse.y);
        if (Math.abs(mouse.x) > 0.1) {
          movement.x = -mouse.x;
        }
        movement.z = mouse.y + 0.4;
        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = RUN_SPEED;
        }
      }

      if (get().left) {
        movement.x = 1;
      }
      if (get().right) {
        movement.x = -1;
      }

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(-movement.x,- movement.z);
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
        if (speed === RUN_SPEED) {
          setAnimation("run");
        } else {
          setAnimation("walk");
        }
      } else {
        setAnimation("idle");
      }

      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        rotationLerpSpeed
      );

      if (get().jump && isGrounded) {
        vel.y = JUMP_FORCE;
        setAnimation("jump");
      }

      rb.current.setLinvel(vel, true);
    }

    if (chestRef.current && rb.current) {
      const chestPos = chestRef.current.position;
      const playerPos = rb.current.translation();
      const dx = chestPos.x - playerPos.x;
      const dy = chestPos.y - playerPos.y;
      const dz = chestPos.z - playerPos.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    
      setIsNearChest(distance < .6);
    }

    // CAMERA
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      cameraLerpSpeed
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, falling ? 0.01 : 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(
        cameraLookAtWorldPosition.current,
        falling ? 0.01 : 0.1
      );

      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <>
      <RigidBody colliders={false} lockRotations ref={rb} gravity={[0, -9.81, 0]}>
        <group ref={container} >
        <group ref={cameraTarget} position-y={1} position-z={-0}>
          {hasFallen && (
            <Html center>
              <div className="fallen">
                Respawned... You have fallen! 
              </div>
            </Html>
          )}
          {isNearChest && (
            <Html center>
              <div className={chestOpened ? "pokemon-reward" : "open-chest"} >
                {chestOpened ? (
                  <div className="pokemon-stats">
                    <h2 className="recieved">You recieved, Pikachu!</h2>
                    <button onClick={() => navigate('/maps')} className="pokemon-button">
                      <img src={Pikachu} alt="Pikachu" width={100} height={100} />
                    </button>
                    <br></br><strong>Trainer: </strong>Ash Katchum
                    <ul>
                      <li><strong>Type:</strong> Electric</li>
                      <li><strong>HP:</strong> 35</li>
                      <li><strong>Attack:</strong> 55</li>
                      <li><strong>Defense:</strong> 40</li>
                      <li><strong>Speed:</strong> 90</li>
                      <li><strong>Special Attack:</strong> 50</li>
                      <li><strong>Special Defense:</strong> 50</li>
                    </ul>
                    </div>
                ) : (
                  <>
                    <div>Receive Pokémon</div>
                    <br />
                    <div>Press [R]</div>
                    <div>or</div>
                    <div>Double Tap</div>
                  </>
                )}
              </div>
            </Html>
          )}
        </group>
          <group ref={cameraPosition} position-y={2} position-z={4} />
          <group ref={character} position-y={-.2} >
            <Marshmallow scale={0.15} position-x={.18} position-z={-.2} animation={animation} />
            <ProfessorOak scale={0.017} position-x={0} position-z={0} />
          </group>
          <CapsuleCollider args={[0.08, 0.15]} />
        </group>
      </RigidBody>
    </>
  );
};
