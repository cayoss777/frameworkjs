const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

try {
    if (!fs.existsSync(envPath)) {
        console.error('❌ .env.local file not found!');
        process.exit(1);
    }

    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');

    let hasUrl = false;
    let hasKey = false;
    let hasServiceKey = false;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
            hasUrl = true;
            const val = trimmed.split('=')[1];
            if (!val || val.length < 10) console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL seems too short or empty');
        }
        if (trimmed.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
            hasKey = true;
            const val = trimmed.split('=')[1];
            if (!val || val.length < 10) console.warn('⚠️ NEXT_PUBLIC_SUPABASE_ANON_KEY seems too short or empty');
            if (val && !val.startsWith('ey')) console.warn('⚠️ NEXT_PUBLIC_SUPABASE_ANON_KEY does not start with "ey". Are you sure it is the right key?');
        }
        if (trimmed.includes('service_role')) {
            hasServiceKey = true;
        }
    });

    if (hasUrl && hasKey) {
        console.log('✅ .env.local format looks correct.');
        if (hasServiceKey) {
            console.warn('⚠️ Warning: It looks like you might have pasted the service_role key description or key itself. Make sure NEXT_PUBLIC_SUPABASE_ANON_KEY uses the "anon" key.');
        }
    } else {
        console.error('❌ Missing required variables in .env.local');
        if (!hasUrl) console.error('   - Missing NEXT_PUBLIC_SUPABASE_URL');
        if (!hasKey) console.error('   - Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }

} catch (err) {
    console.error('Error reading .env.local:', err);
}
