import { create } from "zustand";

interface ConfigureDTO {
  sessionId: string;
  email: string;
  expiredAt: string;
}

interface State {
  sessionId?: string;
  email: string;
  expiredAt?: string;
  configure: (dto: ConfigureDTO) => void;
}

export const useSession = create<State>((set) => ({
  email: "",
  configure: (dto: ConfigureDTO) => set(dto),
}));
