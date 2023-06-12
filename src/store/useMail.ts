import create from "zustand";

export interface ConfigureDTO {
  sessionId?: string;
  toAddr?: string;
  text?: string;
  headerSubject?: string;
  fromAddr?: string;
}

export interface Mail {
  sessionId: string;
  toAddr: string;
  text: string;
  headerSubject: string;
  fromAddr: string;
  configure: (dto: ConfigureDTO) => void;
}

export const useMail = create<Mail>((set) => ({
  sessionId: "",
  toAddr: "",
  fromAddr: "",
  text: "",
  headerSubject: "",

  configure: (dto: ConfigureDTO) => set(dto),
}));
