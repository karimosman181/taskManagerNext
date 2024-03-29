import { syncDb } from '@/lib/utils/db/syncDb';

async function main() {
    console.log('Syncing Database !');
    try {
		await syncDb();
	} catch (e: any) {
        console.log(e);
	} finally {
		console.log('Sync Complete !');
    }
}

main()