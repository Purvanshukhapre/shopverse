import { redirect } from "next/navigation";

export default async function PrivateBrandsPage() {
  // Redirect to the unified products page
  redirect("/products");
}