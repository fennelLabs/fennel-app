import React, { useState } from 'react';

export function usePublishKeyForm({ onSubmit }) {
  const [fingerprint, setFingerprint] = useState('');
  const [location, setLocation] = useState('');

  function handleFingerprintChange(e) {
    const { value } = e.target;
    setFingerprint(value);
  }

  function handleLocationChange(e) {
    const { value } = e.target;
    setLocation(value);
  }

  const Form = (
    <form
      className="grid"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="form-group mb-6">
        <label htmlFor="fingerprint" className="form-label mb-2 text-gray-700">
          Name
        </label>
        <input
          id="fingerprint"
          value={fingerprint}
          onChange={handleFingerprintChange}
          type="text"
        />
      </div>
      <div className="grid form-group mb-6">
        <label htmlFor="location" className="form-label mb-2 text-gray-700">
          Public Key
        </label>
        <textarea
          id="location"
          value={location}
          onChange={handleLocationChange}
          rows={5}
        ></textarea>
      </div>

      <div className="mt-2">
        <button className="btn" type="submit">
          Publish Key
        </button>
      </div>
    </form>
  );

  return [fingerprint, location, Form];
}
