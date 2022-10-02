const rpc_endpoint = {
  DEV: `ws://${process.env.RPC_HOST}:9030`,
  PROD: ''
};

export default rpc_endpoint.DEV;
