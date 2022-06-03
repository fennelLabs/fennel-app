
import React, { useState, useEffect } from "react";
import RPCService from '../../../services/RPCService/RPCService.tsx';

function Diagnostics() {

    const [genesisHash, chain, nodeName, nodeVersion] = useState(0);

    useEffect(() => {
        fetchData();
    });

    async function fetchData() {

        const service = new RPCService();
        const api = await service.api();

        [genesisHash, chain, nodeName, nodeVersion] = await Promise.all([
            api.genesisHash.toHex(),
            api.rpc.system.chain(),
            api.rpc.system.name(),
            api.rpc.system.version(),
        ]);

    }

    return (
        <div>
            <dl>
                <dt>
                    Genesis Hash
                </dt>
                <dd>
                    {genesisHash}
                </dd>
                <dt>
                    Chain
                </dt>
                <dd>
                    {chain}
                </dd>
                <dt>
                    Node Name
                </dt>
                <dd>
                    {nodeName}
                </dd>
                <dt>
                    Node Version
                </dt>
                <dd>
                    {nodeVersion}
                </dd>
            </dl>
        </div>);

}

export default Diagnostics;