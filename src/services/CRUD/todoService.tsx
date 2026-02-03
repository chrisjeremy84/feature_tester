import { supabase } from "../../auth/service/supabase_client";

export async function getTodos() {
  return supabase.from('todos').select('*').order('created_at', { ascending: true });
}

export async function addTodo(title: string) {
  return supabase.from('todos').insert({ title });
}

export async function updateTodo(id: string, is_complete: boolean) {
  return supabase.from('todos').update({ is_complete }).eq('id', id);
}

export async function deleteTodo(id: string) {
  return supabase.from('todos').delete().eq('id', id);
}
