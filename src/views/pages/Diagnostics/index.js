
import React, { useState, useEffect } from "react";
import Node from '../../../services/Node';

function Diagnostics() {

    let [genesisHash, chain, nodeName, nodeVersion, setDiagnostics] = useState(0);

    useEffect(() => {
        fetchData();
    });

    async function fetchData() {
        //not working yet, have to figure out how to set state
        const node = await new Node();
        [genesisHash, chain, nodeName, nodeVersion] = node.getDiagnosticsData(); 
        //setDiagnostics(genesisHash, chain, nodeName, nodeVersion)
        
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
                <dd>{chain}
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