import { createContext } from "react";
import { Path } from "~/types";

export default createContext<Path | undefined>(undefined);
