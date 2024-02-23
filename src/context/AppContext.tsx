import {
  ReactNode,
  createContext,
  useContext,
  useState,
  // useLayoutEffect,
} from "react";
// import { useNavigate } from "react-router-dom";
// import { userService } from "services";
// import { useLocalStorage } from "usehooks-ts";
// import {
//   ChainInfo,
//   initChainInfo,
//   initReferral,
//   initUser,
//   IReferralInfo,
//   IUser,
// } from "utilities";
// import api from "utils/api";
// import setAuthToken from "utils/setAuthToken";

export interface IApp {
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  angle: number | undefined;
  setAngle: React.Dispatch<React.SetStateAction<number | undefined>>;
  deposit: boolean;
  setDeposit: React.Dispatch<React.SetStateAction<boolean>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  claimable:undefined | number;
  setClaimable: React.Dispatch<React.SetStateAction<undefined | number>>;
  process: boolean;
  setProcess: React.Dispatch<React.SetStateAction<boolean>>;
  totalClaimed:undefined | number;
  setTotalClaimed: React.Dispatch<React.SetStateAction<undefined | number>>;
  totalDeposited:undefined | number;
  setTotalDeposited: React.Dispatch<React.SetStateAction<undefined | number>>;
  depositModalOpen: boolean;
  setDepositModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  claimModalOpen: boolean;
  setClaimModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<IApp>({
  running: false,
  setRunning: () => { },
  angle: undefined,
  setAngle: () => { },
  deposit: false,
  setDeposit: () => { },
  playing: false,
  setPlaying: () => { },
  claimable: undefined,
  setClaimable: () => { },
  process: false,
  setProcess: () => { },
  totalClaimed: undefined,
  setTotalClaimed: () => { },
  totalDeposited: undefined,
  setTotalDeposited: () => { },
  depositModalOpen: false,
  setDepositModalOpen: () => { },
  claimModalOpen: false,
  setClaimModalOpen: () => { },
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [running, setRunning] = useState<boolean>(false)
  const [angle, setAngle] = useState<number | undefined>(20000)
  const [deposit, setDeposit] = useState<boolean>(false)
  const [playing, setPlaying] = useState<boolean>(false)
  const [claimable, setClaimable] = useState<undefined | number>(undefined)
  const [process, setProcess] = useState<boolean>(false)
  const [totalClaimed, setTotalClaimed] = useState<undefined | number>(undefined)
  const [totalDeposited, setTotalDeposited] = useState<undefined | number>(undefined)
  const [depositModalOpen, setDepositModalOpen] = useState<boolean>(false)
  const [claimModalOpen, setClaimModalOpen] = useState<boolean>(false)
  return (
    <AppContext.Provider
      value={{
        running,
        setRunning,
        angle,
        setAngle,
        deposit,
        setDeposit,
        playing,
        setPlaying,
        claimable,
        setClaimable,
        process,
        setProcess,
        totalClaimed,
        setTotalClaimed,
        totalDeposited,
        setTotalDeposited,
        depositModalOpen,
        setDepositModalOpen,
        claimModalOpen,
        setClaimModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): IApp => {
  return useContext(AppContext);
};
