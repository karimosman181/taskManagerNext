import { seedUsers } from '@/lib/utils/db/syncDb';

async function main() {
    console.log('Syncing Database !');
   try {
		const users = await seedUsers();
	} catch (e: any) {
        console.log(e);
        // return;
	} finally {
		console.info('Seeding Complete !');
    }
}

main()