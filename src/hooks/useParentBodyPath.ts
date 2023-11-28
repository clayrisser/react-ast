import { useContext } from "react";
import ParentBodyPathContext from "~/contexts/parentBodyPath";

export default function useParentBodyPath() {
  return useContext(ParentBodyPathContext);
}
