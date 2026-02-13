import { Redirect } from "expo-router";
import { useUserStore } from "@/store";
import { ROUTES } from "@/constants";

export default function Index() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href={ROUTES.AUTH} />;
  }

  return <Redirect href={ROUTES.MAIN} />;
}
