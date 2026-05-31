import { useState } from "react";
import type { AlertVariant, AlertPosition } from "../types";

export interface AlertState {
  open: boolean;
  variant: AlertVariant;
  position: AlertPosition;
  duration: number;
}

export function useComplementosState() {
  const [modalSmall, setModalSmall] = useState(false);
  const [modalMedium, setModalMedium] = useState(false);
  const [modalLarge, setModalLarge] = useState(false);
  const [modalXl, setModalXl] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectFramework, setSelectFramework] = useState("");
  const [selectSm, setSelectSm] = useState("");
  const [selectMd, setSelectMd] = useState("");
  const [selectLg, setSelectLg] = useState("");
  const [chips, setChips] = useState(["React", "TypeScript", "Vite", "CSS"]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [switchDefault, setSwitchDefault] = useState(false);
  const [switchInfo, setSwitchInfo] = useState(true);
  const [switchSuccess, setSwitchSuccess] = useState(true);
  const [switchWarning, setSwitchWarning] = useState(false);
  const [switchDanger, setSwitchDanger] = useState(false);
  const [switchSm, setSwitchSm] = useState(false);
  const [switchMd, setSwitchMd] = useState(false);
  const [switchLg, setSwitchLg] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [progressValue, setProgressValue] = useState(65);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState<"left" | "right">("right");
  const [passwordValue, setPasswordValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [numberValue, setNumberValue] = useState(0);
  const [dateValue, setDateValue] = useState("");
  const [colorValue, setColorValue] = useState("#aa3bff");
  const [rangeValue, setRangeValue] = useState(50);
  const [alert, setAlert] = useState<AlertState>({ open: false, variant: "info", position: "top-right", duration: 5000 });

  const showAlert = (variant: AlertVariant, position: AlertPosition, duration: number = 5000) => {
    setAlert({ open: true, variant, position, duration });
  };

  return {
    modalSmall, setModalSmall,
    modalMedium, setModalMedium,
    modalLarge, setModalLarge,
    modalXl, setModalXl,
    inputValue, setInputValue,
    overlayOpen, setOverlayOpen,
    autocompleteValue, setAutocompleteValue,
    selectValue, setSelectValue,
    selectFramework, setSelectFramework,
    selectSm, setSelectSm,
    selectMd, setSelectMd,
    selectLg, setSelectLg,
    chips, setChips,
    switchChecked, setSwitchChecked,
    switchDefault, setSwitchDefault,
    switchInfo, setSwitchInfo,
    switchSuccess, setSwitchSuccess,
    switchWarning, setSwitchWarning,
    switchDanger, setSwitchDanger,
    switchSm, setSwitchSm,
    switchMd, setSwitchMd,
    switchLg, setSwitchLg,
    textareaValue, setTextareaValue,
    progressValue, setProgressValue,
    drawerOpen, setDrawerOpen,
    drawerPosition, setDrawerPosition,
    passwordValue, setPasswordValue,
    searchValue, setSearchValue,
    numberValue, setNumberValue,
    dateValue, setDateValue,
    colorValue, setColorValue,
    rangeValue, setRangeValue,
    alert, setAlert,
    showAlert,
  };
}
