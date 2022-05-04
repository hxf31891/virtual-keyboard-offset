import { useState, useLayoutEffect, useEffect } from "react";
import { useCurrentTime, getBrowser, getDeviceType } from "./utils";

const useKeyboardOffset = () => {
  const [keyBoardOffset, setKeyBoardOffset] = useState(0);
  const container = document.getElementById("keyboardOffsetAnchor");
  const body = document?.body || {};
  const childNodes = body?.childNodes || [];
  const browser = getBrowser();
  const isMobile = getDeviceType();
  //see Safari note below
  const needsBackup = isMobile && browser === "Apple Safari";
  //i dont want to run this function very often and overload frontends when its not needed
  const delay = needsBackup ? 250 : 2500;
  const seconds = useCurrentTime(delay);
  const backupCheck = needsBackup ? seconds : 0;

  //Safari on iOS creates the most virtual keyboard issues, it doesnt throw any event when the user closes the keyboard
  //with the return or go buttons. Current solution is simply to keep checking if its been closed any time its open.
  //Happy to hear better work arounds here.
  useEffect(() => {
    const bReq = container?.getBoundingClientRect();
    if (keyBoardOffset < 0 && bReq !== keyBoardOffset) {
      setKeyBoardOffset(bReq?.top);
    }
  }, [backupCheck]);

  //the anchor is the crux of this project, we insert the sizeless div and track its position against the viewport
  const insertAnchor = () => {
    let meas = document.createElement("div");
    meas.id = `keyboardOffsetAnchor`;
    meas.style.width = "0px";
    meas.style.height = "0px";
    meas.style.position = "absolute";
    meas.style.left = "0px";
    meas.style.top = "0px";
    body.insertBefore(meas, body.firstChild);
  };

  //insert the anchor whenever we dont have one but only on mobile (functionality is irrelavant on desktop browsers)
  useEffect(() => {
    if (!container && isMobile) {
      insertAnchor();
    }
  }, []);

  //listen for various events that may indicate that the keyboard has opened again only on mobile
  useLayoutEffect(() => {
    if (isMobile) {
      window.addEventListener("click", delayEvent);
      window.addEventListener("blur", delayEvent);
      window.addEventListener("focus", delayEvent);
      window.addEventListener("keyup", delayEvent);

      delayEvent();
    }
    return () => {
      if (isMobile) {
        window.removeEventListener("click", delayEvent);
        window.removeEventListener("blur", delayEvent);
        window.removeEventListener("focus", delayEvent);
        window.removeEventListener("keyup", delayEvent);
      }
    };
  }, []);

  //some of the virtual keyboards move slightly slower than others, the below
  //delay makes sure the elements have moved to their final position when we save it
  const delayEvent = () => {
    setTimeout(() => handleEvent(), 100);
  };

  const handleEvent = () => {
    const bReq = container?.getBoundingClientRect();
    setKeyBoardOffset(bReq?.top);
  };

  return {
    keyBoardOffset: keyBoardOffset,
    windowHeight: window.innerHeight + keyBoardOffset
  };
};

export { useKeyboardOffset };
