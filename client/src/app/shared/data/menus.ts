export interface Menu {
  path: string;
  name: string;
}

export const menuList: Menu[] = [
  {
    path: "/products/list/man",
    name: 'Man'
  },
  {
    path: "/products/list/woman",
    name: 'Woman'
  },
  {
    path: "/products/list/kid",
    name: 'Kids'
  },
  {
    path: '/about',
    name: 'About'
  },
  {
    path: '/contact',
    name: 'Contact'
  }

];
