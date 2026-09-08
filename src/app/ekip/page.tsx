import type { Metadata } from "next";
import { getEkipUser, EKIP_UYELERI } from "@/lib/ekip";
import EkipClient from "./EkipClient";

export const metadata: Metadata = {
  title: "Ekip — TikiTaka Impro",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EkipPage() {
  const user = await getEkipUser();
  return <EkipClient initialUser={user} members={[...EKIP_UYELERI]} />;
}
