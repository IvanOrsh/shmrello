import { TabKeys } from "@entities/Tab";

export type ShiftTask = {
  id: string;
  text: string;
  index: number;
  status: TabKeys;
};
