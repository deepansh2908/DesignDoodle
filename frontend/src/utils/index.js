import { jwtDecode } from 'jwt-decode';

//the token here is a JWT, retreived from browser's local storage
export const token_decode = (token) => {
	if (token) {
		const decode_data = jwtDecode(token);
		//Extracts the expiration time (in seconds since the Unix epoch) from the decoded JWT payload and converts it to a JS Date object
		const exp_time = new Date(decode_data.exp * 1000);

		//If the JWT is expired, it removes it from local storage and returns an empty string.
		if (new Date() > exp_time) {
			localStorage.removeItem('canva_token');
			return '';
		} else {
			return decode_data;
		}
	} else {
		return '';
	}
};
