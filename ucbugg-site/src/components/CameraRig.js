import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const CameraRig = (props) => {
  const { camera, mouse } = useThree();
  const vec = new Vector3();
  return useFrame(() => {
    // Change the splashView camera position based on the mouse position across the screen
    camera.position.lerp(
      vec.set(
        props.SPLASH_OFFSET[0] + mouse.x / 4,
        props.SPLASH_OFFSET[1] + mouse.y / 4,
        camera.position.z
      ),
      0.1
    );
    camera.lookAt(0, 0, 0);
  });
};

export default CameraRig;
