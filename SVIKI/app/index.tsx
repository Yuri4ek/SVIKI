import { Redirect } from "expo-router";
import { useUserStore } from "@/store";

export default function Index() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/authorizationRegistration" />;
  }

  return <Redirect href="/main" />;
}
