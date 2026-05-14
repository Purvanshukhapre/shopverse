import { redirect } from "next/navigation";

export default async function AppliancesPage() {
  // Redirect to the unified products page
  redirect("/products");
}