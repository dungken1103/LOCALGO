import axios from 'axios';

const API_BASE = 'https://tn7bs76m-3212.asse.devtunnels.ms';

export const getBalance = async (userId: string) => {
  const res = await axios.get(`${API_BASE}/wallet/balance/${userId}`);
  return res.data;
};

export const payin = async (userId: string, amount: number) => {
  const res = await axios.post(`${API_BASE}/wallet/payin`, { userId, amount });
  return res.data;
};

export const payout = async (userId: string, amount: number) => {
  const res = await axios.post(`${API_BASE}/wallet/payout`, { userId, amount });
  return res.data;
};
