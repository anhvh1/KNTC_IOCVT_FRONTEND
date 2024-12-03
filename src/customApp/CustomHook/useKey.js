import {useEffect, useState} from "react";

function useKey(props) {
  const [modalKey, setModalKey] = useState(0);
  const increaseKey = () => {
    setModalKey(modalKey + 1);
  };
  return [modalKey, increaseKey];
}

export {useKey};