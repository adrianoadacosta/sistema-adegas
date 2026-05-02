import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://szyorvgmztadcvdmarai.supabase.co'
const supabaseKey = 'sb_publishable_rNPs0x1PJn6Cn-5mpCXiZA_itWC_yfk'

export const supabase = createClient(supabaseUrl, supabaseKey)