import { useState, useEffect } from "react";

const useModal = () => {
  const [stateModal, setStateModal] = useState({
    visible: false,
    data: {},
    loading: false,
    key: 0,
    action: [],
  });

  const showModal = (data, action) => {
    setStateModal((prev) => ({
      ...prev,
      visible: true,
      data: data,
      loading: false,
      action: action,
    }));
  };

  const hideModal = () => {
    setStateModal((prev) => ({
      ...prev,
      visible: false,
      data: {},
      loading: false,
      key: stateModal.key + 1,
    }));
  };

  return {
    showModal,
    hideModal,
    stateModal,
  };
};

export { useModal };
