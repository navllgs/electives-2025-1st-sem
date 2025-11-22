import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    'https://whuncslsafptswlfivop.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndodW5jc2xzYWZwdHN3bGZpdm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MTkxMjUsImV4cCI6MjA3OTI5NTEyNX0.puDSQzvF_DcBbXCVbmOS_xTbfy0ZNqdh3Mor8nkfRp8'
)

export { supabase }