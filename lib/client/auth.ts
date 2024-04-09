// npm i cookie \ npm i -D @types/cookie
import cookie from 'cookie';
import { I_UserPublic } from '@/models/User.types';

export function getUserData() {
	const cookies = cookie.parse(document.cookie);
	const { userData, selectedOrg } = cookies;

	// Check if userData exists and is a string
	if (!userData || typeof userData !== 'string') return null;

	try {
		return JSON.parse(userData) as I_UserPublic;
	} catch (error) {
		return null;
	}
}

export function getUserSelectedOrgData() {
	const cookies = cookie.parse(document.cookie);
	const { userData, selectedOrg } = cookies;

	// Check if selectedOrg exists and is a string
	if (!selectedOrg || typeof selectedOrg !== 'string') return null;

	try {
		return JSON.parse(selectedOrg) as {selectedOrg: string, selectedOrgRole: string};
	} catch (error) {
		return null;
	}
}

export function isLoggedIn() {
	const userData = getUserData();
	return !!userData;
}