import React from 'react';
import {Link} from 'react-router-dom';
import queryChainConnection from '../../hooks/queryChainConnection';
import {useAccount} from '../../hooks/useAccount';

function TailwindyNav() {
  const connectedToChain = queryChainConnection();
  const {address, balance} = useAccount();

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-amber-500 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            to="/"
          >
            Our Unnamed App
          </Link>
          <div className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
            Address: {address} <br />
            Balance: {balance}
          </div>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
          >
            <span className="block relative w-6 h-px rounded-sm bg-white"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          </button>
        </div>
        <div
          className="lg:flex flex-grow items-center"
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            {React.Children.toArray(
              [
                <Link key={0} to="/wallet/generate" className="link">
                  Generate Wallet
                </Link>,
                <Link key={1} to="/wallet/restore" className="link">
                  Restore Wallet
                </Link>,
                <Link key={2} to="/contacts" className="link">
                  Manage Contacts
                </Link>,
                connectedToChain && (
                  <Link key={3} to="/token/send" className="link">
                    Send UNIT
                  </Link>
                ),
                connectedToChain && (
                  <Link key={4} to="/identity" className="link">
                    Manage Identity
                  </Link>
                ),
                connectedToChain && (
                  <Link key={5} to="/inbox" className="link">
                    Messaging & Inbox
                  </Link>
                ),
                connectedToChain && (
                  <Link key={6} to="/feed" className="link">
                    Feed
                  </Link>
                ),
                <Link key={7} to="/whiteflag" className="link">
                  Whiteflag
                </Link>
              ].map((e) => <li key={8}>{e}</li>)
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TailwindyNav;
