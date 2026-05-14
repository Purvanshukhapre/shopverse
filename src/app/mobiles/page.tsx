import { redirect } from "next/navigation";

export default async function MobilesPage() {
  // Redirect to the unified products page
  redirect("/products");
}