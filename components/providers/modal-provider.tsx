"use client";
import { useEffect, useState } from "react";
import SettingsModal from "../modals/settings-modal";
import CoverImageModal from "../modals/cover-image-modal";

const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CoverImageModal />
      <SettingsModal />
    </>
  );
};

export default ModalProvider;
