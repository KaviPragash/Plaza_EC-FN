import { supabase } from '../supabaseClient';

export async function fetchCategories() {
  const { data, error } = await supabase
    .from('MainCategory') 
    .select('mCategory_code, mCategory_name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data;
}
