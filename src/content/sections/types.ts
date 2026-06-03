import type { AlertVariant, AlertPosition } from "../../types";

export interface InputsState {
  inputValue: string; setInputValue: (v: string) => void;
  autocompleteValue: string; setAutocompleteValue: (v: string) => void;
  selectValue: string; setSelectValue: (v: string) => void;
  selectFramework: string; setSelectFramework: (v: string) => void;
  selectSm: string; setSelectSm: (v: string) => void;
  selectMd: string; setSelectMd: (v: string) => void;
  selectLg: string; setSelectLg: (v: string) => void;
  textareaValue: string; setTextareaValue: (v: string) => void;
  passwordValue: string; setPasswordValue: (v: string) => void;
  searchValue: string; setSearchValue: (v: string) => void;
  numberValue: number; setNumberValue: (v: number) => void;
  dateValue: string; setDateValue: (v: string) => void;
  colorValue: string; setColorValue: (v: string) => void;
  rangeValue: number; setRangeValue: (v: number) => void;
}

export interface DisplayState {
  chips: string[]; setChips: (v: string[] | ((prev: string[]) => string[])) => void;
  switchChecked: boolean; setSwitchChecked: (v: boolean) => void;
  switchDefault: boolean; setSwitchDefault: (v: boolean) => void;
  switchInfo: boolean; setSwitchInfo: (v: boolean) => void;
  switchSuccess: boolean; setSwitchSuccess: (v: boolean) => void;
  switchWarning: boolean; setSwitchWarning: (v: boolean) => void;
  switchDanger: boolean; setSwitchDanger: (v: boolean) => void;
  switchSm: boolean; setSwitchSm: (v: boolean) => void;
  switchMd: boolean; setSwitchMd: (v: boolean) => void;
  switchLg: boolean; setSwitchLg: (v: boolean) => void;
  progressValue: number; setProgressValue: (v: number | ((prev: number) => number)) => void;
}

export interface OverlaysState {
  modalSmall: boolean; setModalSmall: (v: boolean) => void;
  modalMedium: boolean; setModalMedium: (v: boolean) => void;
  modalLarge: boolean; setModalLarge: (v: boolean) => void;
  modalXl: boolean; setModalXl: (v: boolean) => void;
  showAlert: (variant: AlertVariant, position: AlertPosition, duration?: number) => void;
  overlayOpen: boolean; setOverlayOpen: (v: boolean) => void;
  drawerOpen: boolean; setDrawerOpen: (v: boolean) => void;
  drawerPosition: "left" | "right"; setDrawerPosition: (v: "left" | "right") => void;
}
