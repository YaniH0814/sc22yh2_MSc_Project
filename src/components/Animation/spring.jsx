const spring = {
    type: "spring", // a framer motion type that simulates spring
    damping: 15, //Strength of opposing force. If set to 0, spring will oscillate indefinitely
    stiffness: 100, //Stiffness of the spring. Higher values will create more sudden movement. Set to 100 by default.
    mass: 0.5, // Mass of the moving object. Higher values will result in more lethargic movement
  };
export default spring;  