import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Node from '../../../services/Node';
import {useServiceContext} from '../../../contexts/ServiceContext';

const node = new Node();

function TailwindyNav() {
  const {_, keymanager} = useServiceContext();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const sub = node.balance$.subscribe((d) => {
      setBalance(d);
    });

    let id = setInterval(() => {
      node.getBalance(keymanager);
    }, 1000);

    return () => {
      sub.remove();
      clearInterval(id);
    };
  });

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
                <Link to="/wallet/generate" className="link">
                  Generate Wallet
                </Link>,
                <Link to="/wallet/restore" className="link">
                  Restore Wallet
                </Link>,
                <Link to="/contacts" className="link">
                  Manage Contacts
                </Link>,
                <Link to="/identity" className="link">
                  Manage Identity
                </Link>,
                <Link to="/inbox" className="link">
                  Messaging & Inbox
                </Link>,
                <Link to="/feed" className="link">
                  Feed
                </Link>
              ].map((e) => <li>{e}</li>)
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TailwindyNav;
