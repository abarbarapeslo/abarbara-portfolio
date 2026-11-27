"use client";

import React, { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Group } from "three";
// @ts-expect-error - no types for the maath subpath
import * as random from "maath/random/dist/maath-random.esm";

/** Slowly revolving particle "universe", tuned to read on a light background. */
function StarField() {
  const ref = useRef<Group>(null);
  const [blueSphere, goldSphere] = useMemo((): [Float32Array, Float32Array] => {
    const allStars = random.inSphere(new Float32Array(2400), { radius: 1.4 });
    const blue = new Float32Array(1800);
    const gold = new Float32Array(600);
    let blueOffset = 0;
    let goldOffset = 0;

    for (let i = 0, star = 0; i < allStars.length; i += 3, star += 1) {
      const target = star % 4 === 0 ? gold : blue;
      const offset = star % 4 === 0 ? goldOffset : blueOffset;
      target.set(allStars.subarray(i, i + 3), offset);
      if (star % 4 === 0) goldOffset += 3;
      else blueOffset += 3;
    }

    return [blue, gold];
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.015;
      ref.current.rotation.y -= delta * 0.025;
    }
  });

  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <Points positions={blueSphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#4d91b8"
          size={0.0045}
          sizeAttenuation
          depthWrite={false}
          opacity={0.55}
        />
      </Points>
      <Points positions={goldSphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#8c733b"
          size={0.0035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.22}
        />
      </Points>
    </group>
  );
}

const StarsBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-[1]">
    <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <StarField />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsBackground;
