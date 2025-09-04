import { TFunction } from "react-i18next";
export interface ContactProps {
  title: string;
  content: string;
  button?: {
    title: string;
    color?: string;
    textColor?: string;
  }[];
  id: string;
  t: TFunction;
}

export interface ValidationTypeProps {
  type: string;
}
