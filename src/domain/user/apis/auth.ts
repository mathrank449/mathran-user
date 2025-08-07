import instance from "../../../apis/instance";

export const login = async (provider, code, state) => {
  try {
    const { data } = await instance.get(
      `/api/v1/auth/login/oauth/${provider}?code=${code}&state=${state}`
    );

    return data;
  } catch (e) {
    return e.errorMessage;
  }
};
