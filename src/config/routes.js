const routes = [
  createRoute('/', 'Home'),
  createRoute('/profile', 'Profile'),
  createRoute('/inbox', 'Inbox'),
  createRoute('/generate-keypair', 'Generate Keypair')
];

function createRoute(to, text) {
  return {to, text};
}

export default routes;
