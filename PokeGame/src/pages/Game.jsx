import "./Game.css";
import CSSwrapper from "../components/CSSwrapper";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { Leva } from "leva";
import { Preload } from "@react-three/drei";
import { useProgress } from "@react-three/drei";
import { RiLoader4Fill } from "react-icons/ri"
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "../components/LabScene/Experience";
import { SignOutControls } from "../components/Navigation/SignOut";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["ShiftLeft", "ShiftRight"]},
  { name: "jump", keys: ["Space", "KeyJ"] },
];

function Game() {
  useEffect(() => {
    const handleRightClick = (e) => {
          // e.preventDefault();
        };

    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey || (typeof e.scale !== "undefined" && e.scale !== 1)) {
        e.preventDefault();
      }
    };
  
    const preventGesture = (e) => {
      e.preventDefault();
    };
  
    // Prevent gestures
    window.addEventListener('wheel', preventZoom, { passive: false });
    window.addEventListener('gesturestart', preventGesture);
    window.addEventListener('gesturechange', preventGesture);
    window.addEventListener('gestureend', preventGesture);
    document.addEventListener("contextmenu", handleRightClick);
  
    return () => {
      window.removeEventListener('wheel', preventZoom);
      window.removeEventListener('gesturestart', preventGesture);
      window.removeEventListener('gesturechange', preventGesture);
      window.removeEventListener('gestureend', preventGesture);
      document.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  const { progress } = useProgress(); 

  const gameLoaded = progress === 100;
  
  return (
    <>
      <CSSwrapper className="startgame" />
      <Leva collapsed />
      {!gameLoaded && (
          <div className="loading-box">
            <RiLoader4Fill className="animate-spinner" size={70} color="white" />
            <p className="loading">Loading Game... {Math.floor(progress)}%</p>
          </div>
        )}
      <KeyboardControls map={keyboardMap}>
        <Canvas 
          shadows
          camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}  
          >
          <color attach="background" args={['black']} />
          <Suspense fallback={null}>
            <Preload all />
            <SignOutControls />
            <Experience />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  );
}

export default Game;