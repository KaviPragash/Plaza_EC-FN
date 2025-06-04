import { supabase } from "@/lib/supabaseClient";

export async function fetchSubcategoriesGrouped() {
  const { data, error } = await supabase
    .from("SubCategory")
    .select("sCategory_name, mCategory_code");

  if (error) {
    console.error("Error fetching subcategories:", error.message);
    return {};
  }

  const grouped: Record<string, string[]> = {};
  data.forEach(({ sCategory_name, mCategory_code }) => {
    if (!grouped[mCategory_code]) grouped[mCategory_code] = [];
    grouped[mCategory_code].push(sCategory_name);
  });

  return grouped;
}
