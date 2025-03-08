//Components
import UsersCards from "../container/users/UsersCard";

const routes = [
  {
    path: "*",
    component: <UsersCards />,
  },
  {
    path: "/",
    component: <UsersCards />,
  },
  {
    path: "/user",
    component: <UsersCards />,
  },
];

export default routes;
