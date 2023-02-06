import Cookies from 'js-cookie';

export const baseUrl = 'api';

export const getMenuFromData = (data: any) => {
  return data?.map((e: any) => ({
    id: e.id,
    link: `/collections/${e.id}`,
    src: `/${e.name}.png`,
    name: e.name,
  }));
};

export const tokenStr = () => JSON.parse(Cookies.get('login-info')!)['token'] as string;
