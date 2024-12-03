import {useState} from "react";

function useVisible(initState = false) {
  const [visibleModal, setVisibleModal] = useState(initState);
  const openModal = () => {
    setVisibleModal(true);
  };
  const hideModal = () => {
    setVisibleModal(false);
  };
  return [visibleModal, openModal, hideModal];
}

export {useVisible};