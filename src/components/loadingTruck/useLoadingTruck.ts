import React, { useEffect, useRef, useState } from "react";
export function useLoadingTruck() {
  const packagesIntervalRef = useRef<number>();
  const [packagesDistance, setPackagesDistance] = useState<number[]>([
    -180, -140, -100, -60,
  ]);
  useEffect(() => {
    function movePackages() {
      setPackagesDistance((prevPackagesDistance) => {
        return prevPackagesDistance.map((distance) => {
          if (distance >= -20) return -180;
          return distance + 5;
        });
      });
    }
    packagesIntervalRef.current = window.setInterval(movePackages, 100);
    return () => clearInterval(packagesIntervalRef.current);
  }, []);
  return {
    packagesDistance,
  };
}
