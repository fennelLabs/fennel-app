const routes = [
  createRoute('/', 'Home'),
  createRoute('/profile', 'Profile'),
  createRoute('/inbox', 'Inbox')
];

function createRoute(to, text) {
  return {to, text};
}

export default routes;
