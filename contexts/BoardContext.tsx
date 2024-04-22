import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FunctionComponent,
} from "react";
import {
  getUserData,
  getUserSelectedOrgData,
  isLoggedIn,
} from "../lib/client/auth";
import { usePathname } from "next/navigation";
import { I_UserPublic } from "@/models/User.types";
import { I_ApiAuthResponse } from "@/app/api/auth/route";
import { I_ApiListsResponse } from "@/app/api/account/organizations/lists/route";
import { I_ListPublic } from "@/models/List.types";

interface BoardContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  listsData: I_ListPublic[] | null;
  listsDataLoaded: boolean;
  loadListsData: () => void;
}

export interface I_ModalProps {
  className: string;
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);
interface BoardProviderProps {
  children: React.ReactNode;
}

const LISTSDATA_TTL = 60 * 5; // 5 minutes

export const BoardProvider: FunctionComponent<BoardProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listsData, setListsData] = useState<I_ListPublic[] | null>(null);
  const [listsDataLoaded, setListsDataLoaded] = useState<boolean>(false);
  const [listsDataLastLoad, setListsDataLastLoad] = useState<Date>(new Date());
  const [reLoad, setReLoad] = useState<boolean>(false);

  const loadListsData = () => {
    setListsDataLoaded(false);
    setListsDataLoaded(true);
  };

  const loadListsDataFromServer = async () => {
    if (!isLoggedIn()) return;

    try {
      const response = await fetch("/api/account/organizations/lists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as I_ApiListsResponse;
      const { success } = data;
      if (!success) {
        let message = "Failed to load user data from server";
        if (data.message) message = data.message;
        console.error(message);
        return;
      }
      setListsDataLastLoad(new Date());
      setListsData(data.lists);
    } catch (_) {
      console.error("Failed to load user data from server");
    } finally {
      loadListsData();
    }
  };

  useEffect(() => {
    loadListsDataFromServer();
  }, [reLoad]);

  return (
    <BoardContext.Provider
      value={{
        isLoading,
        setIsLoading,
        listsData,
        listsDataLoaded,
        loadListsData,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
export const useBoard = (): BoardContextProps => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within BoardProvider");
  }
  return context;
};
