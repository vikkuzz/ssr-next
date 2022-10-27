import React, { useEffect } from "react";
import { useSelector } from "react-redux";
export function useOutsideAlerter(ref, component, classHidden) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        component.current.classList.add(classHidden);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export function useOutsideClick(component, classHidden) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (component.current && !component.current.contains(event.target)) {
        component.current.classList.add(classHidden);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [component]);
}
