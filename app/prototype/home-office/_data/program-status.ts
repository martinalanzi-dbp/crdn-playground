"use client";

import { useEffect, useState } from "react";
import type { ProgramStatus } from "./programs";

/*
 * Status changes made from the detail screen are kept in localStorage so the
 * Programs list reflects them during a click-through. There is no backend.
 */
const STORAGE_KEY = "crdn-program-status";

const read = (): Record<string, ProgramStatus> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
};

export const useProgramStatusOverrides = () => {
  const [overrides, setOverrides] = useState<Record<string, ProgramStatus>>({});

  // Read after mount so server and client render the same markup first.
  useEffect(() => setOverrides(read()), []);

  const setStatus = (slug: string, status: ProgramStatus) => {
    const next = { ...read(), [slug]: status };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can be unavailable (private mode); the change then lasts for this screen only.
    }
    setOverrides(next);
  };

  return { overrides, setStatus };
};
