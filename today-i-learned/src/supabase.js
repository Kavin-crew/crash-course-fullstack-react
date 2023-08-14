import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gvrxxrzbuczgmaeldtgs.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2cnh4cnpidWN6Z21hZWxkdGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NjEyNzYsImV4cCI6MjAwNzIzNzI3Nn0.pyRDtnME2P4F7ugCzqI3LMdZMU3dO1cXhR5QmAL5YRQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
