import api from './axiosConfig';


export const getAllOwnerApplications = async () => {
  const response = await api.get('/users/owner-applications');
  return response.data;
};

export const getOwnerApplicationById = async (applicationId) => {
  const response = await api.get(`/users/owner-applications/${applicationId}`);
  return response.data;
};

export const approveOwnerApplication = async (applicationId) => {
  const response = await api.patch(`/users/owner-applications/${applicationId}/approve`);
  return response.data;
};

export const rejectOwnerApplication = async (applicationId, reviewData) => {
  const response = await api.patch(`/users/owner-applications/${applicationId}/reject`, reviewData);
  return response.data;
};
